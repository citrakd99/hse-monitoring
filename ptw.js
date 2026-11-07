/* =====================================================================
   PERMIT TO WORK (PTW) – Batik Project
   Definisi 9 form sesuai "PTW Batik Project.pdf", register permit,
   form isian dan cetak PDF format asli (Legal, 1 halaman per permit).
   MVP: tanda tangan basah (dicetak lalu ditandatangani di lapangan).
   File ini memakai fungsi global dari index.html ($, esc, CFG, save, dll).
   ===================================================================== */

/* ---------- daftar item yang dipakai ulang ---------- */
const PTW_PRE_ID = 'TELAH DILAKUKAN PEMERIKSAAN PERSYARATAN DOKUMEN YANG DIPERLUKAN, KELENGKAPAN ALAT KERJA DAN /ALAT BANTU KERJA SESUAI IJIN KERJA, SUDAH DIPERIKSA DAN LENGKAPI SEBELUM PEKERJAAN DIMULAI';
const PTW_PRE_EN = 'THE REQUIRED DOCUMENTATION, AS WELL AS THE COMPLETENESS OF TOOLS AND/OR AUXILIARY EQUIPMENT, HAVE BEEN VERIFIED IN ACCORDANCE WITH THE WORK PERMIT; ALL NECESSARY CHECKS HAVE BEEN COMPLETED AND ANY MISSING ITEMS PROVIDED BEFORE THE COMMENCEMENT OF WORK';
const PTW_POST_ID = 'TELAH DILAKUKAN PEMERIKSAAN SETELAH PEKERJAAN SELESAI, DINYATAKAN AREA KERJA BERSIH, AMAN TIDAK ADA SUMBER API ATAU BAHAYA LAIN YANG DAPAT DI TIMBULKAN AKIBAT DARI PEKERJAAN TERSEBUT';
const PTW_POST_EN = 'AN INSPECTION HAS BEEN CONDUCTED FOLLOWING THE COMPLETION OF THE WORK; THE WORK AREA IS DECLARED CLEAN, SAFE, AND FREE FROM ANY SOURCES OF FIRE OR OTHER HAZARDS THAT COULD ARISE AS A RESULT OF THE WORK PERFORMED';
const PTW_SIGNERS = ['SPV / SM PT. Citra Karsa Dinamika', 'SPV / Eng Cushman & Wakefield', 'EHS Cushman & Wakefield', 'Area Owner'];
const PTW_STATUS = ['Draft', 'Diajukan', 'Aktif', 'Selesai', 'Batal'];
// Aktif & Selesai terkunci: isi permit tidak bisa diubah (Aktif hanya bisa ditutup Selesai / Batal)
const PTW_LOCKED = ['Aktif', 'Selesai'];
const ptwLocked = p => !!(p && p.id && PTW_LOCKED.includes((ptwById(p.id) || p).status));
const PTW_ST_CLS = { Draft: 'pt-draft', Diajukan: 'pt-sub', Aktif: 'pt-act', Selesai: 'pt-done', Batal: 'pt-cancel', Kadaluarsa: 'pt-exp' };

