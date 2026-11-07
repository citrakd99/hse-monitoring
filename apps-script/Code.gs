/**
 * HSE Monitoring – Batik Project
 * Backend Google Apps Script yang menempel pada Google Sheet.
 *
 * Cara pakai singkat (detail di DEPLOY.md):
 *  1. Buat Google Sheet kosong → Extensions → Apps Script → tempel file ini.
 *  2. Jalankan fungsi `setup` sekali (izinkan akses).
 *  3. Ubah PIN di sheet Config.
 *  4. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 *  5. Salin URL Web App ke config.js di aplikasi web.
 */

const SCHEMA = {
  Config: ['key', 'value', 'keterangan'],
  // kolom rincian ditambahkan di akhir supaya data lama tetap terbaca
  Manpower: ['date', 'normal', 'lembur', 'updated_by', 'updated_at', 'staff_normal', 'staff_lembur', 'pekerja_normal', 'pekerja_lembur'],
  Cuaca: ['date', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12', 'h13', 'h14', 'h15', 'h16', 'h17', 'h18', 'h19', 'h20', 'h21', 'updated_by', 'updated_at'],
  Observation: ['id', 'date', 'observer', 'area', 'finding', 'type', 'category', 'risk', 'photo_url', 'action', 'action_date', 'action_photo_url', 'status', 'created_by', 'created_at', 'updated_by', 'updated_at'],
  Incident: ['id', 'date', 'time', 'cls', 'area', 'desc', 'involved', 'action', 'lost_days', 'reporter', 'photo_url', 'created_by', 'created_at'],
  Master: ['list', 'value'],
  Program: ['id', 'category', 'name', 'frequency', 'pic'],
  Activity: ['id', 'date', 'program_id', 'topic', 'participants', 'pic', 'location', 'notes', 'photo_url', 'created_by', 'created_at'],
  Log: ['timestamp', 'user', 'role', 'action', 'sheet', 'ref']
};

const DEFAULT_CONFIG = [
  ['project_name', 'Batik Project', 'Nama proyek di header & PDF'],
  ['project_start', '2026-10-04', 'Tanggal mulai (yyyy-mm-dd), sebaiknya hari Minggu = awal Week 1'],
  ['project_end', '2027-05-01', 'Tanggal selesai (yyyy-mm-dd). Jumlah week dihitung otomatis dari mulai s/d selesai'],
  ['weeks', 30, 'Cadangan: dipakai hanya jika project_end kosong'],
  ['jam_normal', 8, 'Jam kerja normal per orang per hari'],
  ['jam_lembur', 4, 'Jam lembur per orang per hari'],
  ['target_obs_week', 20, 'Target observasi per minggu'],
  ['target_close_rate', 90, 'Target close-out rate (%)'],
  ['target_close_days', 3, 'Target rata-rata hari penyelesaian'],
  ['pin', 'ganti-pin-user', 'PIN untuk petugas input (WAJIB diganti)'],
  ['admin_pin', 'ganti-pin-admin', 'PIN admin: boleh ubah Master & hapus data (WAJIB diganti)'],
  ['photo_folder_id', '', 'Diisi otomatis: folder Google Drive untuk foto']
];

const DEFAULT_MASTER = {
  category: ['Procedure', 'Tools & Equipment', 'PPE', 'Housekeeping'],
  type: ['Unsafe Action', 'Unsafe Condition'],
  area: ['Building 4', 'Building 2', 'Hazardous', 'Toilet Building 2', 'Mosque', 'Compressor Room', 'Genset Room', 'Trafo Room', 'Chemical Room', 'Siteplan', 'Gate Perimeter', 'Other'],
  finding: ['Melanggar prosedur', 'Tidak menggunakan PPE', 'Area kerja', 'Alat tidak proper', 'dll']
};

const DEFAULT_PROGRAMS = [
  ['P01', 'Training', 'Training K3 umum (APD, kerja di ketinggian, listrik)', 'Bulanan', 'HSE'],
  ['P02', 'Training', 'Training khusus (hot work, lifting, confined space)', 'Sesuai kebutuhan', 'HSE'],
  ['P03', 'Training', 'Training P3K & tanggap darurat', 'Sesuai kebutuhan', 'HSE'],
  ['P04', 'Induction', 'Safety induction pekerja / tamu baru', 'Sesuai kebutuhan', 'HSE'],
  ['P05', 'Induction', 'Refresh induction seluruh pekerja', 'Bulanan', 'HSE'],
  ['P06', 'Safety Moment', 'Toolbox meeting / safety talk pagi', 'Harian', 'Supervisor'],
  ['P07', 'Safety Moment', 'Senam sehat bersama', 'Mingguan', 'HSE'],
  ['P08', 'Safety Moment', 'Safety meeting mingguan (P2K3 / kontraktor)', 'Mingguan', 'PM & HSE'],
  ['P09', 'Safety Moment', 'Rewarding & bagi hadiah Safety Champion', 'Bulanan', 'PM & HSE'],
  ['P10', 'Safety Moment', 'Kampanye K3 (poster, banner, safety sign)', 'Bulanan', 'HSE'],
  ['P11', 'Gemba / Safety Patrol', 'Safety patrol harian HSE', 'Harian', 'HSE'],
  ['P12', 'Gemba / Safety Patrol', 'Safety patrol gabungan (owner & kontraktor)', 'Mingguan', 'HSE'],
  ['P13', 'Gemba / Safety Patrol', 'Gemba walk manajemen', '2 Mingguan', 'Project Manager'],
  ['P14', 'Inspeksi', 'Inspeksi APAR, P3K & rambu', 'Bulanan', 'HSE'],
  ['P15', 'Inspeksi', 'Inspeksi alat kerja & scaffolding', 'Mingguan', 'HSE'],
  ['P16', 'Inspeksi', 'Inspeksi alat berat & lifting gear', 'Mingguan', 'HSE'],
  ['P17', 'Inspeksi', 'Inspeksi listrik & panel sementara', 'Bulanan', 'HSE'],
  ['P18', 'Inspeksi', 'Inspeksi APD pekerja', 'Mingguan', 'HSE'],
  ['P19', 'Lainnya', 'Housekeeping 5R / gotong royong', 'Mingguan', 'Supervisor'],
  ['P20', 'Lainnya', 'Cek kesehatan pekerja (tensi, dll)', 'Bulanan', 'HSE'],
  ['P21', 'Lainnya', 'Emergency drill (kebakaran / evakuasi)', 'Sesuai kebutuhan', 'HSE'],
  ['P22', 'Lainnya', 'Laporan HSE bulanan ke owner', 'Bulanan', 'HSE']
];
const PG_CATS = ['Training', 'Induction', 'Safety Moment', 'Gemba / Safety Patrol', 'Inspeksi', 'Lainnya'];
const PG_FREQ = ['Harian', 'Mingguan', '2 Mingguan', 'Bulanan', 'Sesuai kebutuhan'];
const RISKS = ['LOW', 'MEDIUM', 'HIGH'];
const INCIDENT_CLASS = ['Fatality', 'LWC', 'RWC/MTC', 'First Aid Case', 'Near Miss'];
const MASTER_LISTS = Object.keys(DEFAULT_MASTER);

/* ======================= SETUP ======================= */

function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(SCHEMA).forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    const head = SCHEMA[name];
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#0b5a41').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    // kolom tanggal/jam disimpan sebagai teks supaya tidak berubah format karena locale
    head.forEach((h, i) => {
      if (/^(date|action_date|time|id)$/.test(h)) sh.getRange(2, i + 1, sh.getMaxRows() - 1, 1).setNumberFormat('@');
    });
  });

  const cfg = ss.getSheetByName('Config');
  // tambahkan key yang belum ada (aman dijalankan ulang setelah update script)
  const haveKeys = cfg.getLastRow() > 1 ? cfg.getRange(2, 1, cfg.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
  DEFAULT_CONFIG.filter(r => haveKeys.indexOf(r[0]) < 0).forEach(r => cfg.appendRow(r));
  cfg.getRange('B:B').setNumberFormat('@');

  const ms = ss.getSheetByName('Master');
  if (ms.getLastRow() < 2) {
    const rows = [];
    MASTER_LISTS.forEach(l => DEFAULT_MASTER[l].forEach(v => rows.push([l, v])));
    ms.getRange(2, 1, rows.length, 2).setValues(rows);
  }

  const pg = ss.getSheetByName('Program');
  if (pg.getLastRow() < 2) pg.getRange(2, 1, DEFAULT_PROGRAMS.length, 5).setValues(DEFAULT_PROGRAMS);

  // dropdown untuk yang mengisi langsung di Sheet
  const obs = ss.getSheetByName('Observation');
  const col = (sheet, name) => SCHEMA[sheet].indexOf(name) + 1;
  const list = vals => SpreadsheetApp.newDataValidation().requireValueInList(vals, true).setAllowInvalid(false).build();
  obs.getRange(2, col('Observation', 'risk'), 999, 1).setDataValidation(list(RISKS));
  obs.getRange(2, col('Observation', 'status'), 999, 1).setDataValidation(list(['Open', 'Closed']));
  ss.getSheetByName('Incident').getRange(2, col('Incident', 'cls'), 999, 1).setDataValidation(list(INCIDENT_CLASS));

  photoFolder_();
  const def = ss.getSheetByName('Sheet1');
  if (def && ss.getSheets().length > 1 && def.getLastRow() === 0) ss.deleteSheet(def);
  SpreadsheetApp.getUi().alert('Setup selesai. Ganti PIN di sheet Config, lalu Deploy sebagai Web App.');
}

