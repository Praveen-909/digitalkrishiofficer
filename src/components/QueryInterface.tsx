import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Mic, Camera, Send, Upload, Languages } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface QueryInterfaceProps {
  onSubmitQuery: (query: string, type: string) => void;
  isLoading?: boolean;
}

export function QueryInterface({ onSubmitQuery, isLoading = false }: QueryInterfaceProps) {
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmitQuery(query, "text");
      setQuery("");
      toast.success("Query submitted successfully!");
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      toast.success("Voice recording started");
      setTimeout(() => {
        setIsRecording(false);
        setQuery("വാഴയിലെ ഇല പൊള്ളലിന് എന്ത് മരുന്ന് ഉപയോഗിക്കാം?");
        toast.success("Voice recorded and converted to text");
      }, 3000);
    }
  };

  const handleImageUpload = () => {
    // Simulate image upload
    onSubmitQuery("Uploaded image of banana leaf with brown spots", "image");
    toast.success("Image uploaded and analyzed");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ask Your Question</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <Languages className="h-3 w-3" />
            മലയാളം
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea 
            placeholder="നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക... (Type your question here in Malayalam or English)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleVoiceRecord}
            variant={isRecording ? "destructive" : "outline"}
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            {isRecording ? "Recording..." : "Voice Input"}
          </Button>
          
          <Button 
            onClick={handleImageUpload}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Upload Image
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full flex items-center gap-2"
          disabled={!query.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
          {isLoading ? "Processing..." : "Submit Query"}
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>You can ask about:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Crop diseases and treatments</li>
            <li>Fertilizer recommendations</li>
            <li>Weather-based farming advice</li>
            <li>Government schemes and subsidies</li>
            <li>Market prices and trends</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}