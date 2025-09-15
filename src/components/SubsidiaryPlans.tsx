import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  ExternalLink,
  Banknote,
  Calendar,
  MapPin,
  Users,
  FileText,
  CheckCircle
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

interface SubsidyScheme {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  amount: string;
  eligibility: string[];
  eligibilityMl: string[];
  documents: string[];
  documentsMl: string[];
  deadline: string;
  applicationUrl: string;
  category: 'crop' | 'equipment' | 'insurance' | 'loan' | 'training';
  district?: string;
  status: 'active' | 'upcoming' | 'closed';
}

const mockSchemes: SubsidyScheme[] = [
  {
    id: '1',
    title: 'Organic Farming Subsidy',
    titleMl: 'ജൈവകൃഷി സബ്സിഡി',
    description: 'Financial assistance for organic farming certification and inputs',
    descriptionMl: 'ജൈവകൃഷി സർട്ടിഫിക്കേഷനും ഇൻപുട്ടുകൾക്കുമുള്ള സാമ്പത്തിക സഹായം',
    amount: '₹50,000 per hectare',
    eligibility: ['Small and marginal farmers', 'Land ownership certificate', 'Minimum 0.5 hectares'],
    eligibilityMl: ['ചെറുകിടയും നാമമാത്രവുമായ കർഷകർ', 'ഭൂമി ഉടമസ്ഥാവകാശ സർട്ടിഫിക്കറ്റ്', 'കുറഞ്ഞത് 0.5 ഹെക്ടർ'],
    documents: ['Land documents', 'Aadhaar card', 'Bank passbook', 'Application form'],
    documentsMl: ['ഭൂമി രേഖകൾ', 'ആധാർ കാർഡ്', 'ബാങ്ക് പാസ്ബുക്ക്', 'അപേക്ഷാ ഫോം'],
    deadline: '2025-03-31',
    applicationUrl: 'https://kerala.gov.in/organic-farming',
    category: 'crop',
    district: 'കൊട്ടയം',
    status: 'active'
  },
  {
    id: '2',
    title: 'Farm Mechanization Scheme',
    titleMl: 'കാർഷിക യന്ത്രവൽക്കരണ പദ്ധതി',
    description: 'Subsidy for purchasing agricultural equipment and machinery',
    descriptionMl: 'കാർഷിക ഉപകരണങ്ങളും യന്ത്രങ്ങളും വാങ്ങുന്നതിനുള്ള സബ്സിഡി',
    amount: '50% subsidy up to ₹2,00,000',
    eligibility: ['Registered farmers', 'Cooperative societies', 'FPOs'],
    eligibilityMl: ['രജിസ്റ്റേർഡ് കർഷകർ', 'സഹകരണ സംഘങ്ങൾ', 'എഫ്പിഒകൾ'],
    documents: ['Registration certificate', 'Quotation', 'Bank guarantee'],
    documentsMl: ['രജിസ്ട്രേഷൻ സർട്ടിഫിക്കറ്റ്', 'ക്വട്ടേഷൻ', 'ബാങ്ക് ഗ്യാരന്റി'],
    deadline: '2025-06-30',
    applicationUrl: 'https://kerala.gov.in/mechanization',
    category: 'equipment',
    status: 'active'
  },
  {
    id: '3',
    title: 'Crop Insurance Scheme',
    titleMl: 'വിള ഇൻഷുറൻസ് പദ്ധതി',
    description: 'Insurance coverage for crop losses due to natural calamities',
    descriptionMl: 'പ്രകൃതി ദുരന്തങ്ങൾ മൂലമുള്ള വിള നഷ്ടത്തിനുള്ള ഇൻഷുറൻസ് കവറേജ്',
    amount: '2% premium for food grains',
    eligibility: ['All farmers', 'Tenant farmers with agreement', 'Share croppers'],
    eligibilityMl: ['എല്ലാ കർഷകർ', 'കരാറുള്ള കുടിയാൻ കർഷകർ', 'പങ്കാളി കർഷകർ'],
    documents: ['Land records', 'Sowing certificate', 'Bank account details'],
    documentsMl: ['ഭൂമി രേഖകൾ', 'വിത്ത് സർട്ടിഫിക്കറ്റ്', 'ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ'],
    deadline: '2025-02-15',
    applicationUrl: 'https://pmfby.gov.in',
    category: 'insurance',
    status: 'active'
  }
];

