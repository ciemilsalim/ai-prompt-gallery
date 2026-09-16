# Design System & UI Specifications (Mobile-First Focus)

## 1. Theme & Color Palette
- Theme: Dark Mode Native (`bg-zinc-950` base).
- Surface/Cards: `bg-zinc-900` dengan border tipis `border-zinc-800`.
- Primary Accent (Affiliate CTA): Emerald vibran (`bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold`).
- Action Secondary (Copy Button): `bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium`.
- Text: Heading `text-zinc-100`, Body/Prompt `text-zinc-300`, Subdued `text-zinc-500`.

## 2. Layout & Viewport Strategy
- Mobile (< 640px): 1 kolom penuh (`grid-cols-1 gap-5 px-4 py-4`).
- Tablet (640px - 1024px): 2 kolom (`sm:grid-cols-2 gap-4 max-w-4xl mx-auto px-4`).
- Desktop (> 1024px): 3 hingga 4 kolom (`lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-6`).

## 3. Component Specification: `PromptCard.jsx`
- Media Box:
  - Aspect ratio: `aspect-[9/16]` atau `aspect-[4/5]`, rounded corners `rounded-xl`, overflow-hidden.
  - Video handling: `playsinline`, `muted`, `loop`, `preload="none"`.
  - Viewport-based Autoplay: Manfaatkan `IntersectionObserver` agar video hanya berputar saat terlihat di layar HP untuk menghemat memori browser mobile.
  - Floating Badges:
    - Kiri atas: Tag AI Tool (`bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white`).
    - Kanan atas: Tag Kategori.
- Body Info:
  - Teks prompt dengan format monospace rapi (`font-mono text-xs text-zinc-300`).
  - Truncation `line-clamp-2` atau `line-clamp-3`.
- Ergonomic Bottom Action Bar (Touch-target >= 44px):
  - Tombol Salin Prompt: Full width atau 50% split. Klik memicu `navigator.clipboard.writeText`, menampilkan status feedback "✓ Tersalin" dan menembak event hit ke endpoint tracking copy.
  - Tombol Affiliate: Mengarah ke route redirect `/r/{slug}` dengan target `_blank`. Warna mencolok (`bg-emerald-500`).

## 4. Toast Notification
- Floating bar sederhana di bagian bawah layar (`fixed bottom-5 inset-x-4 max-w-xs mx-auto`).
- Muncul secara halus selama 2 detik saat prompt berhasil disalin.