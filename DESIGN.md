# Design System: Coastal Forest Heritage (Ka'tekora Eic Enggano)

Dokumen ini berisi token desain resmi yang diekstrak langsung dari proyek Stitch **"Ka'tekora Eic Enggano"** (`projects/17771895607661730142`). Seluruh komponen dan halaman web harus mengikuti token dan pedoman ini secara konsisten.

---

## 1. Konsep & Identitas Visual
- **Nama Tema**: *Coastal Forest Heritage*
- **Karakter**: Edukatif, Ramah, Organik-Modern (*Modern-Organic*), Terasa seperti cerita bersama di bawah balai desa Enggano (*Yub A'hau*).
- **Pendekatan Visual**: Menghindari kesan SaaS korporat yang kaku. Menggunakan *Earthy Minimalism*, kurva membulat lembut (*hyper-rounded*), dan kontras tinggi untuk kenyamanan membaca diakritik bahasa Enggano.

---

## 2. Palet Warna (Color Tokens)

### Warna Inti
| Token | Nilai Hex | Penggunaan |
|---|---|---|
| `primary` | `#004532` | Hijau Kanopi Hutan Tropis; tombol aksi utama, header navigasi |
| `primary-container` | `#065f46` | Hijau Zamrud dalam; kartu penting, aksen aktif |
| `on-primary` | `#ffffff` | Teks di atas warna primary |
| `on-primary-container`| `#8bd6b7` | Teks/ikon di atas primary container |
| `secondary` | `#006a61` | Hijau Laut / Teal Pesisir; elemen interaktif, tombol sekunder |
| `secondary-container`| `#86f2e4` | Latar badge selesai / interaksi positif |
| `on-secondary` | `#ffffff` | Teks di atas warna secondary |
| `on-secondary-container`| `#006f66` | Teks/ikon di atas secondary container |
| `tertiary` / `accent` | `#692800` | Cokelat Terakota / Kayu Adat (*Yub A'hau*); highlight, kuis aksi flip |
| `tertiary-container` | `#8b3b08` | Latar badge kuis / aksen aktif kuis |
| `on-tertiary` | `#ffffff` | Teks di atas warna tertiary |
| `on-tertiary-container`| `#ffb794` | Teks di atas tertiary container |

### Latar Belakang & Permukaan (Surface & Paper-like)
| Token | Nilai Hex | Penggunaan |
|---|---|---|
| `background` / `surface` | `#fbf9f5` | Krem kertas alami (low eye-strain) |
| `surface-container-lowest`| `#ffffff` | Kartu putih bersih di atas latar krem |
| `surface-container-low`| `#f5f3ef` | Latar card sekunder |
| `surface-container` | `#efeeea` | Latar bar pencarian, container netral |
| `surface-container-high`| `#eae8e4` | Border halus, garis pemisah |
| `surface-container-highest`| `#e4e2de` | State hover kartu |
| `on-surface` / `on-background`| `#1b1c1a` | Teks utama (hitam arang berbobot) |
| `on-surface-variant`| `#3f4944` | Teks sekunder, deskripsi, terjemahan |
| `outline` | `#6f7973` | Garis batas elemen interaktif |
| `outline-variant` | `#bec9c2` | Garis batas kartu & divider halus |

### Status & Feedback
| Token | Nilai Hex | Penggunaan |
|---|---|---|
| `success` | `#1b6b51` / `#006a61` | Jawaban kuis benar, status selesai |
| `error` | `#ba1a1a` | Jawaban kuis salah, peringatan |
| `error-container` | `#ffdad6` | Latar kartu jawaban salah |
| `on-error-container` | `#93000a` | Teks status salah |

---

## 3. Tipografi (Typography)

Mendukung penuh rendering karakter diakritik bahasa Enggano (**ẽ, ũ, ĩ, ã, Ė'**).

| Kategori | Font Family | Bobot (Weight) | Penggunaan |
|---|---|---|---|
| **Headings / Display** | `Quicksand`, sans-serif | 600, 700 | Judul modul, display banner, judul kartu kuis |
| **Body & Labels** | `Inter`, sans-serif | 400, 500, 600 | Kosakata Enggano, arti bahasa Indonesia, soal kuis, navigasi |

### Skala Tipografi
- `display-lg`: Quicksand 32px / 48px, Bold (Line-height: 1.25)
- `headline-md`: Quicksand 24px, SemiBold (Line-height: 1.3)
- `title-md`: Quicksand / Inter 18px-20px, SemiBold
- `body-lg`: Inter 18px, Regular (Line-height: 1.5 - menjaga jarak diakritik)
- `body-md`: Inter 16px, Regular (Line-height: 1.5)
- `label-sm`: Inter 13px-14px, SemiBold (Tracking: 0.05em)

---

## 4. Bentuk & Sudut (Corner Radius)
- **`rounded-sm`**: 8px (0.5rem)
- **`rounded-md`**: 16px (1rem) — default card & input field
- **`rounded-lg` / `rounded-2xl`**: 24px (1.5rem) — container besar
- **`rounded-3xl`**: 32px (2rem) — flashcard & hero card utama
- **`rounded-full`**: 9999px — tombol pill, badge status, avatar pill

---

## 5. Spacing & Layout
- **Base Grid**: 8px
- **Mobile Container Margin**: 16px - 20px
- **Desktop Max Container**: 720px (Mobile-Optimized Experience) hingga 1140px
- **Touch Target**: Minimal 48px x 48px untuk semua tombol dan elemen interaktif
- **Stack Gaps**:
  - `stack-sm`: 12px
  - `stack-md`: 24px
  - `stack-lg`: 48px

---

## 6. Gaya Komponen

### A. Tombol (Button)
- **Primary**: Pill (`rounded-full`), Background Emerald (`#004532` / `#065f46`), Teks putih Quicksand/Inter Bold, efek hover sedikit cerah & active `scale(0.98)`.
- **Secondary**: Pill (`rounded-full`), Background Teal (`#006a61`), Teks putih.
- **Tertiary / Accent**: Pill (`rounded-full`), Background Terracotta (`#8b3b08`), Teks putih.
- **Outline**: Pill, Border 2px `#004532`, Teks Emerald.

### B. Kartu (Card & Flashcard)
- **Card**: Latar `#ffffff` atau `#f5f3ef`, border 1px solid `#e4e2de`, bayangan halus (`shadow-sm` / `shadow-md`), `rounded-2xl` / `rounded-3xl`.
- **Flashcard**: Ukuran proporsional, 3D flip animation (`transform-style: preserve-3d`), sisi depan (kata Enggano besar + badge aksara), sisi belakang (terjemahan, contoh kalimat, catatan kultural).

### C. Navigasi Bawah (BottomNav)
- Fixed floating di bagian bawah layar dengan backdrop blur (`backdrop-blur-md bg-white/90`), border-top lembut, 3 tab:
  1. **Beranda** (`/`) — Icon Home
  2. **Modul** (`/modules`) — Icon MenuBook / AutoStories
  3. **Tentang** (`/about`) — Icon Info
