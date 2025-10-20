# Wisma Eldorado

> Ikhtisar Singkat (untuk Klien)
>
> - Tipe kamar: Deluxe, Standard, Twin — harga flat Rp. 250.000 / malam
> - Fasilitas inti: AC, kamar mandi dalam (air panas), Wi‑Fi, TV kabel, parkir
> - Website: Halaman Kamar, Galeri, Booking, Kontak + Admin Panel
> - Kelebihan: Lokasi pusat kota, proses booking sederhana, audit log, keamanan RLS Supabase

## Informasi Website

- Halaman: `Rooms`, `Gallery`, `Booking`, `Contact`, `Admin`
- Booking Flow: Pilih kamar → Isi data → Admin konfirmasi → Check‑in/out
- Backend: Supabase (Auth, DB, RLS, Audit Log)

### Tipe Kamar & Harga

| Tipe Kamar | Harga per Malam | Fasilitas Utama |
| --- | --- | --- |
| Deluxe | Rp. 250.000 | AC, Kamar mandi dalam (air panas), Wi‑Fi, TV kabel |
| Standard | Rp. 250.000 | AC, Kamar mandi dalam (air panas), Wi‑Fi, TV kabel |
| Twin | Rp. 250.000 | AC, Kamar mandi dalam (air panas), Wi‑Fi, TV kabel |

### Kelebihan Utama

- Lokasi di pusat Kota Waingapu, akses mudah
- Harga flat dan transparan: Rp. 250.000 / malam
- UI modern dan cepat, ramah perangkat mobile
- Panel admin lengkap + audit trail otomatis
- Keamanan data kuat (Auth + RLS Supabase)

Website resmi untuk Wisma Eldorado - Penginapan nyaman di Waingapu, Sumba Timur.

## Tentang Wisma Eldorado

Wisma Eldorado menyediakan 6 kamar ber-AC yang nyaman di pusat Kota Waingapu, Sumba Timur. Dengan harga terjangkau Rp. 250.000 per malam, kami menawarkan fasilitas lengkap dan pelayanan ramah untuk kenyamanan tamu.

### Harga & Kamar
- Deluxe Room — Rp. 250.000 / malam
- Standard Room — Rp. 250.000 / malam
- Twin Room — Rp. 250.000 / malam

Semua kamar dilengkapi AC, kamar mandi dalam (air panas), Wi‑Fi, TV kabel, dan fasilitas penunjang lainnya.

## Fitur Website

- **Halaman Utama**: Profil singkat, fasilitas utama, CTA pemesanan
- **Kamar**: Daftar tipe kamar beserta harga per malam
- **Galeri**: Foto-foto kamar, lobby, dan area sekitar
- **Pemesanan**: Sistem booking online sederhana
- **Kontak**: Informasi alamat dan cara menghubungi
- **Admin Panel**: Dasbor internal untuk pengelolaan operasional

### Fitur Admin
- Dashboard ringkasan (statistik pemesanan, okupansi, pendapatan)
- Manajemen pemesanan (lihat, konfirmasi, ubah status)
- Manajemen kamar (ketersediaan, detail kamar)
- Laporan keuangan sederhana
- Audit log & perlindungan data
- Pengaturan akun admin

## Kelebihan

- **Lokasi strategis**: Di pusat Kota Waingapu, mudah diakses
- **Harga terjangkau**: Flat Rp. 250.000/malam dengan fasilitas lengkap
- **Kenyamanan modern**: AC, air panas, Wi‑Fi cepat, TV kabel
- **Pengalaman mulus**: Website cepat (Vite) dan UI modern (shadcn/ui)
- **Manajemen efisien**: Panel admin untuk operasi harian
- **Keamanan data**: Autentikasi dan kontrol akses via Supabase

## Ringkasan untuk Klien (Maksimal Info)

### Nilai Utama untuk Tamu
- Proses pemesanan online yang sederhana dan cepat
- Informasi kamar, fasilitas, dan harga yang jelas dan transparan
- Respons cepat: kontak dan lokasi tertera jelas

### Nilai Utama untuk Pengelola (Admin)
- Dasbor ringkas untuk memantau pemesanan, ketersediaan, dan pendapatan
- Audit log komprehensif untuk semua perubahan data (bukti jejak perubahan)
- Laporan sederhana untuk tinjauan performa harian/mingguan
- Keamanan data berbasis RLS (Row Level Security) di Supabase

### Alur Pemesanan (End-to-End)
1. Pengunjung membuka situs dan melihat tipe kamar serta harga
2. Pengunjung melakukan pemesanan melalui halaman Booking
3. Data pemesanan tercatat, admin meninjau dan mengonfirmasi
4. Status pemesanan diperbarui (pending → confirmed/check‑in/check‑out)
5. Riwayat dan perubahan tercatat otomatis pada audit log

