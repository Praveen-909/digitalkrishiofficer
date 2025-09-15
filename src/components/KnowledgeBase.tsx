import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Search, BookOpen, Leaf, Bug, CloudRain, DollarSign, FileText } from "lucide-react";

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "diseases",
      title: "Crop Diseases",
      icon: <Bug className="h-4 w-4" />,
      articles: [
        { title: "വാഴയിലെ ഇല പൊള്ളൽ രോഗം", content: "Banana leaf blight is caused by fungal infection. Use copper-based fungicides.", language: "ml" },
        { title: "Coconut Root Wilt Disease", content: "A serious disease affecting coconut palms. Early detection is crucial.", language: "en" },
        { title: "കുരുമുളകിലെ കിടപ്പ് രോഗം", content: "Quick wilt disease in pepper - preventive measures and treatment.", language: "ml" }
      ]
    },
    {
      id: "fertilizers",
      title: "Fertilizers & Nutrition",
      icon: <Leaf className="h-4 w-4" />,
      articles: [
        { title: "Organic Fertilizers for Kerala Crops", content: "Best organic fertilizer practices for local crops.", language: "en" },
        { title: "വാഴയ്ക്കുള്ള പോഷകങ്ങൾ", content: "Essential nutrients and fertilizer schedule for banana cultivation.", language: "ml" },
        { title: "Soil Testing Guidelines", content: "How to test soil and interpret results for better crop yield.", language: "en" }
      ]
    },
    {
      id: "weather",
      title: "Weather & Seasons",
      icon: <CloudRain className="h-4 w-4" />,
      articles: [
        { title: "മൺസൂൺ കൃഷി ആസൂത്രണം", content: "Planning crop cycles according to monsoon patterns.", language: "ml" },
        { title: "Drought Management Strategies", content: "Water conservation and crop protection during dry spells.", language: "en" },
        { title: "Post-Harvest Weather Precautions", content: "Protecting harvested crops from weather damage.", language: "en" }
      ]
    },
    {
      id: "schemes",
      title: "Government Schemes",
      icon: <DollarSign className="h-4 w-4" />,
      articles: [
        { title: "PM-KISAN Scheme Benefits", content: "How to apply and benefit from PM-KISAN direct income support.", language: "en" },
        { title: "കൃഷി ഇൻഷുറൻസ് പദ്ധതി", content: "Crop insurance schemes available for Kerala farmers.", language: "ml" },
        { title: "Subsidy Programs for Equipment", content: "Government subsidies for agricultural equipment and tools.", language: "en" }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles... / ലേഖനങ്ങൾ തിരയുക..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.title}
                <Badge variant="outline">{category.articles.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.articles.map((article, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <span>{article.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {article.language === 'ml' ? 'മലയാളം' : 'English'}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p>{article.content}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3 mr-1" />
                            Read Full Article
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && searchTerm && (
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No articles found for "{searchTerm}"</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try different keywords or browse categories above
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}