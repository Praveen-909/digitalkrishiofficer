import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  AlertTriangle, 
  User, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Send,
  Filter,
  Plus,
  Search,
  Calendar,
  MapPin,
  Tag
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

interface Escalation {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerNameMl: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  category: 'disease' | 'pest' | 'weather' | 'soil' | 'equipment' | 'subsidy' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assignedOfficer?: string;
  assignedOfficerName?: string;
  createdAt: string;
  updatedAt: string;
  district: string;
  panchayat: string;
  responses: EscalationResponse[];
  images?: string[];
}

interface EscalationResponse {
  id: string;
  userId: string;
  userType: 'farmer' | 'officer' | 'admin';
  userName: string;
  message: string;
  timestamp: string;
}

const mockEscalations: Escalation[] = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'Rajesh Kumar',
    farmerNameMl: 'രാജേഷ് കുമാർ',
    title: 'Banana Leaf Blight Disease',
    titleMl: 'വാഴയിലെ ഇല പൊള്ളൽ രോഗം',
    description: 'Brown spots appearing on banana leaves, spreading rapidly',
    descriptionMl: 'വാഴയിലയിൽ തവിട്ട് നിറത്തിലുള്ള പാടുകൾ വേഗത്തിൽ പടരുന്നു',
    category: 'disease',
    priority: 'high',
    status: 'open',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    district: 'കൊട്ടയം',
    panchayat: 'വൈക്കം',
    responses: []
  },
  {
    id: '2',
    farmerId: '2',
    farmerName: 'Priya Nair',
    farmerNameMl: 'പ്രിയ നായർ',
    title: 'Pest Control in Paddy',
    titleMl: 'നെല്ലിൽ കീട നിയന്ത്രണം',
    description: 'Brown plant hopper infestation in paddy field',
    descriptionMl: 'നെൽവയലിൽ തവിട്ട് ചാടി പ്ലാന്റ് ഹോപ്പർ ആക്രമണം',
    category: 'pest',
    priority: 'medium',
    status: 'assigned',
    assignedOfficer: 'officer1',
    assignedOfficerName: 'Dr. Suresh Kumar',
    createdAt: '2025-01-14T14:20:00Z',
    updatedAt: '2025-01-14T16:45:00Z',
    district: 'കൊട്ടയം',
    panchayat: 'കുമരകം',
    responses: [
      {
        id: 'r1',
        userId: 'officer1',
        userType: 'officer',
        userName: 'Dr. Suresh Kumar',
        message: 'I will visit your farm tomorrow to assess the situation.',
        timestamp: '2025-01-14T16:45:00Z'
      }
    ]
  }
];

const mockOfficers = [
  { id: 'officer1', name: 'Dr. Suresh Kumar', specialization: 'Plant Pathology' },
  { id: 'officer2', name: 'Ms. Latha Menon', specialization: 'Pest Management' },
  { id: 'officer3', name: 'Mr. Arun Kumar', specialization: 'Soil Science' }
];

