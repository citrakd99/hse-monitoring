/* =====================================================================
   DAFTAR PEKERJA (menu Manpower → tab Daftar Pekerja)
   Data per orang: nama, KTP, jenis kelamin, kategori, perusahaan,
   induction, pelanggaran (P1–P3), status bekerja, training & sertifikasi.
   No KTP adalah data pribadi: di tabel & PDF hanya tampil 4 digit terakhir.
   File ini memakai fungsi global dari index.html ($, esc, MASTER, save, dll).
   ===================================================================== */
const WK_GENDER = ['Pria', 'Wanita'];
const WK_CATEGORY = ['Pekerja', 'Staff'];
const WK_INDUCTION = ['Sudah', 'Belum'];
const WK_VIOLATION = ['-', 'P1', 'P2', 'P3'];
const WK_STATUS = ['Aktif', 'P3', 'Non Aktif'];
// Ketentuan pelanggaran:
//  P3 = terminasi dari proyek -> status bekerja P3 permanen, tidak bisa Aktif lagi
//  P2 = status induction kembali 'Belum' -> wajib induction ulang (tanggal induction >= tanggal pelanggaran)
const WK_DEFAULT_TRAINING = ['K3 Umum', 'Hot Work (HW)', 'Working at Height (WAH)', 'Listrik', 'Confined Space', 'Lifting & Rigging', 'Scaffolding', 'Excavation', 'LOTOTO', 'P3K / First Aid', 'Fire Fighting / APAR', 'Kesiapsiagaan Darurat'];
const WK_DEFAULT_CERT = ['Ahli K3 Umum (AK3U)', 'Ahli K3 Listrik', 'Teknisi K3 Listrik', 'Juru Las / Welder', 'Juru Ikat / Rigger', 'Teknisi Scaffolding', 'TKBT 1 (Bekerja di Ketinggian)', 'TKBT 2 (Bekerja di Ketinggian)',
  'Petugas K3 Ruang Terbatas', 'Operator Crane (SIO)', 'Operator Forklift (SIO)', 'Operator Excavator (SIO)', 'Petugas P3K', 'Petugas Peran Kebakaran', 'Supervisor / Pengawas K3'];

let workers = [], WK_SERVER = true;
const wkById = id => workers.find(w => String(w.id) === String(id));
const wkList = s => String(s || '').split('|').map(x => x.trim()).filter(Boolean);
const ktpMask = k => { const d = String(k || '').replace(/\D/g, ''); return d ? '•••• ' + d.slice(-4) : '–'; };
function wkFromRow(r) {
  return { id: String(r.id), name: r.name || '', ktp: String(r.ktp || ''), gender: r.gender || 'Pria', category: r.category || 'Pekerja', company: r.company || '',
    induction: r.induction || 'Belum', inductionDate: r.induction_date || '', violation: r.violation || '-', violationDate: r.violation_date || '', status: r.work_status || 'Aktif',
    trainings: wkList(r.trainings), certs: wkList(r.certifications), notes: r.notes || '' };
}
const wkToRow = w => ({ name: w.name, ktp: w.ktp, gender: w.gender, category: w.category, company: w.company, induction: w.induction, induction_date: w.inductionDate,
  violation: w.violation, violation_date: w.violationDate || '', work_status: w.status, trainings: w.trainings.join('|'), certifications: w.certs.join('|'), notes: w.notes });

