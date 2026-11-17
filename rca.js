/* =====================================================================
   INVESTIGASI RCA – temuan observasi risiko MEDIUM & HIGH
   Alur: temuan MEDIUM/HIGH → investigasi (kronologi, penyebab langsung,
   5 Why, kategori akar masalah, akar masalah) → action plan (PIC, target,
   status) → verifikasi efektivitas. Temuan MEDIUM/HIGH baru boleh Closed
   bila RCA berstatus Selesai dan semua action plan Selesai.
   Data RCA disimpan sebagai JSON di kolom `rca` sheet Observation.
   File ini memakai fungsi global dari index.html ($, esc, CFG, save, dll).
   ===================================================================== */

const RCA_RISKS = ['MEDIUM', 'HIGH'];
const RCA_CATS = ['Manusia', 'Metode / Prosedur', 'Peralatan / Mesin', 'Material', 'Lingkungan', 'Manajemen / Pengawasan'];
const RCA_TYPES = ['Koreksi', 'Korektif', 'Preventif'];
const RCA_CTRL = ['Eliminasi', 'Substitusi', 'Rekayasa', 'Administratif', 'APD'];
const RCA_AST = ['Open', 'Proses', 'Selesai'];

// mode diatur admin di Master → Pengaturan Proyek: 'wajib' (pakai RCA) atau 'off' (alur tanpa RCA)
const rcaOn = () => CFG.rcaMode !== 'off';
const needsRca = o => rcaOn() && !!o && RCA_RISKS.includes(o.risk);
const rcaParse = s => {
  if (!s) return null;
  if (typeof s === 'object') return s;
  try { const x = JSON.parse(s); return x && typeof x === 'object' ? x : null; } catch (e) { return null; }
};

/* status RCA sebuah temuan; `at` = tanggal acuan untuk menghitung action plan lewat target */
function rcaInfo(o, at) {
  if (!needsRca(o)) return { st: 'none', acts: 0, done: 0, overdue: 0 };
  const r = o.rca, ref = at || CFG.today;
  if (!r) return { st: 'need', acts: 0, done: 0, overdue: 0 };
  const acts = r.actions || [], done = acts.filter(a => a.st === 'Selesai').length;
  const overdue = acts.filter(a => a.st !== 'Selesai' && a.due && a.due < ref).length;
  const st = r.status !== 'Selesai' ? 'draft' : done === acts.length ? 'done' : 'action';
  return { st, acts: acts.length, done, overdue };
}
function rcaBadge(o) {
  const i = rcaInfo(o);
  if (i.st === 'none') return '<span class="rca-none">–</span>';
  const ov = i.overdue ? ` <span class="rca-ov" title="Action plan lewat target">⚠ ${i.overdue}</span>` : '';
  const b = (cls, txt) => `<button type="button" class="rca-b ${cls}" data-rca="${esc(o.id)}">${txt}</button>`;
  if (i.st === 'need') return b('need', 'Perlu RCA');
  if (i.st === 'draft') return b('draft', 'RCA draft') + ov;
  if (i.st === 'action') return b('act', `Action ${i.done}/${i.acts}`) + ov;
  return b('done', 'RCA ✓');
}
/* pesan bila temuan belum boleh Closed ('' = boleh) */
function rcaCloseError(o) {
  if (!needsRca(o)) return '';
  const i = rcaInfo(o);
  if (i.st === 'need' || i.st === 'draft') return 'Temuan MEDIUM/HIGH: selesaikan investigasi RCA dulu (akar masalah & action plan) sebelum Closed';
  if (i.st === 'action') return `Temuan MEDIUM/HIGH: masih ada action plan RCA yang belum selesai (${i.done}/${i.acts})`;
  return '';
}

