/* =====================================================================
   Kamus Indonesia → English untuk i18n.js.
   Kunci = teks persis seperti tampil di layar (spasi dirapikan otomatis).
   Teks yang memuat angka/nama ditangani pola (I18N.rx) di bagian bawah.
   Teks berisi " · " diterjemahkan per bagian; awalan ikon (☀️, ⚠, •, +)
   dan titik dua di akhir diabaikan saat mencari terjemahan.
   ===================================================================== */
I18N.add({
  /* ---------- umum ---------- */
  'Simpan': 'Save', 'Batal': 'Cancel', 'Hapus': 'Delete', 'Tutup': 'Close', 'Ubah': 'Edit', 'Edit': 'Edit', 'Cari': 'Search',
  'Semua': 'All', 'Pilih': 'Select', 'Tambah': 'Add', '+ Tambah': '+ Add', 'Buat': 'Create', 'Reset': 'Reset', 'Kosongkan': 'Clear',
  'Ya': 'Yes', 'Tidak': 'No', 'Tidak ada': 'None', 'dan': 'and', 'atau': 'or', 'dll': 'etc.', 'dst.': 'etc.', 'Dari': 'From', 'Sampai': 'To', 's/d': 'to',
  'Tanggal': 'Date', 'Jam': 'Time', 'Hari': 'Day', 'Periode': 'Period', 'Bulan ini': 'This month', 'Minggu ini': 'This week',
  'Minggu lalu': 'Last week', 'Minggu depan': 'Next week', 'Keterangan': 'Notes', 'Catatan': 'Notes', 'Foto': 'Photo', 'Status': 'Status',
  'Kategori': 'Category', 'Jenis': 'Type', 'Lokasi': 'Location', 'Nama': 'Name', 'Nama lengkap': 'Full name', 'Perusahaan / subkon': 'Company / subcontractor',
  'Halaman': 'Page', 'Menu': 'Menu', 'Tab': 'Tab', 'Klik': 'Click', 'Kartu': 'Card', 'Tombol': 'Button', 'Menampilkan': 'Showing',
  'Tanpa filter (semua data)': 'No filter (all data)', 'Semua jenis': 'All types', 'Semua kategori': 'All categories', 'Semua status': 'All statuses',
  'Semua week (PTD)': 'All weeks (PTD)', 'Muat ulang data': 'Reload data', 'Cetak PDF': 'Print PDF', '🖨 Cetak': '🖨 Print', 'Lihat foto tersimpan': 'View saved photo',
  'Membuat PDF…': 'Creating PDF…', 'Membuat PDF permit…': 'Creating permit PDF…', 'Memeriksa…': 'Checking…', 'Menyimpan…': 'Saving…', 'Memuat…': 'Loading…',
  'Memuat data…': 'Loading data…', 'Dicetak': 'Printed', 'Hal.': 'Page', 'Gagal': 'Failed', 'Offline': 'Offline', 'Mode demo (data contoh)': 'Demo mode (sample data)',
  'Mode demo: perubahan disimpan di browser ini saja.': 'Demo mode: changes are saved in this browser only.',
  'Anda login sebagai admin: perubahan langsung tersimpan ke Google Sheet.': 'You are logged in as admin: changes are saved directly to Google Sheet.',
  ' (demo, tidak tersimpan permanen)': ' (demo, not saved permanently)', '(belum diisi)': '(not filled)', 'belum ada': 'none yet', 'nomor belum diisi': 'number not filled',
  'Data demo dimuat ulang': 'Demo data reloaded', 'Foto tidak bisa dibaca': 'Photo could not be read', 'Ganti pengguna': 'Switch user',
  'Keluar dan ganti pengguna?': 'Log out and switch user?', 'Install App': 'Install App', '⬇ Install App': '⬇ Install App',
  'Input cepat': 'Quick input', 'Tombol cepat': 'Quick actions', 'Pria': 'Male', 'Wanita': 'Female', 'Lainnya': 'Other', 'Lainnya / Other': 'Other',
  'Jumlah': 'Count', 'Total': 'Total', 'Normal': 'Normal', 'normal': 'normal', 'Lembur': 'Overtime', 'lembur': 'overtime', 'Masuk': 'Present',
  'masuk,': 'present,', 'man hour': 'man hours', 'hari hilang': 'lost days', 'tanpa target': 'no target', 'rencana': 'plan', 'realisasi': 'actual',
  'status': 'status', 'Aktif': 'Active', 'Non Aktif': 'Inactive', 'Belum': 'Not yet', 'Sudah': 'Done', 'Selesai': 'Completed', 'Diajukan': 'Submitted',
  'Draft': 'Draft', 'Kadaluarsa': 'Expired', 'Hapus program': 'Delete program', 'Edit program': 'Edit program', 'Buka / edit': 'Open / edit',
  'PIN salah': 'Wrong PIN', 'PIN default belum diganti di sheet Config': 'Default PIN has not been changed in the Config sheet',
  'Tanggal tidak valid': 'Invalid date', 'Hanya admin': 'Admin only', 'Data tidak ditemukan': 'Data not found', 'Foto terlalu besar (maks 8 MB)': 'Photo too large (max 8 MB)',

  /* ---------- header, navigasi, login ---------- */
  'HSE Monitoring': 'HSE Monitoring', 'Dashboard': 'Dashboard', 'Manpower': 'Manpower', 'Cuaca': 'Weather', 'Observation': 'Observation',
  'Incident': 'Incident', 'Program': 'Program', 'Permit': 'Permit', 'Master': 'Master', 'Masuk HSE Monitoring': 'Sign in to HSE Monitoring',
  'PIN': 'PIN', 'Nama Anda (tercatat di setiap input)': 'Your name (recorded with every entry)', 'PIN dari admin HSE': 'PIN from the HSE admin',
  'Google Sheet · sinkron jam': 'Google Sheet · synced at time',
  'Manpower hari ini': "Today's manpower", 'Cuaca hari ini': "Today's weather", 'Observasi baru': 'New observation', 'Lapor insiden': 'Report incident',
  'Catat Kegiatan HSE': 'Record HSE Activity', 'Buat Permit to Work': 'Create Permit to Work', 'Tambah pekerja baru': 'Add new worker',
  'Temuan unsafe act / condition': 'Unsafe act / condition finding', 'Near miss s/d fatality': 'Near miss to fatality',
  'Training, induction, safety moment, patrol': 'Training, induction, safety moment, patrol', 'General, hot work, WAH, confined space, dll': 'General, hot work, WAH, confined space, etc.',
  'Nama, KTP, induction, training, sertifikasi': 'Name, ID card, induction, training, certification', 'Jumlah orang normal & lembur': 'Normal & overtime headcount',
  'Pilih kondisi per jam': 'Select hourly condition',

  /* ---------- dashboard ---------- */
  'Total Safe Manhours': 'Total Safe Manhours', 'Normal + lembur, tanpa LTI': 'Normal + overtime, without LTI', 'Hari tanpa LTI': 'Days without LTI',
  'Kumulatif sejak start project': 'Cumulative since project start', 'Total Manpower': 'Total Manpower', 'Total kejadian': 'Total incidents',
  'Safety Pyramid': 'Safety Pyramid', 'Safety Performance': 'Safety Performance', 'Klik untuk melihat definisi & rumus': 'Click to see definitions & formulas',
  'Definisi & Rumus': 'Definitions & Formulas', 'Definisi & rumus': 'Definitions & formulas', 'Manhours per Minggu': 'Manhours per Week',
  'Observasi per Kategori & Risk': 'Observations by Category & Risk', 'Top 5 Observation (Weekly)': 'Top 5 Observations (Weekly)',
  'Klik untuk edit / tutup temuan': 'Click to edit / close finding', 'Leading Indicators': 'Leading Indicators', 'Aktivitas pencegahan · Week': 'Preventive activity · Week',
  'Observasi minggu ini': 'Observations this week', 'Close-out rate': 'Close-out rate', 'Close-out rate (PTD)': 'Close-out rate (PTD)',
  'Rata-rata hari penyelesaian': 'Average days to close', 'HIGH masih Open': 'HIGH still Open', 'Temuan HIGH masih Open': 'HIGH findings still Open',
  'Harus 0 – prioritas tindak lanjut': 'Must be 0 – priority follow-up', 'Laporan Near Miss': 'Near Miss reports', 'Laporan Near Miss (PTD)': 'Near Miss reports (PTD)',
  'Dari temuan sampai action · target ≤ 3 hari': 'From finding to action · target ≤ 3 days', 'Recordable case': 'Recordable case', 'jumlah kasus': 'number of cases',
  'Month': 'Month', 'PTD': 'PTD', 'Project-to-Date: sejak hari pertama proyek': 'Project-to-Date: since the first project day', 'PTD – Project-to-Date': 'PTD – Project-to-Date',
  'TRIR = (Jumlah Recordable × 200.000) ÷ Total Jam Kerja': 'TRIR = (Number of Recordables × 200,000) ÷ Total Hours Worked',
  'LWCIR = (Jumlah LWC × 200.000) ÷ Total Jam Kerja': 'LWCIR = (Number of LWC × 200,000) ÷ Total Hours Worked',
  '– Total Recordable Incident Rate': '– Total Recordable Incident Rate', '– Lost Workday Case Incident Rate': '– Lost Workday Case Incident Rate',
  '200.000 = jam kerja 100 orang × 40 jam × 50 minggu (standar OSHA). First Aid & Near Miss tidak termasuk recordable.': '200,000 = hours worked by 100 people × 40 hours × 50 weeks (OSHA standard). First Aid & Near Miss are not recordable.',
  'Yang dihitung:': 'Counted:', 'Yang dihitung': 'Counted', '1 kasus': '1 case', 'Plan Program HSE Mingguan': 'Weekly HSE Program Plan',
  'Kegiatan HSE': 'HSE Activities', 'Kepatuhan program bulan ini': "This month's program compliance", 'Kegiatan terlaksana (PTD)': 'Activities completed (PTD)',
  'Peserta training (PTD)': 'Training participants (PTD)', 'Pekerja ter-induksi (PTD)': 'Workers inducted (PTD)', 'Permit aktif hari ini': 'Active permits today',
  'Draft / diajukan': 'Draft / submitted', 'Berakhir hari ini / besok': 'Ending today / tomorrow', 'Weather (by Week)': 'Weather (by Week)', '· Shift siang': '· Day shift',
  'Accident pyramid ratio evaluation': 'Accident pyramid ratio evaluation', 'Dashboard menampilkan': 'Dashboard shows',

  /* ---------- manpower ---------- */
  'Manhour Harian': 'Daily Manhours', 'Daftar Pekerja': 'Worker List', 'Daily Monitoring – Manhour': 'Daily Monitoring – Manhours',
  'Klik tanggal': 'Click a date', '(atau angka Staff / Pekerja) untuk mengisi jumlah yang masuk kerja & lembur': '(or a Staff / Worker number) to enter the number present & on overtime',
  'per jabatan': 'per position', '; total Staff, Direct Worker dan Man Power dijumlahkan otomatis. Man hour dihitung otomatis: normal ×': '; Staff, Direct Worker and Man Power totals are summed automatically. Man hours are calculated automatically: normal ×',
  'jam, lembur × jam lembur (mulai': 'h, overtime × overtime hours (from', 'jam pulang lembur': 'overtime end time', 'yang dipilih per hari, default': 'selected per day, default',
  '). Kumulatif berjalan dari Week 1 (periode': '). Cumulative runs from Week 1 (period', 'week). Di HP lebih mudah lewat tombol': 'weeks). On a phone it is easier via the button',
  'Staff': 'Staff', 'Pekerja': 'Workers', 'Total Man Power': 'Total Man Power', 'Kumulatif Man Power': 'Cumulative Man Power', 'Man Hour': 'Man Hours',
  'Kumulatif Man Hour': 'Cumulative Man Hours', 'Klik untuk isi rincian per jabatan': 'Click to fill in details per position', 'Klik untuk ubah jam pulang lembur': 'Click to change overtime end time',
  'isi': 'fill', 'Input Manpower per Jabatan': 'Manpower Input per Position', 'Jam pulang lembur': 'Overtime end time', 'Isi = pekerja aktif terdaftar': 'Fill = registered active workers',
  'Jabatan': 'Position', 'Terdaftar aktif': 'Registered active', 'Subtotal Staff': 'Subtotal Staff', 'Subtotal Direct': 'Subtotal Direct', 'Direct Worker (Pekerja)': 'Direct Worker',
  'Lainnya (tanpa rincian)': 'Other (no breakdown)', 'Tanggal di luar periode proyek / belum berjalan': 'Date is outside the project period / not started yet',
  'Tanggal di luar periode proyek': 'Date is outside the project period', 'Week ini belum berjalan': 'This week has not started yet',
  'Tanggal tidak boleh di masa depan': 'Date cannot be in the future',

  /* ---------- daftar pekerja ---------- */
  'Daftar Pekerja Proyek': 'Project Worker List', '+ Tambah Pekerja': '+ Add Worker', 'Tambah Pekerja': 'Add Worker', 'Edit Pekerja': 'Edit Worker',
  'Pekerja terdaftar': 'Registered workers', 'Status aktif': 'Active status', 'Sudah induction (aktif)': 'Inducted (active)', 'Sertifikasi': 'Certification',
  'Training diikuti (jumlah pekerja)': 'Training attended (number of workers)', 'Jabatan Staff aktif': 'Active Staff positions', 'Jabatan Direct Worker aktif': 'Active Direct Worker positions',
  'Nama, perusahaan, 4 digit KTP': 'Name, company, last 4 ID digits',
  'No KTP disembunyikan (hanya 4 digit terakhir) di tabel dan PDF; nomor lengkap hanya terlihat di form edit. Klik baris untuk edit.': 'ID card number is hidden (last 4 digits only) in the table and PDF; the full number is visible only in the edit form. Click a row to edit.',
  'No KTP': 'ID Card No. (KTP)', 'No KTP (NIK, 16 digit)': 'ID Card No. (NIK, 16 digits)', 'Jenis kelamin': 'Gender', 'Status induction': 'Induction status',
  'Tanggal induction': 'Induction date', 'Status pelanggaran': 'Violation status', 'Status bekerja': 'Work status', 'Training yang diikuti': 'Training attended',
  'Sertifikasi Pekerja': 'Worker Certification', 'Sertifikasi pekerja': 'Worker certification', 'Training Pekerja': 'Worker Training', 'Training / sertifikasi': 'Training / certification',
  'pilih beberapa · daftar diatur di Master': 'select several · list managed in Master', '— pilih jabatan —': '— select position —', 'Perusahaan': 'Company',
  'Tidak ada pelanggaran': 'No violation', 'Ada pelanggaran': 'Has violation', 'Pelanggaran': 'Violation', 'P3 · Terminasi': 'P3 · Termination', 'Terminasi': 'Termination',
  'Pekerja aktif wajib mengikuti safety induction sebelum mulai bekerja.': 'Active workers must attend safety induction before starting work.',
  'Nama wajib diisi': 'Name is required', 'No KTP harus 16 digit': 'ID card number must be 16 digits', 'No KTP sudah terdaftar': 'ID card number is already registered',
  'P2: isi tanggal induction ulang (sama atau setelah tanggal pelanggaran)': 'P2: enter the re-induction date (same as or after the violation date)',
  'P2: tanggal induction ulang harus sama atau setelah tanggal pelanggaran': 'P2: re-induction date must be the same as or after the violation date',
  'Pekerja tidak ditemukan': 'Worker not found', 'Tanggal pelanggaran': 'Violation date',
  'Apps Script belum diperbarui: daftar pekerja belum bisa disimpan ke Google Sheet (lihat DEPLOY.md).': 'Apps Script not updated yet: the worker list cannot be saved to Google Sheet yet (see DEPLOY.md).',

  /* ---------- jabatan, training, sertifikasi (isi Master bawaan) ---------- */
  'Admin Proyek': 'Project Admin', 'Drafter': 'Drafter', 'HSE Manager': 'HSE Manager', 'HSE Officer / Safety Officer': 'HSE Officer / Safety Officer',
  'Logistik / Warehouse': 'Logistics / Warehouse', 'Quality Control (QC)': 'Quality Control (QC)', 'Quantity Surveyor (QS)': 'Quantity Surveyor (QS)',
  'Site Engineer': 'Site Engineer', 'Site Manager': 'Site Manager', 'Supervisor / Pelaksana': 'Supervisor / Site Executor', 'Project Manager': 'Project Manager',
  'Surveyor': 'Surveyor', 'Mandor / Foreman': 'Foreman', 'Tukang Batu': 'Mason', 'Tukang Besi': 'Steel Fixer', 'Tukang Kayu': 'Carpenter', 'Tukang Cat': 'Painter',
  'Tukang Las / Welder': 'Welder', 'Electrician': 'Electrician', 'Plumber': 'Plumber', 'Fitter': 'Fitter', 'Rigger': 'Rigger', 'Scaffolder': 'Scaffolder',
  'Operator Alat Berat': 'Heavy Equipment Operator', 'Mekanik': 'Mechanic', 'Helper / Kenek': 'Helper', 'Driver': 'Driver', 'Security': 'Security',
  'Cleaning Service / OB': 'Cleaning Service', 'Safety Man': 'Safety Man',
  'Ahli K3 Umum (AK3U)': 'General OHS Expert (AK3U)', 'Ahli K3 Listrik': 'Electrical OHS Expert', 'Teknisi K3 Listrik': 'Electrical OHS Technician',
  'Juru Las / Welder': 'Certified Welder', 'Juru Ikat / Rigger': 'Certified Rigger', 'Operator Crane (SIO)': 'Crane Operator (SIO)', 'Operator Forklift (SIO)': 'Forklift Operator (SIO)',
  'Operator Excavator (SIO)': 'Excavator Operator (SIO)', 'TKBT 1 (Bekerja di Ketinggian)': 'TKBT 1 (Working at Height)', 'TKBT 2 (Bekerja di Ketinggian)': 'TKBT 2 (Working at Height)',
  'Teknisi Scaffolding': 'Scaffolding Technician', 'Petugas Peran Kebakaran': 'Fire Warden', 'Petugas P3K': 'First Aider',
  'Petugas K3 Ruang Terbatas': 'Confined Space OHS Officer', 'Supervisor / Pengawas K3': 'OHS Supervisor',
  'Induction': 'Induction', 'K3 Umum': 'General OHS', 'Listrik': 'Electrical', 'P3K / First Aid': 'First Aid', 'Fire Fighting / APAR': 'Fire Fighting / Extinguisher',
  'Lifting & Rigging': 'Lifting & Rigging', 'Confined Space': 'Confined Space', 'Hot Work': 'Hot Work', 'Working at Height': 'Working at Height', 'LOTOTO': 'LOTOTO',

  /* ---------- cuaca ---------- */
  'Monitoring Cuaca': 'Weather Monitoring', 'Cerah': 'Sunny', 'Berawan': 'Cloudy', 'Mendung': 'Overcast', 'Hujan Ringan': 'Light Rain', 'Hujan Lebat': 'Heavy Rain', 'Petir': 'Thunderstorm',
  'Klik sel untuk mengganti kondisi cuaca per jam (07:00–22:00). Di Dashboard, cuaca diringkas per shift memakai kondisi': 'Click a cell to change the hourly weather condition (07:00–22:00). On the Dashboard, weather is summarised per shift using the',
  'terburuk': 'worst', 'dalam rentang jam tersebut.': 'condition within that time range.', 'Belum bisa mengisi cuaca untuk hari yang akan datang': 'Weather cannot be filled in for future days',

  /* ---------- observasi ---------- */
  'Daily Observation': 'Daily Observation', '+ Tambah Observasi': '+ Add Observation', 'Tambah Observasi': 'Add Observation', 'Edit / Tutup Observasi': 'Edit / Close Observation',
  'Date': 'Date', 'Observer': 'Observer', 'Observer Name': 'Observer Name', 'Nama pengamat': 'Observer name', 'Area': 'Area', 'Type': 'Type', 'Category': 'Category',
  'Risk': 'Risk', 'Finding': 'Finding', 'Deskripsi temuan': 'Finding description', 'Photo temuan': 'Finding photo', 'Action': 'Action', 'Tindakan perbaikan': 'Corrective action',
  'Action Date': 'Action Date', 'Photo action': 'Action photo', 'Photo': 'Photo', 'Status temuan': 'Finding status', '✓ Closed': '✓ Closed',
  'hanya jika perbaikan sudah selesai & dicek. Mengisi Action saja tidak otomatis menutup temuan.': 'only when the fix is complete & checked. Filling in Action alone does not close the finding.',
  'Pilih': 'Select', 'Untuk Closed, isi dulu Action (tindakan perbaikan)': 'For Closed, fill in Action (corrective action) first',
  'Untuk Closed, isi Action Date (tanggal selesai)': 'For Closed, fill in Action Date (completion date)',
  'Action date tidak boleh sebelum tanggal temuan': 'Action date cannot be before the finding date',
  'Status Closed wajib mengisi Action dan Action Date': 'Closed status requires Action and Action Date',
  'Hapus observasi ini secara permanen?': 'Permanently delete this observation?', 'Observasi': 'Observation', 'Observasi tersimpan': 'Observation saved',
  'Observasi diperbarui': 'Observation updated', 'Observasi dihapus': 'Observation deleted', 'Observasi tidak ditemukan': 'Observation not found',
  'Melanggar prosedur': 'Procedure violation', 'Tidak menggunakan PPE': 'Not using PPE', 'Area kerja': 'Work area', 'Alat tidak proper': 'Improper tools',
  'Contoh Finding': 'Sample Findings', 'Finding Category': 'Finding Category', 'Finding Type': 'Finding Type', 'Finding Risk': 'Finding Risk',

  /* ---------- incident ---------- */
  'Incident Log': 'Incident Log', 'Lapor Insiden': 'Report Incident', '+ Lapor Insiden': '+ Report Incident', 'Klasifikasi': 'Classification', 'Kronologi': 'Chronology',
  'Pihak terlibat': 'Persons involved', 'Pihak terlibat / korban': 'Persons involved / victims', 'Tindakan segera': 'Immediate action', 'Hari kerja hilang': 'Lost workdays',
  'Hari hilang': 'Lost days', 'Pelapor': 'Reporter', 'Nama pelapor': 'Reporter name', 'Insiden tersimpan': 'Incident saved', 'Klasifikasi tidak valid': 'Invalid classification',
  'Incident Classification': 'Incident Classification', 'Incident & Tanggap Darurat': 'Incident & Emergency Response', 'Lost Workday Case (LWC)': 'Lost Workday Case (LWC)',
  'Restricted Work / Medical Treatment Case': 'Restricted Work / Medical Treatment Case', 'Prosedur Darurat': 'Emergency Procedures', 'Prosedur Tanggap Darurat': 'Emergency Response Procedures',

  /* ---------- ERT ---------- */
  'ERT': 'ERT', 'Emergency Response Team (ERT)': 'Emergency Response Team (ERT)', 'Struktur Emergency Response Team': 'Emergency Response Team Structure',
  'Anggota ERT': 'ERT members', 'Peran terisi': 'Roles filled', 'Bersertifikat sesuai peran': 'Certified for role', 'Kontak Darurat': 'Emergency Contacts', 'Kontak darurat': 'Emergency contacts',
  'Struktur lengkap': 'Structure complete', 'Semua anggota aktif': 'All members active', 'Fire fighter & first aider': 'Fire fighter & first aider',
  '+ Anggota': '+ Member', '+ Kontak': '+ Contact', 'Tambah anggota ERT': 'Add ERT member', 'Edit anggota ERT': 'Edit ERT member', 'Tambah kontak darurat': 'Add emergency contact',
  'Edit kontak darurat': 'Edit emergency contact', 'Peran / kategori': 'Role / category', 'Pilih dari daftar pekerja aktif': 'Select from the active worker list',
  '— bukan dari daftar pekerja —': '— not from the worker list —', 'Nama anggota': 'Member name', 'Nama instansi / kontak': 'Agency / contact name',
  'No telepon / HP': 'Phone / mobile number', 'Keterangan (shift, area)': 'Notes (shift, area)', 'Alamat / keterangan': 'Address / notes',
  'Klik anggota / kontak untuk mengubah.': 'Click a member / contact to edit.', 'Hanya admin yang dapat mengubah struktur ERT.': 'Only admins can change the ERT structure.',
  'Apps Script belum diperbarui: data ERT belum bisa disimpan ke Google Sheet.': 'Apps Script not updated yet: ERT data cannot be saved to Google Sheet yet.',
  'Data ERT tidak ditemukan': 'ERT data not found', 'Data ERT tidak valid': 'Invalid ERT data', 'wajib sertifikat': 'certificate required',
  'Ketua ERT / Emergency Coordinator': 'ERT Leader / Emergency Coordinator', 'Ketua ERT': 'ERT Leader', 'Wakil Ketua / Site Coordinator': 'Deputy Leader / Site Coordinator',
  'Koordinator HSE': 'HSE Coordinator', 'Tim Pemadam Kebakaran / Fire Fighter': 'Fire Fighting Team / Fire Fighter', 'Tim Pemadam Kebakaran': 'Fire Fighting Team',
  'Tim P3K / First Aider': 'First Aid Team / First Aider', 'Tim P3K': 'First Aid Team', 'Tim Evakuasi / Fire Warden': 'Evacuation Team / Fire Warden', 'Tim Evakuasi': 'Evacuation Team',
  'Petugas Head Count (Titik Kumpul)': 'Head Count Officer (Assembly Point)', 'Tim Keamanan / Security': 'Security Team', 'Tim Keamanan': 'Security Team',
  'Tim Komunikasi & Logistik': 'Communication & Logistics Team',
  'Memimpin penanganan darurat, keputusan evakuasi & komunikasi ke manajemen/klien': 'Leads the emergency response, evacuation decisions & communication with management/client',
  'Koordinasi lapangan, menggantikan Ketua ERT': 'Field coordination, deputises for the ERT Leader',
  'Pelaporan insiden 1×24 jam, investigasi awal, koordinasi instansi': 'Incident reporting within 24 hours, initial investigation, agency coordination',
  'Pemadaman awal dengan APAR / hydrant': 'Initial firefighting with extinguishers / hydrants', 'Pertolongan pertama, mencatat Log P3K, mendampingi rujukan': 'First aid, recording the first aid log, accompanying referrals',
  'Mengarahkan evakuasi lewat jalur darurat ke titik kumpul': 'Directs evacuation via the emergency route to the assembly point',
  'Menghitung personel di assembly point & melaporkan yang belum hadir': 'Counts personnel at the assembly point & reports anyone missing',
  'Mengamankan area / TKP, mengatur akses ambulans & damkar': 'Secures the area / scene, manages ambulance & fire brigade access',
  'Menghubungi kontak darurat, menyiapkan kendaraan & peralatan': 'Calls emergency contacts, prepares vehicles & equipment',
  'Medis': 'Medical', 'Pemadam': 'Fire Brigade', 'Kepolisian': 'Police', 'Pemerintah / SAR': 'Government / SAR', 'Utilitas': 'Utilities', 'Proyek / Klien': 'Project / Client',
  'Titik Kumpul': 'Assembly Point', 'Ambulans / PSC': 'Ambulance / PSC', 'Rumah Sakit Rujukan': 'Referral Hospital', 'Klinik / Dokter Proyek': 'Project Clinic / Doctor',
  'Pemadam Kebakaran': 'Fire Brigade', 'Polisi': 'Police', 'Basarnas': 'Basarnas (Search & Rescue)', 'BPBD setempat': 'Local Disaster Agency (BPBD)',
  'Disnaker / Pengawas K3': 'Manpower Office / OHS Inspector', 'PLN (gangguan listrik)': 'PLN (power outage)', 'EHS Cushman & Wakefield': 'EHS Cushman & Wakefield',
  'Assembly Point utama': 'Main Assembly Point', 'Layanan gawat darurat nasional': 'National emergency service', 'Isi nama, alamat & nomor RS rujukan proyek': 'Fill in the name, address & number of the project referral hospital',
  'Lapor wajib untuk kecelakaan fatal': 'Mandatory report for fatal accidents', 'Isi lokasi titik kumpul': 'Fill in the assembly point location', 'Titik kumpul:': 'Assembly point:',

  /* ---------- prosedur darurat ---------- */
  'Kecelakaan Fatal': 'Fatal Accident', 'Cidera Hilang Waktu Kerja (LTI)': 'Lost Time Injury (LTI)', 'Cidera Ringan / Pertolongan Pertama': 'Minor Injury / First Aid',
  'Cedera Ringan / Pertolongan Pertama': 'Minor Injury / First Aid', 'Hampir Celaka': 'Near Miss', 'Kejadian Hampir Celaka': 'Near Miss Incident',
  'Insiden Kebakaran': 'Fire Incident', 'Bencana Alam': 'Natural Disaster', 'Selesai / End': 'End', 'Ya': 'Yes', 'Tidak (major injury)': 'No (major injury)',
  'Pelaporan (paralel)': 'Reporting (parallel)', 'Status korban': 'Victim status', 'Pelaporan': 'Reporting', 'Tanggap darurat': 'Emergency response', 'Kecelakaan kerja': 'Work accident',
  'Pencatatan (selalu)': 'Recording (always)', 'Pencatatan': 'Recording', 'Tindakan Langsung': 'Direct Action', 'Hasil penanganan': 'Treatment outcome', 'Penilaian kerusakan': 'Damage assessment',
  'Belum bersertifikat': 'Not certified', 'belum bersertifikat': 'not certified', 'Penanganan': 'Response',

  /* ---------- program HSE ---------- */
  'HSE Program': 'HSE Program', 'Matriks Program HSE · Rencana vs Realisasi': 'HSE Program Matrix · Plan vs Actual', 'Klik sel untuk mencatat kegiatan.': 'Click a cell to record an activity.',
  '· Angka sel = realisasi/rencana': '· Cell number = actual/plan', 'Terlaksana sesuai rencana': 'Completed as planned', 'Sebagian / minggu berjalan': 'Partial / current week',
  'Tidak terlaksana': 'Not completed', 'Di luar rencana': 'Unplanned', 'Rencana (akan datang)': 'Planned (upcoming)', '+ Catat Kegiatan': '+ Record Activity',
  'Daftar Program HSE': 'HSE Program List', 'Log Kegiatan': 'Activity Log', 'Kepatuhan': 'Compliance', 'Rencana': 'Plan', 'Realisasi': 'Actual',
  'Nama program': 'Program name', 'Nama program, mis. Training Hot Work': 'Program name, e.g. Hot Work Training', 'Frekuensi': 'Frequency', 'PIC': 'PIC',
  'Edit Program HSE': 'Edit HSE Program', 'Tambah Program HSE': 'Add HSE Program',
  'Program baru langsung muncul di matriks sesuai frekuensinya. Menghapus program tidak menghapus catatan kegiatannya.': 'A new program appears in the matrix right away according to its frequency. Deleting a program does not delete its activity records.',
  'Harian': 'Daily', 'Mingguan': 'Weekly', '2 Mingguan': 'Bi-weekly', 'Bulanan': 'Monthly', 'Sesuai kebutuhan': 'As needed', 'Senin–Sabtu': 'Monday–Saturday',
  '1× / minggu': '1× / week', '1× / 2 minggu': '1× / 2 weeks', '1× / bulan': '1× / month', 'Peserta': 'Participants', 'Jumlah peserta': 'Number of participants',
  'Topik / Materi': 'Topic / Material', 'Topik / materi': 'Topic / material', 'PIC / pemateri': 'PIC / presenter', 'Total peserta': 'Total participants',
  'mis. Bekerja di ketinggian, Rewarding Safety Champion Oktober': 'e.g. Working at height, October Safety Champion reward',
  'Kegiatan tersimpan': 'Activity saved', 'Kegiatan dihapus': 'Activity deleted', 'Hapus catatan kegiatan ini?': 'Delete this activity record?', 'Program dihapus': 'Program deleted',
  'Nama program wajib diisi': 'Program name is required', 'Program tidak ditemukan': 'Program not found', 'Program tidak valid': 'Invalid program', '(program dihapus)': '(program deleted)',
  'Daftar bawaan. Perbarui Apps Script (lihat DEPLOY.md) agar daftar program bisa diubah dan kegiatan tersimpan.': 'Default list. Update Apps Script (see DEPLOY.md) so the program list can be edited and activities are saved.',
  'program selesai · realisasi': 'programs completed · actual', 'Tidak ada training terjadwal': 'No training scheduled',
  // kategori program
  'Training': 'Training', 'Safety Moment': 'Safety Moment', 'Gemba / Safety Patrol': 'Gemba / Safety Patrol', 'Inspeksi': 'Inspection', 'Kesiapsiagaan Darurat': 'Emergency Preparedness',
  // program standar
  'Safety induction pekerja / tamu baru': 'Safety induction for new workers / visitors', 'Refresh induction seluruh pekerja': 'Induction refresher for all workers',
  'Toolbox meeting / safety talk pagi': 'Morning toolbox meeting / safety talk', 'Training K3 umum (APD, kerja di ketinggian, listrik)': 'General OHS training (PPE, working at height, electrical)',
  'Training khusus (hot work, lifting, confined space)': 'Specialised training (hot work, lifting, confined space)', 'Training P3K & tanggap darurat': 'First aid & emergency response training',
  'Rewarding & bagi hadiah Safety Champion': 'Safety Champion rewards & prizes', 'Senam sehat bersama': 'Group fitness exercise', 'Cek kesehatan pekerja (tensi, dll)': 'Worker health check (blood pressure, etc.)',
  'Kampanye K3 (poster, banner, safety sign)': 'OHS campaign (posters, banners, safety signs)', 'Safety patrol harian HSE': 'Daily HSE safety patrol',
  'Safety patrol gabungan (owner & kontraktor)': 'Joint safety patrol (owner & contractor)', 'Gemba walk manajemen': 'Management gemba walk',
  'Inspeksi APAR, P3K & rambu': 'Fire extinguisher, first aid kit & signage inspection', 'Inspeksi alat kerja & scaffolding': 'Work tool & scaffolding inspection',
  'Inspeksi alat berat & lifting gear': 'Heavy equipment & lifting gear inspection', 'Inspeksi listrik & panel sementara': 'Electrical & temporary panel inspection',
  'Inspeksi APD pekerja': 'Worker PPE inspection', 'Emergency drill (kebakaran / evakuasi)': 'Emergency drill (fire / evacuation)',
  'Safety meeting mingguan (P2K3 / kontraktor)': 'Weekly safety meeting (P2K3 / contractor)', 'Laporan HSE bulanan ke owner': 'Monthly HSE report to owner',
  'Housekeeping 5R / gotong royong': '5S housekeeping / joint clean-up', 'Pelanggaran 5R / housekeeping': '5S / housekeeping violation',

  /* ---------- permit to work ---------- */
  'Permit to Work': 'Permit to Work', 'Permit to Work (PTW)': 'Permit to Work (PTW)', 'Register Permit to Work': 'Permit to Work Register', '+ Buat Permit': '+ Create Permit',
  'No Permit': 'Permit No.', 'Jenis permit': 'Permit type', 'Pekerjaan': 'Work', 'Pemohon': 'Applicant', 'Masa berlaku': 'Validity', 'Permit turunan': 'Child permits',
  'Buat permit turunan': 'Create child permit', 'Lihat (terkunci)': 'View (locked)', 'No, pekerjaan, lokasi, pemohon': 'No., work, location, applicant',
  '🖨 cetak PDF format asli (kertas Legal) untuk ditandatangani basah · ✎ buka / ubah status · ＋ buat permit turunan dari General WP (Hot Work, WAH, dll).': '🖨 print PDF in the original format (Legal paper) for wet signatures · ✎ open / change status · ＋ create a child permit from the General WP (Hot Work, WAH, etc.).',
  'Menunggu tanda tangan': 'Awaiting signature', 'No WP General': 'General WP No.', '— pilih General Work Permit —': '— select General Work Permit —',
  'No. Job Safety Analysis': 'Job Safety Analysis No.', 'Pemohon dari': 'Applicant from', 'Kontraktor': 'Contractor', 'Sub Kontraktor': 'Subcontractor',
  'Uraian / jenis pekerjaan': 'Work description / type', 'Lokasi kerja': 'Work location', 'Jumlah pekerja': 'Number of workers', 'Nama pekerja': 'Worker names',
  'Pisahkan dengan koma': 'Separate with commas', 'Waktu': 'Time', 'Hari libur 08:00–18:00': 'Holiday 08:00–18:00', 'Lembur 18:00–22:00': 'Overtime 18:00–22:00',
  'Berlaku dari': 'Valid from', 'Nama pemohon ijin': 'Permit applicant name', 'No HP pemohon': "Applicant's mobile no.", 'Centang semua': 'Check all',
  'Pengukuran gas': 'Gas measurement', 'Informasi LOTOTO': 'LOTOTO information', 'Libatkan tim Engineering / Maintenance Area Owner?': 'Involve the Area Owner Engineering / Maintenance team?',
  'Bila ya, sebutkan namanya': 'If yes, state their names', 'basah': 'by wet signature', 'Simpan & Cetak': 'Save & Print',
  'Tanda tangan Pra & Pasca Pekerjaan (SPV/SM CKD, SPV/Eng C&W, EHS C&W, Area Owner) dan pemeriksa harian diisi': 'Pre- & post-work signatures (SPV/SM CKD, SPV/Eng C&W, EHS C&W, Area Owner) and the daily examiner are filled in',
  'pada form cetak.': 'on the printed form.', 'di form cetak.': 'on the printed form.',
  'dicatat manual di form cetak setiap 30 menit · O₂ 19,5–23% · LEL 0% · CO 0 ppm · H₂S 0 ppm': 'recorded manually on the printed form every 30 minutes · O₂ 19.5–23% · LEL 0% · CO 0 ppm · H₂S 0 ppm',
  'Lengkapi uraian pekerjaan, lokasi, pemohon dan tanggal': 'Complete the work description, location, applicant and dates', 'Permit tersimpan': 'Permit saved',
  'Masa berlaku melebihi ketentuan. Tetap simpan?': 'Validity exceeds the rules. Save anyway?', 'Permit ini belum dihubungkan ke General Work Permit. Tetap simpan?': 'This permit is not linked to a General Work Permit. Save anyway?',
  'Status Aktif: setelah disimpan, isi permit terkunci dan tidak dapat diubah lagi': 'Active status: once saved, the permit content is locked and cannot be changed',
  'Status Selesai: setelah disimpan, permit terkunci permanen': 'Completed status: once saved, the permit is permanently locked',
  'Diajukan di General WP · belum dibuat': 'Requested in General WP · not created yet', 'Sudah ada:': 'Already exists:', 'Nama Fire Watcher belum diisi': 'Fire Watcher name not filled',
  'PIC pemegang kunci LOTOTO belum diisi': 'LOTOTO key holder PIC not filled', 'Jenis permit tidak valid': 'Invalid permit type', 'Permit tidak ditemukan': 'Permit not found',
  'Permit Aktif hanya dapat diubah ke Selesai / Batal': 'An Active permit can only be changed to Completed / Cancelled',
  'Apps Script belum diperbarui: permit belum bisa disimpan ke Google Sheet (lihat DEPLOY.md).': 'Apps Script not updated yet: permits cannot be saved to Google Sheet yet (see DEPLOY.md).',
  'Masa berlaku maksimal 5 hari kerja (08:00–18:00); Overtime/Holiday 1 hari.': 'Maximum validity 5 working days (08:00–18:00); Overtime/Holiday 1 day.',
  'Kerja Ruang Terbatas': 'Confined Space Work', 'Kerja Panas': 'Hot Work', 'Kerja Listrik High/Low Voltage': 'High/Low Voltage Electrical Work', 'Kerja Scaffolding / WAH': 'Scaffolding / Working at Height (WAH)',
  'Kerja Penggalian': 'Excavation Work', 'Kerja Isolasi/LOTOTO': 'Isolation Work/LOTOTO', 'Kerja Lifting & Heavy Equipment': 'Lifting & Heavy Equipment Operations',
  'Jenis ijin kerja yang diajukan': 'Type of work permit applied for', 'APD lainya / Other PPE': 'Other PPE', 'Data lainya': 'Other data', 'Ijin Kerja Lainya / Other Work Permits': 'Other Work Permits',
  'Informasi lain yang diperlukan': 'Other required information', 'Informasi lainnya yang diperlukan': 'Other required information', 'Jenis pekerjaan listrik': 'Type of electrical work', 'Lantai kerja': 'Working platform',
  // item PTW tanpa versi Inggris di form asli
  'Alat Kerja Scaffolding': 'Scaffolding tools', 'Alat kerja CSA': 'CSA tools', 'Alat kerja Erection': 'Erection tools', 'Alat kerja Gas/ Cutting': 'Gas / cutting tools',
  'Alat kerja Gerinda': 'Grinding tools', 'Alat kerja Mesin/ MEP': 'Machine / MEP tools', 'Alat kerja Pengecatan': 'Painting tools', 'Alat kerja Survey': 'Survey tools',
  'Alat kerja listrik & LOTOTO': 'Electrical & LOTOTO tools', 'Alat kerja pengelasan': 'Welding tools', 'Balok lapisan jack Rigger': 'Rigger jack cribbing beams',
  'Cangkul': 'Hoe', 'Gancu': 'Hook', 'Linggis': 'Crowbar', 'Meteran': 'Measuring tape', 'Sekop': 'Shovel', 'Pengki/ Ember': 'Dustpan / bucket', 'Dodos': 'Chisel',
  'Fire Watcher standby: {fireWatcher}': 'Fire Watcher on standby: {fireWatcher}', 'Ijin Kerja General': 'General Work Permit', 'Ijin Kerja LOTOTO': 'LOTOTO Work Permit',
  'Ijin Kerja Lifting & Heavy Equipment': 'Lifting & Heavy Equipment Work Permit', 'Ijin Kerja Panas': 'Hot Work Permit', 'Ijin Kerja Penggalian': 'Excavation Work Permit',
  'Ijin Kerja Ruang Terbatas': 'Confined Space Work Permit', 'Kedok las / Welding mask': 'Welding mask', 'Kerja di Ketinggian & Scaffolding': 'Working at Height & Scaffolding',
  'Las / Welding': 'Welding', 'Masker': 'Mask', 'Masker/ Respirator': 'Mask / Respirator', 'Nama Fire Watcher': 'Fire Watcher name', 'No Method Statement (MS)': 'Method Statement (MS) No.',
  'No WP Hot Work (bila ada)': 'Hot Work WP No. (if any)', 'Obeng Plus / Minus': 'Phillips / flat screwdriver', 'Obstacle/ ganjalan': 'Obstacle / chock',
  'P/c Checklist hasil Inspeksi': 'Copy of inspection checklist', 'P/c SIA/ SILO': 'Copy of SIA / SILO', 'P/c SIO Operator': 'Copy of operator SIO', 'P/c Sertifikat Rigger': 'Copy of rigger certificate',
  'Pemadam Api Portabel (APAR) tersedia / Portable fire extinguishers are available': 'Portable fire extinguishers are available', 'Pemancangan / Piling': 'Piling',
  'Penggalian dengan Manual / Manual Excavation': 'Manual excavation', 'Penggalian menggunakan Excavator': 'Excavation using an excavator',
  'Petugas pemantau (Ahli madya / K3 Umum) a/n': 'Monitoring officer (Associate Expert / General OHS), name:', 'Pipa Roll': 'Pipe roller', 'Sipil / CSA': 'Civil / CSA',
  'Struktur/ Baja': 'Structure / steel', 'Tali Tambang': 'Rope', 'Tang Ampere': 'Clamp meter', 'Tang Kupas Kabel': 'Wire stripper', 'Tang Potong / Jepit': 'Cutting / gripping pliers',
  'Tang Skun': 'Crimping tool', 'Tas alat kerja': 'Tool bag', 'Triplex Lapisan (Crawler track)': 'Plywood lining (crawler track)', 'Safety Vest/ Rompi': 'Safety vest',
  'Safety sign, line/ cone': 'Safety sign, line / cone', 'Sertificate lifting Gears': 'Lifting gear certificate', 'Hot Work (WP No: {hotWp})': 'Hot Work (WP No: {hotWp})',
  'Lamp.': 'Att.',

  /* ---------- master & pengaturan ---------- */
  'Data Master': 'Master Data', 'Pengaturan Proyek': 'Project Settings', 'Panduan': 'Guide', 'Panduan Penggunaan': 'User Guide', 'Master Data & Panduan': 'Master Data & Guide',
  'Daftar ini menjadi sheet': 'These lists become the', 'di Google Sheet dan dipakai sebagai pilihan dropdown di form.': 'sheet in Google Sheet and are used as dropdown options in forms.',
  'Reset ke default': 'Reset to default', 'Kembalikan semua daftar master ke isi awal?': 'Restore all master lists to their defaults?',
  '🔒 terkait Safety Pyramid': '🔒 linked to the Safety Pyramid', '🔒 tetap': '🔒 fixed', 'Jabatan Staff': 'Staff Positions', 'Jabatan Direct Worker': 'Direct Worker Positions',
  'Tambah area…': 'Add area…', 'Tambah contoh finding…': 'Add sample finding…', 'Tambah finding category…': 'Add finding category…', 'Tambah finding type…': 'Add finding type…',
  'Tambah jabatan direct worker…': 'Add direct worker position…', 'Tambah jabatan staff…': 'Add staff position…', 'Tambah sertifikasi pekerja…': 'Add worker certification…',
  'Tambah training pekerja…': 'Add worker training…', 'Minimal harus ada 1 item.': 'At least 1 item is required.', 'Master tidak valid': 'Invalid master list',
  'Nama proyek': 'Project name', 'Tanggal mulai (Week 1 hari ke-1)': 'Start date (Week 1, day 1)', 'Tanggal selesai': 'End date', 'Jam kerja normal / orang / hari': 'Normal working hours / person / day',
  'Jam mulai lembur': 'Overtime start time', 'Default jam pulang lembur': 'Default overtime end time', 'Target observasi / minggu': 'Observation target / week',
  'Target close-out rate (%)': 'Close-out rate target (%)', 'Target rata-rata hari penyelesaian': 'Average days-to-close target', 'Simpan pengaturan': 'Save settings',
  '🔒 hanya admin yang dapat mengubah': '🔒 only admins can change this', 'Pengaturan proyek tersimpan': 'Project settings saved',
  'Data yang sudah diinput tidak terhapus saat periode diubah; data di luar periode hanya tidak ditampilkan.': 'Data already entered is not deleted when the period changes; data outside the period is simply not shown.',
  'Durasi': 'Duration', '· Week 1 mulai hari': '· Week 1 starts on', '⚠ Tanggal selesai harus setelah tanggal mulai.': '⚠ End date must be after the start date.',
  '⚠ Tanggal selesai sebelum tanggal mulai.': '⚠ End date is before the start date.', 'Tanggal selesai harus setelah tanggal mulai': 'End date must be after the start date',
  'Tanggal selesai sebelum tanggal mulai': 'End date is before the start date', 'Jam pulang lembur harus setelah jam mulai lembur': 'Overtime end time must be after the overtime start time',
  'Sheet tidak boleh dihapus': 'This sheet cannot be deleted',

  /* ---------- panduan: judul (isi panduan versi Inggris ada di GUIDE_EN) ---------- */
  'Masuk & sinkronisasi': 'Sign-in & sync', 'Alur kerja harian': 'Daily workflow', 'Daily Monitoring (Manpower & Manhour)': 'Daily Monitoring (Manpower & Manhours)',
  'Incident & Safety Pyramid': 'Incident & Safety Pyramid', 'ERT & Prosedur Tanggap Darurat': 'ERT & Emergency Response Procedures', 'Export PDF & filter': 'Export PDF & filters',
  'Master Data': 'Master Data', 'Install aplikasi di HP / laptop': 'Install the app on phone / laptop', 'Export PDF': 'Export PDF',

  /* ---------- tambahan hasil pemeriksaan layar ---------- */
  'Alat / Perangkat apa yang akan di LOTOTO': 'Which tools / equipment will be LOTOTO-ed', 'Berapa lama LOTOTO akan Dilakukan': 'How long LOTOTO will be applied',
  'Siapa PIC / Pemegang Kunci LOTOTO': 'Who is the PIC / LOTOTO key holder', 'Auto dari Daily Monitoring': 'Auto from Daily Monitoring',
  'Catatan: jam kerja bulan terpilih': 'Note: hours worked in the selected month', 'jam, jadi': 'h, so', 'saja sudah membuat rate bulan itu =': "alone already makes that month's rate =",
  'Nama / perusahaan': 'Name / company', 'Potensi bahaya tinggi? — Ya': 'High hazard potential? — Yes', 'Selesai bulan ini': 'Completed this month', 'Simpan status': 'Save status',
  'Tangga & Scaffolding': 'Ladder & Scaffolding', 'Tangga / Ladder': 'Ladder', 'Tidak → Rumah Sakit Rujukan (Designated Hospital)': 'No → Designated Hospital',
  'kegiatan (': 'activities (', 'Monitoring Cuaca (': 'Weather Monitoring (', 'Evakuasi': 'Evacuation', 'Pembahasan di Safety Committee Meeting': 'Discussion at the Safety Committee Meeting',
  'terkunci — isi permit tidak dapat diubah. Hanya status yang dapat diganti ke': 'is locked — its content cannot be changed. Only the status can be changed to',
  'terkunci — isi permit tidak dapat diubah. Permit hanya dapat dilihat dan dicetak.': 'is locked — its content cannot be changed. The permit can only be viewed and printed.',

  '· per': '· as of', 'Isi klinik terdekat untuk cedera ringan': 'Fill in the nearest clinic for minor injuries', 'Pencarian & pertolongan': 'Search & rescue',
  'Isi nomor BPBD kabupaten/kota': 'Fill in the district/city BPBD number', 'Isi lokasi titik kumpul, mis. lapangan depan Gate': 'Fill in the assembly point location, e.g. the field in front of the Gate', 'Gangguan listrik': 'Power outage',

  /* ---------- risiko ---------- */
  'Potensi kecelakaan fatal atau cedera berat yang menghentikan operasional': 'Potential fatal accident or serious injury that stops operations',
  'Potensi cedera yang memerlukan pertolongan medis': 'Potential injury requiring medical treatment', 'Potensi cedera ringan / P3K': 'Potential minor injury / first aid'
});

