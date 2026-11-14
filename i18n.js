/* =====================================================================
   Bahasa tampilan: Indonesia (default) / English.
   Pilihan disimpan per perangkat (localStorage 'hse-lang'), diubah di
   Master → Pengaturan → Bahasa. Teks aplikasi ditulis dalam bahasa
   Indonesia; saat English dipilih, teks di layar diterjemahkan otomatis
   lewat kamus di bawah (termasuk konten yang dirender ulang).
   Data yang diketik pengguna tidak diubah di Sheet.
   File ini dimuat paling awal; memakai global: LANG, LOCALE, t().
   ===================================================================== */
(function () {
  let lang = 'id';
  try { lang = localStorage.getItem('hse-lang') === 'en' ? 'en' : 'id'; } catch (e) { /* storage diblok */ }
  window.LANG = lang;
  window.LOCALE = lang === 'en' ? 'en-GB' : 'id-ID';
  document.documentElement.lang = lang;

  const D = new Map(), RX = [];
  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  function look(k, depth = 0) {
    const v = D.get(k);
    if (v !== undefined) return v;
    for (const [re, rep] of RX) if (re.test(k)) return k.replace(re, rep);
    if (depth > 3) return undefined;
    // awalan ikon / simbol (☀️ Cerah, ⚠ …, • …, + Tambah …)
    const m = k.match(/^([^\p{L}\p{N}"'(]+)(\S.*)$/u);
    if (m) { const x = look(m[2], depth + 1); if (x !== undefined) return m[1] + x; }
    // tanda baca di akhir (Frekuensi:, …)
    const e = k.match(/^(.*?[^\s:.…])([:.…]+)$/);
    if (e) { const x = look(e[1], depth + 1); if (x !== undefined) return x + e[2]; }
    // teks gabungan "A · B · C": terjemahkan per bagian
    if (k.includes(' · ')) {
      let hit = false;
      const parts = k.split(' · ').map(p => { const x = look(p, depth + 1); if (x !== undefined) { hit = true; return x; } return p; });
      if (hit) return parts.join(' · ');
    }
    return undefined;
  }
  /** Terjemahkan satu teks (dipakai juga dari kode: grafik, confirm, dll). */
  function t(s) {
    if (lang !== 'en' || s == null) return s;
    s = String(s);
    const k = norm(s);
    if (!k) return s;
    const v = look(k);
    if (v === undefined || v === k) return s;
    return s.match(/^\s*/)[0] + v + s.match(/\s*$/)[0];
  }
  window.t = t;
  window.I18N = {
    add(obj) { Object.keys(obj).forEach(k => D.set(norm(k), obj[k])); },
    rx(list) { RX.push(...list); },
    ok(list) { list.forEach(k => D.set('=' + norm(k), 1)); }, // sudah bahasa Inggris / nama: tidak perlu diterjemahkan
    setLang(l) { try { localStorage.setItem('hse-lang', l === 'en' ? 'en' : 'id'); } catch (e) { /* abaikan */ } location.reload(); },
    missing: null
  };
  if (lang !== 'en') return;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'NOSCRIPT', 'svg']);
  const ATTRS = ['placeholder', 'title', 'aria-label'];
  const keepOptVal = el => { if (el && el.tagName === 'OPTION' && !el.hasAttribute('value')) el.setAttribute('value', el.textContent); };
  function trText(n) {
    const p = n.parentNode;
    if (!p || SKIP.has(p.nodeName) || (p.closest && p.closest('[data-noi18n]'))) return;
    const v = n.nodeValue, x = t(v);
    if (x !== v) { keepOptVal(p); n.nodeValue = x; }
  }
  function trEl(el) {
    for (const a of ATTRS) if (el.hasAttribute(a)) { const v = el.getAttribute(a), x = t(v); if (x !== v) el.setAttribute(a, x); }
  }
  const filter = { acceptNode: n => n.nodeType === 1 && (SKIP.has(n.nodeName) || n.hasAttribute('data-noi18n')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT };
  function walk(root) {
    if (root.nodeType === 3) return trText(root);
    if (root.nodeType !== 1 || SKIP.has(root.nodeName) || (root.closest && root.closest('[data-noi18n]'))) return;
    trEl(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, filter);
    let n;
    while ((n = tw.nextNode())) n.nodeType === 3 ? trText(n) : trEl(n);
  }
  const nc = window.confirm.bind(window), na = window.alert.bind(window), np = window.prompt.bind(window);
  window.confirm = m => nc(t(m));
  window.alert = m => na(t(m));
  window.prompt = (m, d) => np(t(m), d);

  function start() {
    document.title = t(document.title);
    walk(document.body);
    new MutationObserver(ms => {
      for (const m of ms) {
        if (m.type === 'characterData') trText(m.target);
        else if (m.type === 'attributes') trEl(m.target);
        else m.addedNodes.forEach(walk);
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  // mulai setelah semua script (termasuk kamus i18n-en.js) selesai dimuat
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else setTimeout(start, 0);

  /* alat bantu pengembang: daftar teks di layar yang belum diterjemahkan */
  window.I18N.missing = function () {
    const out = new Set(), has = s => /[a-zA-Z]{3}/.test(s);
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, filter);
    let n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) {
        const k = norm(n.nodeValue);
        if (k && has(k) && n.parentNode && !n.parentNode.closest('[data-noi18n]') && look(k) === undefined && !D.has('=' + k)) out.add(k);
      } else for (const a of ATTRS) { const v = n.getAttribute(a); if (v && has(v) && look(norm(v)) === undefined) out.add(norm(v)); }
    }
    return [...out];
  };
})();
