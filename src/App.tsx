import {
  useState,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { Skeleton } from "./components/ui/skeleton";
import {
  Home,
  MessageSquare,
  BookOpen,
  AlertTriangle,
  BarChart3,
  User,
  Sun,
  Moon,
  LogOut,
  Banknote,
} from "lucide-react";

// Lazy load heavy components to prevent initial timeout
const Dashboard = lazy(() =>
  import("./components/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);
const QueryInterface = lazy(() =>
  import("./components/QueryInterface").then((module) => ({
    default: module.QueryInterface,
  })),
);
const ChatInterface = lazy(() =>
  import("./components/ChatInterface").then((module) => ({
    default: module.ChatInterface,
  })),
);
const FarmerProfile = lazy(() =>
  import("./components/FarmerProfile").then((module) => ({
    default: module.FarmerProfile,
  })),
);
const KnowledgeBase = lazy(() =>
  import("./components/KnowledgeBase").then((module) => ({
    default: module.KnowledgeBase,
  })),
);
const EscalationPanel = lazy(() =>
  import("./components/EscalationPanel").then((module) => ({
    default: module.EscalationPanel,
  })),
);
const Analytics = lazy(() =>
  import("./components/Analytics").then((module) => ({
    default: module.Analytics,
  })),
);
const SubsidiaryPlans = lazy(() =>
  import("./components/SubsidiaryPlans").then((module) => ({
    default: module.SubsidiaryPlans,
  })),
);

import { AuthWrapper } from "./components/auth/AuthWrapper";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { LanguageProvider } from "./contexts/LanguageContext";
import {
  AuthProvider,
  useAuth,
  type User,
} from "./contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  confidence?: number;
  sources?: string[];
}

// Simplified and optimized AI response generation with timeout protection
const generateAIResponse = (
  query: string,
  type: string,
  currentUser: User | null,
): Promise<string> => {
  return new Promise((resolve) => {
    // Add timeout protection
    const timeout = setTimeout(() => {
      resolve(
        "I'm processing your query. Please wait a moment...",
      );
    }, 5000); // 5 second timeout

    try {
      // Basic context
      const locationContext = currentUser?.district
        ? ` in ${currentUser.district}`
        : "";

      let response = "";

      if (type === "image") {
        response = `Based on the uploaded image${locationContext}, I can provide agricultural guidance. For specific diagnosis, please describe what you're seeing or contact your local agricultural officer.`;
      } else if (
        query.includes("വാഴ") ||
        query.includes("banana")
      ) {
        response = `വാഴയിലെ പ്രശ്നങ്ങൾക്ക് പരിഹാരം${locationContext}:

1. രോഗബാധിതമായ ഇലകൾ നീക്കം ചെയ്യുക
2. കുമിൾനാശിനി പ്രയോഗിക്കുക
3. പ്രാദേശിക കൃഷി ഓഫീസറുമായി ബന്ധപ്പെടുക

കൂടുതൽ സഹായത്തിന് escalate ചെയ്യാം.`;
      } else {
        response = `Thank you for your query${locationContext}. I recommend consulting with local agricultural experts for specific guidance.

നിങ്ങളുടെ ചോദ്യത്തിന് കൂടുതൽ വിവരങ്ങൾക്കായി പ്രാദേശിക കൃഷി ഓഫീസറുമായി ബന്ധപ്പെടുക.`;
      }

      clearTimeout(timeout);
      resolve(response);
    } catch (error) {
      clearTimeout(timeout);
      console.error("Error generating AI response:", error);
      resolve(
        "Sorry, there was an error processing your query. Please try again.",
      );
    }
  });
};

// Enhanced loading component with better UX
const LoadingFallback = ({
  text = "Loading...",
}: {
  text?: string;
}) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="space-y-3 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
      <Skeleton className="h-4 w-64 mx-auto" />
      <p className="text-sm text-muted-foreground mt-4">
        {text}
      </p>
    </div>
  </div>
);

// Minimal sidebar profile component to prevent heavy rendering
const MinimalProfile = () => (
  <div className="p-4 border rounded-lg bg-card">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
        <User className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  </div>
);

function MainApp() {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY CONDITIONAL LOGIC OR EARLY RETURNS
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  // Optimized query handler with timeout protection
  const handleSubmitQuery = useCallback(
    async (query: string, type: string) => {
      try {
        setIsLoading(true);

        const userMessage: Message = {
          id: Date.now().toString(),
          type: "user",
          content: query,
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Generate AI response with timeout protection
        const aiContent = await generateAIResponse(
          query,
          type,
          user,
        );

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: aiContent,
          timestamp: new Date().toLocaleTimeString(),
          confidence: Math.floor(Math.random() * 20) + 80,
          sources: [
            "Kerala Agricultural University",
            "ICAR Research Guidelines",
            "Local Extension Office",
          ],
        };

        setMessages((prev) => [...prev, aiResponse]);
        setActiveTab("query");
      } catch (error) {
        console.error(
          "Error handling query submission:",
          error,
        );
        // Add error message to chat
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "ai",
          content:
            "Sorry, there was an error processing your query. Please try again.",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [user],
  );

  const handleFeedback = useCallback(
    (messageId: string, feedback: "positive" | "negative") => {
      try {
        console.log(
          `Feedback for message ${messageId}: ${feedback}`,
        );
        // In a real app, this would update the learning system
      } catch (error) {
        console.error("Error handling feedback:", error);
      }
    },
    [],
  );

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    try {
      logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [logout]);

  // Role-based navigation tabs - memoized for performance
  const navigationTabs = useMemo(() => {
    if (!user) return [];

    const baseTab = {
      value: "dashboard",
      icon: Home,
      label: t("navigation.dashboard"),
    };

    if (user.role === "farmer") {
      return [
        baseTab,
        {
          value: "query",
          icon: MessageSquare,
          label: t("navigation.query"),
        },
        {
          value: "knowledge",
          icon: BookOpen,
          label: t("navigation.knowledge"),
        },
        {
          value: "escalation",
          icon: AlertTriangle,
          label: t("navigation.escalation"),
        },
        {
          value: "subsidiary",
          icon: Banknote,
          label: t("navigation.subsidiary"),
        },
        {
          value: "profile",
          icon: User,
          label: t("navigation.profile"),
        },
      ];
    } else if (user.role === "officer") {
      return [
        baseTab,
        {
          value: "query",
          icon: MessageSquare,
          label: t("navigation.query"),
        },
        {
          value: "knowledge",
          icon: BookOpen,
          label: t("navigation.knowledge"),
        },
        {
          value: "escalation",
          icon: AlertTriangle,
          label: t("navigation.escalation"),
        },
        {
          value: "analytics",
          icon: BarChart3,
          label: t("navigation.analytics"),
        },
        {
          value: "subsidiary",
          icon: Banknote,
          label: t("navigation.subsidiary"),
        },
        {
          value: "profile",
          icon: User,
          label: t("navigation.profile"),
        },
      ];
    } else {
      // admin role
      return [
        baseTab,
        {
          value: "query",
          icon: MessageSquare,
          label: t("navigation.query"),
        },
        {
          value: "knowledge",
          icon: BookOpen,
          label: t("navigation.knowledge"),
        },
        {
          value: "escalation",
          icon: AlertTriangle,
          label: t("navigation.escalation"),
        },
        {
          value: "analytics",
          icon: BarChart3,
          label: t("navigation.analytics"),
        },
        {
          value: "subsidiary",
          icon: Banknote,
          label: t("navigation.subsidiary"),
        },
        {
          value: "profile",
          icon: User,
          label: t("navigation.profile"),
        },
      ];
    }
  }, [user?.role, t]);

  // Component renderer function to prevent unnecessary re-renders
  const renderTabContent = useCallback(
    (tabValue: string) => {
      switch (tabValue) {
        case "dashboard":
          return (
            <Suspense
              fallback={
                <LoadingFallback text="Loading dashboard..." />
              }
            >
              <Dashboard />
            </Suspense>
          );
        case "query":
          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Suspense
                fallback={
                  <LoadingFallback text="Loading query interface..." />
                }
              >
                <QueryInterface
                  onSubmitQuery={handleSubmitQuery}
                  isLoading={isLoading}
                />
              </Suspense>
              <Suspense
                fallback={
                  <LoadingFallback text="Loading chat..." />
                }
              >
                <ChatInterface
                  messages={messages}
                  onFeedback={handleFeedback}
                />
              </Suspense>
            </div>
          );
        case "knowledge":
          return (
            <Suspense
              fallback={
                <LoadingFallback text="Loading knowledge base..." />
              }
            >
              <KnowledgeBase />
            </Suspense>
          );
        case "escalation":
          return (
            <Suspense
              fallback={
                <LoadingFallback text="Loading escalation panel..." />
              }
            >
              <EscalationPanel />
            </Suspense>
          );
        case "subsidiary":
          return (
            <Suspense
              fallback={
                <LoadingFallback text="Loading subsidiary plans..." />
              }
            >
              <SubsidiaryPlans />
            </Suspense>
          );
        case "analytics":
          if (
            user?.role === "officer" ||
            user?.role === "admin"
          ) {
            return (
              <Suspense
                fallback={
                  <LoadingFallback text="Loading analytics..." />
                }
              >
                <Analytics />
              </Suspense>
            );
          }
          return null;
        case "profile":
          return (
            <div className="max-w-2xl">
              <Suspense
                fallback={
                  <LoadingFallback text="Loading profile..." />
                }
              >
                <FarmerProfile />
              </Suspense>
            </div>
          );
        default:
          return null;
      }
    },
    [
      handleSubmitQuery,
      isLoading,
      messages,
      handleFeedback,
      user?.role,
    ],
  );

  // CONDITIONAL LOGIC AND EARLY RETURNS ONLY AFTER ALL HOOKS ARE CALLED
  if (!isAuthenticated || !user) {
    return <AuthWrapper />;
  }

  if (!user.profileCompleted) {
    return <AuthWrapper />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        {/* Header */}
        <header className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">
                  DKO
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {t("app.title")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {user?.role === "farmer"
                    ? t("app.subtitle.farmer")
                    : user?.role === "officer"
                      ? t("app.subtitle.officer")
                      : t("app.subtitle.admin")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar with minimal profile to prevent heavy loading */}
          <div className="w-80 border-r min-h-[calc(100vh-73px)] p-4">
            <ErrorBoundary>
              <Suspense fallback={<MinimalProfile />}>
                <FarmerProfile />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Content Area with lazy loading */}
          <div className="flex-1 p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList
                className={`grid w-full ${
                  navigationTabs.length === 6
                    ? "grid-cols-6"
                    : navigationTabs.length === 7
                      ? "grid-cols-7"
                      : "grid-cols-6"
                }`}
              >
                {navigationTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6">
                <ErrorBoundary>
                  {renderTabContent(activeTab)}
                </ErrorBoundary>
              </div>
            </Tabs>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}