/* ======================= HTTP ======================= */

function doGet() {
  return json_({ ok: true, app: 'HSE Monitoring API', hint: 'Gunakan POST dari aplikasi web.' });
}

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents || '{}');
    const cfg = readConfig_();
    const role = req.pin && String(req.pin) === String(cfg.admin_pin) ? 'admin'
      : req.pin && String(req.pin) === String(cfg.pin) ? 'user' : null;
    if (!role) return json_({ ok: false, error: 'PIN salah' });
    if (/^ganti-pin/.test(String(cfg.pin)) || /^ganti-pin/.test(String(cfg.admin_pin)))
      return json_({ ok: false, error: 'PIN default belum diganti di sheet Config' });

    const user = String(req.user || '').slice(0, 60) || 'tanpa nama';
    const a = req.action;
    if (a === 'ping') return json_({ ok: true, role, project: cfg.project_name });
    if (a === 'all') return json_({ ok: true, role, data: readAll_(cfg) });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const out = write_(a, req, user, role);
      log_(user, role, a, out.sheet || '', out.ref || '');
      return json_(Object.assign({ ok: true }, out));
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function write_(a, req, user, role) {
  const now = new Date();
  const adminOnly = () => { if (role !== 'admin') throw new Error('Hanya admin'); };
  const r = req.row || {};

  switch (a) {
    case 'upsertManpower': {
      checkDate_(req.date);
      const hasDetail = ['staff_normal', 'staff_lembur', 'pekerja_normal', 'pekerja_lembur'].some(k => req[k] !== undefined);
      const v = { updated_by: user, updated_at: now };
      if (hasDetail) {
        v.staff_normal = num_(req.staff_normal); v.staff_lembur = num_(req.staff_lembur);
        v.pekerja_normal = num_(req.pekerja_normal); v.pekerja_lembur = num_(req.pekerja_lembur);
        v.normal = v.staff_normal + v.pekerja_normal; v.lembur = v.staff_lembur + v.pekerja_lembur;
      } else { v.normal = num_(req.normal); v.lembur = num_(req.lembur); }
      upsert_('Manpower', req.date, v);
      return { sheet: 'Manpower', ref: req.date };
    }
    case 'upsertCuaca': {
      checkDate_(req.date);
      const v = { updated_by: user, updated_at: now };
      (req.hours || []).slice(0, 15).forEach((k, i) => { v['h' + String(7 + i).padStart(2, '0')] = k || ''; });
      upsert_('Cuaca', req.date, v);
      return { sheet: 'Cuaca', ref: req.date };
    }
    case 'addObservation':
    case 'updateObservation': {
      checkDate_(r.date);
      const v = {
        date: r.date, observer: r.observer, area: r.area, finding: r.finding, type: r.type, category: r.category,
        risk: RISKS.indexOf(r.risk) >= 0 ? r.risk : 'LOW', action: r.action || '', action_date: r.actionDate || '',
        updated_by: user, updated_at: now
      };
      v.status = v.action_date ? 'Closed' : 'Open';
      if (req.photo) v.photo_url = savePhoto_(req.photo, 'OBS');
      if (req.actionPhoto) v.action_photo_url = savePhoto_(req.actionPhoto, 'ACT');
      let id = req.id;
      if (a === 'addObservation') {
        id = newId_('OBS');
        Object.assign(v, { created_by: user, created_at: now });
        append_('Observation', id, v);
      } else {
        if (!update_('Observation', id, v)) throw new Error('Observasi tidak ditemukan: ' + id);
      }
      return { sheet: 'Observation', ref: id, id, photo_url: v.photo_url, action_photo_url: v.action_photo_url };
    }
    case 'addIncident': {
      checkDate_(r.date);
      if (INCIDENT_CLASS.indexOf(r.cls) < 0) throw new Error('Klasifikasi tidak valid');
      const id = newId_('INC');
      const v = {
        date: r.date, time: r.time, cls: r.cls, area: r.area, desc: r.desc, involved: r.involved || '', action: r.action || '',
        lost_days: num_(r.lostDays), reporter: r.reporter || user, created_by: user, created_at: now
      };
      if (req.photo) v.photo_url = savePhoto_(req.photo, 'INC');
      append_('Incident', id, v);
      return { sheet: 'Incident', ref: id, id, photo_url: v.photo_url };
    }
    case 'updateConfig': {
      adminOnly();
      const allowed = ['project_name', 'project_start', 'project_end', 'jam_normal', 'jam_lembur', 'target_obs_week', 'target_close_rate', 'target_close_days'];
      const c = req.config || {};
      if (c.project_start !== undefined) checkDate_(c.project_start);
      if (c.project_end !== undefined) checkDate_(c.project_end);
      if (c.project_start && c.project_end && c.project_end < c.project_start) throw new Error('Tanggal selesai sebelum tanggal mulai');
      const sh = sheet_('Config'), vals = sh.getDataRange().getValues();
      allowed.filter(k => c[k] !== undefined).forEach(k => {
        const v = typeof c[k] === 'number' ? (isFinite(c[k]) && c[k] >= 0 ? c[k] : 0) : String(c[k]).slice(0, 80);
        const i = vals.findIndex(r => r[0] === k);
        if (i > 0) sh.getRange(i + 1, 2).setValue(txt_(v)); else sh.appendRow([k, txt_(v), '']);
      });
      return { sheet: 'Config', ref: Object.keys(c).join(',') };
    }
    case 'addActivity': {
      checkDate_(r.date);
      if (!findRow_('Program', r.programId)) throw new Error('Program tidak ditemukan');
      const id = newId_('ACT');
      const v = {
        date: r.date, program_id: r.programId, topic: String(r.topic || '').slice(0, 120), participants: num_(r.participants),
        pic: String(r.pic || '').slice(0, 60), location: r.location || '', notes: String(r.notes || '').slice(0, 300), created_by: user, created_at: now
      };
      if (req.photo) v.photo_url = savePhoto_(req.photo, 'ACT');
      append_('Activity', id, v);
      return { sheet: 'Activity', ref: id, id, photo_url: v.photo_url };
    }
    case 'addProgram': {
      adminOnly();
      if (PG_CATS.indexOf(r.category) < 0 || PG_FREQ.indexOf(r.frequency) < 0 || !String(r.name || '').trim()) throw new Error('Program tidak valid');
      const id = newId_('PRG');
      append_('Program', id, { category: r.category, name: String(r.name).trim().slice(0, 80), frequency: r.frequency, pic: String(r.pic || '').slice(0, 40) });
      return { sheet: 'Program', ref: id, id };
    }
    case 'updateProgram': {
      adminOnly();
      if (PG_CATS.indexOf(r.category) < 0 || PG_FREQ.indexOf(r.frequency) < 0 || !String(r.name || '').trim()) throw new Error('Program tidak valid');
      if (!update_('Program', req.id, { category: r.category, name: String(r.name).trim().slice(0, 80), frequency: r.frequency, pic: String(r.pic || '').slice(0, 40) }))
        throw new Error('Program tidak ditemukan');
      return { sheet: 'Program', ref: req.id };
    }
    case 'deleteRow': {
      adminOnly();
      if (['Observation', 'Incident', 'Activity', 'Program'].indexOf(req.sheet) < 0) throw new Error('Sheet tidak boleh dihapus');
      if (!deleteById_(req.sheet, req.id)) throw new Error('Data tidak ditemukan');
      return { sheet: req.sheet, ref: req.id };
    }
    case 'addMaster': {
      adminOnly();
      const l = req.list, val = String(req.value || '').trim().slice(0, 60);
      if (MASTER_LISTS.indexOf(l) < 0 || !val) throw new Error('Master tidak valid');
      const sh = sheet_('Master');
      const exists = sh.getDataRange().getValues().some(x => x[0] === l && String(x[1]).toLowerCase() === val.toLowerCase());
      if (exists) throw new Error('"' + val + '" sudah ada');
      sh.appendRow([l, val]);
      return { sheet: 'Master', ref: l + ':' + val };
    }
    case 'deleteMaster': {
      adminOnly();
      const sh = sheet_('Master'), vals = sh.getDataRange().getValues();
      for (let i = vals.length - 1; i >= 1; i--) if (vals[i][0] === req.list && vals[i][1] === req.value) { sh.deleteRow(i + 1); break; }
      return { sheet: 'Master', ref: req.list + ':' + req.value };
    }
  }
  throw new Error('Aksi tidak dikenal: ' + a);
}

/* ======================= READ ======================= */

function readAll_(cfg) {
  const master = {};
  MASTER_LISTS.forEach(l => master[l] = []);
  rows_('Master').forEach(r => { if (master[r.list] && r.value !== '') master[r.list].push(String(r.value)); });
  const safeCfg = {};
  Object.keys(cfg).forEach(k => { if (!/pin|folder/.test(k)) safeCfg[k] = cfg[k]; });
  return {
    config: safeCfg,
    manpower: rows_('Manpower'),
    cuaca: rows_('Cuaca'),
    observation: rows_('Observation'),
    incident: rows_('Incident'),
    program: rows_('Program'),
    activity: rows_('Activity'),
    master
  };
}

function readConfig_() {
  const out = {};
  sheet_('Config').getDataRange().getValues().slice(1).forEach(r => { if (r[0]) out[r[0]] = cell_(r[1], r[0]); });
  return out;
}

function rows_(name) {
  const vals = sheet_(name).getDataRange().getValues();
  const head = vals.shift() || [];
  return vals.filter(r => r.some(c => c !== '')).map(r => {
    const o = {};
    head.forEach((h, i) => { if (!/_by$|_at$/.test(h) || h === 'created_by') o[h] = cell_(r[i], h); });
    return o;
  });
}

/* ======================= HELPERS ======================= */

