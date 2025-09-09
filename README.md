# Sahabat Freezer - Smart Freezer Monitoring & Stock Management

Sistem monitoring freezer pintar dan manajemen stok untuk UMKM dengan alarm real-time, grafik penggunaan energi, dan notifikasi kadaluarsa.

## 🚀 Features

### 📊 Dashboard Monitoring
- **Suhu Real-time**: Monitor suhu freezer dengan update setiap detik
- **Grafik Suhu**: Visualisasi data suhu 24 jam, 7 hari, 30 hari  
- **Status Alarm**: Indikator visual untuk kondisi normal, peringatan, dan kritis

### ⚡ Energy Management
- **Konsumsi Daya**: Monitor penggunaan listrik real-time dalam Watts
- **Kalkulasi Biaya**: Estimasi biaya listrik dalam Rupiah berdasarkan tarif PLN
- **Grafik Energi**: Analisis konsumsi energi harian, mingguan, bulanan
- **Efisiensi Tracker**: Monitor dan optimalisasi performa energi

### 📦 Stock Management
- **Tracking Kadaluarsa**: List produk yang akan expired ≤7, ≤14, ≤30 hari
- **FEFO System**: First Expired, First Out management
- **Batch Tracking**: Nomor batch dan supplier information
- **Alert System**: Notifikasi untuk stok hampir kadaluarsa

### 🎨 User Experience
- **Responsive Design**: Optimal di desktop dan mobile
- **Real-time Updates**: Data ter-update otomatis tanpa refresh
- **Interactive Charts**: Grafik interaktif dengan hover tooltips
- **Smooth Animations**: Animasi yang ringan dan interaktif

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Custom SVG charts with animations
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Arrsahzyy/sahabatbeku.co.git
cd sahabatbeku.co

# Install dependencies
npm install

# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:4000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📱 Usage

1. **Homepage**: Akses fitur-fitur utama dan demo
2. **Dashboard**: Klik "Coba Demo Dashboard" untuk monitoring lengkap
3. **Navigation**: Gunakan tombol navigasi untuk pindah antar halaman

## 🎯 Key Components

### Dashboard Components
- `RealTimeTemperature`: Display suhu real-time dengan status indicator
- `TemperatureChart`: Grafik suhu dengan multiple time ranges
- `EnergyStats`: Statistik konsumsi energi dan biaya
- `EnergyChart`: Visualisasi konsumsi energi dalam bar chart
- `ExpiryStock`: Management stok dengan kategorisasi kadaluarsa

### Main Pages  
- `Index`: Homepage dengan hero, features, dan demo section
- `Dashboard`: Halaman monitoring lengkap
- `NotFound`: 404 error page

## 🌟 Features Highlights

- ✅ Real-time temperature monitoring dengan animasi smooth
- ✅ Interactive charts dengan hover effects  
- ✅ Energy cost calculation dalam Rupiah
- ✅ Stock expiry management dengan color coding
- ✅ Responsive design untuk semua device
- ✅ Telegram notification simulation
- ✅ FEFO (First Expired First Out) system

## 🚀 Deployment

Website ini dapat di-deploy ke:
- Vercel (recommended)
- Netlify  
- GitHub Pages
- Atau hosting lainnya yang support static sites

```bash
# Build untuk production
npm run build

# File build ada di folder 'dist'
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- Website: [sahabatbeku.co](https://sahabatbeku.co)
- Email: support@sahabatbeku.co
- GitHub: [@Arrsahzyy](https://github.com/Arrsahzyy)

---

Made with ❤️ for UMKM Indonesia
