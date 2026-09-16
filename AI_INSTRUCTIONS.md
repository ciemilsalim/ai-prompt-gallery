# AI Development Guidelines & Rules

## 1. Tech Stack & Environment
- Backend: Laravel 11 / PHP 8.2+
- Frontend: React (Inertia.js + Vite)
- Styling: Tailwind CSS & Lucide React Icons
- Environment: Laragon (Local) -> Niagahoster Subdomain (Shared Hosting Production)

## 2. Coding Standards
- Laravel Backend:
  - Gunakan Eloquent Relationship lengkap (`belongsTo`, `hasMany`).
  - Validasi data input menggunakan `FormRequest` terpisah.
  - Untuk API Otomatisasi (`/api/v1/prompts`), gunakan proteksi sederhana via API Token header (`X-BOT-TOKEN` yang dicocokkan dengan config `.env`) agar bot Antigravity/Python masa depan mudah melakukan POST request tanpa login session yang rumit.
  - Selalu sertakan seeder awal untuk kategori umum (Cinematic, 3D Animation, Product, Fashion) dan tools AI (Higgsfield, Kling, OpenRouter).
- React + Inertia Frontend:
  - Tulis komponen fungsional bersih dengan hooks (`useState`, `useEffect`, `useRef`).
  - Letakkan komponen atom/molekul di `resources/js/Components/` dan halaman utama di `resources/js/Pages/`.
  - Gunakan `Inertia::render()` untuk passing data katalog dari Controller ke React.

## 3. Production Deployment Precautions (Shared Hosting)
- Jangan gunakan dynamic runtime Node server. Pastikan semua build asset dihasilkan melalui `npm run build`.
- Pastikan semua route asset di file Blade root (`app.blade.php`) menggunakan direktif `@vite(['resources/js/app.jsx'])` standar.
- Video preview disimpan berupa remote URL (Cloudinary/S3/URL eksternal) atau file terkompresi di folder `storage/` yang sudah di-symlink (`php artisan storage:link`).