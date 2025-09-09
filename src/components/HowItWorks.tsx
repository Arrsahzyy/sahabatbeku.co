import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Thermometer, MessageSquare, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Wifi,
      title: "Colok & Hubungkan Wi-Fi",
      description: "Pasang perangkat ke listrik, sambungkan ke Wi-Fi toko Anda melalui dashboard sederhana.",
      details: "Setup awal hanya 5 menit"
    },
    {
      number: "02", 
      icon: Thermometer,
      title: "Pasang Sensor Suhu",
      description: "Letakkan probe sensor ke dalam freezer, posisikan di tengah untuk pembacaan optimal.",
      details: "Sensor tahan air & tahan dingin"
    },
    {
      number: "03",
      icon: MessageSquare,
      title: "Atur Ambang & Telegram",
      description: "Set threshold suhu dan masukkan chat ID Telegram untuk menerima notifikasi alarm.",
      details: "Panduan lengkap disediakan"
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Pantau & Dapatkan Alarm",
      description: "Monitor real-time via dashboard, lihat grafik 7 hari, dan kelola FEFO dengan mudah.",
      details: "Akses 24/7 dari mana saja"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-background via-white to-brand-cyan/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Cara Kerja <span className="text-brand-blue">Sahabat Freezer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empat langkah sederhana untuk mulai melindungi freezer dan stok Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan transform translate-x-4 z-0">
                  <div className="absolute right-0 top-1/2 transform translate-y--1/2 w-0 h-0 border-l-[8px] border-l-brand-cyan border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                </div>
              )}

              <Card className="border-0 shadow-xl rounded-3xl card-hover bg-white relative z-10 h-full">
                <CardContent className="p-8 text-center space-y-6">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white font-bold text-2xl flex items-center justify-center mx-auto">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto">
                    <step.icon className="w-7 h-7 text-brand-blue" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-brand-text">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    <div className="text-sm font-medium text-brand-blue bg-brand-blue/10 rounded-full px-3 py-1 inline-block">
                      {step.details}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="inline-block border-0 shadow-lg rounded-3xl bg-white p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-brand-text">Siap untuk Memulai?</h3>
              <p className="text-gray-600">Instalasi mudah, manfaat langsung terasa</p>
              <div className="flex items-center justify-center gap-2 text-sm text-brand-success">
                <div className="w-2 h-2 rounded-full bg-brand-success"></div>
                <span>Setup kurang dari 15 menit</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;