/* teks yang sudah berbahasa Inggris / nama: tidak perlu terjemahan */
I18N.ok([]);

/* ---------- pola untuk teks yang memuat angka atau nama ---------- */
(function () {
  const tr = s => t(s);
  const MSG = { tersimpan: 'saved', dihapus: 'deleted', ditambahkan: 'added', diperbarui: 'updated' };
  I18N.rx([
    [/^Kumulatif · terakhir (.+?): (\d+) orang \(Staff (\d+) · Pekerja (\d+)\), (\d+) lembur$/, 'Cumulative · latest $1: $2 people (Staff $3 · Workers $4), $5 overtime'],
    [/^Belum ada data manpower$/, 'No manpower data yet'],
    [/^lembur \((\d+(?:[.,]\d+)?) jam, s\.d\. (.+?)\) ·$/, 'overtime ($1 h, until $2) ·'],
    [/^W(\d+): rencana (\d+), realisasi (\d+)$/, 'W$1: plan $2, actual $3'],
    [/^(\d+) sertifikat$/, (m, n) => n + (n === '1' ? ' certificate' : ' certificates')],
    [/^(\d+) pekerja bersertifikat, (\d+) sertifikat$/, '$1 certified workers, $2 certificates'],
    [/^Week (\d+) dari (\d+)$/, 'Week $1 of $2'],
    [/^(\d+) item$/, (m, n) => n + (n === '1' ? ' item' : ' items')],
    [/^(\d+) permit turunan$/, (m, n) => n + (n === '1' ? ' child permit' : ' child permits')],
    [/^(\d+) sesi (training|induction)$/, '$1 $2 sessions'],
    [/^(\d+) kegiatan bulan ini$/, '$1 activities this month'],
    [/^(\d+) pekerja aktif belum induction$/, '$1 active workers not yet inducted'],
    [/^(\d+) program$/, '$1 programs'],
    [/^(\d+) hari$/, (m, n) => n + (n === '1' ? ' day' : ' days')],
    [/^(\d+(?:[.,]\d+)?) jam$/, '$1 h'],
    [/^(\d\d:\d\d) \(besok pagi\)$/, '$1 (next morning)'],
    [/^(\d+) kadaluarsa belum ditutup$/, '$1 expired, not yet closed'],
    [/^(\d+) kontak belum diisi nomornya$/, '$1 contacts without a number'],
    [/^(\d+) minggu ini$/, '$1 this week'],
    [/^makin banyak dilaporkan makin baik$/, 'the more reported, the better'],
    [/^(\d+) dari (\d+) temuan closed$/, '$1 of $2 findings closed'],
    [/^minggu lalu (\d+)$/, 'last week $1'],
    [/^Pria (\d+)$/, 'Male $1'], [/^Wanita (\d+)$/, 'Female $1'],
    [/^Terminasi \(P3\) (\d+)$/, 'Terminated (P3) $1'], [/^Non Aktif (\d+)$/, 'Inactive $1'],
    [/^(\d+) P2 wajib induction ulang$/, '$1 P2 must re-induct'],
    [/^dari (\d+) (kegiatan|pekerja|observasi|insiden|permit)$/, (m, n, k) => `of ${n} ${{ kegiatan: 'activities', pekerja: 'workers', observasi: 'observations', insiden: 'incidents', permit: 'permits' }[k]}`],
    [/^Tidak ada training terjadwal pada (W\d+)\. Jadwal berikutnya:$/, 'No training scheduled in $1. Next schedule:'],
    [/^di (W\d+ .*)$/, 'in $1'],
    [/^(.*) – akhir (.+)$/, '$1 – end of $2'],
    [/^(.+), berakhir (.+)\.$/, '$1, ends $2.'],
    [/^sinkron (.+)$/, 'synced $1'],
    [/^PTD (\d+)%$/, 'PTD $1%'],
    [/^realisasi ÷ rencana$/, 'actual ÷ plan'],
    [/^Target ≥ (\d+)\/minggu$/, 'Target ≥ $1/week'],
    [/^target ≥ (\d+)%$/, 'target ≥ $1%'],
    [/^Edit Pekerja$/, 'Edit Worker'],
    [/^Permit turunan dari (.+)$/, 'Child permits of $1'],
    [/^Sudah ada: (.+)$/, 'Already exists: $1'],
    [/^belum bersertifikat (.+)$/, (m, a) => 'not certified as ' + tr(a)],
    [/^status pekerja (.+)$/, (m, a) => 'worker status ' + tr(a)],
    [/^Penanganan (.+)$/, (m, a) => tr(a) + ' Response'],
    [/^Buka prosedur (.+) →$/, (m, a) => `Open procedure: ${tr(a)} →`],
    [/^\+ Lapor (.+)$/, '+ Report $1'],
    [/^Sumber: Flowchart Penanganan Kejadian (.+) – (.+)\.$/, 'Source: Incident Response Flowchart $1 – $2.'],
    [/^(\d+) terkunci$/, '$1 locked'],
    [/^terkunci$/, 'locked'],
    [/^Gagal menyimpan: (.*)$/, (m, a) => 'Failed to save: ' + tr(a)],
    [/^Gagal memuat: (.*)$/, (m, a) => 'Failed to load: ' + tr(a)],
    [/^Gagal membuat PDF: (.*)$/, (m, a) => 'Failed to create PDF: ' + tr(a)],
    [/^Gagal: (.*)$/, (m, a) => 'Failed: ' + tr(a)],
    [/^Login dikunci sementara karena terlalu banyak percobaan gagal\. Coba lagi dalam (\d+) menit\.$/, 'Sign-in is temporarily locked after too many failed attempts. Try again in $1 minutes.'],
    [/^Observasi tidak ditemukan: (.+)$/, 'Observation not found: $1'],
    [/^Aksi tidak dikenal: (.+)$/, 'Unknown action: $1'],
    [/^Hapus program "(.+)"\? Catatan kegiatan yang sudah ada tetap tersimpan\.$/, 'Delete program "$1"? Existing activity records are kept.'],
    [/^Hapus "(.+)" dari daftar\?(?: ⚠ Masih dipakai oleh (\d+) pekerja\.)? Data lama yang memakai nilai ini tetap tersimpan\.$/,
      (m, v, n) => `Remove "${v}" from the list?${n ? ` ⚠ Still used by ${n} workers.` : ''} Existing data using this value is kept.`],
    [/^(.+) akan diterminasi dari proyek \(P3\)\. Status tidak dapat diaktifkan kembali\. Lanjutkan\?$/, '$1 will be terminated from the project (P3). The status cannot be reactivated. Continue?'],
    [/^Ubah status (.+) dari (.+) menjadi (.+)\? Setelah (.+), permit tidak dapat diubah lagi\.$/,
      (m, no, a, b) => `Change status of ${no} from ${tr(a)} to ${tr(b)}? After ${tr(b)}, the permit can no longer be changed.`],
    [/^Hapus (.+) dari daftar pekerja\?$/, 'Remove $1 from the worker list?'],
    [/^Hapus (.+)\?$/, 'Delete $1?'],
    [/^Program "(.+)" (ditambahkan|diperbarui)$/, (m, a, b) => `Program "${a}" ${MSG[b]}`],
    [/^"(.+)" (ditambahkan|dihapus)$/, (m, a, b) => `"${a}" ${MSG[b]}`],
    [/^(Manpower|Cuaca) (.+) tersimpan$/, (m, a, d) => `${tr(a)} ${d} saved`],
    [/^(.+) (tersimpan|dihapus|ditambahkan|diperbarui)$/, (m, a, b) => `${tr(a)} ${MSG[b]}`],
    [/^⚠ No KTP harus 16 digit \(sekarang (\d+)\)\.$/, '⚠ ID card number must be 16 digits (currently $1).'],
    [/^Pelanggaran P2 tercatat (.+): induction ulang harus bertanggal sama atau setelahnya\.$/, 'P2 violation recorded on $1: re-induction must be dated the same day or later.'],
    [/^Data tanggal ini tersimpan tanpa rincian jabatan \(Staff (\S+), Pekerja (\S+)\); angkanya ditaruh di baris (.+)\. Pindahkan ke jabatan yang sesuai bila perlu\.$/,
      'Data for this date was saved without a position breakdown (Staff $1, Workers $2); the numbers are placed in the row Other (no breakdown). Move them to the right positions if needed.'],
    [/^🔒 Permit (\S+) terkunci — isi permit tidak dapat diubah\.(.*)$/, (m, s, rest) => `🔒 Permit ${tr(s)} is locked — its content cannot be changed.` +
      (/Selesai/.test(rest) && /Batal/.test(rest) ? ' Only the status can be changed to Completed or Cancelled.' : ' The permit can only be viewed and printed.')],
    [/^(.+) · 🔒 terkunci$/, '$1 · 🔒 locked'],
    [/^Lamp\. (\d+)$/, 'Att. $1'],
    [/^Berlaku (\d+) hari \((.+)\)$/, (m, n, d) => `Valid ${n} day${n === '1' ? '' : 's'} (${d})`],
    [/^Masa berlaku (\d+) hari kerja \(maks\. (\d+)\)$/, 'Validity $1 working day(s) (max. $2)'],
    [/^jam (.+) WIB$/, '$1 WIB'],
    [/^per (\d.*)$/, 'as of $1'],
    [/^(\d+) week$/, (m, n) => n + (n === '1' ? ' week' : ' weeks')]
  ]);
})();

