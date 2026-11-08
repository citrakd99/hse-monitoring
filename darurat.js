/* =====================================================================
   ERT (Emergency Response Team) & PROSEDUR TANGGAP DARURAT
   Menu Incident → tab ERT / Prosedur Darurat.
   Bagan alir diambil dari 6 file "Flowchart Penanganan Kejadian" (PT CKD).
   File ini memakai fungsi global dari index.html ($, esc, save, workers, dll).
   ===================================================================== */

/* ---------- struktur ERT ---------- */
const ERT_ROLES = [
  { k: 'lead', t: 'Ketua ERT / Emergency Coordinator', d: 'Memimpin penanganan darurat, keputusan evakuasi & komunikasi ke manajemen/klien', c: '#b42318' },
  { k: 'vice', t: 'Wakil Ketua / Site Coordinator', d: 'Koordinasi lapangan, menggantikan Ketua ERT', c: '#c2410c' },
  { k: 'hse', t: 'Koordinator HSE', d: 'Pelaporan insiden 1×24 jam, investigasi awal, koordinasi instansi', c: '#0f7a57' },
  { k: 'fire', t: 'Tim Pemadam Kebakaran / Fire Fighter', d: 'Pemadaman awal dengan APAR / hydrant', c: '#e0731b', cert: 'Petugas Peran Kebakaran' },
  { k: 'aid', t: 'Tim P3K / First Aider', d: 'Pertolongan pertama, mencatat Log P3K, mendampingi rujukan', c: '#2f6fb7', cert: 'Petugas P3K' },
  { k: 'evac', t: 'Tim Evakuasi / Fire Warden', d: 'Mengarahkan evakuasi lewat jalur darurat ke titik kumpul', c: '#7a4fd1' },
  { k: 'count', t: 'Petugas Head Count (Titik Kumpul)', d: 'Menghitung personel di assembly point & melaporkan yang belum hadir', c: '#0e7490' },
  { k: 'sec', t: 'Tim Keamanan / Security', d: 'Mengamankan area / TKP, mengatur akses ambulans & damkar', c: '#475569' },
  { k: 'log', t: 'Tim Komunikasi & Logistik', d: 'Menghubungi kontak darurat, menyiapkan kendaraan & peralatan', c: '#a16207' },
];
const ERT_CONTACT_CAT = ['Medis', 'Pemadam', 'Kepolisian', 'Pemerintah / SAR', 'Utilitas', 'Proyek / Klien', 'Titik Kumpul'];
const ERT_DEFAULT_CONTACTS = [
  ['Medis', 'Ambulans / PSC', '119', 'Layanan gawat darurat nasional'],
  ['Medis', 'Rumah Sakit Rujukan', '', 'Isi nama, alamat & nomor RS rujukan proyek'],
  ['Medis', 'Klinik / Dokter Proyek', '', 'Isi klinik terdekat untuk cedera ringan'],
  ['Pemadam', 'Pemadam Kebakaran', '113', ''],
  ['Kepolisian', 'Polisi', '110', ''],
  ['Pemerintah / SAR', 'Basarnas', '115', 'Pencarian & pertolongan'],
  ['Pemerintah / SAR', 'BPBD setempat', '', 'Isi nomor BPBD kabupaten/kota'],
  ['Pemerintah / SAR', 'Disnaker / Pengawas K3', '', 'Lapor wajib untuk kecelakaan fatal'],
  ['Utilitas', 'PLN (gangguan listrik)', '123', ''],
  ['Proyek / Klien', 'Project Manager', '', ''],
  ['Proyek / Klien', 'EHS Cushman & Wakefield', '', ''],
  ['Titik Kumpul', 'Assembly Point utama', '', 'Isi lokasi titik kumpul, mis. lapangan depan Gate'],
];
let ert = [], ERT_SERVER = true; // {id, kind:'member'|'contact', role, name, workerId, phone, info}
const ertById = id => ert.find(x => String(x.id) === String(id));
function ertFromRow(r) { return { id: String(r.id), kind: r.kind || 'member', role: r.role || '', name: r.name || '', workerId: String(r.worker_id || ''), phone: String(r.phone || ''), info: r.info || '' }; }
const ertToRow = x => ({ kind: x.kind, role: x.role, name: x.name, worker_id: x.workerId || '', phone: x.phone, info: x.info });
const telHref = p => 'tel:' + String(p || '').replace(/[^\d+]/g, '');

