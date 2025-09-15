import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User, MapPin, Wheat, Calendar } from "lucide-react";

export function FarmerProfile() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Farmer Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="രാജു കുമാർ" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Input id="location" placeholder="തിരുവനന്തപുരം, കേരളം" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Primary Crops</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Wheat className="h-3 w-3" />
              വാഴ (Banana)
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Wheat className="h-3 w-3" />  
              തേങ്ങ (Coconut)
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Wheat className="h-3 w-3" />
              കുരുമുളക് (Pepper)
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Farm Size</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select farm size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (&lt; 2 acres)</SelectItem>
              <SelectItem value="medium">Medium (2-10 acres)</SelectItem>
              <SelectItem value="large">Large (&gt; 10 acres)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (&lt; 2 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (2-10 years)</SelectItem>
              <SelectItem value="expert">Expert (&gt; 10 years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Update Profile</Button>
      </CardContent>
    </Card>
  );
}