function wkDemo(rnd) {
  const first = ['Agus', 'Budi', 'Dedi', 'Eko', 'Fajar', 'Hendra', 'Iwan', 'Joko', 'Kurniawan', 'Rudi', 'Asep', 'Yanto', 'Slamet', 'Rahmat', 'Doni', 'Teguh', 'Ujang', 'Wahyu', 'Sari', 'Dewi', 'Rina', 'Andi', 'Bayu', 'Gilang', 'Hadi', 'Imam'];
  const last = ['Saputra', 'Santoso', 'Hidayat', 'Pratama', 'Wijaya', 'Setiawan', 'Nugroho', 'Gunawan', 'Kusuma', 'Siregar'];
  const comp = ['PT Citra Karsa Dinamika', 'CV Mitra Las', 'PT Elektrindo', 'CV Bangun Sipil'];
  const pick = a => a[Math.floor(rnd() * a.length)];
  workers = first.map((f, i) => {
    const staff = i % 9 === 0, v = rnd() < 0.8 ? '-' : rnd() < 0.6 ? 'P1' : rnd() < 0.7 ? 'P2' : 'P3';
    const tr = MASTER.training.filter(() => rnd() < 0.3); if (!tr.includes('K3 Umum')) tr.unshift('K3 Umum');
    const o = { id: 'DW' + i, name: `${f} ${pick(last)}`, ktp: '3201' + String(Math.floor(rnd() * 1e12)).padStart(12, '0'), gender: ['Sari', 'Dewi', 'Rina'].includes(f) ? 'Wanita' : 'Pria',
      category: staff ? 'Staff' : 'Pekerja', company: staff ? comp[0] : pick(comp), induction: rnd() < 0.88 ? 'Sudah' : 'Belum', inductionDate: fmt(addDays(CFG.projectStart, Math.floor(rnd() * 30))),
      violation: v, violationDate: v === '-' ? '' : fmt(addDays(CFG.today, -Math.floor(rnd() * 10))), status: v === 'P3' ? 'P3' : rnd() < 0.1 ? 'Non Aktif' : 'Aktif', trainings: tr, certs: MASTER.sertifikasi.filter(() => rnd() < 0.12), notes: '' };
    if (v === 'P2') o.induction = 'Belum'; // P2 wajib induction ulang
    return o;
  });
}

