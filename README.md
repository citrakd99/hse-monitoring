# HSE Monitoring – Batik Project

Versi 1.0 (`index.html`, PWA) berdasarkan `HSE - Monitoring.xlsx`. Data disimpan di **Google Sheet** lewat **Google Apps Script**; aplikasi di-host di **GitHub Pages**.

- `config.js` kosong → **mode demo** (data contoh).
- `config.js` berisi URL Web App → **mode online** (login nama + PIN).

Langkah pemasangan: lihat **[DEPLOY.md](DEPLOY.md)**.

## Struktur file
| File | Fungsi |
|---|---|
| `index.html` | Seluruh aplikasi (UI, perhitungan, export PDF) |
| `config.js` | URL API Google Apps Script |
| `apps-script/Code.gs` | Backend: setup sheet otomatis, API baca/tulis, upload foto ke Drive, log |
| `sw.js`, `manifest.webmanifest`, `icons/` | PWA (install & offline) |

## Halaman
| Halaman | Sumber di Excel | Isi |
|---|---|---|
| Dashboard | DASHBOARD | Update date, Total Safe Manhours, Total Days, Total Manpower, **Safety Pyramid** (Fatality, LWC, RWC/MTC, First Aid, Near Miss + hari tanpa LTI), **Safety Performance** Month/PTD (Safe Manhour, TRIR, LWCIR basis 200.000 jam), **Leading Indicators** (observasi/minggu, close-out rate, rata-rata hari penyelesaian, HIGH masih open, laporan near miss), Top 5 Observation, cuaca per minggu (3 shift), grafik |
| Daily Monitoring | Daily Monitoring | Man power normal/lembur per hari, kumulatif, man hour, kumulatif man hour (30 minggu) |
| Monitoring Cuaca | Monitoring Cuaca | Kondisi cuaca per jam 07:00–22:00 per hari |
| Daily Observation | Daily Observation | Daftar temuan + form tambah observasi, filter periode/risk/area/category/status |
| Incident | (baru) | Ringkasan per klasifikasi, incident log + form Lapor Insiden, filter. Sumber Safety Pyramid |
| Master Data | Kolom O–R di Daily Observation | Sub-tab **Data Master** (tambah/hapus Category, Type, Area, Contoh Finding; Risk & Incident Classification dikunci) dan **Panduan** penggunaan |

## Struktur Google Sheet
Dibuat otomatis oleh fungsi `setup()`. Satu baris per input:

- **Manpower**: `date | normal | lembur | updated_by | updated_at | staff_normal | staff_lembur | pekerja_normal | pekerja_lembur` (normal/lembur = total Staff + Pekerja)
- **Cuaca**: `date | h07 … h21 (kode C/B/M/HR/HL/P) | updated_by`
- **Observation**: `id | date | observer | area | finding | type | category | risk | photo_url | action | action_date | action_photo_url | status`
- **Incident**: `id | date | klasifikasi (Fatality/LWC/RWC/MTC/First Aid Case/Near Miss) | area | deskripsi | input_by` → sumber Safety Pyramid
- **Master**: `list | value | keterangan`
- **Config**: `project_name, project_start, weeks, jam_normal, jam_lembur, target_*, pin, admin_pin, photo_folder_id`
- **Log**: `timestamp | user | role | action | sheet | ref`

Rekap mingguan (seperti layout Excel) dihitung di halaman web, bukan di sheet.

## Asumsi yang perlu dikonfirmasi
- Project mulai **4 Okt 2026** (Week 1 = Minggu–Sabtu), durasi 30 minggu.
- Man hour = normal × **8 jam**, lembur × **4 jam**.
- Total Manpower = kumulatif man power normal.
- Cuaca per shift di Dashboard = kondisi terburuk dalam rentang jam.
- Status observasi `Closed` jika sudah ada action date.

## Fitur tambahan v0.2
- **Export PDF** di setiap halaman (A4 landscape, selalu tema terang). Halaman Manpower & Cuaca mengekspor minggu yang sedang dipilih.
- **PWA**: `manifest.webmanifest`, `sw.js`, `icons/`. Bisa di-install ke HP/desktop dan dibuka offline. Di HP navigasi pindah ke bawah.
- Naikkan `VERSION` di `sw.js` setiap rilis supaya cache di perangkat user ikut diperbarui.

## Menjalankan lokal
Service worker hanya aktif lewat http(s), bukan saat file dibuka langsung:
```bash
python -m http.server 8765
```
lalu buka http://localhost:8765. Di GitHub Pages (https) PWA langsung aktif.

## Fitur tambahan v0.3
- Halaman **Incident** + form Lapor Insiden; klik Safety Pyramid di Dashboard membuka halaman ini.
- **Master** bisa ditambah/hapus (mockup: tersimpan di localStorage browser; online: sheet Master).
- **Filter** di Observation & Incident; ringkasan filter ikut tercetak di PDF, nama file diberi akhiran `-filtered`.
- **Panduan** penggunaan (8 bagian) di Master → Panduan, bisa diekspor ke PDF.