// item: [key, teks Indonesia, teks Inggris(optional)]
const PTW_TYPES = {
  GWP: {
    lamp: 1, title: 'GENERAL WORK PERMIT', titleId: 'IJIN KERJA UMUM', short: 'General Work Permit', color: '#2f6fb7', chkBg: '#dce9f6',
    info: { gwpNo: true, jsa: true, contractor: true, applied: true },
    split: true, // checklist kiri, APD kanan
    blocks: [
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Ijin Kerja, data pendukung lainnya sudah dilengkapi (MS, JSA, Denah Lokasi, line/drawing pekerjaan)', 'Work Permit and other supporting documentation have been completed (MS, JSA, site plan, work line/drawings)'],
        ['c2', 'Pekerja yang akan bekerja paham sesuai dengan tugas tanggung jawab dan sudah diberikan training', 'The employees who will be performing the work understand their duties and responsibilities, and have already received training'],
        ['c3', 'Semua Persyaratan Keselamatan dalam Ijin Kerja terkait, dilengkapi sesuai dengan ketentuan', 'All safety requirements in the relevant Work Permit have been fulfilled in accordance with the provisions'],
        ['c4', 'Penerangan ditempat kerja tersedia dan mencukupi', 'Workplace lighting is available and sufficient'],
        ['c5', 'Alat kerja / Hand tools sudah diperiksa dan dilabelling', 'Work tools / hand tools have been checked and labeled'],
        ['c6', 'APD yang diperlukan tersedia & digunakan sesuai dengan jenis Ijin Kerja', 'The required PPE is available and is being used in accordance with the type of Work Permit'],
        ['c7', 'Alat kerja yang akan dipakai sudah di periksa dan aman untuk digunakan', 'The work tools to be used have been checked and are safe to use'],
        ['c8', 'Area kerja sudah diperiksa dan diamankan dari bahaya yang mungkin terjadi', 'The work area has been inspected and secured against potential hazards'],
        ['c9', 'Akses pekerja dan akses emergency tersedia dan tidak terhalangi oleh material/ lainya', 'Worker access and emergency access are available and remain unobstructed by materials or other items'],
        ['c10', 'Pengawasan oleh Spv dilakukan selama pekerjaan berlangsung', 'Supervision by the supervisor is carried out throughout the duration of the work'],
        ['c11', 'Rambu/sign Keselamatan disekitar lingkungan kerja dipasang sesuai jenis kerja terlihat jelas', 'Safety signs are installed in the work environment, appropriate to the type of work, and are clearly visible'],
      ], other: true },
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 2, bg: '#fff9b0', items: [
        ['p1', 'Safety Helmet'], ['p2', 'Rubber booth'], ['p3', 'Safety Shoes'], ['p4', 'Safety Vest'], ['p5', 'Welding Glove'], ['p6', 'Face shield'],
        ['p7', 'Safety Glass'], ['p8', 'Cotton Glove'], ['p9', 'Welding mask'], ['p10', 'Rubber Glove'], ['p11', 'Ear Plug/ muff'], ['p12', 'Electric glove'],
        ['p13', 'Welding Apron'], ['p14', 'Fitter glove'], ['p15', 'Body Harness'], ['p16', 'Safety rubber booth'], ['p17', 'Masker/ Respirator'],
      ], other: true },
    ],
  },
  CS: {
    lamp: 2, title: 'CONFINED SPACE PERMIT', titleId: 'IJIN KERJA RUANG TERBATAS', short: 'Confined Space', color: '#7a4fd1', chkBg: '#fffbd0',
    blocks: [
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 2, side: true, note: true, items: [
        ['p1', 'Life Line'], ['p2', 'Masker/ Respirator'], ['p3', 'Wearpack'], ['p4', 'Breathing Apparatus/SCBA']] },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Tersedia Ventilasi, Pengukuran konsentrasi oxygen, Gas/ bahan beresiko berbahaya, clearing dan purging sudah dilakukan sebelum pekerjaan dimulai', 'Ventilation, oxygen concentration measurement, assessment of hazardous gases/substances, and clearing and purging procedures have been carried out before work begins'],
        ['c2', 'Seluruh aliran gas/bahan berbahaya yang terhubung ke ruangan terbatas sudah diputus/ditutup', 'All lines carrying gas or hazardous materials connected to the confined space have been disconnected or shut off'],
        ['c3', 'Alat Pemadam Api laik pakai dan pelindung Api (Fire blanket) tersedia', 'Functional fire extinguishers and fire blankets are available'],
        ['c4', 'Bahan/Limbah beracun/Gas mudah terbakar/ meledak telah disingkirkan ditempat yang aman', 'Toxic materials/waste and flammable/explosive gases have been removed to a safe location'],
        ['c5', 'Petugas yang memantau pekerjaan Ruang terbatas: {monitor}', 'Personnel monitoring work in a confined space'],
        ['c6', 'Blower dalam ruangan terbatas dapat berfungsi dengan baik selama pekerjaan berlangsung', 'A blower can function effectively within a confined space while work is underway'],
        ['c7', 'Alat pelindung Diri (APD) pengaman lainya sudah dipenuhi sesuai dengan jenis Pekerjaan', 'Other Personal Protective Equipment (PPE) has been provided in accordance with the type of work'],
        ['c8', 'Sarana akses/ tangga/ lantai kerja/ pengaman bekerja di ketinggian tersedia dan aman untuk digunakan', 'Means of access, stairs, working platforms, and fall protection for working at heights are available and safe to use'],
        ['c9', 'Penerangan kerja, lampu emergency tersedia', 'Work lighting, emergency lighting available'],
        ['c10', 'Pengukuran Oxygen/Gas beracun dilakukan pencatatan setiap 30 menit dan gas detector distandbykan', 'Oxygen/toxic gas levels are recorded every 30 minutes, and a gas detector is kept on standby'],
        ['c11', 'ERT team, Alat-alat emergency, mobil Emergency Akses tersedia dan aman', 'ERT team, emergency equipment, and emergency access vehicles are available and secure'],
        ['c12', 'Pekerjaan ini memerlukan SCBA (Self Contained Breathing Apparatus)', 'This task requires an SCBA (Self-Contained Breathing Apparatus)'],
        ['c13', 'Training &/ Briefing terhadap pekerja yang akan bekerja di ruang terbatas sudah dilakukan', 'Training and/or briefing for workers who will be working in confined spaces has been conducted'],
      ], other: 'Informasi lainnya yang diperlukan' },
      { k: 'fields', id: 'mon', hidden: true, items: [['monitor', 'Petugas pemantau (Ahli madya / K3 Umum) a/n']] },
      { k: 'gas' },
    ],
  },
  HW: {
    lamp: 3, title: 'HOT WORK PERMIT', titleId: 'IJIN KERJA PANAS', short: 'Hot Work', color: '#e0731b', chkBg: '#f9b26b',
    blocks: [
      { k: 'opts', id: 'fire', t: 'PROTEKSI API YANG DIGUNAKAN', e: 'FIRE PROTECTION EMPLOYED', cols: 1, side: true, items: [
        ['f1', 'Pemadam Api Portabel (APAR) tersedia / Portable fire extinguishers are available'], ['f2', 'Fire blanket'], ['f3', 'Fire Watcher standby: {fireWatcher}']], other: true },
      { k: 'fields', id: 'fw', hidden: true, items: [['fireWatcher', 'Nama Fire Watcher']] },
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 4, note: true, items: [
        ['p1', 'Kedok las / Welding mask'], ['p2', 'Face shield'], ['p3', 'Safety Glass'], ['p4', 'Hand / Cotton glove'], ['p5', 'Masker/ Respirator'],
        ['p6', 'Ear Plug/ Ear muff'], ['p7', 'Welding Apron'], ['p8', 'Fitter Glove'], ['p9', 'Welding glove']], other: 'APD lainya / Other PPE' },
      { k: 'checks', id: 'tool', t: 'ALAT KERJA YANG DIGUNAKAN', e: 'WORK TOOLS USED', bg: '#ffffff', items: [
        ['t1', 'Tabung gas bertekanan dilengkapi Flash back Arrestor, posisi berdiri dan terikat dengan benar', 'Pressurized gas cylinders must be equipped with a flashback arrestor, kept in an upright position, and properly secured'],
        ['t2', 'Busur pengelasan telah di-arde-kan secara benar', 'The welding arc has been properly grounded'],
        ['t3', 'Alat listrik, isolasi listrik dan alat bantu kerja listrik terpasang baik dan aman mengikuti standart Industri (contoh : Legran)', 'Electrical equipment, electrical insulation, and electrical work aids are properly and safely installed in accordance with industry standards'],
        ['t4', 'Pelindung alat yang berputar tersedia terpasang dengan baik dan Aman', 'Guards for rotating equipment are properly installed and secure'],
        ['t5', 'Alat Pelindung Diri sesuai jenis kerja panas tersedia dan dipakai', 'Personal protective equipment appropriate to the type of hot work is available and worn'],
        ['t6', 'Mesin/Peralatan existing disekitar tempat kerja telah diproteksi', 'Existing machinery/equipment in the vicinity of the work area has been protected'],
      ], other: true },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Apakah Metode Kerja (MS) sudah disetujui Oleh Owner (jika sudah cantumkan No MS): {msNo}', 'Has the Method Statement (MS) been approved by the Owner? (If yes, please provide the MS number.)'],
        ['c2', 'Bahan / kandungan mudah terbakar /meledak telah disingkirkan/ ditutup dengan fire blanket/ proteksi tahan api lainya', 'Flammable/explosive materials or substances have been removed or covered with a fire blanket or other fire-resistant protection'],
        ['c3', 'Alat Pemadam Api (APAR) dan alat pemadam lainya tersedia cukup dan siap digunakan', 'Fire extinguishers and other firefighting equipment are available in sufficient quantities and are ready for use'],
        ['c4', 'Alat pelindung Diri Pekerja dilengkapi dengan Laik dan benar', 'Workers are provided with appropriate and proper personal protective equipment'],
        ['c5', 'Pekerja yang melakukan pekerjaan memiliki keahlian dalam pekerjaan ini', 'The worker performing the task possesses expertise in this line of work'],
        ['c6', 'Selama pekerjaan berlangsung area kerja diperiksa secara periodik oleh pengawas memastikan agar TIDAK ADA resiko terjadi Kebakaran', 'Throughout the course of the work, the work area is periodically inspected by a supervisor to ensure that there is NO risk of fire'],
        ['c7', 'Dilakukan pemeriksaan 30 menit setelah pekerjaan selesai oleh EHS dan Spv kont untuk memastikan tidak sisa pekerjaan yang dapat menimbulkan api/Kebakaran', 'An inspection is conducted 30 minutes after work is completed, by EHS and the contractor supervisor, to ensure that no remnants of the work remain that could potentially cause a fire'],
        ['c8', 'Apakah pekerjaan ini terkait dengan Ijin Kerja lainya (Jika ya sebutkan dan lengkapi Ijin Kerja)', 'Is this work related to any other Work Permits? (If yes, please specify and complete the relevant Work Permit(s))'],
      ], other: 'Ijin Kerja Lainya / Other Work Permits' },
      { k: 'fields', id: 'ms', hidden: true, items: [['msNo', 'No Method Statement (MS)']] },
    ],
  },
  EL: {
    lamp: 4, title: 'ELECTRICAL PERMIT', titleId: 'IJIN KERJA LISTRIK', short: 'Electrical', color: '#c9a400', chkBg: '#fff36b',
    blocks: [
      { k: 'opts', id: 'tool', t: 'ALAT KERJA YANG DIGUNAKAN', e: 'WORK TOOLS USED', cols: 2, side: true, items: [
        ['t1', 'Tang Ampere'], ['t2', 'Solder'], ['t3', 'Obeng Plus / Minus'], ['t4', 'Cutter'], ['t5', 'Tang Kupas Kabel'], ['t6', 'Tang Skun'], ['t7', 'Multi Tester'], ['t8', 'Tang Potong / Jepit']], other: true },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Semua alat listrik yang akan digunakan / dipasang diperiksa dan dalam kondisi baik', 'All electrical equipment to be used/installed has been inspected and is in good condition'],
        ['c2', 'Alat listrik / Instrument yang digunakan sesuai dengan arus/ voltase listrik', 'Electrical equipment/instruments used must be appropriate for the electrical current/voltage'],
        ['c3', 'Pekerja listrik adalah orang ahli dan berpengalaman dan tersertifikasi keahlian', 'An electrical worker is a skilled, experienced, and professionally certified individual'],
        ['c4', 'Semua line kabel listrik terpasang dengan benar dan nilai netral ground memenuhi standart', 'All electrical wiring lines are correctly installed, and the neutral-to-ground value meets the standard'],
        ['c5', 'APD pekerja yang berhubung dengan bahaya listrik disediakan dan digunakan dengan benar', "Workers' PPE related to electrical hazards is provided and used correctly"],
        ['c6', 'Alat Pemadam Api, Pembatas area, warning sign dan LOTO sistem disediakan dan difungsikan', 'Fire extinguishers, area barriers, warning signs, and LOTO systems are provided and put into use'],
        ['c7', 'Pekerjaan dilakukan sesuai dengan ketentuan instruksi kerja elektrik mengacu ke PUIL TH 2021', 'The work is carried out in accordance with the provisions of the electrical work instructions, with reference to PUIL 2021'],
        ['c8', 'Jenis Pekerjaan Listrik: {voltage}. APD pekerja wajib mengacu ke standart PUIL tersebut', 'Type of Electrical Work (High ≥ 10,000 V; Medium up to 10,000 V; Low up to 400 V). PPE must comply with the PUIL standards'],
        ['c9', 'Pengawasan dilakukan selama pekerjaan berlangsung s/d selesai', 'Supervision is carried out throughout the duration of the work, until its completion'],
        ['c10', 'Ijin lainnya yang diperlukan owner dan koordinasi dengan pengawas dari Pihak Owner sudah dilakukan', "Other permits required by the owner, as well as coordination with the owner's supervisors, have been completed"],
        ['c11', 'Pengawasan secara periodik selama pekerjaan berlangsung', 'Periodic supervision throughout the course of the work'],
      ], other: 'Informasi lain yang diperlukan' },
      { k: 'radio', id: 'voltage', t: 'Jenis pekerjaan listrik', items: [['High Voltage ≥ 10000 volt'], ['Medium Voltage s/d 10000 Volt'], ['Low Voltage s/d 400 volt']], hidden: true },
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 4, note: true, items: [
        ['p1', 'Safety Glasses'], ['p2', 'Masker/ Respirator'], ['p3', 'Electric Hand Glove'], ['p4', 'Ear Plug/ Ear Muff'], ['p5', 'Rubber Safety Shoes'], ['p6', 'Hand Glove']], other: true },
    ],
  },
  WAH: {
    lamp: 5, title: 'WORKING AT HEIGHT PERMIT', titleId: 'IJIN KERJA DI KETINGGIAN', short: 'Working at Height', color: '#0f7a57', chkBg: '#fff36b',
    blocks: [
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 2, side: true, note: true, items: [
        ['p1', 'Life line'], ['p2', 'Masker/ Respirator'], ['p3', 'Body Harness 2 hook'], ['p4', 'Fall arrestor']], other: true },
      { k: 'opts', id: 'job', t: 'JENIS PEKERJAAN', e: 'TYPE OF WORK', cols: 3, items: [
        ['j1', 'Struktur/ Baja'], ['j2', 'Scaffolding'], ['j3', 'Sipil / CSA'], ['j4', 'MEP'], ['j5', 'E / I'], ['j6', 'Hot Work (WP No: {hotWp})'], ['j7', 'Las / Welding'], ['j8', 'Cutting/ Grinding'], ['j9', 'Gas Cutting']] },
      { k: 'fields', id: 'hw', hidden: true, items: [['hotWp', 'No WP Hot Work (bila ada)']] },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Area dibawah lokasi kerja ketinggian radius aman dibarikade dan ditandai "Awas benda jatuh ada pekerjaan di atas"', 'The area below an elevated work site must be cordoned off as a safe radius and marked with a sign: "Caution: Falling objects – work in progress overhead."'],
        ['c2', 'PPE yang diperlukan tersedia & digunakan (helm pengaman, sepatu pengaman, full body harness 2 (Dua) tali pengaman)', 'Required PPE is available and in use (safety helmet, safety shoes, full-body harness with two safety lanyards)'],
        ['c3', 'Alat pengaman benda jatuh tersedia (jaring/safety net/Asago) bila terdapat aktifitas lain dibawahnya', 'Protective equipment against falling objects (safety nets/Asago) is provided if there is other activity taking place underneath'],
        ['c4', 'Lantai /struktur kekuatan dan leveling lokasi akan dibangun scaffolding rata, padat kuat untuk menahan scaffolding dan beban', 'The floor/structural strength and leveling of the site must be sufficient to support the scaffolding and its load'],
        ['c5', 'Menggunakan lantai kerja: {platform} (scaffolding wajib di periksa oleh Scaffolding Inspector/EHS)', 'Using a work platform: Ladder / Scaffolding (must be inspected by a Scaffolding Inspector/EHS)'],
        ['c6', 'Akses, lantai kerja, tangga dan pagar pengaman tersedia diperiksa dan aman untuk digunakan', 'Access, working platforms, stairs, and guardrails are available, inspected, and safe for use'],
        ['c7', 'Bila menggunakan perancah, perancah tsb telah diperiksa (dipasang tag hijau) & memiliki kondisi yang aman', 'When scaffolding is used, it must have been inspected (marked with a green tag) and be in a safe condition'],
        ['c8', 'Peralatan kerja telah disimpan ditempatnya yang benar tanpa adanya resiko jatuh dan aman pada saat bekerja di ketinggian', 'Work equipment has been stored in its proper place, ensuring it is secure and poses no risk of falling while work is being performed at heights'],
        ['c9', 'Tersedia pulley / katrol untuk mengirim alat kerja / material naik-turun beserta kantong alat yang aman', 'Pulleys are available for hoisting tools or materials up and down, along with secure tool bags'],
        ['c10', 'Apakah pekerja yang akan bekerja di ketinggian sehat, tidak takut ketinggian dan tidak memiliki riwayat /darah tinggi', 'Are the workers who will be working at heights in good health, free from a fear of heights, and without a history of high blood pressure'],
        ['c11', 'Dilakukan Pengawasan secara periodik oleh SPV / pengawas dan EHS selama kerja pada ketinggian', 'Periodic supervision is conducted by the supervisor (SPV) and EHS personnel during work at heights'],
      ], other: true },
      { k: 'radio', id: 'platform', t: 'Lantai kerja', items: [['Tangga / Ladder'], ['Scaffolding'], ['Tangga & Scaffolding']], hidden: true },
      { k: 'opts', id: 'tool', t: 'ALAT KERJA DAN ALAT BANTU KERJA YANG DIGUNAKAN (Sebutkan sesuai pekerjaan)', e: 'WORK TOOLS AND AUXILIARY WORK TOOLS USED', cols: 4, note: 'tool', items: [
        ['t1', 'Alat kerja pengelasan'], ['t2', 'Alat kerja Mesin/ MEP'], ['t3', 'Alat kerja Erection'], ['t4', 'Alat kerja listrik & LOTOTO'], ['t5', 'Alat kerja Gerinda'], ['t6', 'Alat kerja Pengecatan'],
        ['t7', 'Alat Kerja Scaffolding'], ['t8', 'Alat kerja Survey'], ['t9', 'Alat kerja CSA'], ['t10', 'Alat kerja Gas/ Cutting'], ['t11', 'Tali Tambang'], ['t12', 'Tas alat kerja']], other: true },
    ],
  },
  EX: {
    lamp: 6, title: 'EXCAVATION PERMIT', titleId: 'IJIN KERJA PENGGALIAN', short: 'Excavation', color: '#8a5a2b', chkBg: '#dff3fb',
    blocks: [
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 2, side: true, note: true, items: [
        ['p1', 'Safety Rubber booth'], ['p2', 'Hand Glove'], ['p3', 'Masker/ Respirator']], other: true },
      { k: 'opts', id: 'job', t: 'JENIS PEKERJAAN', e: 'TYPE OF WORK', cols: 3, items: [
        ['j1', 'Penggalian dengan Manual / Manual Excavation'], ['j2', 'Pemancangan / Piling'], ['j3', 'Penggalian menggunakan Excavator']], other: true },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Area yang akan digali sudah diperiksa kekuatan struktur tanah, ditandai, dibaricade (Rambu / sign Galian)', 'The area to be excavated has been assessed for soil structural integrity, marked, and cordoned off (with excavation warning signs)'],
        ['c2', 'Alat/ Peralatan untuk penggalian sudah diperiksa dan orang yang bekerja adalah orang Ahli', 'The tools/equipment for excavation have been checked and the people working are experts'],
        ['c3', 'PPE yang diperlukan tersedia & digunakan laik digunakan', 'The required PPE is available, in good condition, and being used'],
        ['c4', 'Lokasi / disekitar lokasi yang akan digali sudah dikoordinasikan dengan pihak owner, diperiksa apakah didalam tanah ada kabel atau line pipa gas, minyak, air, bila ada, apakah aman untuk dilakukan penggalian', 'The location and surrounding area has been coordinated with the owner and checked for underground cables or pipelines (gas, oil, water), and whether it is safe to proceed'],
        ['c5', 'Apakah area Penggalian dan sekitarnya perlu dilakukan LOTOTO ? wajib menerapkan Ijin Kerja Isolasi', 'Is it necessary to perform LOTOTO in the excavation area and its surroundings? It is mandatory to implement an Isolation Work Permit'],
        ['c6', 'Penggalian minimal kedalaman dua (2) M dikatagorikan sebagai pekerjaan diruang terbatas wajib menerapkan ijin Kerja ruang terbatas', 'Excavation to a minimum depth of two (2) meters is categorized as work in a confined space, for which a confined space work permit must be obtained'],
        ['c7', 'Kemiringan galian / Alat penopang tanah agar tidak longsor tersedia dengan laik', 'Excavation slope / Soil support tools to prevent landslides are available properly'],
        ['c8', 'Penggalian menggunakan Excavator Wajib melampirkan checklist inspeksi alat, SILO, SIO Operator pada ijin kerja penggalian', 'For excavation using an excavator, the equipment inspection checklist, SILO, and operator SIO must be attached'],
        ['c9', 'Pemancangan menggunakan Mesin Pancang Wajib melampirkan checklist inspeksi alat, SILO, SIO Operator pada ijin kerja penggalian', 'For piling work, the equipment inspection checklist, SILO, and operator SIO must be attached'],
        ['c10', 'Tangga / jalan untuk galian disediakan dan diperiksa', 'Ladders/paths for excavation are provided and checked'],
        ['c11', 'Pekerjaan penggalian manual dilakukan minimal oleh 2 orang', 'Manual excavation work must be carried out by at least 2 people'],
        ['c12', 'Pengawasan dilakukan selama pekerjaan berlangsung', 'Supervision is carried out while the work is in progress'],
      ], other: true },
      { k: 'opts', id: 'tool', t: 'ALAT KERJA PENGGALIAN YANG DIGUNAKAN', e: 'EXCAVATION WORK TOOLS USED', cols: 4, note: 'tool', items: [
        ['t1', 'Pengki/ Ember'], ['t2', 'Gancu'], ['t3', 'Cangkul'], ['t4', 'Sekop'], ['t5', 'Dodos'], ['t6', 'Meteran'], ['t7', 'Linggis']], other: true },
    ],
  },
  ISO: {
    lamp: 7, title: 'ISOLATION WORK PERMIT', titleId: 'IJIN KERJA ISOLASI', short: 'Isolation / LOTOTO', color: '#b42318', chkBg: '#fff36b',
    blocks: [
      { k: 'opts', id: 'job', t: 'JENIS PEKERJAAN', e: 'TYPE OF WORK', cols: 2, items: [['j1', 'LOTOTO Mechanical'], ['j2', 'LOTOTO Electric']] },
      { k: 'opts', id: 'loto', t: 'LOTOTO DAN ALAT BANTU KESELAMATAN YANG DIGUNAKAN', e: 'LOTO AND THE SAFETY AIDS USED', cols: 4, items: [
        ['l1', 'Tagging LOTOTO'], ['l2', 'Gate / ball valve Lock out'], ['l3', 'Valve handle panel cover'], ['l4', 'Circuit breaker Lock out'], ['l5', 'Butterfly valve Lock out'],
        ['l6', 'Wall switch'], ['l7', 'Circuit breaker lock multi pole'], ['l8', 'Fuse lock Out'], ['l9', 'Plug Lock Out'], ['l10', 'Electrical Lock out'], ['l11', 'Haps'],
        ['l12', 'Safety sign, line/ cone'], ['l13', 'APAR'], ['l14', 'Handy talky']], other: true },
      { k: 'fields', id: 'lotoinfo', items: [
        ['lotoDevice', 'Alat / Perangkat apa yang akan di LOTOTO', 'What equipment/devices will be subject to LOTOTO'],
        ['lotoDuration', 'Berapa lama LOTOTO akan Dilakukan', 'How long will LOTOTO be carried out'],
        ['lotoPic', 'Siapa PIC / Pemegang Kunci LOTOTO', 'Who is the PIC / Key Holder for LOTOTO']] },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Semua pekerjaan isolasi Electric / mechanical yang akan dipasang LOTO diperiksa dan terkoordinasikan dengan pihak Owner terkait', 'All electrical/mechanical isolation tasks requiring LOTO shall be inspected and coordinated with the relevant Owner representative'],
        ['c2', 'Ijin Kerja Isolasi, Ijin Kerja lainnya juga persyaratannya sudah dipenuhi dibuat serta sudah disetujui pihak Owner', 'The Isolation Work Permit along with other required work permits has been prepared and approved by the Owner'],
        ['c3', 'Penanggung Jawab LOTO sudah ditunjuk, paham dengan pekerjaan Isolasi dan stand by dilokasi kerja', 'A person in charge of LOTO has been designated; they understand the isolation procedures and remain on standby at the work site'],
        ['c4', 'APD pekerja yang berhubung dengan bahaya Kerja LOTO disediakan dan digunakan dengan benar', "Workers' PPE related to LOTO Work hazards is provided and used correctly"],
        ['c5', 'Alat Pemadam Api, fire blanket (aktifitas kerja panas) Pembatas area, warning sign dan Taging Log sistem disediakan', 'Fire extinguishers, fire blankets (for hot work activities), area barriers, warning signs, and a tagging/log system are provided'],
        ['c6', 'Pekerjaan dilakukan sesuai dengan ketentuan Instruksi Kerja Isolasi', 'The work is carried out in accordance with the provisions of the Isolation Work Instruction'],
        ['c7', 'Pengawasan dilakukan selama pekerjaan berlangsung', 'Supervision is carried out during the work in progress'],
        ['c8', 'Lakukan pemeriksaan ulang setelah pekerjaan Isolasi selesai sebelum di gunakan', 'Perform a re-inspection once the isolation work is complete, before it is put into use'],
        ['c9', 'Lampirkan Line, Gambar dan P & ID (Piping & Instrument Diagram)', 'Attach the line list, drawings, and P&ID (Piping & Instrument Diagram)'],
        ['c10', 'Alat kerja wajib mengikuti Ijin kerja yang terkait dalam pekerjaan LOTO', 'Work tools must comply with the work permits associated with LOTO tasks'],
      ], other: true },
    ],
  },
  LFT: {
    lamp: 8, title: 'LIFTING WORK PERMIT', titleId: 'IJIN KERJA ANGKAT-ANGKUT', short: 'Lifting', color: '#1d4ed8', chkBg: '#fffbc8',
    blocks: [
      { k: 'opts', id: 'aids', t: 'ALAT BANTU ANGKAT - ANGKUT', e: 'LIFTING AIDS - LIFTING EQUIPMENT', cols: 2, side: true, items: [
        ['a1', 'Lifting Clamp'], ['a2', 'Spreader Bar lifting'], ['a3', 'Lifting Lugs'], ['a4', 'Spreader beam lifting'], ['a5', 'Round sling'], ['a6', 'Sling / belt protection'],
        ['a7', 'Turn buckle'], ['a8', 'Wire Rope'], ['a9', 'Shackle D / B / O'], ['a10', 'Pad eye Bolt'], ['a11', 'Wire Sling'], ['a12', 'Lever Block'], ['a13', 'Webbing sling'],
        ['a14', 'Pipa Roll'], ['a15', 'Tagline'], ['a16', 'Hand pallet'], ['a17', 'Chain Block'], ['a18', 'Obstacle/ ganjalan'], ['a19', 'Wire Chain']], other: true },
      { k: 'docs', id: 'doc', t: 'LAMPIRAN DATA', e: 'DATA APPENDIX', items: [
        ['d1', 'P/c Checklist hasil Inspeksi'], ['d2', 'P/c SIA/ SILO'], ['d3', 'P/c SIO Operator'], ['d4', 'P/c Sertifikat Rigger'], ['d5', 'Data Rigging Plan & Lifting plan'], ['d6', 'Sertificate lifting Gears']], other: 'Data lainya' },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN KERJA', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Alat sudah dilakukan pemeriksaan, SIA/ SILO, SIO, Sertifikat Rigger dilampirkan', 'The equipment has been inspected; the SIA/SILO, SIO, and Rigger Certificate are attached'],
        ['c2', 'Berat Beban / material yang akan diangkat - angkut sudah diketahui, dibuat dalam rigging - lifting plan termasuk lokasi penempatanya', 'The weight of the load/material is known and incorporated into a rigging and lifting plan, including its placement location'],
        ['c3', 'Akses /Lokasi Alat akan melakukan Angkat - Angkut, struktur tanah/lantai padat dan rata', 'Access/Location for lifting and transport equipment: the ground/floor structure must be solid and level'],
        ['c4', 'Titik berat beban dan load center pengangkatan sudah didapat', 'The center of gravity of the load and the lifting load center have been determined'],
        ['c5', 'Radius area kerja angkat - angkut aman dari kemungkinan membentur menabrak pada saat pengangkatan', 'Safe working radius for lifting and handling operations to prevent collisions or impacts during lifting'],
        ['c6', 'Radius kerja Aman Alat sudah dipasang pembatas, rambu- rambu dan informasi kegiatan alat', "Safe working radius: the equipment area has been fitted with barriers, signage, and information regarding the equipment's operations"],
        ['c7', 'Akses dimana lintasan rigger dan material yang diangkat tidak ada hambatan', "An access path where the rigger's route and the materials being lifted are free from obstructions"],
        ['c8', 'Koordinasi signal man/Rigger dan operator tidak ada penghalang, jika terhalang wajib menggunakan HT', 'There must be an unobstructed line of sight between the signalman/rigger and the operator; if obstructed, a two-way radio is mandatory'],
        ['c9', 'Rigger dan signal man orang berpengalaman dan ahli', 'The riggers and signal men are experienced and skilled people'],
        ['c10', 'Alat bantu angkat - angkut tersedia lengkap dan memenuhi persyaratan', 'Lifting and handling equipment is fully available and meets the requirements'],
        ['c11', 'Selama pekerjaan berlangsung pengawasan harus dilakukan', 'Supervision must be carried out while the work is in progress'],
      ], other: true },
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 2, half: true, note: true, items: [
        ['p1', 'Safety Glass'], ['p2', 'Body Harness'], ['p3', 'Hand glove'], ['p4', 'Masker']] },
      { k: 'opts', id: 'other', t: 'ALAT BANTU LAINYA', e: 'OTHER AIDS', cols: 2, half: true, items: [
        ['o1', 'Balok lapisan jack Rigger'], ['o2', 'HT'], ['o3', 'Safety line'], ['o4', 'Safety cone'], ['o5', 'Triplex Lapisan (Crawler track)']], other: true },
    ],
  },
  OT: {
    lamp: 9, title: 'OVERTIME / HOLIDAY WORK PERMIT', titleId: 'IJIN KERJA LEMBUR / HARI LIBUR', short: 'Overtime / Holiday', color: '#64748b', chkBg: '#fcd9b6',
    info: { single: true }, split: true,
    blocks: [
      { k: 'opts', id: 'types', t: 'JENIS IJIN KERJA YANG DIAJUKAN', e: 'TYPE OF WORK PERMIT APPLIED FOR', cols: 3, items: [
        ['w1', 'Ijin Kerja General'], ['w2', 'Kerja Listrik High/Low Voltage'], ['w3', 'Ijin Kerja Penggalian'], ['w4', 'Ijin Kerja Ruang Terbatas'], ['w5', 'Kerja di Ketinggian & Scaffolding'],
        ['w6', 'Ijin Kerja LOTOTO'], ['w7', 'Ijin Kerja Panas'], ['w8', 'Ijin Kerja Lifting & Heavy Equipment']], full: true },
      { k: 'checks', id: 'chk', t: 'DAFTAR PERIKSA KESELAMATAN', e: 'SAFETY CHECKLIST', items: [
        ['c1', 'Ijin Kerja dan data pendukung lainnya sudah dilengkapi (MS, JSA, Denah Lokasi, line/drawing pekerjaan)', 'The work permit and other supporting data have been prepared (MS, JSA, location plan, and work line/drawings)'],
        ['c2', 'Koordinasi dengan pihak Owner dan pengawas owner dilapangan sudah/ harus dilakukan', "Coordination with the Owner and the Owner's field supervisor has been carried out"],
        ['c3', 'Daftar Periksa Keselamatan mengacu dalam Ijin Kerja terkait, dilengkapi sesuai dengan ketentuan', 'The Safety Checklist referenced in the relevant Work Permit shall be completed in accordance with the stipulated requirements'],
        ['c4', 'APD yang diperlukan tersedia & digunakan sesuai dengan jenis Ijin Kerja', 'The required PPE is available and is being used in accordance with the type of Work Permit'],
        ['c5', 'Area kerja sudah diperiksa dan diamankan dari bahaya yang mungkin terjadi', 'The work area has been inspected and secured against potential hazards'],
        ['c6', 'Alat-alat kerja yang akan dipakai sudah di periksa dan aman untuk digunakan', 'The tools to be used have been inspected and are safe for use'],
        ['c7', 'Akses pekerja dan akses emergency tersedia dan tidak terhalangi oleh material/ lainya', 'Worker access and emergency access are available and remain unobstructed by materials or other items'],
        ['c8', 'Rambu/sign Keselamatan disekitar lingkungan kerja dipasang sesuai jenis kerja terlihat dengan jelas', 'Safety signs are installed throughout the work environment, corresponding to the type of work, and are clearly visible'],
        ['c9', 'Pekerja yang akan bekerja paham sesuai dengan tugas tanggung jawab serta sudah diberikan training', 'The employees who will be working understand their duties and responsibilities and have already received training'],
        ['c10', 'Penerangan ditempat kerja tersedia dan mencukupi', 'Workplace lighting is available and sufficient'],
        ['c11', 'Pengawasan oleh Spv dilakukan selama pekerjaan berlangsung', 'Supervision by the supervisor is carried out throughout the duration of the work'],
        ['c12', 'Alat kerja /Hand tools sudah diperiksa dan dilabelling', 'Work tools / hand tools have been checked and labeled'],
      ], other: true },
      { k: 'opts', id: 'ppe', t: 'APD YANG DIGUNAKAN', e: 'PPE USED', cols: 1, bg: '#fff9b0', items: [
        ['p1', 'Safety Helmet'], ['p2', 'Body Harness'], ['p3', 'Safety Shoes'], ['p4', 'Safety Glass'], ['p5', 'Safety Vest/ Rompi'], ['p6', 'Ear Plug/ Ear muff'], ['p7', 'Masker/ Respirator'],
        ['p8', 'Welding mask'], ['p9', 'Hand Glove'], ['p10', 'Welding Glove'], ['p11', 'Electric glove'], ['p12', 'Rubber Glove'], ['p13', 'Cotton Glove'], ['p14', 'Fitter glove'],
        ['p15', 'Face shield'], ['p16', 'Welding Apron'], ['p17', 'Safety rubber booth'], ['p18', 'Rubber booth']], other: true },
    ],
  },
};
const PTW_ORDER = ['GWP', 'CS', 'HW', 'EL', 'WAH', 'EX', 'ISO', 'LFT', 'OT'];
// jenis ijin di General WP -> kode permit turunan
const PTW_APPLIED = [['CS', 'Kerja Ruang Terbatas', 'Confined Space Work'], ['HW', 'Kerja Panas', 'Hot Work'], ['EL', 'Kerja Listrik High/Low Voltage', 'High/Low Voltage Electrical Work'],
  ['WAH', 'Kerja Scaffolding / WAH', 'Scaffolding / Working at Height (WAH)'], ['EX', 'Kerja Penggalian', 'Excavation Work'], ['ISO', 'Kerja Isolasi/LOTOTO', 'Isolation Work/LOTOTO'],
  ['LFT', 'Kerja Lifting & Heavy Equipment', 'Lifting & Heavy Equipment Operations']];