/* ---------- statistik + tabel ---------- */
function renderWorkers() {
  const n = workers.length, act = workers.filter(w => w.status === 'Aktif'), cnt = (k, v) => workers.filter(w => w[k] === v).length;
  const indAct = act.filter(w => w.induction === 'Sudah').length, indPct = act.length ? Math.round(indAct / act.length * 100) : 0;
  const withCert = workers.filter(w => w.certs.length).length, certTotal = workers.reduce((x, w) => x + w.certs.length, 0);
  const viol = WK_VIOLATION.slice(1).map(v => `${v}: <b>${cnt('violation', v)}</b>`).join(' · ');
  $('#wk-kpi').innerHTML =
    `<div class="card kpi"><div class="lbl">Pekerja terdaftar</div><div class="val">${nf(n)}</div><div class="hint">Pria ${cnt('gender', 'Pria')} · Wanita ${cnt('gender', 'Wanita')} · Staff ${cnt('category', 'Staff')}</div></div>` +
    `<div class="card kpi safe"><div class="lbl">Status aktif</div><div class="val">${nf(act.length)}</div><div class="hint">Terminasi (P3) ${cnt('status', 'P3')} · Non Aktif ${cnt('status', 'Non Aktif')} · ${workers.filter(w => w.violation === 'P2' && w.induction === 'Belum').length} P2 wajib induction ulang</div></div>` +
    `<div class="card kpi ${indPct < 100 && act.length ? 'bad' : 'safe'}"><div class="lbl">Sudah induction (aktif)</div><div class="val">${indPct}%</div><div class="hint">${act.length - indAct} pekerja aktif belum induction</div></div>` +
    `<div class="card kpi ${workers.some(w => w.violation !== '-') ? 'bad' : ''}"><div class="lbl">Pelanggaran</div><div class="val">${workers.filter(w => w.violation !== '-').length}</div><div class="hint">${viol}</div></div>`;
  // ringkasan training & sertifikasi
  const tally = key => { const m = {}; workers.forEach(w => w[key].forEach(t => m[t] = (m[t] || 0) + 1)); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  const chips = (arr, cls) => arr.map(([t, c]) => `<span class="wk-chip ${cls}">${esc(t)} <b>${c}</b></span>`).join('') || '<span style="color:var(--muted)">–</span>';
  $('#wk-sum').innerHTML = `<div><div class="wk-sl">Training diikuti (jumlah pekerja)</div>${chips(tally('trainings'), 'tr')}</div>
    <div><div class="wk-sl">Sertifikasi · ${withCert} pekerja bersertifikat, ${certTotal} sertifikat</div>${chips(tally('certs'), 'ct')}</div>`;

  const F = { q: $('#wk-q').value.trim().toLowerCase(), st: $('#wk-st').value, ind: $('#wk-ind').value, v: $('#wk-v').value, tr: $('#wk-tr').value };
  const list = workers.filter(w => (!F.q || [w.name, w.company, w.ktp.slice(-4)].join(' ').toLowerCase().includes(F.q)) && (!F.st || w.status === F.st) && (!F.ind || w.induction === F.ind) &&
    (!F.v || (F.v === 'ada' ? w.violation !== '-' : w.violation === F.v)) && (!F.tr || w.trainings.includes(F.tr) || w.certs.includes(F.tr)))
    .sort((a, b) => a.name.localeCompare(b.name));
  $('#wk-info').innerHTML = summarize(n, list.length, 'pekerja', [['Cari', F.q], ['Status', F.st], ['Induction', F.ind], ['Pelanggaran', F.v === 'ada' ? 'Ada' : F.v], ['Training/Sertifikasi', F.tr]]);
  const pill = (v, map) => `<span class="pt-st ${map[v] || 'pt-draft'}">${esc(v)}</span>`;
  $('#wk-body').innerHTML = list.map((w, i) => `<tr data-id="${esc(w.id)}"><td>${i + 1}</td><td><b>${esc(w.name)}</b><br><small style="color:var(--muted)">${esc(w.category)}${w.company ? ' · ' + esc(w.company) : ''}</small></td>
    <td style="font-variant-numeric:tabular-nums">${ktpMask(w.ktp)}</td><td>${w.gender === 'Wanita' ? 'W' : 'P'}</td>
    <td>${pill(w.induction, { Sudah: 'pt-act', Belum: 'pt-exp' })}</td><td>${w.violation === '-' ? '–' : pill(w.violation, { P1: 'pt-sub', P2: 'pt-warn', P3: 'pt-exp' })}</td>
    <td>${w.status === 'P3' ? '<span class="pt-st pt-exp">P3 · Terminasi</span>' : pill(w.status, { Aktif: 'pt-act', 'Non Aktif': 'pt-cancel' })}</td>
    <td class="wk-cell">${w.trainings.map(t => `<span class="wk-chip tr">${esc(t)}</span>`).join('') || '–'}</td><td class="wk-cell">${w.certs.map(t => `<span class="wk-chip ct">${esc(t)}</span>`).join('') || '–'}</td></tr>`).join('')
    || '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:20px">Belum ada pekerja sesuai filter</td></tr>';
  $('#wk-body').querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = () => openWorker(wkById(tr.dataset.id)));
  // pilihan filter training/sertifikasi
  const ts = $('#wk-tr'), keep = ts.value;
  ts.innerHTML = '<option value="">Semua</option><optgroup label="Training">' + MASTER.training.map(t => `<option>${esc(t)}</option>`).join('') + '</optgroup><optgroup label="Sertifikasi">' + MASTER.sertifikasi.map(t => `<option>${esc(t)}</option>`).join('') + '</optgroup>';
  ts.value = keep;
  $('#wk-note').textContent = WK_SERVER ? '' : 'Apps Script belum diperbarui: daftar pekerja belum bisa disimpan ke Google Sheet (lihat DEPLOY.md).';
}

