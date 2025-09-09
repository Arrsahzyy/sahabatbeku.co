import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, LineChart, Calendar, Building2, TestTube, Download, Settings, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bell,
      title: "Alarm Telegram",
      description: "Kirim peringatan saat suhu melewati ambang, perubahan drastis, atau indikasi listrik padam.",
      bullets: [
        "Threshold bisa diatur sesuai kebutuhan",
        "Tes kirim dari dashboard untuk memastikan",
        "Riwayat alert lengkap dengan timestamp"
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      icon: LineChart,
      title: "Grafik 7 Hari",
      description: "Lihat min/avg/max per 5 menit dengan marker event (padam/alert/pintu sering dibuka).",
      bullets: [
        "Data historis suhu min/avg/max",
        "Marker event khusus untuk analisis",
        "Export data untuk laporan bulanan"
      ],
      color: "from-brand-blue to-brand-cyan",
      visual: "chart"
    },
    {
      icon: Calendar,
      title: "FEFO (Expire Reminder)",
      description: "Input batch via barcode atau manual, atur pengingat H-14/H-7/H-3/H-1, label Near-Expiry.",
      bullets: [
        "Input barcode scanner & manual entry",
        "Pengingat H-14/H-7/H-3/H-1 sebelum expire",
        "Label & kategorisasi Near-Expiry otomatis"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Building2,
      title: "Multi-Cabang (Multi-Tenant)",
      description: "Pilih cabang/toko dari selector, atur preferensi per toko tanpa login (demo).",
      bullets: [
        "Kelola multiple outlet dalam satu dashboard",
        "Pengaturan threshold per cabang",
        "Report konsolidasi semua lokasi"
      ],
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Fitur Lengkap <span className="text-brand-blue">Sahabat Freezer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empat fitur utama yang dirancang khusus untuk kebutuhan UMKM frozen food modern
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-2xl rounded-3xl overflow-hidden card-hover">
              <CardContent className="p-0">
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${feature.color} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-lg opacity-90 leading-relaxed">{feature.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Visual Demo for Chart Feature */}
                  {feature.visual === "chart" && (
                    <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-700">Grafik Suhu 7 Hari Terakhir</span>
                        <BarChart className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div className="h-32 bg-white rounded-xl p-4 flex items-end justify-around">
                        {[
                          { height: 65, label: "Sen" },
                          { height: 45, label: "Sel" },
                          { height: 70, label: "Rab" },
                          { height: 30, label: "Kam" },
                          { height: 60, label: "Jum" },
                          { height: 85, label: "Sab" },
                          { height: 75, label: "Min" }
                        ].map((day, dayIndex) => (
                          <div key={dayIndex} className="flex flex-col items-center gap-2">
                            <div
                              className="bg-gradient-to-t from-brand-blue to-brand-cyan rounded-sm w-6 transition-all duration-1000 animate-slide-up"
                              style={{ 
                                height: `${day.height}%`,
                                animationDelay: `${dayIndex * 100}ms`
                              }}
                            ></div>
                            <span className="text-xs text-gray-500">{day.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>Min: -20°C</span>
                        <span>Avg: -18°C</span>
                        <span>Max: -15°C</span>
                      </div>
                    </div>
                  )}

                  {/* Feature Bullets */}
                  <div className="space-y-4">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    {feature.title === "Alarm Telegram" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <TestTube className="w-4 h-4" />
                        Tes Kirim
                      </Button>
                    )}
                    {feature.title === "Grafik 7 Hari" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                      </Button>
                    )}
                    {feature.title === "FEFO (Expire Reminder)" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        Atur Reminder
                      </Button>
                    )}
                    {feature.title === "Multi-Cabang (Multi-Tenant)" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Kelola Cabang
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;