/* ---------- state ---------- */
let permits = [], PTW_SERVER = true; // diisi ulang oleh applyData / loadDemo
const ptwById = id => permits.find(p => String(p.id) === String(id));
const ptwByNo = no => permits.find(p => p.no === no);
function ptwStatus(p) { // status tampil (kadaluarsa dihitung otomatis)
  if ((p.status === 'Aktif' || p.status === 'Diajukan') && p.to && p.to < CFG.today) return 'Kadaluarsa';
  return p.status;
}
function ptwWorkdays(a, b) { let n = 0; for (let d = new Date(a + 'T00:00:00'); fmt(d) <= b; d.setDate(d.getDate() + 1)) if (d.getDay() !== 0) n++; return n; }
const ptwPrefix = () => (CFG.permitPrefix || 'BTK');
function ptwNextNo(type) {
  const re = new RegExp('^' + type + '-' + ptwPrefix() + '-(\\d+)$');
  const max = permits.filter(p => p.type === type).reduce((m, p) => { const x = re.exec(p.no || ''); return x ? Math.max(m, +x[1]) : m; }, 0);
  return `${type}-${ptwPrefix()}-${String(max + 1).padStart(3, '0')}`;
}
function ptwFromRow(r) {
  let d = {}; try { d = typeof r.data === 'string' ? JSON.parse(r.data || '{}') : (r.data || {}); } catch (e) { d = {}; }
  return { id: String(r.id), no: r.no, type: r.type, parent: r.parent_no || '', status: r.status || 'Draft', desc: r.description || '', location: r.location || '',
    from: r.date_from || '', to: r.date_to || '', applicant: r.applicant || '', d, createdBy: r.created_by || '' };
}
function ptwToRow(p) {
  return { type: p.type, parent_no: p.parent, status: p.status, description: p.desc, location: p.location, date_from: p.from, date_to: p.to, applicant: p.applicant, data: JSON.stringify(p.d) };
}

/* ---------- demo ---------- */
function ptwDemo() {
  const T = CFG.today, add = (n, x) => fmt(addDays(T, n));
  const base = { workers: 6, workerNames: 'Rudi, Agus, Dedi, Yanto, Asep, Joko', phone: '0812-3456-7890', engInvolve: 'Tidak' };
  permits = [
    { id: 'DP1', no: `GWP-${ptwPrefix()}-001`, type: 'GWP', parent: '', status: 'Aktif', desc: 'Pemasangan rangka baja & ducting Building 4', location: 'Building 4', from: add(-1), to: add(3), applicant: 'Budi (PT CKD)',
      d: { ...base, jsa: 'JSA-BTK-014', contractor: 'Kontraktor', applied: { HW: { on: true, from: add(-1), to: add(3) }, WAH: { on: true, from: add(-1), to: add(3) } }, checks: ['chk.c1', 'chk.c2', 'chk.c3', 'chk.c6', 'chk.c8', 'ppe.p1', 'ppe.p3', 'ppe.p4', 'ppe.p7', 'ppe.p15'] } },
    { id: 'DP2', no: `HW-${ptwPrefix()}-001`, type: 'HW', parent: `GWP-${ptwPrefix()}-001`, status: 'Aktif', desc: 'Pengelasan bracket ducting', location: 'Building 4', from: add(-1), to: add(3), applicant: 'Budi (PT CKD)',
      d: { ...base, workers: 2, workerNames: 'Rudi, Agus', fireWatcher: 'Dedi', msNo: 'MS-BTK-007', checks: ['fire.f1', 'fire.f2', 'fire.f3', 'ppe.p1', 'ppe.p7', 'ppe.p9', 'tool.t1', 'tool.t2', 'chk.c1', 'chk.c2', 'chk.c3', 'chk.c7'] } },
    { id: 'DP3', no: `WAH-${ptwPrefix()}-001`, type: 'WAH', parent: `GWP-${ptwPrefix()}-001`, status: 'Diajukan', desc: 'Instalasi ducting ketinggian 6 m', location: 'Building 4', from: add(0), to: add(3), applicant: 'Budi (PT CKD)',
      d: { ...base, platform: 'Scaffolding', checks: ['ppe.p3', 'job.j2', 'job.j4', 'chk.c1', 'chk.c2', 'chk.c5', 'chk.c7'] } },
    { id: 'DP4', no: `GWP-${ptwPrefix()}-002`, type: 'GWP', parent: '', status: 'Selesai', desc: 'Penggalian saluran drainase', location: 'Siteplan', from: add(-9), to: add(-6), applicant: 'Eko (Subkon)',
      d: { ...base, contractor: 'Sub Kontraktor', applied: { EX: { on: true, from: add(-9), to: add(-6) } }, checks: ['chk.c1', 'ppe.p1'] } },
    { id: 'DP5', no: `EX-${ptwPrefix()}-001`, type: 'EX', parent: `GWP-${ptwPrefix()}-002`, status: 'Selesai', desc: 'Galian drainase kedalaman 1,2 m', location: 'Siteplan', from: add(-9), to: add(-6), applicant: 'Eko (Subkon)',
      d: { ...base, checks: ['job.j1', 'chk.c1', 'chk.c4', 'chk.c11', 'tool.t3', 'tool.t4'] } },
    { id: 'DP6', no: `OT-${ptwPrefix()}-001`, type: 'OT', parent: `GWP-${ptwPrefix()}-001`, status: 'Draft', desc: 'Lembur pengelasan bracket', location: 'Building 4', from: add(1), to: add(1), applicant: 'Budi (PT CKD)',
      d: { ...base, otMode: 'Lembur 18:00–22:00', checks: ['types.w1', 'types.w7'] } },
  ];
}