function sheet_(name) {
  const sh = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sh) throw new Error('Sheet ' + name + ' belum ada. Jalankan setup().');
  return sh;
}

function cell_(v, h) {
  if (v instanceof Date) {
    const tz = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    return Utilities.formatDate(v, tz, h === 'time' ? 'HH:mm' : 'yyyy-MM-dd');
  }
  return v;
}

function rowObj_(name, key, v) {
  return SCHEMA[name].map((h, i) => i === 0 ? key : (v[h] !== undefined ? v[h] : ''));
}

function findRow_(name, key) {
  const sh = sheet_(name);
  const keys = sh.getRange(1, 1, Math.max(sh.getLastRow(), 1), 1).getValues();
  for (let i = 1; i < keys.length; i++) if (String(cell_(keys[i][0], 'date')) === String(key)) return i + 1;
  return 0;
}

// tanggal, jam & id disimpan sebagai teks (awalan ') agar tidak diubah otomatis oleh Sheets
function txt_(x) {
  return typeof x === 'string' && /^(\d{4}-\d{2}-\d{2}|\d{1,2}:\d{2}|[A-Z]{3}-\d+-\d+)$/.test(x) ? "'" + x : x;
}

function append_(name, key, v) {
  sheet_(name).appendRow(rowObj_(name, key, v).map(txt_));
}

