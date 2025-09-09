import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, RotateCcw, Download } from "lucide-react";

const TemperatureChart = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);

  // Generate realistic temperature data
  const generateData = (range: '24h' | '7d' | '30d') => {
    const baseTemp = -18;
    const points = range === '24h' ? 24 : range === '7d' ? 168 : 720; // hours
    const data = [];
    
    for (let i = 0; i < points; i++) {
      const variation = Math.sin(i * 0.1) * 2 + (Math.random() - 0.5) * 3;
      const temp = baseTemp + variation;
      
      let timeLabel;
      const date = new Date();
      
      if (range === '24h') {
        date.setHours(date.getHours() - (24 - i));
        timeLabel = date.getHours().toString().padStart(2, '0') + ':00';
      } else if (range === '7d') {
        date.setHours(date.getHours() - (168 - i));
        timeLabel = date.getDate() + '/' + (date.getMonth() + 1);
      } else {
        date.setDate(date.getDate() - (30 - Math.floor(i / 24)));
        timeLabel = date.getDate() + '/' + (date.getMonth() + 1);
      }
      
      data.push({
        time: timeLabel,
        temp: Math.round(temp * 10) / 10,
        alert: temp > -15 ? 'critical' : temp > -17 ? 'warning' : null
      });
    }
    
    return data;
  };

  const chartData = generateData(timeRange);
  const visibleData = timeRange === '24h' ? chartData : 
                     timeRange === '7d' ? chartData.filter((_, i) => i % 6 === 0) : 
                     chartData.filter((_, i) => i % 24 === 0);

  const minTemp = Math.min(...chartData.map(d => d.temp));
  const maxTemp = Math.max(...chartData.map(d => d.temp));
  const avgTemp = chartData.reduce((sum, d) => sum + d.temp, 0) / chartData.length;

  const getYPosition = (temp: number) => {
    const range = maxTemp - minTemp;
    const normalizedTemp = (temp - minTemp) / range;
    return 180 - (normalizedTemp * 160); // Flip Y axis and add padding
  };

  const createPath = () => {
    if (visibleData.length === 0) return '';
    
    const width = 600;
    const stepX = width / (visibleData.length - 1);
    
    let path = `M 0 ${getYPosition(visibleData[0].temp)}`;
    
    for (let i = 1; i < visibleData.length; i++) {
      const x = i * stepX;
      const y = getYPosition(visibleData[i].temp);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-blue" />
              <span className="font-semibold text-gray-700">Grafik Suhu</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnimating(true)}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "bg-brand-blue text-white" : ""}
              >
                {range === '24h' ? '24 Jam' : range === '7d' ? '7 Hari' : '30 Hari'}
              </Button>
            ))}
          </div>

          {/* Statistics Row */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <div className="text-sm text-gray-500">Rata-rata</div>
              <div className="text-lg font-semibold text-brand-blue">{avgTemp.toFixed(1)}°C</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Minimum</div>
              <div className="text-lg font-semibold text-green-600">{minTemp.toFixed(1)}°C</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Maximum</div>
              <div className="text-lg font-semibold text-red-600">{maxTemp.toFixed(1)}°C</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 bg-gray-50 rounded-2xl p-6 relative">
            <div className={`absolute inset-6 transition-opacity duration-1000 ${
              isAnimating ? 'opacity-50' : 'opacity-100'
            }`}>
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>{maxTemp.toFixed(0)}°C</span>
                <span>{((maxTemp + minTemp) / 2).toFixed(0)}°C</span>
                <span>{minTemp.toFixed(0)}°C</span>
              </div>
              
              {/* Chart Area */}
              <div className="ml-12 h-full relative">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="tempGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.5"/>
                    </pattern>
                    <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--brand-blue))" />
                      <stop offset="50%" stopColor="hsl(var(--brand-cyan))" />
                      <stop offset="100%" stopColor="hsl(var(--brand-blue))" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--brand-blue))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--brand-blue))" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  <rect width="100%" height="100%" fill="url(#tempGrid)" />
                  
                  {/* Area Fill */}
                  <path
                    d={`${createPath()} L 600 200 L 0 200 Z`}
                    fill="url(#areaGradient)"
                    className={isAnimating ? 'animate-pulse' : ''}
                  />
                  
                  {/* Temperature Line */}
                  <path
                    d={createPath()}
                    fill="none"
                    stroke="url(#tempGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${isAnimating ? 'animate-pulse' : ''} transition-all duration-1000`}
                  />
                  
                  {/* Data Points */}
                  {visibleData.map((point, index) => {
                    const x = (index / (visibleData.length - 1)) * 600;
                    const y = getYPosition(point.temp);
                    
                    return (
                      <g key={index}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="4" 
                          fill="white" 
                          stroke="hsl(var(--brand-blue))" 
                          strokeWidth="2"
                          className="hover:r-6 transition-all cursor-pointer"
                        />
                        {point.alert && (
                          <circle 
                            cx={x} 
                            cy={y - 15} 
                            r="3" 
                            fill={point.alert === 'critical' ? '#ef4444' : '#f59e0b'}
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500 mt-2">
                {visibleData.filter((_, i) => i % Math.ceil(visibleData.length / 6) === 0).map((point, index) => (
                  <span key={index} className="text-center">{point.time}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Legend & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan rounded"></div>
                <span className="text-gray-600">Suhu Freezer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Peringatan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Kritis</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Update setiap 30 detik
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
