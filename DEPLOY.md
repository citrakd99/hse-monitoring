# Panduan Deploy HSE Monitoring

Tiga langkah: **Google Sheet** (database) → **Apps Script** (API) → **GitHub Pages** (aplikasi). Total ±20 menit.

---

## 1. Buat Google Sheet + Apps Script

1. Buka <https://sheets.new> dengan akun Google yang akan menjadi **pemilik data** (sebaiknya akun HSE proyek, bukan akun pribadi).
2. Beri nama, misalnya **HSE Monitoring – Batik Project**.
3. Menu **Extensions → Apps Script**.
4. Hapus isi `Code.gs`, lalu tempel seluruh isi file [`apps-script/Code.gs`](apps-script/Code.gs). Klik **Save** (ikon disket).
5. Di toolbar, pilih fungsi **`setup`** lalu klik **Run**.
   - Muncul *Authorization required* → **Review permissions** → pilih akun → *Advanced* → *Go to … (unsafe)* → **Allow**.
     (Peringatan ini normal untuk script buatan sendiri. Izin yang diminta: Sheets dan Drive untuk menyimpan foto.)
6. Kembali ke Sheet. Sudah ada sheet: `Config`, `Manpower`, `Cuaca`, `Observation`, `Incident`, `Master`, `Log`, dan folder Drive **HSE Monitoring – Foto**.
7. Di sheet **Config**, isi:
   - `project_start` & `project_end` – periode proyek (yyyy-mm-dd). Jumlah week dihitung otomatis. Bisa juga diubah admin dari aplikasi: **Master → Pengaturan Proyek**.
   - `pin` – PIN untuk petugas input.
   - `admin_pin` – PIN admin (beda dengan `pin`).
   - Target leading indicator bila perlu.

   > Aplikasi menolak semua akses selama PIN masih `ganti-pin-…`.

## 2. Deploy Apps Script sebagai Web App

1. Di editor Apps Script: **Deploy → New deployment**.
2. Klik ikon ⚙ di *Select type* → **Web app**.
3. Isi:
   - Description: `HSE API v1`
   - **Execute as: Me**
   - **Who has access: Anyone**
4. **Deploy** → salin **Web app URL** (berakhiran `/exec`).

> *Anyone* diperlukan agar aplikasi di HP bisa memanggil API tanpa login Google. Data tetap dilindungi PIN: tanpa PIN yang benar API tidak mengembalikan data apa pun.

**Saat Code.gs diubah di kemudian hari** (misalnya update v1.1):
1. Tempel ulang seluruh isi `apps-script/Code.gs` → Save.
2. Jalankan **`setup`** sekali lagi. Aman: data tidak dihapus, hanya menambah key Config yang baru (mis. `project_end`).
3. Deploy → *Manage deployments* → ✏ edit → Version: **New version** → Deploy. URL tetap sama, `config.js` tidak perlu diubah.

## 3. Sambungkan aplikasi

Buka [`config.js`](config.js) dan isi URL tadi:

```js
window.HSE_CONFIG = {
  apiUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec'
};
```

Coba di komputer:

```bash
python -m http.server 8765
```

Buka <http://localhost:8765>, masuk dengan nama + PIN, lalu coba isi manpower. Barisnya harus muncul di sheet **Manpower**.

## 4. Online di GitHub Pages

1. Buat repository baru di GitHub, misalnya `hse-monitoring`.
   - GitHub Pages gratis hanya untuk repo **Public**. Kode aplikasi jadi terbuka, tetapi **data tetap di Google Sheet** dan hanya bisa dibaca dengan PIN.
   - File Excel referensi tidak ikut di-upload (diatur di `.gitignore`).
2. Upload/push isi folder ini ke repo.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Setelah ±1 menit aplikasi aktif di `https://<username>.github.io/hse-monitoring/`.
5. Bagikan link + PIN ke tim. Di HP buka link → **Install App** / *Add to Home Screen*.

**Setiap update aplikasi:** naikkan `VERSION` di `sw.js` (mis. `hse-v1.1`) supaya HP pengguna mengambil versi baru.

---

## Keamanan & operasional

| Hal | Rekomendasi |
|---|---|
| PIN | Ganti `pin` berkala / saat ada anggota tim keluar. Cukup ubah di sheet Config, tidak perlu deploy ulang. |
| Akses Sheet | Share Google Sheet hanya ke admin HSE (Editor) dan manajemen (Viewer). Petugas lapangan cukup pakai aplikasi. |
| Foto | Disimpan di folder Drive *HSE Monitoring – Foto* dengan akses *siapa pun yang punya link* agar bisa tampil di aplikasi. Jangan foto wajah/identitas korban. |
| Audit | Semua penyimpanan tercatat di sheet **Log** (waktu, nama, role, aksi). |
| Backup | Google Sheet punya *Version history*. Disarankan *File → Make a copy* tiap akhir bulan. |
| Kuota | Akun Gmail biasa: ±20.000 panggilan API/hari, lebih dari cukup untuk 1 proyek. |
