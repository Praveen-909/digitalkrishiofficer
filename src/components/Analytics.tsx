import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Zap,
  Droplets,
  Sun,
  Cloud,
  MapPin,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

// Mock analytics data
const cropProductionData = [
  { crop: 'Rice', production: 1200, yield: 3.2, area: 375, district: 'Kottayam' },
  { crop: 'Banana', production: 800, yield: 12.5, area: 64, district: 'Kottayam' },
  { crop: 'Coconut', production: 600, yield: 8.5, area: 70, district: 'Kottayam' },
  { crop: 'Rubber', production: 450, yield: 1.8, area: 250, district: 'Kottayam' },
  { crop: 'Spices', production: 300, yield: 2.1, area: 143, district: 'Kottayam' }
];

const monthlyQueryData = [
  { month: 'Jan', queries: 45, resolved: 42 },
  { month: 'Feb', queries: 52, resolved: 48 },
  { month: 'Mar', queries: 48, resolved: 46 },
  { month: 'Apr', queries: 61, resolved: 58 },
  { month: 'May', queries: 55, resolved: 53 },
  { month: 'Jun', queries: 67, resolved: 62 }
];

const diseaseIncidenceData = [
  { disease: 'Leaf Blight', cases: 23, severity: 'High' },
  { disease: 'Brown Spot', cases: 18, severity: 'Medium' },
  { disease: 'Blast', cases: 12, severity: 'High' },
  { disease: 'Sheath Rot', cases: 8, severity: 'Low' },
  { disease: 'Bacterial Leaf', cases: 15, severity: 'Medium' }
];

const farmerEngagementData = [
  { category: 'Active Users', value: 1250, color: '#0088FE' },
  { category: 'New Registrations', value: 280, color: '#00C49F' },
  { category: 'Monthly Queries', value: 420, color: '#FFBB28' },
  { category: 'Escalations', value: 85, color: '#FF8042' }
];

const weatherImpactData = [
  { month: 'Jan', rainfall: 15, temperature: 28, humidity: 75, impact: 'Low' },
  { month: 'Feb', rainfall: 8, temperature: 30, humidity: 70, impact: 'Low' },
  { month: 'Mar', rainfall: 25, temperature: 32, humidity: 68, impact: 'Medium' },
  { month: 'Apr', rainfall: 45, temperature: 31, humidity: 78, impact: 'Medium' },
  { month: 'May', rainfall: 180, temperature: 29, humidity: 85, impact: 'High' },
  { month: 'Jun', rainfall: 320, temperature: 27, humidity: 90, impact: 'High' }
];

