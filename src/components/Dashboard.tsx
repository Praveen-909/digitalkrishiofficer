import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export function Dashboard() {
  const weatherData = {
    temperature: 28,
    humidity: 76,
    rainfall: 12,
    windSpeed: 8,
    condition: "Partly Cloudy"
  };

  const cropStatus = [
    { crop: "വാഴ (Banana)", health: 85, status: "Good", issues: 0 },
    { crop: "തേങ്ങ (Coconut)", health: 92, status: "Excellent", issues: 0 },
    { crop: "കുരുമുളക് (Pepper)", health: 65, status: "Attention Needed", issues: 2 }
  ];

  const recentQueries = [
    { id: 1, query: "വാഴയിലെ ഇല പൊള്ളലിന് മരുന്ന്", status: "answered", time: "2 hours ago" },
    { id: 2, query: "Fertilizer for coconut trees", status: "answered", time: "1 day ago" },
    { id: 3, query: "Weather forecast for planting", status: "pending", time: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Digital Krishi Officer Dashboard</h1>
      
      {/* Weather Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-semibold">{weatherData.temperature}°C</p>
            </div>
            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weatherData.humidity}%</p>
            </div>
            <div className="text-center">
              <Cloud className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-muted-foreground">Rainfall</p>
              <p className="font-semibold">{weatherData.rainfall}mm</p>
            </div>
            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-teal-500" />
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{weatherData.windSpeed} km/h</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Badge variant="outline">{weatherData.condition}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Crop Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Crop Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cropStatus.map((crop, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{crop.crop}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={crop.status === "Excellent" ? "default" : crop.status === "Good" ? "secondary" : "destructive"}
                    >
                      {crop.status}
                    </Badge>
                    {crop.issues > 0 && (
                      <Badge variant="outline" className="text-orange-600">
                        {crop.issues} issues
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={crop.health} className="h-2" />
                <p className="text-sm text-muted-foreground">Health: {crop.health}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentQueries.map((query) => (
              <div key={query.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex-1">
                  <p className="font-medium">{query.query}</p>
                  <p className="text-sm text-muted-foreground">{query.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {query.status === "answered" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  )}
                  <Badge variant={query.status === "answered" ? "default" : "secondary"}>
                    {query.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}