/* kotak info RCA di form observasi */
function rcaObsBox(o, risk) {
  const box = $('#ff-rca');
  if (!rcaOn() || !RCA_RISKS.includes(risk)) { box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  if (!o || !o.id) {
    box.innerHTML = '⚠ Temuan <b>MEDIUM/HIGH</b> wajib investigasi RCA (5 Why & action plan) sebelum bisa Closed. Simpan temuan dulu, lalu buka RCA dari kolom <b>RCA</b> di tabel.';
    return;
  }
  const i = rcaInfo({ ...o, risk });
  const txt = { need: 'Investigasi RCA belum dibuat.', draft: 'Investigasi RCA masih draft.', action: `RCA selesai, action plan ${i.done}/${i.acts} selesai.`, done: 'RCA & semua action plan selesai — temuan boleh Closed.' }[i.st];
  box.innerHTML = `<div class="rca-row"><span>${txt}${i.overdue ? ` <span class="rca-ov">⚠ ${i.overdue} lewat target</span>` : ''}</span><button type="button" class="btn" id="ff-rca-open">🔍 Buka investigasi RCA</button></div>`;
  $('#ff-rca-open').onclick = () => { $('#dlg').close('cancel'); openRca(o); };
}

/* ---------- form RCA ---------- */
let rcaObs = null, rcaDraft = null;
const rcaNewAction = () => ({ t: '', type: 'Korektif', ctrl: 'Administratif', pic: '', due: '', st: 'Open', done: '' });
function openRca(o) {
  rcaObs = o;
  const r = JSON.parse(JSON.stringify(o.rca || {}));
  rcaDraft = {
    status: r.status || 'Draft', date: r.date || CFG.today, team: r.team || SESSION?.user || '', desc: r.desc || '', direct: r.direct || o.finding || '',
    whys: r.whys && r.whys.length ? r.whys : ['', '', ''], cats: r.cats || [], root: r.root || '',
    actions: r.actions && r.actions.length ? r.actions : [rcaNewAction()], verify: r.verify || {}, by: r.by || '', at: r.at || ''
  };
  rcaRender();
  $('#dlg-rca').showModal();
}
function rcaRender() {
  const o = rcaObs, r = rcaDraft;
  const opt = (v, cur) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(v)}</option>`;
  const val = v => esc(v || '');
  $('#rca-title').textContent = `Investigasi RCA · ${o.risk}`;
  $('#rca-body').innerHTML = `
    <div class="ptw-sec rca-head"><span class="pill ${o.risk}">${o.risk}</span> <b>${esc(o.finding)}</b>
      <div class="rca-meta">${fmtID(new Date(o.date))} · ${esc(o.area)} · ${esc(o.observer)} · ${esc(o.type)} · ${esc(o.category)} · ${esc(o.status)}</div></div>
    <div class="ptw-sec"><div class="ptw-grid">
      <label>Tanggal investigasi<input type="date" data-k="date" value="${val(r.date)}"></label>
      <label>Status RCA<select data-k="status">${opt('Draft', r.status)}${opt('Selesai', r.status)}</select></label>
      <label class="full">Tim investigasi<input data-k="team" value="${val(r.team)}" placeholder="Nama & jabatan, pisahkan dengan koma"></label>
      <label class="full">Kronologi / uraian kejadian<textarea data-k="desc" rows="2">${val(r.desc)}</textarea></label>
      <label class="full">Penyebab langsung (unsafe act / unsafe condition)<textarea data-k="direct" rows="2">${val(r.direct)}</textarea></label>
    </div></div>
    <div class="ptw-sec"><h4>Analisis 5 Why <small>tanyakan "mengapa?" berulang sampai ditemukan akar masalah</small></h4>
      <div class="rca-whys">${r.whys.map((w, i) => `<div class="rca-why"><span>Why ${i + 1}</span><input data-why="${i}" value="${val(w)}" placeholder="Mengapa…?">${r.whys.length > 1 ? `<button type="button" class="rca-x" data-delwhy="${i}" aria-label="Hapus">×</button>` : ''}</div>`).join('')}</div>
      ${r.whys.length < 5 ? '<button type="button" class="pf-all" id="rca-addwhy">+ Why</button>' : ''}</div>
    <div class="ptw-sec"><h4>Kategori akar masalah <small>bisa pilih beberapa</small></h4>
      <div class="pf-opts">${RCA_CATS.map(c => `<label class="ck"><input type="checkbox" data-cat="${esc(c)}"${r.cats.includes(c) ? ' checked' : ''}> <span>${esc(c)}</span></label>`).join('')}</div>
      <div class="ptw-grid" style="margin-top:10px"><label class="full">Akar masalah (root cause)<textarea data-k="root" rows="2" placeholder="Kesimpulan dari analisis 5 Why">${val(r.root)}</textarea></label></div></div>
    <div class="ptw-sec"><h4>Action plan <small>tindakan untuk menghilangkan akar masalah · utamakan hierarki pengendalian tertinggi</small></h4>
      ${r.actions.map((a, i) => `<div class="rca-act" data-a="${i}"><div class="rca-act-h"><b>Action ${i + 1}</b>${r.actions.length > 1 ? `<button type="button" class="rca-x" data-delact="${i}" aria-label="Hapus">×</button>` : ''}</div>
        <div class="ptw-grid">
          <label class="full">Tindakan<textarea data-f="t" rows="2">${val(a.t)}</textarea></label>
          <label>Jenis<select data-f="type">${RCA_TYPES.map(x => opt(x, a.type)).join('')}</select></label>
          <label>Hierarki pengendalian<select data-f="ctrl">${RCA_CTRL.map(x => opt(x, a.ctrl)).join('')}</select></label>
          <label>PIC<input data-f="pic" value="${val(a.pic)}"></label>
          <label>Target selesai<input type="date" data-f="due" value="${val(a.due)}"></label>
          <label>Status<select data-f="st">${RCA_AST.map(x => opt(x, a.st)).join('')}</select></label>
          <label>Tanggal selesai aktual<input type="date" data-f="done" value="${val(a.done)}"></label>
        </div></div>`).join('')}
      <button type="button" class="pf-all" id="rca-addact">+ Action plan</button></div>
    <div class="ptw-sec"><h4>Verifikasi efektivitas <small>diisi setelah action plan selesai</small></h4><div class="ptw-grid">
      <label>Diverifikasi oleh<input data-k="verify.by" value="${val(r.verify.by)}"></label>
      <label>Tanggal verifikasi<input type="date" data-k="verify.date" value="${val(r.verify.date)}"></label>
      <label class="full">Hasil verifikasi<textarea data-k="verify.note" rows="2" placeholder="Apakah tindakan efektif mencegah kejadian berulang?">${val(r.verify.note)}</textarea></label>
    </div></div>
    ${r.by ? `<p class="fx-note">Terakhir disimpan: ${esc(r.by)}${r.at ? ' · ' + new Date(r.at).toLocaleString(LOCALE, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</p>` : ''}`;
  const body = $('#rca-body');
  const add = $('#rca-addwhy'); if (add) add.onclick = () => { rcaCollect(); rcaDraft.whys.push(''); rcaRender(); };
  $('#rca-addact').onclick = () => { rcaCollect(); rcaDraft.actions.push(rcaNewAction()); rcaRender(); };
  body.querySelectorAll('[data-delwhy]').forEach(b => b.onclick = () => { rcaCollect(); rcaDraft.whys.splice(+b.dataset.delwhy, 1); rcaRender(); });
  body.querySelectorAll('[data-delact]').forEach(b => b.onclick = () => { rcaCollect(); rcaDraft.actions.splice(+b.dataset.delact, 1); rcaRender(); });
  // action Selesai → tanggal selesai otomatis hari ini
  body.querySelectorAll('.rca-act select[data-f="st"]').forEach(s => s.onchange = () => {
    const d = s.closest('.rca-act').querySelector('[data-f="done"]'); if (s.value === 'Selesai' && !d.value) d.value = CFG.today;
  });
}
function rcaCollect() {
  const body = $('#rca-body'), r = rcaDraft;
  body.querySelectorAll('[data-k]').forEach(el => {
    const k = el.dataset.k;
    if (k.startsWith('verify.')) r.verify[k.slice(7)] = el.value; else r[k] = el.value;
  });
  r.whys = [...body.querySelectorAll('[data-why]')].map(i => i.value);
  r.cats = [...body.querySelectorAll('[data-cat]:checked')].map(i => i.dataset.cat);
  r.actions = [...body.querySelectorAll('.rca-act')].map(row => {
    const a = {}; row.querySelectorAll('[data-f]').forEach(el => a[el.dataset.f] = el.value); return a;
  });
}
async function rcaSave(andPrint) {
  rcaCollect();
  const o = rcaObs, r = JSON.parse(JSON.stringify(rcaDraft));
  r.whys = r.whys.map(s => s.trim()).filter(Boolean);
  r.actions = r.actions.filter(a => (a.t || '').trim() || (a.pic || '').trim() || a.due);
  r.actions.forEach(a => { if (a.st === 'Selesai' && !a.done) a.done = CFG.today; if (a.st !== 'Selesai') a.done = a.done || ''; });
  if (r.status === 'Selesai') {
    const miss = [];
    if (!r.whys.length) miss.push('minimal 1 Why');
    if (!r.root.trim()) miss.push('akar masalah');
    if (!r.actions.length) miss.push('minimal 1 action plan');
    else if (r.actions.some(a => !(a.t || '').trim() || !(a.pic || '').trim() || !a.due)) miss.push('tindakan, PIC & target tiap action plan');
    if (miss.length) { snack('Status RCA Selesai wajib: ' + miss.join(', '), true); return; }
  }
  r.v = 1; r.by = SESSION?.user || 'demo'; r.at = new Date().toISOString();
  const btns = ['#rca-save', '#rca-saveprint'].map(s => $(s)); btns.forEach(b => b.disabled = true);
  try { await save('saveRca', { id: o.id, rca: JSON.stringify(r) }, 'RCA tersimpan'); }
  catch (e) {
    if (/tidak dikenal/i.test(e.message || '')) snack('Apps Script belum diperbarui: RCA belum bisa disimpan ke Google Sheet. Admin perlu menempel Code.gs terbaru lalu Deploy → New version.', true);
    return;
  } finally { btns.forEach(b => b.disabled = false); }
  o.rca = r;
  $('#dlg-rca').close();
  renderObs(); renderDashboard();
  const i = rcaInfo(o);
  if (o.status === 'Open' && i.st === 'done') setTimeout(() => snack('RCA & semua action plan selesai: temuan sekarang boleh di-Closed'), 2600);
  if (andPrint) rcaPrint(o);
}

/* ---------- ringkasan untuk Leading Indicators ---------- */
function rcaSummary(list, end) {
  const need = list.filter(needsRca);
  let done = 0, overdue = 0;
  need.forEach(o => { const i = rcaInfo(o, end); if (i.st === 'done') done++; overdue += i.overdue; });
  return { need: need.length, done, overdue };
}

/* ---------- cetak laporan RCA (A4, 1 temuan) ---------- */
function rcaPage(o) {
  const r = o.rca || {}, v = r.verify || {}, e = s => esc(s || '') || '&nbsp;';
  const d = s => s ? fmtID(new Date(s)) : '';
  return `<div class="rp">
    <div class="rp-hd"><div><b>LAPORAN INVESTIGASI RCA</b><br><span>Root Cause Analysis · Temuan Observasi ${esc(o.risk)}</span></div>
      <div class="rp-pr">${esc(CFG.projectName)}<br>No: ${esc(o.id)}</div></div>
    <table class="rp-t"><tr><th>Tanggal temuan</th><td>${d(o.date)}</td><th>Risk</th><td><b>${esc(o.risk)}</b></td></tr>
      <tr><th>Area</th><td>${e(o.area)}</td><th>Observer</th><td>${e(o.observer)}</td></tr>
      <tr><th>Type / Category</th><td>${e(o.type)} / ${e(o.category)}</td><th>Status temuan</th><td>${e(o.status)}</td></tr>
      <tr><th>Finding</th><td colspan="3">${e(o.finding)}</td></tr>
      <tr><th>Tanggal investigasi</th><td>${d(r.date)}</td><th>Status RCA</th><td>${e(r.status)}</td></tr>
      <tr><th>Tim investigasi</th><td colspan="3">${e(r.team)}</td></tr></table>
    <div class="rp-s">1. Kronologi / uraian kejadian</div><div class="rp-b">${e(r.desc)}</div>
    <div class="rp-s">2. Penyebab langsung</div><div class="rp-b">${e(r.direct)}</div>
    <div class="rp-s">3. Analisis 5 Why</div>
    <table class="rp-t">${(r.whys && r.whys.length ? r.whys : ['']).map((w, i) => `<tr><th style="width:70px">Why ${i + 1}</th><td>${e(w)}</td></tr>`).join('')}</table>
    <div class="rp-s">4. Kategori & akar masalah</div>
    <div class="rp-b"><b>Kategori:</b> ${esc((r.cats || []).join(', ')) || '–'}<br><b>Akar masalah:</b> ${e(r.root)}</div>
    <div class="rp-s">5. Action plan</div>
    <table class="rp-t rp-a"><tr><th>No</th><th>Tindakan</th><th>Jenis</th><th>Hierarki</th><th>PIC</th><th>Target</th><th>Status</th><th>Selesai</th></tr>
      ${(r.actions || []).map((a, i) => `<tr><td>${i + 1}</td><td>${e(a.t)}</td><td>${e(a.type)}</td><td>${e(a.ctrl)}</td><td>${e(a.pic)}</td><td>${d(a.due)}</td><td>${e(a.st)}</td><td>${d(a.done)}</td></tr>`).join('') || '<tr><td colspan="8">–</td></tr>'}</table>
    <div class="rp-s">6. Verifikasi efektivitas</div>
    <div class="rp-b"><b>Oleh:</b> ${e(v.by)} &nbsp; <b>Tanggal:</b> ${d(v.date) || '–'}<br>${e(v.note)}</div>
    <table class="rp-sign"><tr><td>Dibuat oleh<br><small>HSE Officer</small></td><td>Diperiksa oleh<br><small>Supervisor / Site Manager</small></td><td>Disetujui oleh<br><small>Project Manager / Client EHS</small></td></tr>
      <tr><td></td><td></td><td></td></tr></table>
  </div>`;
}
async function rcaPrint(o) {
  if (!o || !o.rca) { snack('RCA belum dibuat', true); return; }
  $('#toast').textContent = 'Membuat PDF RCA…'; $('#toast').classList.add('show');
  const host = document.createElement('div'); host.className = 'pp-host'; document.body.appendChild(host);
  try {
    host.innerHTML = rcaPage(o);
    await new Promise(r => setTimeout(r, 30)); // beri waktu penerjemah tampilan (mode English)
    const { jsPDF } = window.jspdf, pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
    const PW = pdf.internal.pageSize.getWidth(), PH = pdf.internal.pageSize.getHeight();
    const c = await html2canvas(host.firstElementChild, { scale: 2, backgroundColor: '#ffffff', logging: false });
    const m = 24, w = PW - 2 * m, h = c.height * w / c.width, k = Math.min(1, (PH - 2 * m) / h);
    pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', m + (w - w * k) / 2, m, w * k, h * k);
    pdf.save(`RCA-${o.date}-${String(o.id).slice(-8)}.pdf`); rcaPrint.last = o.id;
  } catch (e) { snack('Gagal membuat PDF: ' + e.message, true); }
  finally { host.remove(); $('#toast').classList.remove('show'); $('#toast').textContent = 'Membuat PDF…'; }
}

/* ---------- data contoh (mode demo) ---------- */
function rcaDemo() {
  const add = (s, n) => fmt(addDays(s, n));
  observations.filter(needsRca).forEach((o, i) => {
    const base = {
      date: add(o.date, 1), team: 'HSE Officer, Supervisor area', desc: `Ditemukan saat patrol: ${o.finding.toLowerCase()} di ${o.area}.`, direct: o.finding,
      whys: ['Pekerja tidak mengikuti prosedur kerja aman', 'Belum memahami bahaya pekerjaan tersebut', 'Materi toolbox talk tidak membahas bahaya ini', 'Supervisor tidak melakukan briefing khusus'],
      cats: ['Manusia', 'Manajemen / Pengawasan'], root: 'Pengawasan & briefing bahaya spesifik pekerjaan belum dilakukan oleh supervisor.',
      verify: {}, by: 'HSE Officer', at: new Date().toISOString()
    };
    const acts = [
      { t: o.action || 'Hentikan pekerjaan & perbaiki kondisi di lokasi', type: 'Koreksi', ctrl: 'Rekayasa', pic: 'Supervisor area', due: add(o.date, 1) },
      { t: 'Toolbox talk khusus bahaya ini untuk semua pekerja area', type: 'Korektif', ctrl: 'Administratif', pic: 'HSE Officer', due: add(o.date, 3) },
      { t: 'Masukkan bahaya ini ke checklist inspeksi harian supervisor', type: 'Preventif', ctrl: 'Administratif', pic: 'Site Manager', due: add(o.date, 7) }
    ];
    if (o.status === 'Closed') {
      o.rca = { ...base, status: 'Selesai', actions: acts.map(a => ({ ...a, st: 'Selesai', done: a.due <= CFG.today ? a.due : CFG.today })),
        verify: { by: 'HSE Manager', date: o.actionDate || CFG.today, note: 'Tidak ditemukan kejadian berulang pada patrol berikutnya.' } };
    } else if (i % 3 === 0) {
      o.rca = { ...base, status: 'Selesai', actions: acts.map((a, j) => ({ ...a, st: j === 0 ? 'Selesai' : 'Proses', done: j === 0 ? a.due : '' })) };
    } else if (i % 3 === 1) {
      o.rca = { ...base, status: 'Draft', root: '', actions: [{ ...acts[0], st: 'Open', done: '' }] };
    } // sisanya: belum ada RCA
  });
}

/* ---------- inisialisasi (dipanggil sekali dari index.html) ---------- */
function rcaInit() {
  $('#rca-cancel').onclick = () => $('#dlg-rca').close();
  $('#rca-save').onclick = () => rcaSave(false);
  $('#rca-saveprint').onclick = () => rcaSave(true);
  $('#rca-print').onclick = () => { if (rcaObs && rcaObs.rca) rcaPrint(rcaObs); else snack('Simpan RCA dulu sebelum dicetak', true); };
}
