import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Snowflake, Smartphone, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-brand-background via-white to-brand-cyan/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-cyan/10"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
                <span className="text-brand-blue">Sahabat Freezer</span>
                <br />
                Alarm Freezer & Pengingat Kadaluarsa untuk UMKM
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Selamatkan stok sebelum mencair, cegah rugi karena expire. Pantau suhu real-time, 
                grafik 7 hari, dan notifikasi Telegram otomatis.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={handleDemoClick}
              >
                Coba Demo Dashboard
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                Pelajari Fitur
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Dipercaya oleh UMKM di seluruh Indonesia</p>
              <div className="flex items-center gap-6 opacity-60">
                <div className="text-sm font-medium text-gray-600">Early Testers</div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="text-sm font-medium text-gray-600">Komunitas UMKM</div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="text-sm font-medium text-gray-600">Frozen Food Partners</div>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative animate-slide-up">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl card-hover">
              <div className="space-y-6">
                {/* Device Mockup */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 relative">
                  <div className="bg-brand-blue rounded-xl p-4 text-white text-center">
                    <Snowflake className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">Sahabat Freezer</div>
                    <div className="text-xs opacity-80">Status: Aktif</div>
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Suhu Saat Ini</div>
                    <div className="text-2xl font-bold text-brand-blue">-18°C</div>
                    <div className="text-xs text-brand-success">Normal</div>
                  </div>
                </div>
                
                {/* Phone Notification */}
                <div className="bg-gradient-to-r from-brand-blue to-brand-cyan rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-sm font-medium">Telegram Alert</span>
                  </div>
                  <div className="text-sm opacity-90">
                    🚨 Freezer Toko Barokah: Suhu naik ke -12°C. Periksa segera!
                  </div>
                  <div className="text-xs opacity-70 mt-2">Baru saja</div>
                </div>
                
                {/* Mini Chart */}
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Grafik 7 Hari</span>
                    <TrendingUp className="w-4 h-4 text-brand-success" />
                  </div>
                  <div className="h-16 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 rounded-lg flex items-end justify-around p-2">
                    {[65, 45, 70, 80, 60, 85, 75].map((height, index) => (
                      <div
                        key={index}
                        className="bg-brand-blue rounded-sm w-2 transition-all duration-1000 delay-[${index * 100}ms]"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;