function update_(name, key, v) {
  const row = findRow_(name, key);
  if (!row) return false;
  const sh = sheet_(name), head = SCHEMA[name];
  const cur = sh.getRange(row, 1, 1, head.length).getValues()[0];
  head.forEach((h, i) => { if (i > 0 && v[h] !== undefined) cur[i] = txt_(v[h]); });
  cur[0] = txt_(key);
  sh.getRange(row, 1, 1, head.length).setValues([cur]);
  return true;
}

function upsert_(name, key, v) {
  if (!update_(name, key, v)) append_(name, key, v);
}

function deleteById_(name, id) {
  const row = findRow_(name, id);
  if (!row) return false;
  sheet_(name).deleteRow(row);
  return true;
}

function newId_(prefix) {
  return prefix + '-' + Utilities.formatDate(new Date(), 'GMT', 'yyMMddHHmmss') + '-' + Math.floor(Math.random() * 900 + 100);
}

function checkDate_(d) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d || ''))) throw new Error('Tanggal tidak valid');
}

function num_(x) {
  const n = Number(x);
  return isFinite(n) && n >= 0 ? Math.round(n) : 0;
}

function photoFolder_() {
  const cfgSh = sheet_('Config');
  const vals = cfgSh.getDataRange().getValues();
  const idx = vals.findIndex(r => r[0] === 'photo_folder_id');
  let id = idx > 0 ? String(vals[idx][1]) : '';
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { id = ''; } }
  const folder = DriveApp.createFolder('HSE Monitoring – Foto');
  if (idx > 0) cfgSh.getRange(idx + 1, 2).setValue(folder.getId());
  else cfgSh.appendRow(['photo_folder_id', folder.getId(), 'Diisi otomatis']);
  return folder;
}

/** photo = { name, mime, data(base64 tanpa prefix) } → URL gambar */
function savePhoto_(photo, prefix) {
  if (!photo || !photo.data) return undefined;
  const mime = /^image\/(jpeg|png|webp)$/.test(photo.mime) ? photo.mime : 'image/jpeg';
  const bytes = Utilities.base64Decode(photo.data);
  if (bytes.length > 8 * 1024 * 1024) throw new Error('Foto terlalu besar (maks 8 MB)');
  const name = prefix + '-' + Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd-HHmmss') + '.jpg';
  const file = photoFolder_().createFile(Utilities.newBlob(bytes, mime, name));
  // bisa dilihat oleh siapa pun yang punya link (untuk ditampilkan di aplikasi)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200';
}

function log_(user, role, action, sheet, ref) {
  try { sheet_('Log').appendRow([new Date(), user, role, action, sheet, ref]); } catch (e) { /* log opsional */ }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
