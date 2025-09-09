import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Calendar, Target, AlertCircle } from "lucide-react";

const EnergyChart = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);

  // Generate energy consumption data
  const generateEnergyData = (range: 'daily' | 'weekly' | 'monthly') => {
    const data = [];
    
    if (range === 'daily') {
      // 24 hours data
      for (let i = 0; i < 24; i++) {
        const baseConsumption = 0.25; // 250W baseline
        const variation = Math.sin(i * 0.3) * 0.05 + (Math.random() - 0.5) * 0.03;
        const consumption = baseConsumption + variation;
        const cost = consumption * 1444.70; // IDR per kWh
        
        data.push({
          time: i.toString().padStart(2, '0') + ':00',
          energy: Math.round(consumption * 1000) / 1000, // kWh
          cost: Math.round(cost),
          efficiency: Math.round((85 + Math.random() * 15)) // 85-100%
        });
      }
    } else if (range === 'weekly') {
      // 7 days data
      const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      for (let i = 0; i < 7; i++) {
        const baseConsumption = 6.0; // 6 kWh per day
        const weekendFactor = i >= 5 ? 0.8 : 1.0; // Less consumption on weekends
        const variation = (Math.random() - 0.5) * 1.0;
        const consumption = (baseConsumption * weekendFactor) + variation;
        const cost = consumption * 1444.70;
        
        data.push({
          time: days[i],
          energy: Math.round(consumption * 100) / 100,
          cost: Math.round(cost),
          efficiency: Math.round((87 + Math.random() * 10))
        });
      }
    } else {
      // 30 days data
      for (let i = 1; i <= 30; i++) {
        const baseConsumption = 6.0;
        const monthlyTrend = 1 + (Math.sin(i * 0.1) * 0.1); // Seasonal variation
        const variation = (Math.random() - 0.5) * 0.8;
        const consumption = (baseConsumption * monthlyTrend) + variation;
        const cost = consumption * 1444.70;
        
        data.push({
          time: i.toString(),
          energy: Math.round(consumption * 100) / 100,
          cost: Math.round(cost),
          efficiency: Math.round((85 + Math.random() * 12))
        });
      }
    }
    
    return data;
  };

  const chartData = generateEnergyData(timeRange);
  const maxEnergy = Math.max(...chartData.map(d => d.energy));
  const totalEnergy = chartData.reduce((sum, d) => sum + d.energy, 0);
  const totalCost = chartData.reduce((sum, d) => sum + d.cost, 0);
  const avgEfficiency = chartData.reduce((sum, d) => sum + d.efficiency, 0) / chartData.length;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBarHeight = (energy: number) => {
    return (energy / maxEnergy) * 180; // Max height 180px
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'bg-green-500';
    if (efficiency >= 90) return 'bg-blue-500';
    if (efficiency >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Show only a subset of data for better visualization
  const visibleData = timeRange === 'monthly' ? 
    chartData.filter((_, i) => i % 3 === 0) : // Every 3rd day for monthly
    chartData;

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-blue" />
              <span className="font-semibold text-gray-700">Grafik Konsumsi Energi</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-brand-blue/10 text-brand-blue border-0">
                Live Data
              </Badge>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            {(['daily', 'weekly', 'monthly'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? "bg-brand-blue text-white" : ""}
              >
                {range === 'daily' ? 'Harian' : range === 'weekly' ? 'Mingguan' : 'Bulanan'}
              </Button>
            ))}
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Konsumsi</div>
              <div className="text-lg font-semibold text-brand-blue">
                {totalEnergy.toFixed(1)} kWh
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Biaya</div>
              <div className="text-lg font-semibold text-green-600">
                {formatRupiah(totalCost)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Efisiensi Rata-rata</div>
              <div className="text-lg font-semibold text-purple-600">
                {avgEfficiency.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 bg-gray-50 rounded-2xl p-6 relative">
            <div className={`absolute inset-6 transition-opacity duration-1000 ${
              isAnimating ? 'opacity-50' : 'opacity-100'
            }`}>
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>{maxEnergy.toFixed(1)} kWh</span>
                <span>{(maxEnergy * 0.75).toFixed(1)}</span>
                <span>{(maxEnergy * 0.5).toFixed(1)}</span>
                <span>{(maxEnergy * 0.25).toFixed(1)}</span>
                <span>0</span>
              </div>
              
              {/* Chart Area */}
              <div className="ml-12 h-full relative flex items-end gap-1">
                {visibleData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group relative">
                    {/* Efficiency indicator */}
                    <div className={`w-2 h-1 ${getEfficiencyColor(item.efficiency)} rounded-full mb-1 opacity-60`}></div>
                    
                    {/* Energy bar */}
                    <div 
                      className={`w-full bg-gradient-to-t from-brand-blue to-brand-cyan rounded-t-lg transition-all duration-1000 hover:from-brand-cyan hover:to-brand-blue cursor-pointer ${
                        isAnimating ? 'animate-pulse' : ''
                      }`}
                      style={{ height: `${getBarHeight(item.energy)}px` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                        <div className="bg-gray-900 text-white p-3 rounded-lg text-xs whitespace-nowrap shadow-lg">
                          <div className="font-semibold">{item.time}</div>
                          <div>Energi: {item.energy} kWh</div>
                          <div>Biaya: {formatRupiah(item.cost)}</div>
                          <div>Efisiensi: {item.efficiency}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500 mt-2">
                {visibleData.filter((_, i) => 
                  timeRange === 'daily' ? i % 4 === 0 : 
                  timeRange === 'weekly' ? true : 
                  i % 2 === 0
                ).map((point, index) => (
                  <span key={index} className="text-center">{point.time}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Insights & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Performance Insight */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-800 text-sm">Performa Energi</div>
                  <div className="text-blue-700 text-sm mt-1">
                    Konsumsi {timeRange === 'daily' ? 'hari ini' : timeRange === 'weekly' ? 'minggu ini' : 'bulan ini'} 
                    {totalEnergy > (timeRange === 'daily' ? 6.5 : timeRange === 'weekly' ? 45 : 185) ? 
                      ' lebih tinggi dari target.' : ' sesuai target.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Alert */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-800 text-sm">Estimasi Biaya</div>
                  <div className="text-green-700 text-sm mt-1">
                    Penghematan {formatRupiah(Math.random() * 50000 + 10000)} dari target bulanan.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend & Controls */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-t from-brand-blue to-brand-cyan rounded"></div>
                <span className="text-gray-600">Konsumsi Energi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Efisiensi Tinggi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Efisiensi Sedang</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">
                Update setiap {timeRange === 'daily' ? 'jam' : 'hari'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