export function EscalationPanel() {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const [escalations, setEscalations] = useState<Escalation[]>(mockEscalations);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [newResponse, setNewResponse] = useState("");

  // Role-based filtering
  const getFilteredEscalations = () => {
    let filtered = escalations;

    // Role-based access control as per master prompt
    if (user?.role === 'farmer') {
      // Farmers can only see their own escalations
      filtered = filtered.filter(esc => esc.farmerId === user.id);
    } else if (user?.role === 'officer') {
      // Officers can only see escalations assigned to them
      filtered = filtered.filter(esc => esc.assignedOfficer === user.id);
    }
    // Admins can see all escalations (no filtering)

    // Apply search and category filters
    if (searchTerm) {
      filtered = filtered.filter(esc => 
        (currentLanguage === 'ml' ? esc.titleMl : esc.title)
          .toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(esc => esc.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(esc => esc.status === selectedStatus);
    }

    return filtered;
  };

  const categories = [
    { value: "all", label: currentLanguage === 'ml' ? "എല്ലാം" : "All" },
    { value: "disease", label: currentLanguage === 'ml' ? "രോഗം" : "Disease" },
    { value: "pest", label: currentLanguage === 'ml' ? "കീടം" : "Pest" },
    { value: "weather", label: currentLanguage === 'ml' ? "കാലാവസ്ഥ" : "Weather" },
    { value: "soil", label: currentLanguage === 'ml' ? "മണ്ണ്" : "Soil" },
    { value: "equipment", label: currentLanguage === 'ml' ? "ഉപകരണങ്ങൾ" : "Equipment" },
    { value: "subsidy", label: currentLanguage === 'ml' ? "സബ്സിഡി" : "Subsidy" },
    { value: "other", label: currentLanguage === 'ml' ? "മറ്റുള്ളവ" : "Other" }
  ];

  const statusOptions = [
    { value: "all", label: currentLanguage === 'ml' ? "എല്ലാം" : "All" },
    { value: "open", label: currentLanguage === 'ml' ? "തുറന്നത്" : "Open" },
    { value: "assigned", label: currentLanguage === 'ml' ? "അസൈൻ ചെയ്തത്" : "Assigned" },
    { value: "in_progress", label: currentLanguage === 'ml' ? "പുരോഗതിയിൽ" : "In Progress" },
    { value: "resolved", label: currentLanguage === 'ml' ? "പരിഹരിച്ചത്" : "Resolved" },
    { value: "closed", label: currentLanguage === 'ml' ? "അടച്ചത്" : "Closed" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignOfficer = (escalationId: string, officerId: string) => {
    if (user?.role !== 'admin') return;
    
    setEscalations(prev => prev.map(esc => 
      esc.id === escalationId 
        ? { 
            ...esc, 
            assignedOfficer: officerId,
            assignedOfficerName: mockOfficers.find(o => o.id === officerId)?.name,
            status: 'assigned' as const,
            updatedAt: new Date().toISOString()
          }
        : esc
    ));
  };

  const handleAddResponse = (escalationId: string) => {
    if (!newResponse.trim()) return;

    const response: EscalationResponse = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userType: user?.role || 'farmer',
      userName: user?.name || 'Unknown',
      message: newResponse,
      timestamp: new Date().toISOString()
    };

    setEscalations(prev => prev.map(esc => 
      esc.id === escalationId 
        ? { 
            ...esc, 
            responses: [...esc.responses, response],
            updatedAt: new Date().toISOString()
          }
        : esc
    ));

    setNewResponse("");
  };

  const filteredEscalations = getFilteredEscalations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {currentLanguage === 'ml' 
              ? (user?.role === 'farmer' ? 'സഹായ അഭ്യർത്ഥനകൾ' : 
                 user?.role === 'officer' ? 'അസൈൻ ചെയ്ത കേസുകൾ' : 'എല്ലാ എസ്കലേഷനുകൾ')
              : (user?.role === 'farmer' ? 'Support Requests' : 
                 user?.role === 'officer' ? 'Assigned Cases' : 'All Escalations')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentLanguage === 'ml' 
              ? (user?.role === 'farmer' ? 'നിങ്ങളുടെ സഹായ അഭ്യർത്ഥനകൾ' : 
                 user?.role === 'officer' ? 'നിങ്ങൾക്ക് അസൈൻ ചെയ്�� കേസുകൾ' : 'ബ്ലോക്കിലെ എല്ലാ എസ്കലേഷनുകൾ')
              : (user?.role === 'farmer' ? 'Your support requests and their status' : 
                 user?.role === 'officer' ? 'Cases assigned to you for resolution' : 'All escalations in the block')}
          </p>
        </div>
        
        {user?.role === 'farmer' && (
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {currentLanguage === 'ml' ? 'പുതിയ അഭ്യർത്ഥന' : 'New Request'}
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder={currentLanguage === 'ml' ? 'എസ്കലേഷനുകൾ തിരയുക...' : 'Search escalations...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Escalations List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredEscalations.map((escalation) => (
          <Card key={escalation.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      {currentLanguage === 'ml' ? escalation.titleMl : escalation.title}
                    </CardTitle>
                    <Badge className={getPriorityColor(escalation.priority)}>
                      {escalation.priority}
                    </Badge>
                    <Badge className={getStatusColor(escalation.status)}>
                      {currentLanguage === 'ml' 
                        ? statusOptions.find(s => s.value === escalation.status)?.label
                        : escalation.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {currentLanguage === 'ml' ? escalation.farmerNameMl : escalation.farmerName}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {escalation.panchayat}, {escalation.district}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(escalation.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {currentLanguage === 'ml' 
                        ? categories.find(c => c.value === escalation.category)?.label
                        : escalation.category}
                    </div>
                  </div>
                </div>

                {user?.role === 'admin' && escalation.status === 'open' && (
                  <Select value="" onValueChange={(value) => handleAssignOfficer(escalation.id, value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={currentLanguage === 'ml' ? 'ഓഫീസർ അസൈൻ ചെയ്യുക' : 'Assign Officer'} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockOfficers.map(officer => (
                        <SelectItem key={officer.id} value={officer.id}>
                          {officer.name} - {officer.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm">
                {currentLanguage === 'ml' ? escalation.descriptionMl : escalation.description}
              </p>

              {escalation.assignedOfficerName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>
                    {currentLanguage === 'ml' ? 'അസൈൻ ചെയ്ത ഓഫീസർ: ' : 'Assigned Officer: '}
                    <span className="font-medium">{escalation.assignedOfficerName}</span>
                  </span>
                </div>
              )}

              {/* Responses */}
              {escalation.responses.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">
                    {currentLanguage === 'ml' ? 'പ്രതികരണങ്ങൾ:' : 'Responses:'}
                  </h4>
                  {escalation.responses.map((response) => (
                    <div key={response.id} className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{response.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(response.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{response.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Response (Officers and Admins on assigned cases, Farmers on their own) */}
              {((user?.role === 'officer' && escalation.assignedOfficer === user.id) ||
                (user?.role === 'admin') ||
                (user?.role === 'farmer' && escalation.farmerId === user.id)) && (
                <div className="space-y-2">
                  <Textarea
                    placeholder={currentLanguage === 'ml' ? 'നിങ്ങളുടെ പ്രതികരണം ടൈപ്പ് ചെയ്യുക...' : 'Type your response...'}
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    rows={2}
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleAddResponse(escalation.id)}
                    disabled={!newResponse.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {currentLanguage === 'ml' ? 'അയയ്ക്കുക' : 'Send'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEscalations.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {currentLanguage === 'ml' ? 'എസ്കലേഷനുകൾ കണ്ടെത്തിയില്ല' : 'No escalations found'}
          </h3>
          <p className="text-muted-foreground">
            {currentLanguage === 'ml' 
              ? 'നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങൾക്ക് അനുയോജ്യമായ എസ്കലേഷनുകൾ ഒന്നുമില്ല'
              : 'No escalations match your search criteria'}
          </p>
        </div>
      )}

      {/* Create New Escalation Form (Farmers only) */}
      {showCreateForm && user?.role === 'farmer' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {currentLanguage === 'ml' ? 'പുതിയ സഹായ അഭ്യർത്ഥന' : 'New Support Request'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentLanguage === 'ml' ? 'വിഷയം' : 'Subject'}
              </label>
              <Input placeholder={currentLanguage === 'ml' ? 'പ്രശ്നത്തിന്റെ വിഷയം' : 'Brief subject of the issue'} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentLanguage === 'ml' ? 'വിഭാഗം' : 'Category'}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={currentLanguage === 'ml' ? 'വിഭാഗം തിരഞ്ഞെടുക്കുക' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentLanguage === 'ml' ? 'വിവരണം' : 'Description'}
              </label>
              <Textarea 
                placeholder={currentLanguage === 'ml' ? 'പ്രശ്നത്തിന്റെ വിശദമായ വിവരണം നൽകുക' : 'Provide detailed description of the issue'} 
                rows={4}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                {currentLanguage === 'ml' ? 'റദ്ദാക്കുക' : 'Cancel'}
              </Button>
              <Button onClick={() => setShowCreateForm(false)}>
                {currentLanguage === 'ml' ? 'സമർപ്പിക്കുക' : 'Submit Request'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}