import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wifi, AlertTriangle, CheckCircle } from "lucide-react";

const RealTimeTemperature = () => {
  const [currentTemp, setCurrentTemp] = useState(-18.2);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time temperature changes
      setCurrentTemp(prev => {
        const variation = (Math.random() - 0.5) * 1.5; // ±0.75°C variation
        const newTemp = prev + variation;
        // Keep temperature within realistic freezer range
        return Math.round(Math.max(-25, Math.min(-15, newTemp)) * 10) / 10;
      });
      setLastUpdate(new Date());
      
      // Simulate occasional connection issues
      setIsOnline(Math.random() > 0.05); // 95% uptime
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTempStatus = (temp: number) => {
    if (temp >= -15) return 'critical';
    if (temp >= -17) return 'warning';
    return 'normal';
  };

  const tempStatus = getTempStatus(currentTemp);
  
  const statusConfig = {
    normal: { 
      color: 'text-brand-success', 
      bg: 'bg-brand-success/10', 
      label: 'Aman',
      icon: CheckCircle,
      pulse: false
    },
    warning: { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      label: 'Peringatan',
      icon: AlertTriangle,
      pulse: true
    },
    critical: { 
      color: 'text-brand-danger', 
      bg: 'bg-brand-danger/10', 
      label: 'Kritis',
      icon: AlertTriangle,
      pulse: true
    }
  };

  const StatusIcon = statusConfig[tempStatus].icon;

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-brand-blue" />
              <span className="font-semibold text-gray-700">Suhu Realtime</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Temperature Display */}
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold transition-all duration-700 ${
              tempStatus === 'critical' ? 'text-brand-danger animate-pulse' :
              tempStatus === 'warning' ? 'text-yellow-600' : 'text-brand-blue'
            }`}>
              {currentTemp.toFixed(1)}°C
            </div>
            
            <Badge className={`${statusConfig[tempStatus].bg} ${statusConfig[tempStatus].color} border-0 text-sm px-4 py-2 ${
              statusConfig[tempStatus].pulse ? 'animate-pulse' : ''
            }`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {statusConfig[tempStatus].label}
            </Badge>
          </div>

          {/* Temperature Range Indicator */}
          <div className="space-y-3">
            <div className="text-sm text-gray-600 text-center">Target: -18°C ± 2°C</div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-danger via-yellow-400 to-brand-success"></div>
              </div>
              <div className="absolute top-0 h-2 flex items-center">
                <div 
                  className="w-3 h-3 bg-white border-2 border-brand-blue rounded-full shadow-md transition-all duration-700"
                  style={{ 
                    marginLeft: `${Math.max(0, Math.min(100, ((currentTemp + 25) / 10) * 100))}%`,
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>-25°C</span>
                <span>-20°C</span>
                <span>-15°C</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm text-gray-500">Min Hari Ini</div>
              <div className="font-semibold text-brand-text">-19.8°C</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Max Hari Ini</div>
              <div className="font-semibold text-brand-text">-16.5°C</div>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-center">
            <div className="text-xs text-gray-500">
              Update terakhir: {lastUpdate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeTemperature;