/* ---------- panduan lengkap dalam bahasa Inggris ---------- */
window.GUIDE_EN = () => [
  ['Sign-in & sync', `<ul><li>When first opened, enter your <b>Name</b> and the <b>PIN</b> from the HSE admin. Your name is recorded with every entry you save (<i>Log</i> sheet).</li>
    <li>Header status: <b>Google Sheet · synced at time</b> = latest data; <b>Offline</b> = showing the last data stored on the phone, entries cannot be saved yet.</li>
    <li>The <b>⟳</b> button reloads the latest data. Click your name in the header to log out / switch user.</li>
    <li>The <b>admin PIN</b> can change Master lists and delete data; the officer PIN can only enter & edit.</li>
    <li>Display language: <b>Master → Project Settings → Bahasa / Language</b> (or ID / EN on the sign-in screen). It applies to this device only.</li></ul>`],
  ['Daily workflow', `<ol>
    <li><b>Morning (before 09:00)</b> – the HSE officer enters today's normal <b>Manpower</b> (Staff &amp; Workers).</li>
    <li><b>During the day</b> – record hourly <b>Weather</b> and enter every finding in <b>Observation</b> (with a photo).</li>
    <li><b>If an incident occurs</b> – enter it in <b>Incident</b> immediately, within 24 hours at the latest.</li>
    <li><b>Afternoon / after overtime</b> – complete the <b>overtime</b> manpower and update the status of findings that have been followed up.</li>
    <li><b>End of week</b> – check the Dashboard, export the Dashboard + Observation PDF (filter <i>This week</i>) for the weekly report.</li></ol>`],
  ['Daily Monitoring (Manpower & Manhours)', `<p>Enter the daily headcount for <b>Staff</b> (engineers, supervisors, HSE, admin) and <b>Workers</b> (tradespeople, helpers, operators, subcontractors), each as <b>normal</b> and <b>overtime</b>. The Total, Cumulative and Man Hour rows are calculated automatically.</p>
    <ul><li>Normal man hours = normal man power × <code>${CFG.jamNormal} h</code></li><li>Overtime man hours = overtime man power × overtime hours. Overtime hours = <b>overtime end time</b> (chosen per day in the popup, default <code>${leTxt(CFG.lemburPulang)}</code>) − overtime start time <code>${leTxt(CFG.lemburMulai)}</code>. It can run until the morning (e.g. 02:00 +1 = 8 h).</li>
    <li><b>Total Safe Manhours</b> = sum of all man hours since Week 1.</li><li>Use the ‹ › buttons to move between weeks (Week 1 – ${CFG.weeks}).</li></ul>`],
  ['Weather Monitoring', `<p>Click the cell for the right hour & day until the correct weather icon appears.</p>
    <table><tbody>${WX.map(w => `<tr><td style="font-size:18px">${w.i}</td><td><b>${t(w.n)}</b></td><td><code>${w.k}</code></td></tr>`).join('')}</tbody></table>
    <p>On the Dashboard, weather is summarised into 3 shifts (07–12, 12–17, 17–22) using the <b>worst</b> condition in that shift.</p>`],
  ['Daily Observation', `<ol><li>Click <b>+ Add Observation</b>, fill in the date, observer name, area, type, category, risk and finding description + photo.</li>
    <li>Once the fix is done, <b>click the finding row</b> in the table and fill in <b>Action</b>, <b>Action Date</b> and the after photo. The status <b>does not change automatically</b>: press <span class="pill st-closed">Closed</span> only when the fix is truly complete &amp; checked. While still in progress, leave it <span class="pill st-open">Open</span> (Action may be filled in as progress).</li>
    <li>Photos from the phone camera are automatically resized before upload and stored in the project Google Drive folder.</li></ol>
    <p><b>Risk levels:</b></p><ul>${MASTER.risk.map(([k, d]) => `<li><span class="pill ${k}">${k}</span> ${t(d)}</li>`).join('')}</ul>
    <p><b>Type:</b> <i>Unsafe Action</i> = unsafe behaviour of a person; <i>Unsafe Condition</i> = unsafe environment / equipment condition.</p>`],
  ['Incident & Safety Pyramid', `<p>Every incident is reported via <b>+ Report Incident</b> and is automatically added to the Safety Pyramid.</p>
    <table><tbody>
    <tr><td><span class="icp" style="--c:${IC_COLOR.Fatality}">Fatality</span></td><td>An accident resulting in death.</td></tr>
    <tr><td><span class="icp" style="--c:${IC_COLOR.LWC}">LWC</span></td><td>Lost Workday Case – the victim cannot work for ≥ 1 day after the day of the incident. Enter the number of <b>lost days</b>.</td></tr>
    <tr><td><span class="icp" style="--c:${IC_COLOR['RWC/MTC']}">RWC/MTC</span></td><td>RWC – still working but on restricted duties. MTC – requires treatment by medical personnel beyond first aid.</td></tr>
    <tr><td><span class="icp" style="--c:${IC_COLOR['First Aid Case']}">First Aid</span></td><td>A minor injury that can be treated with first aid on site.</td></tr>
    <tr><td><span class="icp" style="--c:${IC_COLOR['Near Miss']}">Near Miss</span></td><td>An event with no injury / damage but with the potential for it.</td></tr></tbody></table>
    <ul><li><b>Days without LTI</b> are counted from the last LWC/Fatality (or from project start).</li>
    <li><b>TRIR</b> = (number of Recordables × 200,000) ÷ total hours worked. Recordable = Fatality, LWC, RWC, MTC.</li>
    <li><b>LWCIR</b> = (number of LWC × 200,000) ÷ total hours worked. Counted = LTI/LWC and Fatality.</li>
    <li>The <b>Safety Performance</b> card on the Dashboard shows the selected month (<i>Month</i>) and since the first project day (<i>PTD – Project-to-Date</i>). PTD is used instead of YTD because the project spans a year change.</li>
    <li>For a ±6-month project with 150–200 people, total hours worked are only about 200,000–280,000, so <b>1 case</b> makes the monthly rate jump by ±4–6. Read TRIR/LWCIR together with the <b>number of cases</b> and the <b>Leading Indicators</b>.</li></ul>`],
  ['Leading Indicators', `<p>Preventive indicators with data every day, so the safety trend can be read even before any accident happens. Top bar colour: <span class="pill st-closed">green</span> on target, <span class="pill MEDIUM">yellow</span> needs attention, <span class="pill st-open">red</span> below target.</p>
    <table><tbody>
    <tr><td><b>Observations this week</b></td><td>Number of findings recorded in the current week, compared with last week. Target ≥ ${LI_TARGET.obsPerWeek}/week.</td></tr>
    <tr><td><b>Close-out rate</b></td><td>% of findings Closed since the project started. Target ≥ ${LI_TARGET.closeRate}%.</td></tr>
    <tr><td><b>Average days to close</b></td><td>Difference between the finding date and the action date. Target ≤ ${LI_TARGET.closeDays} days.</td></tr>
    <tr><td><b>HIGH still Open</b></td><td>High-risk findings not yet closed. Must be 0.</td></tr>
    <tr><td><b>Near Miss reports</b></td><td>More near misses reported indicates a good reporting culture, not a bad condition.</td></tr></tbody></table>
    <p>Targets can be adjusted to the project / client agreement.</p>`],
  ['HSE Program', `<p>The <b>Program</b> page contains the HSE activity matrix: the <i>plan</i> is calculated automatically from each program's frequency, the <i>actual</i> from recorded activities.</p>
    <ul><li><b>Frequency:</b> Daily = Monday–Saturday, Weekly = 1× per week, Bi-weekly = odd weeks, Monthly = the week containing the start of the month, As needed = no target (e.g. new worker induction).</li>
    <li>Click a matrix cell or the <b>+ Record Activity</b> button (also in the quick + button) to record training, induction, safety moments, patrols, etc. Enter the number of participants and a photo.</li>
    <li>Cell colours: <span class="pill st-closed">green</span> as planned, <span class="pill MEDIUM">yellow</span> partial / current week, <span class="pill st-open">red</span> not completed, blue = unplanned activity.</li>
    <li><b>Compliance</b> = actual (capped at the plan) ÷ plan, only for weeks that have started.</li>
    <li>Admins can add, <b>edit (✎)</b> and delete (×) programs in the <b>HSE Program List</b> card. Changing the frequency updates the plan in the matrix immediately.</li>
    <li>The <b>Weekly HSE Program Plan</b> card on the Dashboard shows the <b>Training</b> category by default; choose another category or <i>All categories</i> from the dropdown.</li></ul>`],
  ['ERT & Emergency Response Procedures', `<p>The <b>Incident</b> menu has the <b>ERT</b> and <b>Emergency Procedures</b> tabs.</p>
    <ul><li><b>ERT</b>: the Emergency Response Team structure (Leader, Deputy, HSE Coordinator, Fire Fighter, First Aider, Evacuation, Head Count, Security, Communication & Logistics). Members are chosen from the active Worker List; the app flags Fire Fighters / First Aiders without a Fire Warden / First Aider certificate, or members who are no longer active.</li>
    <li><b>Emergency contacts</b>: ambulance 119, fire brigade 113, police 110, Basarnas 115, PLN 123, referral hospital, BPBD, assembly point — tap a number to call directly from the phone. Fill in any missing numbers (admin).</li>
    <li><b>Emergency Procedures</b>: 6 flowcharts from the <i>Incident Response Flowchart</i> documents — Fatal Accident, LTI, First Aid, Near Miss, Fire and Natural Disaster — with quick contacts, the related ERT team and an incident report button.</li></ul>`],
  ['Worker List', `<p>The <b>Manpower → Worker List</b> menu contains every project worker's data with statistics cards.</p>
    <ul><li>Click <b>+ Add Worker</b> (or the quick + button): enter the name, 16-digit ID card (KTP) number, gender (default Male), Staff/Worker category, company, induction status, violation (P1/P2/P3), work status (Active, P3, Inactive), training attended and certifications (several can be selected).</li>
    <li><b>P3 = termination</b> from the project: the work status automatically becomes P3 and, once saved, cannot be changed back to Active.</li>
    <li><b>P2</b>: the induction status automatically returns to <b>Not yet</b>; the worker must re-attend induction dated the same day as or after the violation date.</li>
    <li>Active workers who have not been inducted are flagged.</li>
    <li>The <b>Position</b> is chosen from the Staff / Direct Worker position lists; the Staff/Worker category is filled automatically. Positions, training and certifications can be added / removed by admins in <b>Master → Master Data</b> (the app warns if an item is still in use).</li>
    <li>Fill in daily manpower via the per-position popup: the <i>Registered active</i> column comes from the worker list, and the <i>Fill = registered active workers</i> button fills it automatically.</li>
    <li>The ID card number is personal data: tables and PDFs show only the last 4 digits. Do not share the Google Sheet with unauthorised parties.</li></ul>`],
  ['Permit to Work (PTW)', `<p>The <b>Permit</b> menu contains 9 forms following <i>PTW Batik Project</i>: General Work Permit (Att. 1), Confined Space, Hot Work, Electrical, Working at Height, Excavation, Isolation/LOTOTO, Lifting and Overtime/Holiday (Att. 2–9).</p>
    <ol><li>Create the <b>General Work Permit</b> first and tick the types of permit requested with their dates.</li>
    <li>From the register, click <b>＋</b> on the General WP to create a specific permit; the work, location, workers and dates are filled in automatically and linked to the General WP No.</li>
    <li>Fill in the checklist & PPE according to site conditions, then <b>Save &amp; Print</b>. The PDF is Legal size, 1 permit per page, in the same format as the original form (bilingual). The 🖨 button on a General WP prints one package with all its child permits.</li>
    <li>Pre/post-work signatures, the daily examiner and gas measurements (confined space) are signed <b>by hand</b> on the printed form.</li>
    <li>Change the <b>status</b> in the app: Draft → Submitted → Active → Completed (or Cancelled). Active/Submitted permits past their validity automatically show as <b>Expired</b>.</li>
    <li><b>Active</b> and <b>Completed</b> permits are locked (🔒): their content cannot be changed. An Active permit can only be closed as Completed or Cancelled; a Completed permit can only be viewed and printed.</li></ol>
    <ul><li>Maximum validity 5 working days (08:00–18:00); Overtime/Holiday 1 day.</li><li>Automatic permit numbers: <code>GWP-BTK-001</code>, <code>HW-BTK-001</code>, etc.</li></ul>`],
  ['Export PDF & filters', `<ol><li>Open the page you want to print and set the filters (e.g. period, risk, area, status).</li>
    <li>Click <b>Export PDF</b> at the top right. Dashboard & Master print as A4 portrait, tables (Manpower, Weather, Observation, Incident) as A4 landscape. Page breaks adapt to the content: table rows, cards and charts are not cut, and every page is numbered.</li>
    <li>The active filters are printed in the PDF, so readers know which data is shown.</li></ol>
    <p>Tip: the <b>This week</b> button in Observation fills in the current week's period for the weekly report.</p>`],
  ['Master Data', `<p>The <b>Master Data</b> tab contains the dropdown options. Type a new item and click <b>+</b>, or click <b>×</b> to delete.</p>
    <ul><li>Deleting an item does not change existing data that already uses it.</li>
    <li><b>Finding Risk</b> and <b>Incident Classification</b> are locked because they are linked to colours, calculations and the Safety Pyramid.</li>
    <li>Only users with the <b>admin PIN</b> can add / delete items.</li>
    <li>Master list items are shared data: the default (Indonesian) items are shown translated in English mode, items you add are shown as typed.</li></ul>`],
  ['Install the app on phone / laptop', `<ul><li><b>Android (Chrome)</b> – open the app address → ⋮ menu → <i>Install app / Add to Home screen</i>, or click the <b>Install App</b> button in the header.</li>
    <li><b>iPhone (Safari)</b> – Share button → <i>Add to Home Screen</i>.</li>
    <li><b>Laptop (Chrome/Edge)</b> – click the install icon in the address bar.</li></ul>
    <p>Once installed, the app opens full screen and can still be opened with a weak signal (latest data).</p>`]
];