export function Analytics() {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");

  const districts = [
    { value: "all", label: currentLanguage === 'ml' ? "എല്ലാ ജില്ലകൾ" : "All Districts" },
    { value: "kottayam", label: "കൊട്ടയം" },
    { value: "alappuzha", label: "ആലപ്പുഴ" },
    { value: "pathanamthitta", label: "പത്തനംതിട്ട" },
    { value: "kollam", label: "കൊല്ലം" }
  ];

  const timeframes = [
    { value: "1month", label: currentLanguage === 'ml' ? "കഴിഞ്ഞ മാസം" : "Last Month" },
    { value: "3months", label: currentLanguage === 'ml' ? "കഴിഞ്ഞ 3 മാസം" : "Last 3 Months" },
    { value: "6months", label: currentLanguage === 'ml' ? "കഴിഞ്ഞ 6 മാസം" : "Last 6 Months" },
    { value: "1year", label: currentLanguage === 'ml' ? "കഴിഞ്ഞ വർഷം" : "Last Year" }
  ];

  // Role-based data access
  const getAnalyticsScope = () => {
    if (user?.role === 'farmer') {
      return {
        title: currentLanguage === 'ml' ? 'എന്റെ കൃഷി വിശകലനം' : 'My Farm Analytics',
        description: currentLanguage === 'ml' ? 'നിങ്ങളു��െ കൃഷിയുടെ പ്രകടന വിശകലനം' : 'Your farm performance analytics'
      };
    } else if (user?.role === 'officer') {
      return {
        title: currentLanguage === 'ml' ? 'ബ്ലോക്ക് വിശകലനം' : 'Block Analytics',
        description: currentLanguage === 'ml' ? 'നിങ്ങളുടെ ബ്ലോക്കിലെ കൃഷി ഡാറ്റ' : 'Agricultural data for your assigned block'
      };
    } else {
      return {
        title: currentLanguage === 'ml' ? 'സമഗ്ര വിശകലനം' : 'Comprehensive Analytics',
        description: currentLanguage === 'ml' ? 'ബ്ലോക്ക്, ജില്ല, സംസ്ഥാന തല വിശകലനം' : 'Block, district, and state level analytics'
      };
    }
  };

  const analyticsScope = getAnalyticsScope();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{analyticsScope.title}</h1>
          <p className="text-muted-foreground mt-1">{analyticsScope.description}</p>
        </div>
        
        <div className="flex gap-2">
          {(user?.role === 'officer' || user?.role === 'admin') && (
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {districts.map(district => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map(timeframe => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'ml' ? 'മൊത്തം ചോദ്യങ്ങൾ' : 'Total Queries'}
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>
              {currentLanguage === 'ml' ? 'കഴിഞ്ഞ മാസത്തേക്കാൾ' : 'from last month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'ml' ? 'സജീവ കർഷകർ' : 'Active Farmers'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.1%
              </span>
              {currentLanguage === 'ml' ? 'പുതിയ രജിസ്ട്രേഷनുകൾ' : 'new registrations'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'ml' ? 'പരിഹാര നിരക്ക്' : 'Resolution Rate'}
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.3%
              </span>
              {currentLanguage === 'ml' ? 'മെച്ചപ്പെട്ട കാര്യക്ഷമത' : 'improved efficiency'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {currentLanguage === 'ml' ? 'ശരാശരി ഉത്പാദനം' : 'Avg Production'}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -1.2%
              </span>
              {currentLanguage === 'ml' ? 'കിലോഗ്രാം/ഏക്കർ' : 'kg per acre'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Production Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {currentLanguage === 'ml' ? 'വിള ഉത്പാദനം' : 'Crop Production'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cropProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} ${name === 'production' ? 'tons' : name === 'yield' ? 'tons/hectare' : 'hectares'}`,
                    name
                  ]}
                />
                <Bar dataKey="production" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Query Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {currentLanguage === 'ml' ? 'മാസിക ചോദ്യ ട്രെൻഡുകൾ' : 'Monthly Query Trends'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyQueryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="queries" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Disease Incidence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-500" />
              {currentLanguage === 'ml' ? 'രോഗ സംഭവങ്ങൾ' : 'Disease Incidence'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diseaseIncidenceData.map((disease, index) => (
                <div key={disease.disease} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`h-3 w-3 rounded-full ${
                        disease.severity === 'High' ? 'bg-red-500' :
                        disease.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm font-medium">{disease.disease}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{disease.cases} cases</span>
                    <Badge 
                      variant={disease.severity === 'High' ? 'destructive' : 
                               disease.severity === 'Medium' ? 'default' : 'secondary'}
                    >
                      {disease.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farmer Engagement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              {currentLanguage === 'ml' ? 'കർഷക ഇടപെടൽ' : 'Farmer Engagement'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={farmerEngagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {farmerEngagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weather Impact Analysis */}
      {(user?.role === 'officer' || user?.role === 'admin') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              {currentLanguage === 'ml' ? 'കാലാവസ്ഥാ സ്വാധീന വിശകലനം' : 'Weather Impact Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={weatherImpactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'rainfall' ? 'mm' : name === 'temperature' ? '°C' : '%'}`,
                    name
                  ]}
                />
                <Area yAxisId="left" type="monotone" dataKey="rainfall" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area yAxisId="right" type="monotone" dataKey="temperature" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Area yAxisId="right" type="monotone" dataKey="humidity" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Regional Performance (Admin only) */}
      {user?.role === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {currentLanguage === 'ml' ? 'പ്രാദേശിക പ്രകടനം' : 'Regional Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {districts.slice(1).map((district) => (
                <div key={district.value} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{district.label}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{currentLanguage === 'ml' ? 'കർഷകർ:' : 'Farmers:'}</span>
                      <span className="font-medium">{Math.floor(Math.random() * 500) + 200}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{currentLanguage === 'ml' ? 'ചോദ്യങ്ങൾ:' : 'Queries:'}</span>
                      <span className="font-medium">{Math.floor(Math.random() * 100) + 50}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{currentLanguage === 'ml' ? 'പരിഹാര നിരക്ക്:' : 'Resolution:'}</span>
                      <span className="font-medium text-green-600">{(Math.random() * 10 + 90).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}