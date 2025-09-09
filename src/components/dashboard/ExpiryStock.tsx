import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  Trash2,
  Edit3,
  Plus
} from "lucide-react";

interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  location: string;
  supplier: string;
  batchNumber: string;
  daysUntilExpiry: number;
}

const ExpiryStock = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'all' | '7d' | '14d' | '30d'>('all');
  const [sortBy, setSortBy] = useState<'expiry' | 'name' | 'quantity'>('expiry');

  // Generate sample stock data
  useEffect(() => {
    const generateStockData = (): StockItem[] => {
      const products = [
        { name: "Daging Sapi Giling", category: "Daging", unit: "kg" },
        { name: "Ayam Fillet", category: "Daging", unit: "kg" },
        { name: "Ikan Salmon", category: "Seafood", unit: "kg" },
        { name: "Udang Vannamei", category: "Seafood", unit: "kg" },
        { name: "Es Krim Vanilla", category: "Dairy", unit: "liter" },
        { name: "Keju Mozzarella", category: "Dairy", unit: "kg" },
        { name: "Sayuran Beku Mix", category: "Sayuran", unit: "kg" },
        { name: "Kentang Goreng", category: "Sayuran", unit: "kg" },
        { name: "Bakso Ikan", category: "Olahan", unit: "kg" },
        { name: "Nugget Ayam", category: "Olahan", unit: "kg" },
        { name: "Pizza Base", category: "Olahan", unit: "pcs" },
        { name: "Roti Tawar", category: "Bakery", unit: "loaf" }
      ];

      const locations = ["Freezer A1", "Freezer A2", "Freezer B1", "Freezer B2", "Freezer C1"];
      const suppliers = ["PT Segar Mandiri", "CV Frozen Foods", "Toko Beku Sejahtera", "UD Dingin Abadi"];

      return products.map((product, index) => {
        const now = new Date();
        const daysToExpiry = Math.floor(Math.random() * 45) + 1; // 1-45 days
        const expiryDate = new Date(now.getTime() + (daysToExpiry * 24 * 60 * 60 * 1000));
        
        return {
          id: `STK-${(index + 1).toString().padStart(3, '0')}`,
          name: product.name,
          category: product.category,
          quantity: Math.floor(Math.random() * 50) + 5,
          unit: product.unit,
          expiryDate,
          location: locations[Math.floor(Math.random() * locations.length)],
          supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
          batchNumber: `BTH${Math.floor(Math.random() * 9000) + 1000}`,
          daysUntilExpiry: daysToExpiry
        };
      });
    };

    setStockItems(generateStockData());
  }, []);

  // Filter and sort items
  useEffect(() => {
    let filtered = stockItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by category/days
    if (selectedCategory !== 'all') {
      const days = parseInt(selectedCategory.replace('d', ''));
      filtered = filtered.filter(item => item.daysUntilExpiry <= days);
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'expiry':
          return a.daysUntilExpiry - b.daysUntilExpiry;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [stockItems, searchTerm, selectedCategory, sortBy]);

  const getExpiryStatus = (days: number) => {
    if (days <= 7) return { 
      label: 'Kritis', 
      color: 'text-red-600', 
      bg: 'bg-red-100', 
      border: 'border-red-200',
      priority: 'high'
    };
    if (days <= 14) return { 
      label: 'Peringatan', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      border: 'border-yellow-200',
      priority: 'medium'
    };
    if (days <= 30) return { 
      label: 'Perhatian', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      border: 'border-blue-200',
      priority: 'low'
    };
    return { 
      label: 'Aman', 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      border: 'border-green-200',
      priority: 'none'
    };
  };

  const categoryCounts = {
    all: stockItems.length,
    '7d': stockItems.filter(item => item.daysUntilExpiry <= 7).length,
    '14d': stockItems.filter(item => item.daysUntilExpiry <= 14).length,
    '30d': stockItems.filter(item => item.daysUntilExpiry <= 30).length,
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-blue" />
              <span className="font-semibold text-gray-700">Manajemen Stok Kadaluarsa</span>
            </div>
            <Button variant="hero" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Stok
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-red-600">≤ 7 Hari</div>
                  <div className="text-2xl font-bold text-red-700">{categoryCounts['7d']}</div>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-yellow-600">≤ 14 Hari</div>
                  <div className="text-2xl font-bold text-yellow-700">{categoryCounts['14d']}</div>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600">≤ 30 Hari</div>
                  <div className="text-2xl font-bold text-blue-700">{categoryCounts['30d']}</div>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Stok</div>
                  <div className="text-2xl font-bold text-gray-700">{categoryCounts.all}</div>
                </div>
                <Package className="w-8 h-8 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari produk, kategori, atau lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {(['all', '7d', '14d', '30d'] as const).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? 'bg-brand-blue text-white' : ''} gap-2`}
                >
                  <Filter className="w-4 h-4" />
                  {category === 'all' ? 'Semua' : 
                   category === '7d' ? '≤7 Hari' :
                   category === '14d' ? '≤14 Hari' : '≤30 Hari'}
                  {category !== 'all' && (
                    <Badge className="ml-1 text-xs bg-white text-gray-700">
                      {categoryCounts[category]}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="expiry">Urutkan: Kadaluarsa</option>
              <option value="name">Urutkan: Nama</option>
              <option value="quantity">Urutkan: Kuantitas</option>
            </select>
          </div>

          {/* Stock List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500">Tidak ada stok yang ditemukan</div>
              </div>
            ) : (
              filteredItems.map((item) => {
                const status = getExpiryStatus(item.daysUntilExpiry);
                
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border-2 ${status.border} ${status.bg} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category} • {item.id}</p>
                          </div>
                          <Badge className={`${status.bg} ${status.color} border-0 text-xs`}>
                            {status.label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Kuantitas:</span>
                            <div className="font-medium">{item.quantity} {item.unit}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Kadaluarsa:</span>
                            <div className="font-medium">{formatDate(item.expiryDate)}</div>
                            <div className={`text-xs ${status.color}`}>
                              {item.daysUntilExpiry} hari lagi
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Lokasi:</span>
                            <div className="font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Supplier:</span>
                            <div className="font-medium">{item.supplier}</div>
                            <div className="text-xs text-gray-500">Batch: {item.batchNumber}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Buttons */}
          {categoryCounts['7d'] > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-red-800">Perhatian!</div>
                    <div className="text-sm text-red-700">
                      {categoryCounts['7d']} produk akan kadaluarsa dalam 7 hari
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                    Kirim Alert
                  </Button>
                  <Button variant="hero" size="sm">
                    Buat Promosi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiryStock;