export function SubsidiaryPlans() {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { value: "all", label: currentLanguage === 'ml' ? "എല്ലാം" : "All" },
    { value: "crop", label: currentLanguage === 'ml' ? "വിള" : "Crop" },
    { value: "equipment", label: currentLanguage === 'ml' ? "ഉപകരണങ്ങൾ" : "Equipment" },
    { value: "insurance", label: currentLanguage === 'ml' ? "ഇൻഷുറൻസ്" : "Insurance" },
    { value: "loan", label: currentLanguage === 'ml' ? "വായ്പ" : "Loan" },
    { value: "training", label: currentLanguage === 'ml' ? "പരിശീലനം" : "Training" }
  ];

  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = currentLanguage === 'ml' 
      ? scheme.titleMl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.descriptionMl.toLowerCase().includes(searchTerm.toLowerCase())
      : scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crop': return <Users className="h-4 w-4" />;
      case 'equipment': return <Download className="h-4 w-4" />;
      case 'insurance': return <CheckCircle className="h-4 w-4" />;
      case 'loan': return <Banknote className="h-4 w-4" />;
      case 'training': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {currentLanguage === 'ml' ? 'സബ്സിഡി പദ്ധതികൾ' : 'Subsidy Schemes'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentLanguage === 'ml' 
              ? 'സർക്കാർ സബ്സിഡികളും സഹായ പദ്ധതികളും'
              : 'Government subsidies and support schemes'}
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {currentLanguage === 'ml' ? 'പുതിയ പദ്ധതി' : 'Add Scheme'}
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder={currentLanguage === 'ml' ? 'പദ്ധതികൾ തിരയുക...' : 'Search schemes...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(scheme.category)}
                  <CardTitle className="text-lg">
                    {currentLanguage === 'ml' ? scheme.titleMl : scheme.title}
                  </CardTitle>
                </div>
                <Badge className={getStatusColor(scheme.status)}>
                  {currentLanguage === 'ml' 
                    ? (scheme.status === 'active' ? 'സജീവം' : 
                       scheme.status === 'upcoming' ? 'വരാനിരിക്കുന്നത്' : 'അവസാനിച്ചു')
                    : scheme.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'ml' ? scheme.descriptionMl : scheme.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Banknote className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">{scheme.amount}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>
                    {currentLanguage === 'ml' ? 'അവസാന തീയതി: ' : 'Deadline: '}
                    {new Date(scheme.deadline).toLocaleDateString()}
                  </span>
                </div>
                
                {scheme.district && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{scheme.district}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">
                  {currentLanguage === 'ml' ? 'യോഗ്യത:' : 'Eligibility:'}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {(currentLanguage === 'ml' ? scheme.eligibilityMl : scheme.eligibility)
                    .slice(0, 2).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 mt-1 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                {user?.role === 'farmer' && (
                  <Button className="flex-1" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {currentLanguage === 'ml' ? 'അപേക്ഷിക്കുക' : 'Apply'}
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  {currentLanguage === 'ml' ? 'വിശദാംശങ്ങൾ' : 'Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <Banknote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {currentLanguage === 'ml' ? 'പദ്ധതികൾ കണ്ടെത്തിയില്ല' : 'No schemes found'}
          </h3>
          <p className="text-muted-foreground">
            {currentLanguage === 'ml' 
              ? 'നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങൾക്ക് അനുയോജ്യമായ പദ്ധതികൾ ഒന്നുമില്ല'
              : 'No schemes match your search criteria'}
          </p>
        </div>
      )}

      {/* Add New Scheme Form (Admin only) */}
      {showAddForm && user?.role === 'admin' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {currentLanguage === 'ml' ? 'പുതിയ പദ്ധതി ചേർക്കുക' : 'Add New Scheme'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {currentLanguage === 'ml' ? 'പദ്ധതിയുടെ പേര് (ഇംഗ്ലീഷ്)' : 'Scheme Title (English)'}
                </label>
                <Input placeholder="Enter scheme title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {currentLanguage === 'ml' ? 'പദ്ധതിയുടെ പേര് (മലയാളം)' : 'Scheme Title (Malayalam)'}
                </label>
                <Input placeholder="പദ്ധതിയുടെ പേര് നൽകുക" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {currentLanguage === 'ml' ? 'വിവരണം' : 'Description'}
              </label>
              <Textarea 
                placeholder={currentLanguage === 'ml' ? 'പദ്ധതിയുടെ വിവരണം നൽകുക' : 'Enter scheme description'} 
                rows={3}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                {currentLanguage === 'ml' ? 'റദ്ദാക്കുക' : 'Cancel'}
              </Button>
              <Button onClick={() => setShowAddForm(false)}>
                {currentLanguage === 'ml' ? 'സേവ് ചെയ്യുക' : 'Save Scheme'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}