/* ---------- form ---------- */
let wkEdit = null;
function openWorker(w) {
  wkEdit = w || null; const f = $('#wk-form'), el = k => f.elements.namedItem(k);
  f.reset();
  const multi = (box, items, sel, name) => $(box).innerHTML = items.map(t => `<label class="ck"><input type="checkbox" name="${name}" value="${esc(t)}" ${sel.includes(t) ? 'checked' : ''}> <span>${esc(t)}</span></label>`).join('')
    + sel.filter(t => !items.includes(t)).map(t => `<label class="ck"><input type="checkbox" name="${name}" value="${esc(t)}" checked> <span>${esc(t)} <small>(tidak ada di master)</small></span></label>`).join('');
  const v = w || { name: '', ktp: '', gender: 'Pria', category: 'Pekerja', company: '', induction: 'Belum', inductionDate: '', violation: '-', status: 'Aktif', trainings: [], certs: [], notes: '' };
  ['name', 'ktp', 'gender', 'category', 'company', 'induction', 'inductionDate', 'violation', 'status', 'notes'].forEach(k => el(k).value = v[k] || '');
  multi('#wk-trbox', MASTER.training, v.trainings, 'trainings'); multi('#wk-ctbox', MASTER.sertifikasi, v.certs, 'certs');
  $('#wk-title').textContent = w ? `Edit Pekerja · ${w.name}` : 'Tambah Pekerja';
  $('#wk-del').hidden = !(w && ROLE === 'admin');
  $('#wk-companies').innerHTML = [...new Set(workers.map(x => x.company).filter(Boolean))].map(c => `<option value="${esc(c)}">`).join('');
  wkRules(true); wkHint(); $('#dlg-wk').showModal();
}
/* aturan pelanggaran di form */
function wkRules(init) {
  const f = $('#wk-form'), el = k => f.elements.namedItem(k), orig = wkEdit || {};
  const terminated = orig.violation === 'P3', v = el('violation').value;
  // P3 tersimpan: data pelanggaran & status terkunci
  el('violation').disabled = terminated; el('status').disabled = terminated || v === 'P3';
  if (v === 'P3') el('status').value = 'P3';
  // pilihan status P3 hanya lewat pelanggaran P3
  [...el('status').options].forEach(o => o.disabled = o.value === 'P3' ? v !== 'P3' : v === 'P3');
  if (v !== 'P3' && el('status').value === 'P3') el('status').value = 'Aktif';
  // P2 baru: induction otomatis Belum (harus induction ulang)
  const newP2 = v === 'P2' && orig.violation !== 'P2';
  if (newP2) el('induction').value = 'Belum';
  el('induction').disabled = newP2;
  $('#wk-rule').innerHTML = terminated ? '⛔ <b>Terminasi (P3)</b> — pekerja ini sudah diberhentikan dari proyek. Status tidak dapat diubah menjadi Aktif.'
    : v === 'P3' ? '⛔ Pelanggaran <b>P3 = terminasi</b> dari proyek. Status bekerja menjadi P3 dan setelah disimpan tidak dapat diaktifkan kembali.'
    : newP2 ? '⚠ Pelanggaran <b>P2</b>: status induction kembali <b>Belum</b>. Pekerja wajib mengikuti induction ulang sebelum bekerja.'
    : v === 'P2' && orig.violationDate ? `Pelanggaran P2 tercatat ${fmtID(new Date(orig.violationDate))}: induction ulang harus bertanggal sama atau setelahnya.` : '';
  $('#wk-rule').hidden = !$('#wk-rule').innerHTML;
}
function wkHint() {
  const f = $('#wk-form'), el = k => f.elements.namedItem(k), d = el('ktp').value.replace(/\D/g, ''), out = [];
  if (d && d.length !== 16) out.push(`⚠ No KTP harus 16 digit (sekarang ${d.length}).`);
  else if (d && workers.some(w => w.ktp === d && w !== wkEdit)) out.push('⚠ No KTP ini sudah terdaftar.');
  if (el('violation').value === 'P3' && el('status').value === 'Aktif') out.push('Pelanggaran P3: status bekerja biasanya diubah menjadi P3.');
  if (el('status').value === 'Aktif' && el('induction').value === 'Belum') out.push('Pekerja aktif wajib mengikuti safety induction sebelum mulai bekerja.');
  $('#wk-hint').innerHTML = out.join('<br>'); $('#wk-hint').hidden = !out.length;
}
async function wkSave() {
  const f = $('#wk-form'), fd = new FormData(f), g = k => String(fd.get(k) || '').trim();
  const w = { ...(wkEdit || {}), name: g('name'), ktp: g('ktp').replace(/\D/g, ''), gender: g('gender'), category: g('category'), company: g('company'), inductionDate: g('inductionDate'),
    violation: f.elements.namedItem('violation').value, status: f.elements.namedItem('status').value, induction: f.elements.namedItem('induction').value, notes: g('notes'), trainings: fd.getAll('trainings'), certs: fd.getAll('certs') };
  const orig = wkEdit || {};
  if (orig.violation === 'P3') { w.violation = 'P3'; w.status = 'P3'; } // terminasi permanen
  if (w.violation === 'P3') w.status = 'P3';
  if (w.violation !== 'P3' && w.status === 'P3') w.status = 'Aktif';
  if (w.violation !== (orig.violation || '-')) w.violationDate = w.violation === '-' ? '' : CFG.today; else w.violationDate = orig.violationDate || '';
  if (w.violation === 'P2' && orig.violation !== 'P2') w.induction = 'Belum';
  if (w.violation === 'P2' && w.induction === 'Sudah' && (!w.inductionDate || (w.violationDate && w.inductionDate < w.violationDate))) {
    snack('P2: isi tanggal induction ulang (sama atau setelah tanggal pelanggaran)', true); return; }
  if (w.violation === 'P3' && orig.violation !== 'P3' && !confirm(`${w.name} akan diterminasi dari proyek (P3).\nStatus tidak dapat diaktifkan kembali. Lanjutkan?`)) return;
  if (!w.name) { snack('Nama wajib diisi', true); return; }
  if (w.ktp && w.ktp.length !== 16) { snack('No KTP harus 16 digit', true); return; }
  if (w.ktp && workers.some(x => x.ktp === w.ktp && x !== wkEdit)) { snack('No KTP sudah terdaftar', true); return; }
  let r; try { r = await save('saveWorker', { id: wkEdit?.id, row: wkToRow(w) }, wkEdit ? `${w.name} diperbarui` : `${w.name} ditambahkan`); } catch { return; }
  if (wkEdit) Object.assign(wkEdit, w); else workers.push({ ...w, id: String(r.id || ('L' + Date.now())) });
  $('#dlg-wk').close(); renderWorkers();
}
function wkInit() {
  fillSelect($('#wk-st'), WK_STATUS, '<option value="">Semua</option>'); fillSelect($('#wk-ind'), WK_INDUCTION, '<option value="">Semua</option>');
  $('#wk-v').innerHTML = '<option value="">Semua</option><option value="ada">Ada pelanggaran</option>' + WK_VIOLATION.slice(1).map(v => `<option>${v}</option>`).join('');
  ['#wk-st', '#wk-ind', '#wk-v', '#wk-tr'].forEach(s => $(s).onchange = renderWorkers); $('#wk-q').oninput = renderWorkers;
  const f = $('#wk-form');
  fillSelect(f.elements.namedItem('gender'), WK_GENDER); fillSelect(f.elements.namedItem('category'), WK_CATEGORY); fillSelect(f.elements.namedItem('induction'), WK_INDUCTION);
  fillSelect(f.elements.namedItem('violation'), WK_VIOLATION); fillSelect(f.elements.namedItem('status'), WK_STATUS);
  f.addEventListener('input', wkHint); f.addEventListener('change', wkHint);
  f.elements.namedItem('violation').addEventListener('change', () => { wkRules(); wkHint(); });
  $('#add-wk').onclick = () => openWorker(null);
  $('#wk-save').onclick = wkSave; $('#wk-cancel').onclick = () => $('#dlg-wk').close();
  $('#wk-del').onclick = async () => {
    const w = wkEdit; if (!w || !confirm(`Hapus ${w.name} dari daftar pekerja?`)) return;
    try { await save('deleteRow', { sheet: 'Worker', id: w.id }, `${w.name} dihapus`); } catch { return; }
    workers = workers.filter(x => x !== w); $('#dlg-wk').close(); renderWorkers();
  };
  // tab Manhour | Daftar Pekerja
  $('#mp-seg').querySelectorAll('button').forEach(b => b.onclick = () => wkTab(b.dataset.m));
}
function wkTab(m) {
  $('#mp-seg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x.dataset.m === m));
  $('#mp-mh').hidden = m !== 'mh'; $('#mp-wk').hidden = m !== 'wk';
  $('#v-manpower .page-head h2').textContent = m === 'mh' ? 'Daily Monitoring – Manhour' : 'Daftar Pekerja';
}