function ertDemo(rnd) {
  ert = ERT_DEFAULT_CONTACTS.map((c, i) => ({ id: 'DC' + i, kind: 'contact', role: c[0], name: c[1], phone: c[2] || (c[0] === 'Titik Kumpul' ? '' : '021-' + (5550000 + i * 137)), info: c[3] || '', workerId: '' }));
  ert.find(x => x.name === 'Assembly Point utama').info = 'Lapangan parkir depan Gate Perimeter';
  const act = workers.filter(w => w.status === 'Aktif'), pick = n => act.splice(Math.floor(rnd() * act.length), 1)[0];
  const plan = { lead: 1, vice: 1, hse: 1, fire: 3, aid: 2, evac: 2, count: 1, sec: 1, log: 1 };
  Object.entries(plan).forEach(([r, n]) => { for (let i = 0; i < n && act.length; i++) { const w = pick(); ert.push({ id: `DM${r}${i}`, kind: 'member', role: r, name: w.name, workerId: w.id, phone: '0812-' + String(1000000 + Math.floor(rnd() * 8999999)).replace(/(\d{4})(\d+)/, '$1-$2'), info: i ? '' : 'Shift siang' }); } });
}

/* ---------- halaman ERT ---------- */
function renderErt() {
  const mem = ert.filter(x => x.kind === 'member'), con = ert.filter(x => x.kind === 'contact'), admin = ROLE === 'admin' && ERT_SERVER;
  const filled = ERT_ROLES.filter(r => mem.some(m => m.role === r.k)).length;
  const needCert = mem.filter(m => ERT_ROLES.find(r => r.k === m.role)?.cert), okCert = needCert.filter(m => wkById(m.workerId)?.certs.includes(ERT_ROLES.find(r => r.k === m.role).cert));
  const inactive = mem.filter(m => { const w = wkById(m.workerId); return w && w.status !== 'Aktif'; });
  $('#ert-kpi').innerHTML =
    `<div class="card kpi"><div class="lbl">Anggota ERT</div><div class="val">${mem.length}</div><div class="hint">${inactive.length ? `⚠ ${inactive.length} anggota tidak aktif lagi` : 'Semua anggota aktif'}</div></div>` +
    `<div class="card kpi ${filled < ERT_ROLES.length ? 'bad' : 'safe'}"><div class="lbl">Peran terisi</div><div class="val">${filled}/${ERT_ROLES.length}</div><div class="hint">${ERT_ROLES.filter(r => !mem.some(m => m.role === r.k)).map(r => r.t.split(' / ')[0]).join(', ') || 'Struktur lengkap'}</div></div>` +
    `<div class="card kpi ${okCert.length < needCert.length ? 'bad' : 'safe'}"><div class="lbl">Bersertifikat sesuai peran</div><div class="val">${okCert.length}/${needCert.length}</div><div class="hint">Fire fighter & first aider</div></div>` +
    `<div class="card kpi"><div class="lbl">Kontak darurat</div><div class="val">${con.filter(c => c.phone).length}</div><div class="hint">${con.filter(c => !c.phone && c.role !== 'Titik Kumpul').length} kontak belum diisi nomornya</div></div>`;
  $('#ert-org').innerHTML = ERT_ROLES.map(r => {
    const ms = mem.filter(m => m.role === r.k);
    return `<div class="ert-role" style="--c:${r.c}"><div class="ert-rh"><b>${r.t}</b><small>${r.d}${r.cert ? ` · wajib sertifikat <i>${r.cert}</i>` : ''}</small></div>
      ${ms.map(m => { const w = wkById(m.workerId), warn = [];
        if (r.cert && !(w && w.certs.includes(r.cert))) warn.push('belum bersertifikat ' + r.cert);
        if (w && w.status !== 'Aktif') warn.push('status pekerja ' + w.status);
        return `<div class="ert-m" data-id="${esc(m.id)}"><div><b>${esc(m.name)}</b>${w ? ` <small>${esc(w.position || w.category)}${w.company ? ' · ' + esc(w.company) : ''}</small>` : ''}${m.info ? `<small> · ${esc(m.info)}</small>` : ''}
          ${warn.length ? `<div class="ert-warn">⚠ ${warn.join(' · ')}</div>` : ''}</div>${m.phone ? `<a class="ert-tel" href="${telHref(m.phone)}">📞 ${esc(m.phone)}</a>` : ''}</div>`; }).join('') || '<div class="ert-empty">Belum ada anggota</div>'}
      ${admin ? `<button class="btn ert-add no-pdf" data-role="${r.k}">+ Anggota</button>` : ''}</div>`;
  }).join('');
  $('#ert-con').innerHTML = ERT_CONTACT_CAT.filter(c => con.some(x => x.role === c)).map(c => `<div class="ert-cg"><div class="wk-sl">${c}</div>${con.filter(x => x.role === c).map(x => `<div class="ert-c" data-id="${esc(x.id)}">
      <div><b>${esc(x.name)}</b>${x.info ? `<small>${esc(x.info)}</small>` : ''}</div>${x.phone ? `<a class="ert-tel big" href="${telHref(x.phone)}">📞 ${esc(x.phone)}</a>` : `<span class="ert-miss">${c === 'Titik Kumpul' ? '' : 'nomor belum diisi'}</span>`}</div>`).join('')}</div>`).join('');
  $('#ert-addc').hidden = !admin;
  $('#ert-note').textContent = !ERT_SERVER ? 'Apps Script belum diperbarui: data ERT belum bisa disimpan ke Google Sheet.' : admin ? 'Klik anggota / kontak untuk mengubah.' : 'Hanya admin yang dapat mengubah struktur ERT & kontak darurat.';
  $('#ert-org').querySelectorAll('.ert-add').forEach(b => b.onclick = () => openErt(null, 'member', b.dataset.role));
  if (admin) $('#v-incident').querySelectorAll('.ert-m,.ert-c').forEach(el => el.onclick = e => { if (!e.target.closest('a')) openErt(ertById(el.dataset.id)); });
}
let ertEdit = null;
function openErt(x, kind, role) {
  ertEdit = x || { id: '', kind, role: role || '', name: '', workerId: '', phone: '', info: '' };
  const f = $('#ert-form'), el = k => f.elements.namedItem(k), isM = ertEdit.kind === 'member';
  $('#ert-title').textContent = (x ? 'Edit ' : 'Tambah ') + (isM ? 'anggota ERT' : 'kontak darurat');
  el('role').innerHTML = isM ? ERT_ROLES.map(r => `<option value="${r.k}">${r.t}</option>`).join('') : ERT_CONTACT_CAT.map(c => `<option>${c}</option>`).join('');
  $('#ert-wk').hidden = !isM;
  el('worker').innerHTML = '<option value="">— bukan dari daftar pekerja —</option>' + workers.filter(w => w.status === 'Aktif' || w.id === ertEdit.workerId).sort((a, b) => a.name.localeCompare(b.name))
    .map(w => `<option value="${esc(w.id)}">${esc(w.name)} · ${esc(w.position || w.category)}${w.certs.length ? ' · ' + w.certs.length + ' sertifikat' : ''}</option>`).join('');
  el('role').value = ertEdit.role || (isM ? 'fire' : 'Medis'); el('worker').value = ertEdit.workerId || ''; el('name').value = ertEdit.name; el('phone').value = ertEdit.phone; el('info').value = ertEdit.info;
  $('#ert-lname').textContent = isM ? 'Nama anggota' : 'Nama instansi / kontak';
  $('#ert-linfo').textContent = isM ? 'Keterangan (shift, area)' : 'Alamat / keterangan';
  $('#ert-del').hidden = !x;
  $('#dlg-ert').showModal();
}
async function ertSave() {
  const f = $('#ert-form'), el = k => f.elements.namedItem(k), x = { ...ertEdit, role: el('role').value, workerId: el('worker').value, name: el('name').value.trim(), phone: el('phone').value.trim(), info: el('info').value.trim() };
  if (x.kind === 'member' && x.workerId && !x.name) x.name = wkById(x.workerId)?.name || '';
  if (!x.name) { snack('Nama wajib diisi', true); return; }
  let r; try { r = await save('saveErt', { id: x.id || undefined, row: ertToRow(x) }, `${x.name} tersimpan`); } catch { return; }
  if (x.id) Object.assign(ertById(x.id), x); else ert.push({ ...x, id: String(r.id || ('L' + Date.now())) });
  $('#dlg-ert').close(); renderErt(); renderProc();
}

/* ---------- prosedur tanggap darurat (bagan alir) ---------- */
// node: {s:'start'|'end'|'step'|'dec'|'split', t:judul, e:english, items:[[id,en]], cols:[[...nodes]], lbl:[label kolom], link:kode prosedur}
const PROCS = {
  fatal: { t: 'Kecelakaan Fatal', e: 'Fatality Incident', ic: '⚫', c: '#7f1d1d', cls: 'Fatality', call: ['Medis', 'Kepolisian', 'Pemerintah / SAR'],
    obj: ['Diagram alir untuk penanggulangan kejadian kecelakaan fatal yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to fatal accidents occurring in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Kecelakaan Fatal', e: 'Fatality Incident' },
      { s: 'step', t: 'Stop Work & Secure Area', items: [['Hentikan seluruh pekerjaan & sterilkan TKP', 'Stop all work & secure the crime scene']] },
      { s: 'step', t: 'Medical / LHO Assessment', items: [['Pemeriksaan dokter / tenaga medis berwenang', 'Medical examination by a qualified medical practitioner / authorized medical personnel'], ['Konfirmasi status kondisi fatal / meninggal dunia', 'Confirmation of fatality status / deceased condition']] },
      { s: 'split', lbl: ['Pelaporan (paralel)', 'Status korban'], cols: [
        [{ s: 'step', t: 'Regulatory & Police Notify', items: [['Lapor wajib resmi', 'Official mandatory report'], ['Kepolisian', 'Police investigation'], ['Disnaker / Otoritas K3 & Manajemen', 'Ministry of Manpower / OHS authority & management']] },
         { s: 'step', t: 'Investigation & RCA (ICAM)', items: [['Bentuk tim investigasi multidisiplin', 'Form a multidisciplinary investigation team'], ['Root Cause Analysis (ICAM / TAPROOT)', 'Root cause analysis'], ['Persetujuan CAP & Work Restart Approval', 'CAP approval & work restart approval']] }],
        [{ s: 'dec', t: 'Fatal?' }, { s: 'split', lbl: ['Ya', 'Tidak (major injury)'], cols: [
          [{ s: 'step', t: 'Secure Fatality Scene', items: [['Perlakukan TKP seperti tempat investigasi hukum; jangan ubah posisi korban / barang bukti', 'Treat the scene as a legal investigation site; do not alter the position of the victim or evidence']] }],
          [{ s: 'step', t: 'Diverted to LTI Workflow', items: [['Lost Time Injury & hospitalization', '']], link: 'lti' }]] }]] },
      { s: 'end' }] },
  lti: { t: 'Cidera Hilang Waktu Kerja (LTI)', e: 'Lost Time Injury Response', ic: '🔴', c: '#b42318', cls: 'LWC', call: ['Medis', 'Proyek / Klien'],
    obj: ['Diagram alir untuk penanganan kejadian cidera hilang waktu kerja yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to lost time injury in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Lost Time Injury' },
      { s: 'step', t: 'Segera Hentikan Pekerjaan', e: 'Stop Work Immediately', items: [['Hentikan pekerjaan & amankan lokasi', 'Stop work & secure the area']] },
      { s: 'split', lbl: ['Pelaporan', 'Tanggap darurat', 'Kecelakaan kerja'], cols: [
        [{ s: 'step', t: 'Pelaporan Insiden', e: 'Incident Notification', items: [['Lapor ke 1×24 jam: PM, EHS Mgr, Client EHS', 'Report within 1×24 hours: PM, EHS Mgr, Client EHS'], ['Consultant & Management Contractor', '']] },
         { s: 'step', t: 'Investigasi Insiden', e: 'Incident Investigation', items: [['Foto & amankan bukti TKP', 'Take photos & preserve scene evidence'], ['Wawancara saksi', 'Interview witnesses'], ['Analisa penyebab langsung', 'Analyze direct causes'], ['Analisis akar masalah (RCA)', 'Root cause analysis']] }],
        [{ s: 'step', t: 'Panggil Tim Tanggap Darurat', e: 'Activate Emergency Team', items: [['Hubungi EHS Officer / First Aider', 'Contact EHS officer / first aider'], ['Panggil tim medis / ambulans jika perlu', 'Call medical team / ambulance if necessary']] },
         { s: 'step', t: 'Pertolongan Pertama & Evakuasi', e: 'First Aid & Evacuation', items: [['Pertolongan pertama sesuai P3K', 'Provide first aid according to P3K standards'], ['Evakuasi korban dari bahaya', 'Evacuate the victim from danger']] },
         { s: 'dec', t: 'Pulih?', e: 'Recovered?' }, { s: 'note', t: 'Tidak → Rumah Sakit Rujukan (Designated Hospital)' }],
        [{ s: 'step', t: 'Penilaian Medis', e: 'Medical Assessment', items: [['Pemeriksaan dokter, diagnosis & kelayakan kerja', 'Medical examination, diagnosis, and fitness for work assessment']] },
         { s: 'dec', t: 'Pulih?', e: 'Recovered?' }, { s: 'note', t: 'Tidak → Rumah Sakit Rujukan (Designated Hospital)' }]] },
      { s: 'step', t: 'Tindakan Perbaikan & Pencegahan', e: 'Corrective Action', items: [['Perbaikan prosedur, JSA, peralatan & pengendalian risiko', 'Procedure revision, JSA, equipment & risk control']] },
      { s: 'step', t: 'Persetujuan Lanjut Kerja', e: 'Work Restart Approval', items: [['Pekerjaan dimulai kembali setelah risiko diverifikasi & disetujui', 'Work restarts after risks are verified & approved']] },
      { s: 'end' }] },
  aid: { t: 'Cidera Ringan / Pertolongan Pertama', e: 'Minor Injury / First Aid Response', ic: '🟡', c: '#a16207', cls: 'First Aid Case', call: ['Medis'],
    obj: ['Diagram alir untuk penanganan kejadian cidera ringan/pertolongan pertama yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to minor injury/first aid in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Cedera Ringan / Pertolongan Pertama', e: 'Minor Injury / First Aid' },
      { s: 'step', t: 'Pemeriksaan Cedera & Area Sekitar', e: 'Assess Injury & Area', items: [['Evaluasi cedera ringan & lokasi aman', 'Minor injury evaluation & safe location assessment']] },
      { s: 'step', t: 'Memberikan Pertolongan Pertama', e: 'Administer First Aid', items: [['Berikan P3K oleh First Aider / petugas', 'Administer first aid by a first aider'], ['Pengobatan lokal (pembalutan, pembersihan)', 'Local treatment (dressing, cleaning)']] },
      { s: 'split', lbl: ['Pencatatan', 'Hasil penanganan'], cols: [
        [{ s: 'step', t: 'Pencatatan Insiden P3K', e: 'Log First Aid Incident', items: [['Catat pada Buku / Log P3K', 'Record in the First Aid Logbook'], ['Nama korban, tanggal & jam kejadian', 'Name of injured person, date and time'], ['Jenis cedera & tindakan pengobatan', 'Type of injury & treatment provided']] },
         { s: 'step', t: 'Pencatatan & Analisis K3', e: 'EHS Recording & Trend', items: [['Rekapitulasi dalam laporan bulanan K3', 'Recapitulation in the EHS monthly report'], ['Analisis tren kecelakaan ringan', 'Minor injury trend analysis'], ['Briefing / safety toolbox talk', '']] }],
        [{ s: 'dec', t: 'Teratasi?', e: 'Resolved?' }, { s: 'split', lbl: ['Ya', 'Tidak'], cols: [
          [{ s: 'step', t: 'Pekerja Dapat Kembali Bekerja', e: 'Return to Work', items: [['Tanpa kehilangan waktu kerja', 'No lost time']] }],
          [{ s: 'step', t: 'Rujuk ke Klinik / Dokter Proyek', e: 'Escalate to Site Clinic', items: [['Jika membutuhkan penanganan medis lanjut', 'If further medical treatment is required']] },
           { s: 'step', t: 'Mengacu Prosedur ERP (LTI / Kasus Medis)', e: 'Refer to ERP (LTI / Medical)', link: 'lti' }]] }]] },
      { s: 'end' }] },
  nm: { t: 'Hampir Celaka', e: 'Near Miss Response', ic: '🟢', c: '#14a356', cls: 'Near Miss', call: [],
    obj: ['Diagram alir untuk penanganan kejadian hampir celaka yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to near miss in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Kejadian Hampir Celaka', e: 'Near Miss Incident' },
      { s: 'step', t: 'Stop & Amankan Lokasi', e: 'Stop & Secure the Area' },
      { s: 'step', t: 'Laporkan ke Pengawas / EHS', e: 'Report to Supervisor / EHS', items: [['Laporkan potensi bahaya ke pengawas / EHS', 'Report hazard potential to supervisor / EHS'], ['Isi kartu / formulir pelaporan near miss', 'Near miss report form / card']] },
      { s: 'split', lbl: ['Pencatatan (selalu)', 'Potensi bahaya tinggi? — Ya', 'Tidak'], cols: [
        [{ s: 'step', t: 'Pencatatan Laporan Nyaris Celaka', e: 'Log Near Miss Report', items: [['Catat dalam register near miss', 'Log in near miss register'], ['Tanggal, lokasi & deskripsi kejadian', 'Date, location & incident description'], ['Kategori potensi bahaya (unsafe act / condition)', 'Hazard category']] },
         { s: 'step', t: 'Analisis Statistik K3', e: 'EHS Statistical Analysis', items: [['Rekapitulasi laporan bulanan K3', 'Monthly EHS report summary'], ['Evaluasi rasio piramida kecelakaan', 'Accident pyramid ratio evaluation'], ['Pembahasan di Safety Committee Meeting', '']] }],
        [{ s: 'step', t: 'Analisis Akar Masalah & Tindakan Korektif', e: 'RCA & Corrective Action', items: [['Analisa akar masalah (5-Whys / RCA)', 'Root cause analysis'], ['Perbaiki sistem / peralatan / JSA', 'Correct the system / equipment / JSA']] }],
        [{ s: 'step', t: 'Tindakan Langsung', e: 'Direct Action / Local Fix', items: [['Tindakan perbaikan langsung di lokasi', 'Immediate on-site corrective action'], ['Housekeeping / perbaikan ringan', 'Housekeeping & minor repairs']] },
         { s: 'step', t: 'Briefing K3', e: 'Safety Toolbox Talk', items: [['Sosialisasi pembelajaran near miss kepada seluruh pekerja saat briefing pagi', 'Near miss lesson learned socialization']] }]] },
      { s: 'end' }] },
  fire: { t: 'Insiden Kebakaran', e: 'Fire Incident Response', ic: '🔥', c: '#e0731b', cls: '', call: ['Pemadam', 'Medis', 'Titik Kumpul'],
    obj: ['Diagram alir untuk penanganan kejadian insiden kebakaran yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to fire incidents in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Insiden Kebakaran', e: 'Fire Incident' },
      { s: 'step', t: 'Fire Alarm Announcement', items: [['Bunyikan alarm & umumkan keadaan darurat', 'Sound the alarm & announce emergency status']] },
      { s: 'split', lbl: ['Evakuasi', 'Pemadaman'], cols: [
        [{ s: 'step', t: 'Evakuasi', e: 'Evacuation', items: [['Evakuasi melalui jalur darurat ke titik kumpul (assembly point)', 'Evacuate via emergency route to the assembly point']] },
         { s: 'dec', t: 'Ada cedera?', e: 'Injury?' }, { s: 'split', lbl: ['Ya', 'Tidak'], cols: [
          [{ s: 'step', t: 'Pertolongan Pertama / Medis', e: 'First Aid / Medical', link: 'aid' }],
          [{ s: 'step', t: 'Tempat Berkumpul Aman', e: 'Assembly Point Safe', items: [['Semua personel aman terhitung', 'All personnel safely accounted for']] }]] }],
        [{ s: 'step', t: 'Pemadam Kebakaran', e: 'Fire Extinguishing', items: [['Upaya pemadaman awal oleh Tim Penyelamat Kebakaran menggunakan APAR / hydrant', 'Initial firefighting effort by the fire rescue team using portable extinguishers / hydrants']] },
         { s: 'dec', t: 'Api berhasil dikendalikan?', e: 'Fire contained?' }, { s: 'split', lbl: ['Ya', 'Tidak'], cols: [
          [{ s: 'step', t: 'Pernyataan Aman & Investigasi', e: 'All Clear & Investigation' }],
          [{ s: 'step', t: 'Hubungi Pemadam Kebakaran', e: 'Call Fire Brigade', items: [['Damkar 113', '']] }]] }]] },
      { s: 'end' }] },
  nat: { t: 'Bencana Alam', e: 'Natural Disaster Response', ic: '🌋', c: '#0e7490', cls: '', call: ['Pemerintah / SAR', 'Medis', 'Titik Kumpul'],
    obj: ['Diagram alir untuk penanganan kejadian bencana alam yang terjadi di area kerja untuk dapat melakukan tindakan penanganan yang baik dan benar.', 'Flowchart for responding to natural disasters in the work area to ensure proper and correct handling procedures.'],
    flow: [
      { s: 'start', t: 'Bencana Alam', e: 'Natural Disaster' },
      { s: 'step', t: 'Peringatan Dini (Gempa, Banjir, Huru-hara)', e: 'Early Warning & Sirens' },
      { s: 'step', t: 'Berlindung di Tempat Aman / Evakuasi', e: 'Shelter in Place / Evacuation', items: [['Berlindung / evakuasi', 'Drop, Cover, Hold On / Evacuate'], ['Berkumpul di titik aman', 'Safe muster point']] },
      { s: 'dec', t: 'Cedera / korban?', e: 'Injury / victim?' },
      { s: 'split', lbl: ['Ya', 'Tidak', 'Penilaian kerusakan'], cols: [
        [{ s: 'step', t: 'Pertolongan Pertama / SAR & Evakuasi', e: 'First Aid / SAR & Evacuation', items: [['Penanganan medis darurat & pencarian', 'Emergency medical treatment & search'], ['Hubungi Basarnas / RS rujukan', 'Contact Basarnas / designated hospital']] }],
        [{ s: 'step', t: 'Pemeriksaan Jumlah Personel & Area Dinyatakan Aman', e: 'Headcount & Site All Clear' }],
        [{ s: 'step', t: 'Pemeriksaan Fasilitas & Struktur', e: 'Facility & Structural Check', items: [['Inspeksi kelayakan struktur & instalasi', 'Structural & installation feasibility inspection'], ['Koordinasi dengan BPBD / kepolisian setempat', 'Coordinate with local BPBD / police']] }]] },
      { s: 'end' }] },
};
const PROC_ORDER = ['fatal', 'lti', 'aid', 'nm', 'fire', 'nat'];
let procCur = 'fire';
function procNodes(nodes) {
  return nodes.map(n => {
    if (n.s === 'start') return `<div class="fl-start">${esc(n.t)}${n.e ? `<i>${esc(n.e)}</i>` : ''}</div>`;
    if (n.s === 'end') return '<div class="fl-end">Selesai / End</div>';
    if (n.s === 'note') return `<div class="fl-note">${esc(n.t)}</div>`;
    if (n.s === 'dec') return `<div class="fl-dec"><span>${esc(n.t)}${n.e ? `<i>${esc(n.e)}</i>` : ''}</span></div>`;
    if (n.s === 'split') return `<div class="fl-split" style="grid-template-columns:repeat(${n.cols.length},minmax(0,1fr))">${n.cols.map((c, i) =>
      `<div class="fl-col"><div class="fl-lbl${/^(Ya|Tidak)/.test(n.lbl?.[i] || '') ? ' yn' : ''}">${esc(n.lbl?.[i] || '')}</div>${procNodes(c)}</div>`).join('')}</div>`;
    return `<div class="fl-step"><b>${esc(n.t)}</b>${n.e ? `<i class="fl-en">${esc(n.e)}</i>` : ''}${(n.items || []).map(([a, b]) => `<div class="fl-it">• ${esc(a)}${b ? `<span>${esc(b)}</span>` : ''}</div>`).join('')}
      ${n.link ? `<button class="fl-link no-pdf" data-proc="${n.link}">Buka prosedur ${esc(PROCS[n.link].t)} →</button>` : ''}</div>`;
  }).join('<div class="fl-arr"></div>');
}
function renderProc() {
  const P = PROCS[procCur];
  $('#proc-tabs').innerHTML = PROC_ORDER.map(k => `<button class="proc-b${k === procCur ? ' active' : ''}" data-k="${k}" style="--c:${PROCS[k].c}"><span>${PROCS[k].ic}</span>${esc(PROCS[k].t)}</button>`).join('');
  const calls = ert.filter(x => x.kind === 'contact' && P.call.includes(x.role) && x.phone);
  const ap = ert.find(x => x.kind === 'contact' && x.role === 'Titik Kumpul');
  const team = ERT_ROLES.filter(r => ({ fire: ['lead', 'fire', 'evac', 'count'], nat: ['lead', 'evac', 'count', 'aid'], aid: ['aid', 'hse'], lti: ['aid', 'hse', 'lead'], fatal: ['lead', 'hse', 'sec'], nm: ['hse'] })[procCur].includes(r.k))
    .map(r => ({ r, m: ert.filter(x => x.kind === 'member' && x.role === r.k) }));
  $('#proc-body').innerHTML = `<div class="proc-hd" style="--c:${P.c}"><div><h3>${P.ic} Penanganan ${esc(P.t)}</h3><i>${esc(P.e)}</i></div>
      ${P.cls ? `<button class="btn primary no-pdf" id="proc-report">+ Lapor ${esc(P.cls)}</button>` : ''}</div>
    <div class="proc-obj"><b>Objektif / <i>Objective</i></b><br>${esc(P.obj[0])}<br><i>${esc(P.obj[1])}</i></div>
    ${calls.length || ap ? `<div class="proc-call">${calls.map(c => `<a class="ert-tel big" href="${telHref(c.phone)}">📞 ${esc(c.name)} · ${esc(c.phone)}</a>`).join('')}${ap && P.call.includes('Titik Kumpul') ? `<span class="proc-ap">📍 Titik kumpul: <b>${esc(ap.info || ap.name)}</b></span>` : ''}</div>` : ''}
    <div class="proc-team">${team.map(({ r, m }) => `<span class="wk-chip" style="background:var(--surface-2)"><b style="color:${r.c}">${esc(r.t.split(' / ')[0])}</b>: ${m.length ? m.map(x => esc(x.name)).join(', ') : '<span style="color:var(--high)">belum ada</span>'}</span>`).join('')}</div>
    <div class="flow">${procNodes(P.flow)}</div>
    <p class="fx-note">Sumber: Flowchart Penanganan Kejadian ${esc(P.e)} – PT Citra Karsa Dinamika.</p>`;
  $('#proc-tabs').querySelectorAll('.proc-b').forEach(b => b.onclick = () => { procCur = b.dataset.k; renderProc(); });
  $('#proc-body').querySelectorAll('.fl-link').forEach(b => b.onclick = () => { procCur = b.dataset.proc; renderProc(); $('#proc-tabs').scrollIntoView({ block: 'start' }); });
  const rep = $('#proc-report'); if (rep) rep.onclick = () => { $('#add-inc').click(); $('#inc-form').elements.namedItem('cls').value = P.cls; };
}
function incTab(m) {
  $('#inc-seg').querySelectorAll('button').forEach(x => x.classList.toggle('active', x.dataset.m === m));
  ['log', 'ert', 'proc'].forEach(k => $('#inc-' + k).hidden = k !== m);
  $('#v-incident .page-head h2').textContent = { log: 'Incident Log', ert: 'Emergency Response Team (ERT)', proc: 'Prosedur Tanggap Darurat' }[m];
}
function ertInit() {
  $('#inc-seg').querySelectorAll('button').forEach(b => b.onclick = () => incTab(b.dataset.m));
  $('#ert-addc').onclick = () => openErt(null, 'contact');
  $('#ert-save').onclick = ertSave; $('#ert-cancel').onclick = () => $('#dlg-ert').close();
  $('#ert-form').elements.namedItem('worker').onchange = e => { const w = wkById(e.target.value); if (w) $('#ert-form').elements.namedItem('name').value = w.name; };
  $('#ert-del').onclick = async () => {
    const x = ertEdit; if (!x?.id || !confirm(`Hapus ${x.name}?`)) return;
    try { await save('deleteRow', { sheet: 'ERT', id: x.id }, `${x.name} dihapus`); } catch { return; }
    ert = ert.filter(y => y.id !== x.id); $('#dlg-ert').close(); renderErt(); renderProc();
  };
}
