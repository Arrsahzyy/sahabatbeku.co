import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Send,
  Eye,
  Calendar,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DemoSection = () => {
  const navigate = useNavigate();
  const [currentTemp, setCurrentTemp] = useState(-18);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => {
        const variation = (Math.random() - 0.5) * 2;
        return Math.round((prev + variation) * 10) / 10;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tempStatus = currentTemp >= -15 ? 'critical' : currentTemp >= -17 ? 'warning' : 'normal';
  
  const statusConfig = {
    normal: { color: 'text-brand-success', bg: 'bg-brand-success/10', label: 'Aman' },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Peringatan' },
    critical: { color: 'text-brand-danger', bg: 'bg-brand-danger/10', label: 'Kritis' }
  };

  const chartData = [
    { time: '00:00', temp: -18.5, event: null },
    { time: '04:00', temp: -18.2, event: null },
    { time: '08:00', temp: -16.8, event: 'door' },
    { time: '12:00', temp: -18.1, event: null },
    { time: '16:00', temp: -12.3, event: 'alert' },
    { time: '20:00', temp: -18.0, event: null },
    { time: '24:00', temp: -18.3, event: null }
  ];

  const recentAlerts = [
    { time: '15:45', message: 'Suhu naik ke -12°C, periksa segera!', type: 'critical' },
    { time: '08:30', message: 'Pintu freezer terbuka > 5 menit', type: 'warning' },
    { time: '03:20', message: 'Sistem kembali normal', type: 'normal' }
  ];

  const handleTestSend = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Demo <span className="text-brand-blue">Sahabat Freezer</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat langsung bagaimana dashboard bekerja untuk memantau freezer dan mengelola stok Anda
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status Card */}
          <Card className="lg:col-span-1 border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-brand-blue" />
                  <span className="font-semibold text-gray-700">Status Freezer</span>
                </div>
                
                {/* Temperature Display */}
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-brand-blue transition-all duration-500">
                    {currentTemp}°C
                  </div>
                  
                  <Badge className={`${statusConfig[tempStatus].bg} ${statusConfig[tempStatus].color} border-0 text-sm px-4 py-2`}>
                    {statusConfig[tempStatus].label}
                  </Badge>
                  
                  <div className="text-sm text-gray-500">
                    Update terakhir: {new Date().toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Min Hari Ini</div>
                    <div className="font-semibold text-brand-text">-19.2°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Max Hari Ini</div>
                    <div className="font-semibold text-brand-text">-16.8°C</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Card */}
          <Card className="lg:col-span-2 border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-blue" />
                  <span className="font-semibold text-gray-700">Grafik Suhu 24 Jam</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => navigate("/dashboard")}
                >
                  <Eye className="w-4 h-4" />
                  Lihat Dashboard Lengkap
                </Button>
              </div>

              {/* Chart Area */}
              <div className="h-64 bg-gray-50 rounded-2xl p-6 relative">
                <div className="absolute inset-6">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                    <span>-10°C</span>
                    <span>-15°C</span>
                    <span>-20°C</span>
                  </div>
                  
                  {/* Chart Line */}
                  <div className="ml-8 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Grid Lines */}
                      <defs>
                        <pattern id="grid" width="57" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 57 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Temperature Line */}
                      <path
                        d="M 0 80 L 57 85 L 114 130 L 171 82 L 228 160 L 285 84 L 342 78"
                        fill="none"
                        stroke="url(#tempGradient)"
                        strokeWidth="3"
                        className="animate-draw-line"
                      />
                      
                      {/* Gradient Definition */}
                      <defs>
                        <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--brand-blue))" />
                          <stop offset="100%" stopColor="hsl(var(--brand-cyan))" />
                        </linearGradient>
                      </defs>
                      
                      {/* Event Markers */}
                      {chartData.map((point, index) => (
                        point.event && (
                          <g key={index}>
                            <circle cx={index * 57} cy={point.event === 'alert' ? 160 : 130} r="4" fill="#ef4444" />
                            <text x={index * 57} y={point.event === 'alert' ? 180 : 150} textAnchor="middle" fontSize="10" fill="#6b7280">
                              {point.event === 'alert' ? '⚠️' : '🚪'}
                            </text>
                          </g>
                        )
                      ))}
                    </svg>
                  </div>
                  
                  {/* X-Axis Labels */}
                  <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2">
                    {chartData.map((point, index) => (
                      <span key={index}>{point.time}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan"></div>
                  <span className="text-gray-600">Suhu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-gray-600">Alert</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚪</span>
                  <span className="text-gray-600">Pintu Terbuka</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Alerts */}
          <Card className="border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-700">Alert Terbaru</span>
                </div>
                <Badge className="bg-brand-blue/10 text-brand-blue border-0">
                  Live
                </Badge>
              </div>

              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      alert.type === 'critical' ? 'bg-red-100' :
                      alert.type === 'warning' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      {alert.type === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      ) : alert.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                      <div className="text-xs text-gray-500">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Controls */}
          <Card className="border-0 shadow-xl rounded-3xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Send className="w-5 h-5 text-brand-blue" />
                <span className="font-semibold text-gray-700">Uji Fitur</span>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleTestSend}
                  className={`w-full gap-2 ${isAnimating ? 'animate-pulse' : ''}`}
                  variant="hero"
                >
                  <Send className="w-4 h-4" />
                  {isAnimating ? 'Mengirim...' : 'Uji Kirim Telegram'}
                </Button>

                {isAnimating && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Pesan test berhasil dikirim ke Telegram!</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Activity className="w-4 h-4" />
                    Buka Dashboard Lengkap
                  </Button>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="text-sm text-blue-700">
                  <strong>Mode Demo:</strong> Data ini adalah simulasi untuk demonstrasi. 
                  Perangkat asli akan menampilkan data real-time dari freezer Anda.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;