### Fitur Operasional Kunci
- Manajemen kamar (ketersediaan, detail, harga per malam)
- Manajemen pemesanan (konfirmasi, perubahan status, catatan)
- Ringkasan pendapatan dan okupansi (tampilan grafis ringkas)
- Pengaturan profil dan akses admin (admin/manager)
- Pencatatan kejadian keamanan (login gagal, aktivitas mencurigakan)

### Keamanan & Perlindungan Data
- Supabase Auth untuk autentikasi admin
- RLS di semua tabel inti (admin_users, bookings, rooms, settings, audit_logs)
- Audit trail otomatis (INSERT/UPDATE/DELETE) melalui trigger database
- Log peristiwa keamanan (security_events) dan pencadangan sistem (system_backups)

### Performa & SEO
- Build cepat dengan Vite; UI responsif dan modern
- Aset teroptimasi (gambar, CSS, JS) dan caching bawaan Vite
- Struktur semantik untuk membantu SEO on‑page

## Kebijakan & Informasi Menginap

- **Waktu Check-in**: 14.00 WITA (early check‑in tergantung ketersediaan)
- **Waktu Check-out**: 12.00 WITA (late check‑out dapat dikenakan biaya)
- **Kapasitas Kamar**: Maks. 2 tamu per kamar
- **Kebijakan Anak**: Anak di bawah 6 tahun menginap gratis dengan orang tua
- **Kebijakan Rokok**: Area kamar bebas rokok; area merokok tersedia di luar
- **Parkir**: Gratis untuk tamu

## Pembayaran & Pembatalan

- **Metode Pembayaran**: Tunai, Transfer Bank; opsi nontunai dapat ditambahkan sesuai kesepakatan
- **Kebijakan Pembatalan**: Gratis hingga 24 jam sebelum check‑in; kurang dari itu dikenakan biaya 1 malam
- **No‑Show**: Dikenakan biaya 1 malam
- **Deposit**: Opsional saat periode ramai; diinformasikan saat konfirmasi

## FAQ

- **Apakah ada Wi‑Fi?** Ya, gratis di seluruh area.
- **Apakah tersedia air panas?** Ya, di semua kamar.
- **Apakah sarapan termasuk?** Tidak termasuk; tersedia dapur bersama.
- **Apakah bisa tambah extra bed?** Tergantung ketersediaan, mungkin dikenakan biaya tambahan.
- **Apakah ada layanan antar‑jemput?** Dapat dibantu berdasarkan permintaan dan ketersediaan.

## Dukungan & Pemeliharaan

- **SLA Operasional**: Aplikasi front‑end statis, waktu henti minimal saat update
- **Backup Data**: Tersedia tabel `system_backups` dan log keamanan `security_events` di database
- **Audit Trail**: Semua perubahan penting tercatat otomatis di `audit_logs`
- **Skalabilitas**: Infrastruktur Supabase dan build Vite memudahkan penskalaan

## Deployment

- **Build**: `npm run build` menghasilkan output produksi di folder `dist/`
- **Hosting yang disarankan**: Static hosting (Netlify, Vercel, Cloudflare Pages) + Supabase untuk backend
- **Environment**: Konfigurasi kredensial Supabase melalui variabel lingkungan (.env)

## Teknologi yang Digunakan

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Database**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Instalasi dan Menjalankan Proyek

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd wismaeldorado-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit file `.env.local` dan isi dengan konfigurasi Supabase Anda.

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Build untuk production**
   ```bash
   npm run build
   ```

6. **Preview build lokal (opsional)**
   ```bash
   npm run preview
   ```

## Struktur Proyek

```
src/
├── components/          # Komponen React yang dapat digunakan ulang
│   ├── ui/             # Komponen UI dari shadcn/ui
│   ├── Footer.tsx      # Footer website
│   └── Navigation.tsx  # Navigasi utama
├── pages/              # Halaman-halaman website
│   ├── Index.tsx       # Halaman utama
│   ├── Rooms.tsx       # Halaman kamar
│   ├── Gallery.tsx     # Halaman galeri
│   ├── Booking.tsx     # Halaman pemesanan
│   ├── Contact.tsx     # Halaman kontak
│   └── Admin.tsx       # Panel admin
├── assets/             # Gambar dan aset lainnya
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # Integrasi dengan layanan eksternal
    └── supabase/       # Konfigurasi Supabase
```

## Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini adalah properti Wisma Eldorado. Semua hak cipta dilindungi.

## Kontak

- **Alamat**: Jl. Raya Waingapu No. 8, Pusat Kota, Sumba Timur, NTT, Indonesia
- **Telepon**: +62 812-3456-7890
- **Email**: info@wismaeldorado.com
- **Website**: https://wismaeldorado.com

---

© 2024 Wisma Eldorado. All rights reserved.