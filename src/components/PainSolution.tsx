import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Thermometer, Calendar, CheckCircle } from "lucide-react";

const PainSolution = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Listrik Padam Tanpa Diketahui",
      description: "Freezer mati saat toko tutup, stok mencair, kerugian besar tanpa ada yang tahu sampai pagi.",
      color: "text-brand-danger"
    },
    {
      icon: Thermometer,
      title: "Suhu Naik Saat Toko Tutup",
      description: "Pintu freezer tidak tertutup rapat atau kompresor bermasalah saat tidak ada yang mengawasi.",
      color: "text-orange-500"
    },
    {
      icon: Calendar,
      title: "Barang Kedaluwarsa Terlewat",
      description: "Lupa rotasi stok FEFO, produk expire tidak terdeteksi, harus dibuang percuma.",
      color: "text-yellow-600"
    }
  ];

  const solutions = [
    {
      icon: CheckCircle,
      title: "Alarm Telegram Real-time",
      description: "Notifikasi otomatis saat suhu abnormal atau listrik padam langsung ke HP Anda.",
      color: "text-brand-success"
    },
    {
      icon: CheckCircle,
      title: "Grafik Suhu Historis 7 Hari",
      description: "Pantau tren suhu dengan data min/avg/max setiap 5 menit untuk analisis mendalam.",
      color: "text-brand-success"
    },
    {
      icon: CheckCircle,
      title: "Reminder FEFO Otomatis",
      description: "Pengingat H-14/H-7/H-3/H-1 sebelum kadaluarsa dengan sistem barcode dan manual.",
      color: "text-brand-success"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Problems Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Masalah yang Sering Dihadapi UMKM Frozen Food
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ketiga masalah ini bisa menyebabkan kerugian jutaan rupiah setiap bulannya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <Card key={index} className="border-0 shadow-lg rounded-3xl card-hover bg-white">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${problem.color.replace('text-', 'bg-')}/10 flex items-center justify-center mx-auto`}>
                    <problem.icon className={`w-8 h-8 ${problem.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Arrow Divider */}
        <div className="flex justify-center mb-20">
          <div className="bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full p-4">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Solusi Lengkap dari <span className="text-brand-blue">Sahabat Freezer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teknologi sederhana yang menyelesaikan semua masalah di atas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-2 border-brand-success/20 shadow-lg rounded-3xl card-hover bg-gradient-to-br from-white to-brand-success/5">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-success/10 flex items-center justify-center mx-auto">
                    <solution.icon className="w-8 h-8 text-brand-success" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-text">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Callout */}
        <Card className="mt-16 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-3xl border-0">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Kurangi Risiko Rugi Karena Freezer & Expire</h3>
            <p className="text-xl opacity-90 mb-6">
              Potensi penghematan hingga jutaan rupiah per bulan untuk UMKM
            </p>
            <div className="text-4xl font-bold">
              Rp 2.500.000+ <span className="text-lg font-normal opacity-80">potensi rugi terselamatkan/bulan</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PainSolution;