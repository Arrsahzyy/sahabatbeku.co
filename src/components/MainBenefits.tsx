import { Card, CardContent } from "@/components/ui/card";
import { Bell, BarChart3, QrCode, Plug } from "lucide-react";

const MainBenefits = () => {
  const benefits = [
    {
      icon: Bell,
      title: "Alarm Otomatis ke Telegram",
      description: "Dapatkan notifikasi real-time saat suhu abnormal, listrik padam, atau pintu freezer terbuka terlalu lama.",
      features: ["Threshold suhu dapat diatur", "Riwayat semua alert", "Tes kirim dari dashboard"]
    },
    {
      icon: BarChart3,
      title: "Grafik Suhu 7 Hari",
      description: "Monitor tren suhu dengan data historis lengkap, mudah dibaca dengan marker event penting.",
      features: ["Data min/avg/max per 5 menit", "Marker event khusus", "Export data CSV"]
    },
    {
      icon: QrCode,
      title: "Pengingat Kadaluarsa (FEFO)",
      description: "Input stok via barcode atau manual, dapatkan reminder otomatis sebelum produk expire.",
      features: ["Input barcode & manual", "Reminder H-14/H-7/H-3/H-1", "Label Near-Expiry"]
    },
    {
      icon: Plug,
      title: "UI Sederhana, Cukup Colok & Jalan",
      description: "Instalasi mudah tanpa teknis rumit, langsung bisa digunakan oleh siapa saja di toko.",
      features: ["Plug & play setup", "Wi-Fi connection", "Dashboard intuitif"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-background to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Manfaat Utama <span className="text-brand-blue">Sahabat Freezer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empat fitur unggulan yang menyelesaikan masalah UMKM frozen food secara komprehensif
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-xl rounded-3xl card-hover bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-text mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="pl-18 space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-blue mb-2">24/7</div>
            <div className="text-gray-600">Monitoring Otomatis</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-cyan mb-2">5 Menit</div>
            <div className="text-gray-600">Interval Data Suhu</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-success mb-2">Instant</div>
            <div className="text-gray-600">Notifikasi Telegram</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBenefits;