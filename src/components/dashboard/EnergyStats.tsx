import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, DollarSign, Activity, Calculator, TrendingDown, TrendingUp } from "lucide-react";

const EnergyStats = () => {
  const [currentPower, setCurrentPower] = useState(245); // Watts
  const [dailyEnergy, setDailyEnergy] = useState(5.88); // kWh
  const [monthlyCost, setMonthlyCost] = useState(265420); // Rupiah
  const [efficiency, setEfficiency] = useState(92); // Percentage
  const [isOptimal, setIsOptimal] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate power fluctuations
      setCurrentPower(prev => {
        const variation = (Math.random() - 0.5) * 20;
        return Math.round(Math.max(220, Math.min(280, prev + variation)));
      });

      // Update daily energy based on current power
      setDailyEnergy(prev => {
        const increment = (currentPower / 1000) * (2 / 3600); // Convert to kWh per 2 seconds
        return Math.round((prev + increment) * 100) / 100;
      });

      // Update monthly cost (assuming Rp 1,444.70 per kWh average in Indonesia)
      const dailyCost = dailyEnergy * 1444.70;
      setMonthlyCost(Math.round(dailyCost * 30));

      // Update efficiency
      setEfficiency(prev => {
        const variation = (Math.random() - 0.5) * 2;
        return Math.round(Math.max(85, Math.min(98, prev + variation)));
      });

      setIsOptimal(currentPower < 260 && efficiency > 90);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPower, dailyEnergy, efficiency]);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getEfficiencyStatus = (eff: number) => {
    if (eff >= 95) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (eff >= 90) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (eff >= 85) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const efficiencyStatus = getEfficiencyStatus(efficiency);

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-blue" />
              <span className="font-semibold text-gray-700">Konsumsi Energi</span>
            </div>
            <Badge className={`${isOptimal ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} border-0`}>
              {isOptimal ? 'Optimal' : 'Perlu Perhatian'}
            </Badge>
          </div>

          {/* Current Power */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-brand-blue transition-all duration-500">
              {currentPower}W
            </div>
            <div className="text-sm text-gray-600">Daya Saat Ini</div>
            <div className="flex items-center justify-center gap-1 text-xs">
              {currentPower > 260 ? (
                <>
                  <TrendingUp className="w-3 h-3 text-red-500" />
                  <span className="text-red-600">Tinggi</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3 text-green-500" />
                  <span className="text-green-600">Normal</span>
                </>
              )}
            </div>
          </div>

          {/* Power Range Indicator */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600 text-center">Range Normal: 200-250W</div>
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
              </div>
              <div className="absolute top-0 h-2 flex items-center">
                <div 
                  className="w-3 h-3 bg-white border-2 border-brand-blue rounded-full shadow-md transition-all duration-700"
                  style={{ 
                    marginLeft: `${Math.max(0, Math.min(100, ((currentPower - 200) / 100) * 100))}%`,
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>200W</span>
                <span>250W</span>
                <span>300W</span>
              </div>
            </div>
          </div>

          {/* Energy Statistics */}
          <div className="space-y-4">
            {/* Daily Energy */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Energi Hari Ini</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{dailyEnergy} kWh</div>
                <div className="text-xs text-gray-500">Target: 6.0 kWh</div>
              </div>
            </div>

            {/* Monthly Cost */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Biaya Bulanan</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{formatRupiah(monthlyCost)}</div>
                <div className="text-xs text-gray-500">Estimasi</div>
              </div>
            </div>

            {/* Efficiency */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Efisiensi</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{efficiency}%</div>
                <Badge className={`text-xs ${efficiencyStatus.bg} ${efficiencyStatus.color} border-0 px-2 py-1`}>
                  {efficiencyStatus.label}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Calculator className="w-4 h-4" />
              Hitung Estimasi Bulanan
            </Button>
            
            {!isOptimal && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800">Saran Optimalisasi:</div>
                    <div className="text-yellow-700 mt-1">
                      {currentPower > 260 && "Periksa suhu ruangan dan kebersihan kondensor."}
                      {efficiency < 90 && " Lakukan maintenance berkala untuk meningkatkan efisiensi."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Tarif Listrik:</span>
                <span>Rp 1.444,70/kWh</span>
              </div>
              <div className="flex justify-between">
                <span>Konsumsi Avg:</span>
                <span>{(dailyEnergy / 24).toFixed(2)} kWh/jam</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya/Hari:</span>
                <span>{formatRupiah(dailyEnergy * 1444.70)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyStats;
