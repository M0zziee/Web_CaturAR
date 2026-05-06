# Web_CaturAR

=======
bb35c0f (Update: menambahkan komponen AR dan memperbaiki UI)

# ♟ ChessAR - WebAR Chess Piece Visualizer

Aplikasi WebAR untuk memvisualisasikan bidak catur dalam format 3D menggunakan teknologi Augmented Reality di browser mobile.

![Version](https://img.shields.io/badge/version-1.0.1-blue)
![License](https://img.shields.io/badge/license-CC0-green)

## ✨ Fitur

- ✅ **Deteksi Marker Real-time** - Deteksi marker Hiro menggunakan AR.js
- ✅ **6 Jenis Bidak Catur** - Pawn, Rook, Knight, Bishop, Queen, King
- ✅ **2 Warna Bidak** - Putih dan Hitam
- ✅ **UI Interaktif** - Pilih bidak dengan tombol floating
- ✅ **Animasi 3D** - Fade-in animation + rotasi 360°
- ✅ **Tooltip Info** - Tampilkan nama bidak saat marker terdeteksi
- ✅ **Responsive Design** - Kompatibel mobile, tablet, dan desktop
- ✅ **Error Handling** - Null check + fallback mechanism
- ✅ **Theme Minimalis** - Warna merah-putih (#E03E3E, #FAD4D4)

## 🛠️ Tech Stack

| Komponen   | Teknologi                   |
| ---------- | --------------------------- |
| Build Tool | Vite 8.0.10                 |
| Language   | TypeScript                  |
| AR Engine  | AR.js 2.2.2 + A-Frame 1.4.0 |
| Styling    | Tailwind CSS 4.2.4          |
| 3D         | A-Frame Primitives          |

## 📁 Struktur Project

```
chess-ar/
├── index.html              # Entry point HTML
├── package.json            # Dependencies & npm scripts
├── vite.config.ts          # Vite + Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── main.ts            # Main AR.js logic
│   └── style.css          # Tailwind + custom styles
├── public/
│   ├── marker-hiro.html   # Marker download page
│   └── markers/           # Custom marker files
└── dist/                   # Production build output
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/chess-ar.git
cd chess-ar

# Install dependencies
npm install
```

### Development Mode

```bash
npm run dev
```

Buka http://localhost:5173 di browser

### Production Build

```bash
npm run build
```

Output ada di folder `dist/`

### Preview Production

```bash
npm run preview
```

## 📖 Cara Penggunaan

1. **Buka aplikasi** di browser mobile (Chrome/Android atau Safari/iOS)
2. **Berikan izin** akses kamera saat diminta
3. **Download/print marker Hiro** dari `public/marker-hiro.html` atau https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
4. **Arahkan kamera** ke marker hingga objek 3D muncul
5. **Pilih bidak catur** menggunakan tombol di bagian bawah
6. **Pilih warna** bidak (putih/hitam) sesuai preferensi
7. Nikmati pengalaman AR!

## 🎯 Bidak Catur yang Didukung

### Putih

| ID     | Symbol | Nama    | 3D Shape       |
| ------ | ------ | ------- | -------------- |
| pawn   | ♟      | Pion    | Cone           |
| rook   | ♜      | Benteng | Box            |
| knight | ♞      | Kuda    | Cylinder       |
| bishop | ♝      | Gajah   | Cone (tall)    |
| queen  | ♛      | Ratu    | Cone + Sphere  |
| king   | ♚      | Raja    | Cylinder + Box |

### Hitam

| ID     | Symbol | Nama          | 3D Shape       |
| ------ | ------ | ------------- | -------------- |
| pawn   | ♙      | Pion Hitam    | Cone           |
| rook   | ♖      | Benteng Hitam | Box            |
| knight | ♘      | Kuda Hitam    | Cylinder       |
| bishop | ♗      | Gajah Hitam   | Cone (tall)    |
| queen  | ♕      | Ratu Hitam    | Cone + Sphere  |
| king   | ♔      | Raja Hitam    | Cylinder + Box |

## 🎨 Desain

### Color Palette

- **Background**: `#FDFBF7` (Off-White)
- **Primary**: `#E03E3E` (Soft Cherry Red)
- **Secondary**: `#FAD4D4` (Blush Pink)
- **White Pieces**: `#FFFFFF` dengan edges `#333333`
- **Black Pieces**: `#1A1A1A` dengan edges `#000000`

### Typography

- **Font Family**: Inter, Montserrat
- **Headings**: Montserrat 600
- **Body**: Inter 400-500

### Responsiveness

| Device       | Breakpoint | UI Adaptation                 |
| ------------ | ---------- | ----------------------------- |
| Mobile Small | < 480px    | Buttons 42px, compact layout  |
| Mobile       | < 768px    | Buttons 46px                  |
| Tablet       | < 1024px   | Buttons 48px, larger touch    |
| Desktop      | > 1024px   | Full layout, keyboard support |
| Landscape    | -          | Horizontal button layout      |

## 🔧 Konfigurasi

### AR.js Configuration

```html
<a-scene
  arjs="sourceType: webcam;
        debugUIEnabled: false;
        detectionMode: mono_and_matrix;
        matrixCodeType: 3x3;"
  renderer="logarithmicDepthBuffer: true; antialias: true;"
></a-scene>
```

### Marker

- Default: **Hiro** (preset)
- Custom: Dapat generate di https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

## 📦 Build Output

| File       | Size       | Gzipped     |
| ---------- | ---------- | ----------- |
| index.html | 0.95 kB    | 0.49 kB     |
| index.css  | 9.58 kB    | 2.85 kB     |
| index.js   | 5.45 kB    | 2.03 kB     |
| **Total**  | **~16 kB** | **~5.4 kB** |

## ⚠️ Catatan Penting

1. **HTTPS Diperlukan** - Akses kamera hanya berfungsi di HTTPS (atau localhost)
2. **Kompatibilitas** - Best performance di Chrome (Android) dan Safari (iOS)
3. **Lighting** - Pastikan pencahayaan cukup untuk deteksi marker
4. **Camera Permission** - Jika ditolak, refresh dan coba lagi
5. **Browser Support** - AR.js tidak bekerja di Firefox (gunakan Chrome/Safari)

## 🔧 Changelog

### v1.0.1 (Mei 2026)

- **FIX**: A-Frame downgrade ke 1.4.0 untuk kompatibilitas AR.js
- **FIX**: Ganti CDN raw.githack → jsdelivr untuk AR.js
- **FIX**: Tambah null check dengan error handling
- **FIX**: Tambah loading timeout fallback (10 detik)
- **ENH**: Tambah dukungan bidak putih dan hitam
- **ENH**: Tambah responsive breakpoints untuk tablet/desktop
- **ENH**: Tambah resize handler untuk dynamic UI

### v1.0.0 (Mei 2026)

- Initial release

## 🔜 Roadmap

- [ ] Import 3D models (.glb) dari OpenGameArt
- [ ] Custom markers untuk setiap bidak
- [ ] Multiple markers simultaneously
- [ ] Animasi pergerakan bidak
- [ ] PWA support (offline capability)
- [ ] AI chess game integration
- [ ] Multiplayer chessAR mode

## 📄 License

CC0 - Public Domain

## 👤 Author

- Created: Mei 2026
- Project: ChessAR Web Experience
- Version: 1.0.1

## 🙏 Acknowledgments

- [AR.js](https://ar-js-org.github.io/AR.js/) - WebAR library
- [A-Frame](https://aframe.io/) - WebVR framework
- [OpenGameArt](https://opengameart.org/) - Free game assets
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
