import { useState, useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RealTimeTemperature from "@/components/dashboard/RealTimeTemperature";
import TemperatureChart from "@/components/dashboard/TemperatureChart";
import EnergyStats from "@/components/dashboard/EnergyStats";
import EnergyChart from "@/components/dashboard/EnergyChart";
import ExpiryStock from "@/components/dashboard/ExpiryStock";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger loading animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-white to-brand-cyan/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-cyan/10"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
                <div className="flex items-center gap-3">
                  <img 
                    src="/iconsahabatbeku.jpg" 
                    alt="Sahabat Beku Logo" 
                    className="w-10 h-10 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-brand-text">
                      Dashboard <span className="text-brand-blue">Sahabat Freezer</span>
                    </h1>
                    <p className="text-sm text-gray-600">Monitoring Real-Time Freezer & Stok Management</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Live</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className={`container mx-auto px-6 py-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Top Row - Temperature */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <RealTimeTemperature />
            </div>
            <div className="lg:col-span-2">
              <TemperatureChart />
            </div>
          </div>

          {/* Middle Row - Energy */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <EnergyStats />
            </div>
            <div className="lg:col-span-2">
              <EnergyChart />
            </div>
          </div>

          {/* Bottom Row - Stock Management */}
          <div className="grid lg:grid-cols-1 gap-8">
            <ExpiryStock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