/* ================= HALAMAN PERMIT ================= */
function renderPermit() {
  const st = p => ptwStatus(p), tm = fmt(addDays(CFG.today, 1));
  const active = permits.filter(p => st(p) === 'Aktif' && p.from <= CFG.today && p.to >= CFG.today);
  const ending = permits.filter(p => st(p) === 'Aktif' && (p.to === CFG.today || p.to === tm));
  const waiting = permits.filter(p => ['Draft', 'Diajukan'].includes(st(p)));
  const done = permits.filter(p => st(p) === 'Selesai' && (p.to || '').slice(0, 7) === CFG.today.slice(0, 7));
  $('#pt-kpi').innerHTML =
    `<div class="card kpi safe"><div class="lbl">Permit aktif hari ini</div><div class="val">${active.length}</div><div class="hint">${[...new Set(active.map(p => PTW_TYPES[p.type].short))].join(' · ') || '–'}</div></div>` +
    `<div class="card kpi ${ending.length ? 'bad' : ''}"><div class="lbl">Berakhir hari ini / besok</div><div class="val">${ending.length}</div><div class="hint">${ending.map(p => p.no).join(', ') || 'Tidak ada'}</div></div>` +
    `<div class="card kpi"><div class="lbl">Draft / diajukan</div><div class="val">${waiting.length}</div><div class="hint">Menunggu tanda tangan</div></div>` +
    `<div class="card kpi"><div class="lbl">Selesai bulan ini</div><div class="val">${done.length}</div><div class="hint">${permits.filter(p => st(p) === 'Kadaluarsa').length} kadaluarsa belum ditutup</div></div>`;
  const F = { st: $('#pt-st').value, ty: $('#pt-ty').value, q: $('#pt-q').value.trim().toLowerCase() };
  const list = permits.filter(p => (!F.st || st(p) === F.st) && (!F.ty || p.type === F.ty) &&
    (!F.q || [p.no, p.desc, p.location, p.applicant, p.parent].join(' ').toLowerCase().includes(F.q)))
    .sort((a, b) => (b.from || '').localeCompare(a.from || '') || (b.no || '').localeCompare(a.no || ''));
  $('#pt-info').innerHTML = summarize(permits.length, list.length, 'permit', [['Status', F.st], ['Jenis', F.ty ? PTW_TYPES[F.ty].short : ''], ['Cari', F.q]]);
  $('#pt-body').innerHTML = list.map(p => {
    const T = PTW_TYPES[p.type], s = st(p), kids = p.type === 'GWP' ? permits.filter(c => c.parent === p.no) : [];
    return `<tr data-id="${esc(p.id)}"><td><b>${esc(p.no)}</b>${p.parent ? `<br><small style="color:var(--muted)">↳ ${esc(p.parent)}</small>` : ''}${kids.length ? `<br><small style="color:var(--muted)">${kids.length} permit turunan</small>` : ''}</td>
      <td><span class="cat-pill" style="--c:${T.color}">${T.short}</span></td><td style="white-space:normal;min-width:200px">${esc(p.desc)}</td><td>${esc(p.location)}</td><td>${esc(p.applicant)}</td>
      <td>${p.from ? fmtID(new Date(p.from)) : '–'}${p.to && p.to !== p.from ? ` – ${fmtID(new Date(p.to))}` : ''}</td><td><span class="pt-st ${PTW_ST_CLS[s]}">${s}</span></td>
      <td class="no-pdf" style="white-space:nowrap"><button class="edit" data-act="print" title="Cetak PDF">🖨</button><button class="edit" data-act="edit" title="${PTW_LOCKED.includes(p.status) ? 'Lihat (terkunci)' : 'Buka / edit'}">${PTW_LOCKED.includes(p.status) ? '🔒' : '✎'}</button>${p.type === 'GWP' ? `<button class="edit" data-act="child" title="Buat permit turunan">＋</button>` : ''}</td></tr>`;
  }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:20px">Belum ada permit</td></tr>';
  $('#pt-body').querySelectorAll('tr[data-id]').forEach(tr => tr.onclick = e => {
    const p = ptwById(tr.dataset.id), a = e.target.closest('button')?.dataset.act;
    if (a === 'print') ptwPrint(p.type === 'GWP' ? [p, ...permits.filter(c => c.parent === p.no)] : [p]);
    else if (a === 'child') ptwChildMenu(p);
    else openPermit(p);
  });
  $('#pt-note').textContent = PTW_SERVER ? '' : 'Apps Script belum diperbarui: permit belum bisa disimpan ke Google Sheet (lihat DEPLOY.md).';
}

/* ---------- form isian ---------- */
let ptwEdit = null; // permit yang sedang diedit
function ptwText(s, d) { return String(s).replace(/\{(\w+)\}/g, (_, k) => d[k] ? `<b>${esc(d[k])}</b>` : '……………'); }
function openPermit(p, preset) {
  ptwEdit = p ? JSON.parse(JSON.stringify(p)) : { id: '', no: '', type: preset?.type || 'GWP', parent: preset?.parent || '', status: 'Draft', desc: preset?.desc || '', location: preset?.location || '',
    from: preset?.from || CFG.today, to: preset?.to || CFG.today, applicant: preset?.applicant || SESSION?.user || '', d: { checks: [], workers: preset?.d?.workers || '', workerNames: preset?.d?.workerNames || '', phone: preset?.d?.phone || '', engInvolve: 'Tidak' } };
  ptwForm();
  $('#dlg-ptw').showModal();
}
function ptwForm() {
  const p = ptwEdit, T = PTW_TYPES[p.type], d = p.d, isNew = !p.id;
  const locked = ptwLocked(p), orig = locked ? ptwById(p.id).status : '';
  $('#ptw-title').textContent = isNew ? 'Buat Permit to Work' : `${p.no} · ${T.short}${locked ? ' · 🔒 terkunci' : ''}`;
  const gwps = permits.filter(x => x.type === 'GWP' && x.id !== p.id);
  const opt = (v, cur, label) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(label ?? v)}</option>`;
  const inp = (k, label, val, attr = '') => `<label>${label}<input data-f="${k}" value="${esc(val ?? '')}" ${attr}></label>`;
  let h = (locked ? `<div class="ptw-lock">🔒 Permit <b>${orig}</b> terkunci — isi permit tidak dapat diubah.${orig === 'Aktif' ? ' Hanya status yang dapat diganti ke <b>Selesai</b> atau <b>Batal</b>.' : ' Permit hanya dapat dilihat dan dicetak.'}</div>` : '') + `<div class="ptw-sec"><div class="ptw-grid">
    <label>Jenis permit<select id="pf-type" ${isNew ? '' : 'disabled'}>${PTW_ORDER.map(k => opt(k, p.type, `Lamp. ${PTW_TYPES[k].lamp} · ${PTW_TYPES[k].short}`)).join('')}</select></label>
    <label>Status<select data-f="status">${(orig === 'Aktif' ? ['Aktif', 'Selesai', 'Batal'] : orig === 'Selesai' ? ['Selesai'] : PTW_STATUS).map(s => opt(s, p.status)).join('')}</select></label>
    ${p.type !== 'GWP' ? `<label class="full">No WP General<select data-f="parent"><option value="">— pilih General Work Permit —</option>${gwps.map(g => opt(g.no, p.parent, `${g.no} · ${g.desc}`)).join('')}</select></label>` : ''}
    ${T.info?.jsa ? inp('d.jsa', 'No. Job Safety Analysis', d.jsa) : ''}
    ${T.info?.contractor ? `<label>Pemohon dari<select data-f="d.contractor">${opt('Kontraktor', d.contractor)}${opt('Sub Kontraktor', d.contractor)}</select></label>` : ''}
    <label class="full">Uraian / jenis pekerjaan<textarea data-f="desc" rows="2" required>${esc(p.desc)}</textarea></label>
    <label>Lokasi kerja<input data-f="location" list="pf-loc" value="${esc(p.location)}" required></label>
    <label>Jumlah pekerja<input data-f="d.workers" type="number" min="1" value="${esc(d.workers)}"></label>
    <label class="full">Nama pekerja<textarea data-f="d.workerNames" rows="2" placeholder="Pisahkan dengan koma">${esc(d.workerNames)}</textarea></label>
    ${T.info?.single ? `<label>Tanggal<input data-f="from" type="date" value="${p.from}" required></label>
      <label>Waktu<select data-f="d.otMode">${opt('Hari libur 08:00–18:00', d.otMode)}${opt('Lembur 18:00–22:00', d.otMode)}</select></label>`
      : `<label>Berlaku dari<input data-f="from" type="date" value="${p.from}" required></label><label>s/d<input data-f="to" type="date" value="${p.to}" required></label>`}
    <div class="full set-calc" id="pf-valid"></div>
    ${inp('applicant', 'Nama pemohon ijin', p.applicant, 'required')}${inp('d.phone', 'No HP pemohon', d.phone, 'inputmode="tel"')}
  </div></div>`;
  if (T.info?.applied) {
    h += `<div class="ptw-sec"><h4>Jenis ijin kerja yang diajukan <small>Type of work permit applied for</small></h4><div class="pf-applied">` +
      PTW_APPLIED.map(([k, id]) => { const a = (d.applied || {})[k] || {}; return `<div class="pf-ap"><label class="ck"><input type="checkbox" data-ap="${k}" ${a.on ? 'checked' : ''}> ${id}</label>
        <input type="date" data-apf="${k}" value="${a.from || ''}"><span>s/d</span><input type="date" data-apt="${k}" value="${a.to || ''}"></div>`; }).join('') + '</div></div>';
  }
  T.blocks.forEach(b => {
    if (b.k === 'gas') { h += `<div class="ptw-sec"><h4>Pengukuran gas <small>dicatat manual di form cetak setiap 30 menit · O₂ 19,5–23% · LEL 0% · CO 0 ppm · H₂S 0 ppm</small></h4></div>`; return; }
    if (b.k === 'fields') { h += `<div class="ptw-sec">${b.hidden ? '' : `<h4>Informasi LOTOTO</h4>`}<div class="ptw-grid">${b.items.map(([k, l]) => `<label class="full">${l}<input data-f="d.${k}" value="${esc(d[k] || '')}"></label>`).join('')}</div></div>`; return; }
    if (b.k === 'radio') { h += `<div class="ptw-sec"><div class="ptw-grid"><label class="full">${b.t}<select data-f="d.${b.id}"><option value="">—</option>${b.items.map(([v]) => opt(v, d[b.id])).join('')}</select></label></div></div>`; return; }
    const long = b.k === 'checks';
    h += `<div class="ptw-sec"><h4>${b.t} <small>${b.e || ''}</small><button type="button" class="pf-all" data-blk="${b.id}">Centang semua</button></h4>
      <div class="${long ? 'pf-checks' : 'pf-opts'}">${b.items.map(([k, id]) => `<label class="ck"><input type="checkbox" data-c="${b.id}.${k}" ${d.checks.includes(b.id + '.' + k) ? 'checked' : ''}> <span>${ptwText(id, d)}</span></label>`).join('')}</div>
      ${b.other ? `<label class="pf-oth">${typeof b.other === 'string' ? b.other : 'Lainnya / Other'}<input data-f="d.oth_${b.id}" value="${esc(d['oth_' + b.id] || '')}"></label>` : ''}</div>`;
  });
  h += `<div class="ptw-sec"><div class="ptw-grid"><label>Libatkan tim Engineering / Maintenance Area Owner?<select data-f="d.engInvolve">${opt('Tidak', d.engInvolve)}${opt('Ya', d.engInvolve)}</select></label>
    <label>Bila ya, sebutkan namanya<input data-f="d.engNames" value="${esc(d.engNames || '')}"></label></div>
    <p class="fx-note">Tanda tangan Pra & Pasca Pekerjaan (SPV/SM CKD, SPV/Eng C&W, EHS C&W, Area Owner) dan pemeriksa harian diisi <b>basah</b> pada form cetak.</p></div>`;
  $('#ptw-body').innerHTML = h + `<datalist id="pf-loc">${MASTER.area.map(a => `<option value="${esc(a)}">`).join('')}</datalist>`;
  $('#ptw-del').hidden = !(p.id && ROLE === 'admin') || locked;
  $('#ptw-print').hidden = !p.id;
  $('#ptw-saveprint').hidden = locked;
  $('#ptw-save').hidden = orig === 'Selesai';
  $('#ptw-save').textContent = locked ? 'Simpan status' : 'Simpan';
  if (locked) {
    $('#ptw-body').querySelectorAll('input,select,textarea').forEach(el => { if (!(orig === 'Aktif' && el.dataset.f === 'status')) el.disabled = true; });
    $('#ptw-body').querySelectorAll('.pf-all').forEach(b => b.hidden = true);
  }
  // ganti jenis permit (baru) -> render ulang tanpa kehilangan info umum
  const ty = $('#pf-type'); if (ty) ty.onchange = () => { ptwCollect(); ptwEdit.type = ty.value; ptwEdit.d.checks = []; ptwForm(); };
  $('#ptw-body').querySelectorAll('.pf-all').forEach(b => b.onclick = () => {
    const boxes = [...$('#ptw-body').querySelectorAll(`[data-c^="${b.dataset.blk}."]`)], all = boxes.every(x => x.checked); boxes.forEach(x => x.checked = !all); });
  $('#ptw-body').querySelectorAll('input[type=date],[data-f="d.otMode"]').forEach(x => x.addEventListener('change', ptwValid));
  $('#ptw-body').querySelectorAll('[data-ap]').forEach(x => x.addEventListener('change', () => {
    const k = x.dataset.ap, f = $(`[data-apf="${k}"]`), t = $(`[data-apt="${k}"]`); const pf = $('[data-f="from"]').value, pt = $('[data-f="to"]').value;
    if (x.checked) { if (!f.value) f.value = pf; if (!t.value) t.value = pt; } }));
  ptwValid();
}
function ptwCollect() {
  const p = ptwEdit, body = $('#ptw-body');
  body.querySelectorAll('[data-f]').forEach(el => { const k = el.dataset.f, v = el.value.trim ? el.value.trim() : el.value; if (k.startsWith('d.')) p.d[k.slice(2)] = v; else p[k] = v; });
  if (PTW_TYPES[p.type].info?.single) p.to = p.from;
  p.d.checks = [...body.querySelectorAll('[data-c]')].filter(x => x.checked).map(x => x.dataset.c);
  if (PTW_TYPES[p.type].info?.applied) {
    p.d.applied = {}; body.querySelectorAll('[data-ap]').forEach(x => { const k = x.dataset.ap; p.d.applied[k] = { on: x.checked, from: $(`[data-apf="${k}"]`).value, to: $(`[data-apt="${k}"]`).value }; });
  }
  return p;
}
function ptwValid() {
  const p = ptwEdit, T = PTW_TYPES[p.type], f = $('[data-f="from"]')?.value, t = T.info?.single ? f : $('[data-f="to"]')?.value, out = [];
  if (f && t) {
    if (t < f) out.push('⚠ Tanggal selesai sebelum tanggal mulai.');
    else if (T.info?.single) out.push(`Berlaku 1 hari (${fmtID(new Date(f))}) · ${$('[data-f="d.otMode"]')?.value || ''}`);
    else { const n = ptwWorkdays(f, t); out.push(n > 5 ? `⚠ ${n} hari kerja — melebihi batas maksimal 5 hari kerja.` : `Masa berlaku ${n} hari kerja (maks. 5) · jam 08:00–18:00 WIB`); }
  }
  $('#pf-valid').innerHTML = out.join('<br>');
  return !out.some(x => x.startsWith('⚠'));
}
async function ptwSave(andPrint) {
  if (ptwLocked(ptwEdit)) { // hanya status yang boleh berubah
    const cur = ptwById(ptwEdit.id), st = $('#ptw-body').querySelector('[data-f="status"]').value;
    if (cur.status === 'Selesai' || st === cur.status) { $('#dlg-ptw').close(); return true; }
    if (!confirm(`Ubah status ${cur.no} dari ${cur.status} menjadi ${st}?\nSetelah ${st}, permit tidak dapat diubah lagi.`)) return false;
    try { await save('savePermit', { id: cur.id, row: { ...ptwToRow(cur), status: st } }, `${cur.no} → ${st}`); } catch { return false; }
    cur.status = st; $('#dlg-ptw').close(); renderPermit(); renderDashboard(); return true;
  }
  const p = ptwCollect();
  if (!p.desc || !p.location || !p.applicant || !p.from) { snack('Lengkapi uraian pekerjaan, lokasi, pemohon dan tanggal', true); return false; }
  if (!ptwValid() && !confirm('Masa berlaku melebihi ketentuan. Tetap simpan?')) return false;
  if (p.type !== 'GWP' && !p.parent && !confirm('Permit ini belum dihubungkan ke General Work Permit. Tetap simpan?')) return false;
  const warn = [];
  if (p.type === 'HW' && !p.d.fireWatcher) warn.push('Nama Fire Watcher belum diisi');
  if (p.type === 'ISO' && !p.d.lotoPic) warn.push('PIC pemegang kunci LOTOTO belum diisi');
  if (p.type === 'EX' && p.d.checks.includes('chk.c6')) warn.push('Galian ≥ 2 m: pastikan Confined Space Permit juga dibuat');
  if (p.type === 'EX' && p.d.checks.includes('chk.c5')) warn.push('Perlu LOTOTO: pastikan Isolation Work Permit juga dibuat');
  if (p.status === 'Aktif') warn.push('Status Aktif: setelah disimpan, isi permit terkunci dan tidak dapat diubah lagi');
  if (p.status === 'Selesai') warn.push('Status Selesai: setelah disimpan, permit terkunci permanen');
  if (warn.length && !confirm(warn.join('\n') + '\n\nLanjut simpan?')) return false;
  let r; try { r = await save('savePermit', { id: p.id || undefined, row: ptwToRow(p) }, p.id ? `${p.no} diperbarui` : 'Permit tersimpan'); } catch { return false; }
  if (!p.id) { p.id = String(r.id || ('L' + Date.now())); p.no = r.no || ptwNextNo(p.type); permits.push(p); }
  else Object.assign(ptwById(p.id), p);
  $('#dlg-ptw').close(); renderPermit(); renderDashboard();
  const saved = ptwById(p.id);
  if (andPrint) ptwPrint([saved]);
  // General WP dengan jenis ijin dicentang: tawarkan permit turunan yang belum dibuat
  if (saved.type === 'GWP') { const miss = ptwMissingChildren(saved); if (miss.length && !andPrint) snack(`Jenis ijin diajukan: ${miss.map(k => PTW_TYPES[k].short).join(', ')} — buat lewat tombol ＋ di register`); }
  return true;
}
function ptwMissingChildren(g) {
  const ap = g.d.applied || {}; return PTW_APPLIED.map(x => x[0]).filter(k => ap[k]?.on && !permits.some(c => c.parent === g.no && c.type === k));
}
function ptwChildMenu(g) {
  const ap = g.d.applied || {}, miss = ptwMissingChildren(g);
  $('#ptc-title').textContent = `Permit turunan dari ${g.no}`;
  $('#ptc-list').innerHTML = PTW_ORDER.filter(k => k !== 'GWP').map(k => {
    const done = permits.filter(c => c.parent === g.no && c.type === k).map(c => c.no);
    return `<button type="button" class="ptc-b${miss.includes(k) ? ' req' : ''}" data-k="${k}" style="--c:${PTW_TYPES[k].color}"><b>${PTW_TYPES[k].short}</b>
      <small>${miss.includes(k) ? 'Diajukan di General WP · belum dibuat' : done.length ? 'Sudah ada: ' + done.join(', ') : 'Lamp. ' + PTW_TYPES[k].lamp}</small></button>`;
  }).join('');
  $('#ptc-list').querySelectorAll('.ptc-b').forEach(b => b.onclick = () => {
    const k = b.dataset.k, a = ap[k] || {}; $('#dlg-ptc').close();
    openPermit(null, { type: k, parent: g.no, desc: g.desc, location: g.location, from: a.from || g.from, to: a.to || g.to, applicant: g.applicant, d: g.d });
  });
  $('#dlg-ptc').showModal();
}

/* ================= CETAK (format asli, kertas Legal) ================= */
function ptwPage(p) {
  const T = PTW_TYPES[p.type], d = p.d || {}, on = k => d.checks?.includes(k), box = k => `<span class="pp-bx">${on(k) ? '✔' : ''}</span>`;
  const L = (id, en) => `<span class="pp-id">${id}</span>${en ? `<span class="pp-en">${en}</span>` : ''}`;
  const val = v => `<span class="pp-v">${v ? esc(v) : ''}</span>`;
  const dt = v => v ? fmtID(new Date(v)) : '';
  const daily = `<table class="pp-daily"><tr><th colspan="5">NAMA & TANDA TANGAN PEMERIKSA HARIAN<br><i>Daily Examiner Name & Signature</i></th></tr>
    <tr><th rowspan="2" style="width:22px">No</th><th rowspan="2" style="width:62px">Tanggal/<i>Date</i></th><th>PT. CKD</th><th colspan="2">Cushman &amp; Wakefield</th></tr>
    <tr><th>EHS</th><th>SPV / Eng</th><th>EHS</th></tr>${[1, 2, 3, 4, 5].map(n => `<tr><td class="c">${n}</td><td></td><td></td><td></td><td></td></tr>`).join('')}</table>`;
  const optBlock = b => `<div class="pp-blk"${b.bg ? ` style="background:${b.bg}"` : ''}><div class="pp-bh">${b.t} / <i>${b.e || ''}</i></div>
    <div class="pp-opts" style="grid-template-columns:repeat(${b.cols || 2},1fr)">${b.items.map(([k, t]) => `<div>( ${box(b.id + '.' + k)} ) ${ptwText(t, d)}</div>`).join('')}
    ${b.other ? `<div style="grid-column:1/-1">${typeof b.other === 'string' ? b.other : 'Lainya / Other'} : ${val(d['oth_' + b.id])}</div>` : ''}</div>
    ${b.note ? `<div class="pp-note"><b>Catatan :</b> ${b.note === 'tool' ? 'Alat kerja wajib mengikuti jenis pekerjaan' : 'APD Umum tertera pada General Work Permit'}<br><i>Note: ${b.note === 'tool' ? 'Work tools must correspond to the type of work' : 'General PPE is specified in the General Work Permit'}</i></div>` : ''}</div>`;
  const chkBlock = b => `<div class="pp-blk" style="background:${b.bg || T.chkBg}"><div class="pp-bh">${b.t} / <i>${b.e || ''}</i></div>
    ${b.items.map(([k, id, en]) => `<div class="pp-ck">( ${box(b.id + '.' + k)} ) ${L(ptwText(id, d), en)}</div>`).join('')}
    ${b.other ? `<div class="pp-ck">( ${box('x')} ) ${typeof b.other === 'string' ? b.other : 'Lainya / Other'} : ${val(d['oth_' + b.id])}</div>` : ''}</div>`;
  const fieldBlock = b => b.hidden ? '' : `<div class="pp-blk">${b.items.map(([k, id, en]) => `<div class="pp-ck">${L(id, en)} : ${val(d[k])}</div>`).join('')}</div>`;
  const docsBlock = b => `<div class="pp-blk"><div class="pp-bh">${b.t} / <i>${b.e}</i> &nbsp;·&nbsp; MASA BERLAKU / <i>VALIDITY PERIOD</i></div>
    <div class="pp-opts" style="grid-template-columns:1fr">${b.items.map(([k, t]) => `<div>( ${box(b.id + '.' + k)} ) ${t}</div>`).join('')}<div>${b.other} : ${val(d['oth_' + b.id])}</div></div></div>`;
  const gasBlock = () => { const H = n => `<th>Jam<br><i>Hour</i></th><th>Hasil<br><i>Result</i></th>`.repeat(n); return `<div class="pp-blk"><div class="pp-bh">DAFTAR PERIKSA UNSUR BAHAYA SEBELUM MEMASUKI RUANG KERJA TERBATAS / <i>HAZARD CHECKLIST BEFORE ENTERING A CONFINED WORKSPACE</i></div>
    <table class="pp-gas"><tr><th rowspan="2">Jenis unsur /<br><i>Type of element</i></th><th colspan="6">Oxygen : 19.5-23 (%)</th><th colspan="6">Gas / LEL : 0 (%)</th><th colspan="6">Co : 0 ppm</th><th colspan="6">H2S : 0 (ppm)</th></tr>
    <tr>${H(12)}</tr>${[1, 2, 3, 4, 5].map(() => `<tr><td></td>${'<td></td>'.repeat(24)}</tr>`).join('')}<tr><td>Nama &amp; Ttd</td>${'<td colspan="6"></td>'.repeat(4)}</tr></table></div>`; };
  const render = b => b.k === 'checks' ? chkBlock(b) : b.k === 'opts' ? optBlock(b) : b.k === 'fields' ? fieldBlock(b) : b.k === 'docs' ? docsBlock(b) : b.k === 'gas' ? gasBlock() : '';
  const sigs = (band, id, en, cls) => `<div class="pp-band ${cls}"><b>${band} :</b> ${id}<br><i><b>${band === 'PRA PEKERJAAN' ? 'PRE-WORK' : 'POST-WORK'} :</b> ${en}</i></div>
    <div class="pp-sig">${PTW_SIGNERS.map(s => `<div><div class="pp-sh">${s}</div><div>Nama/<i>Name</i> : __________________</div><div class="pp-ss">Tanda tangan/<i>Signature</i> :</div><div>Tanggal/<i>Date</i> :</div></div>`).join('')}</div>`;

  // susunan blok: blok "side" berdampingan dengan tabel pemeriksa harian
  const side = T.blocks.filter(b => b.side), rest = T.blocks.filter(b => !b.side);
  const applicant = `<div class="pp-blk"><div class="pp-bh">No HP &amp; Nama Pemohon Ijin / <i>Mobile Phone Number, Name of Permit Applicant</i></div>
    ${T.info?.contractor ? `<div class="pp-row">( ${d.contractor === 'Kontraktor' ? '✔' : '&nbsp;'} ) Kontraktor &nbsp;&nbsp; ( ${d.contractor === 'Sub Kontraktor' ? '✔' : '&nbsp;'} ) Sub Kontraktor</div>` : ''}
    <div class="pp-row">Nama/<i>Name</i> : ${val(p.applicant)} &nbsp; HP : ${val(d.phone)}</div></div>`;
  const applied = T.info?.applied ? `<div class="pp-blk"><div class="pp-bh">JENIS IJIN KERJA YANG DIAJUKAN / <i>TYPE OF WORK PERMIT APPLIED FOR</i></div>
    ${PTW_APPLIED.map(([k, id, en]) => { const a = (d.applied || {})[k] || {}; return `<div class="pp-ap">( ${a.on ? '✔' : '&nbsp;'} ) ${L(id, en)} <span>dari tgl/<i>from</i> : ${val(a.on ? dt(a.from) : '')} s/d ${val(a.on ? dt(a.to) : '')}</span></div>`; }).join('')}</div>` : '';
  let mid;
  if (T.split) { // GWP & OT: checklist kiri, APD kanan
    const ppe = rest.find(b => b.id === 'ppe'), others = rest.filter(b => b !== ppe && !b.full), full = rest.filter(b => b.full);
    mid = `<div class="pp-two"><div>${applicant}${applied}</div><div>${daily}</div></div>${full.map(render).join('')}
      <div class="pp-split"><div>${others.map(render).join('')}</div><div>${ppe ? render(ppe) : ''}</div></div>`;
  } else {
    const halves = rest.filter(b => b.half);
    mid = `<div class="pp-two"><div>${applicant}${side.map(render).join('')}</div><div>${daily}</div></div>
      ${rest.filter(b => !b.half).map(render).join('')}${halves.length ? `<div class="pp-split eq">${halves.map(b => `<div>${render(b)}</div>`).join('')}</div>` : ''}`;
  }
  const validity = T.info?.single
    ? `: Tanggal/<i>Date</i> : ${val(dt(p.from))} <span class="pp-r"><b>(Max 1 hari libur) Jam 08:00 s/d 18:00 WIB / Kerja lembur dari jam 18:00-22:00 WIB</b> · ${esc(d.otMode || '')}</span>`
    : `: Dari Tgl/<i>From Date</i> : ${val(dt(p.from))} &nbsp; s/d : ${val(dt(p.to))} <span class="pp-r"><b>(Max 5 Hari kerja) Jam 08:00 s/d 18:00 WIB</b></span>`;
  return `<div class="pp" style="--tc:${T.color}">
    <div class="pp-hd"><img src="assets/logo-safran-cw.jpg" alt=""><div class="pp-t"><u>${T.title}</u><br>${T.titleId}</div><img src="assets/logo-ckd.jpg" alt=""></div>
    <div class="pp-info">
      ${T.info?.gwpNo ? `<div><span>No. General Work Permit<br><i>General Work Permit No</i></span>: ${val(p.no)}</div><div><span>No. Job Safety Analysis</span>: ${val(d.jsa)}</div>` : ''}
      <div><span>Nama Project / <i>Project Name</i></span>: <b>${esc(CFG.projectName)}</b> ${T.info?.gwpNo ? '' : `<span class="pp-r">No Permit : <b>${esc(p.no)}</b></span>`}</div>
      <div><span>Uraian / Jenis Pekerjaan<br><i>Description/Type of Work</i></span>: ${val(p.desc)}</div>
      <div><span>Lokasi Kerja / <i>Work Location</i></span>: ${val(p.location)}</div>
      <div><span>Jumlah &amp; Nama Pekerja<br><i>Number &amp; names of workers</i></span>: ( ${esc(d.workers || '   ')} ) Orang/<i>Person</i> : ${val(d.workerNames)}</div>
      <div><span>Masa Berlaku / <i>Validity Period</i></span>${validity}</div>
      ${T.info?.gwpNo ? '' : `<div class="pp-wp"><span>No WP General :</span> <b>${esc(p.parent || '')}</b></div>`}
    </div>
    ${mid}
    ${sigs('PRA PEKERJAAN', PTW_PRE_ID, PTW_PRE_EN, 'pre')}
    <div class="pp-eng">Apakah team Engineering / Maintenance Area Owner Perlu dilibatkan : ( ${d.engInvolve !== 'Ya' ? '✔' : '&nbsp;'} ) Tidak. ( ${d.engInvolve === 'Ya' ? '✔' : '&nbsp;'} ) Ya, Bila ya sebutkan namanya : ${val(d.engNames)}<br>
      <i>Should the Engineering / Maintenance Area Owner team be involved? ( ) No. ( ) Yes, If yes, please provide the name(s)</i></div>
    ${sigs('PASCA PEKERJAAN', PTW_POST_ID, PTW_POST_EN, 'post')}
    <div class="pp-ft"><div>Distribusi: ( ) Lembar Putih di lokasi kerja dan EHS Kontraktor ( ) lembar merah EHS Konsultan ( ) Lembar kuning Owner<br>
      <i>Distribution: ( ) White copy – Worksite and Contractor EHS ( ) Red copy – Consultant EHS ( ) Yellow copy – Owner</i></div><div class="pp-lamp">Lampiran : ${T.lamp}<br><i>Attachment: ${T.lamp}</i></div></div>
  </div>`;
}
async function ptwPrint(list) {
  list = list.filter(Boolean); if (!list.length) return;
  $('#toast').textContent = 'Membuat PDF permit…'; $('#toast').classList.add('show');
  const host = document.createElement('div'); host.className = 'pp-host'; document.body.appendChild(host);
  try {
    const { jsPDF } = window.jspdf; const pdf = new jsPDF({ unit: 'pt', format: 'legal', orientation: 'portrait' });
    const PW = pdf.internal.pageSize.getWidth(), PH = pdf.internal.pageSize.getHeight();
    for (let i = 0; i < list.length; i++) {
      host.innerHTML = ptwPage(list[i]);
      await Promise.all([...host.querySelectorAll('img')].map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; })));
      const el = host.firstElementChild, c = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', logging: false });
      // 1 permit = 1 halaman: perkecil bila isi lebih tinggi dari kertas
      const m = 18, w = PW - 2 * m, h = c.height * w / c.width, k = Math.min(1, (PH - 2 * m) / h);
      if (i) pdf.addPage();
      pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', m + (w - w * k) / 2, m, w * k, h * k);
    }
    const name = list.length > 1 ? `PTW-${list[0].no}-paket` : `PTW-${list[0].no}`;
    pdf.save(name + '.pdf'); ptwPrint.last = { pages: list.length, name };
  } catch (e) { snack('Gagal membuat PDF: ' + e.message, true); }
  finally { host.remove(); $('#toast').classList.remove('show'); $('#toast').textContent = 'Membuat PDF…'; }
}

/* ---------- inisialisasi (dipanggil sekali dari index.html) ---------- */
function ptwInit() {
  $('#pt-ty').innerHTML = '<option value="">Semua jenis</option>' + PTW_ORDER.map(k => `<option value="${k}">${PTW_TYPES[k].short}</option>`).join('');
  $('#pt-st').innerHTML = '<option value="">Semua status</option>' + [...PTW_STATUS, 'Kadaluarsa'].map(s => `<option>${s}</option>`).join('');
  ['#pt-ty', '#pt-st'].forEach(s => $(s).onchange = renderPermit); $('#pt-q').oninput = renderPermit;
  $('#add-ptw').onclick = () => openPermit(null);
  $('#ptw-save').onclick = () => ptwSave(false);
  $('#ptw-saveprint').onclick = () => ptwSave(true);
  $('#ptw-print').onclick = () => { const p = ptwCollect(); ptwPrint([p]); };
  $('#ptw-cancel').onclick = () => $('#dlg-ptw').close();
  $('#ptc-x').onclick = () => $('#dlg-ptc').close();
  $('#ptw-del').onclick = async () => {
    const p = ptwEdit; if (!p?.id || !confirm(`Hapus ${p.no}?`)) return;
    try { await save('deleteRow', { sheet: 'Permit', id: p.id }, `${p.no} dihapus`); } catch { return; }
    permits = permits.filter(x => x.id !== p.id); $('#dlg-ptw').close(); renderPermit(); renderDashboard();
  };
}
