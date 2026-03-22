import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteDrawer } from "@/components/QuoteDrawer";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages — lazy loaded for smaller initial bundle
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const SeasonalPlans = lazy(() => import("@/pages/SeasonalPlans"));
const OurWork = lazy(() => import("@/pages/OurWork"));
const MeetTheTeam = lazy(() => import("@/pages/MeetTheTeam"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));

// Service Detail Pages — lazy loaded
const DeckWashes = lazy(() => import("@/pages/services/DeckWashes"));
const DeckPolishing = lazy(() => import("@/pages/services/DeckPolishing"));
const Protections = lazy(() => import("@/pages/services/Protections"));
const HullWashes = lazy(() => import("@/pages/services/HullWashes"));
const BottomPrep = lazy(() => import("@/pages/services/BottomPrep"));
const InteriorDetails = lazy(() => import("@/pages/services/InteriorDetails"));
const ExtraServices = lazy(() => import("@/pages/services/ExtraServices"));
const Workshops = lazy(() => import("@/pages/services/Workshops"));

import { useScrollToTop } from "@/hooks/use-navigation";

const queryClient = new QueryClient();

function ScrollWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}

function PageLoader() {
  return <div className="min-h-screen bg-background" aria-hidden />;
}

function Router() {
  return (
    <ScrollWrapper>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/our-services" component={Services} />
              <Route path="/seasonal-plans" component={SeasonalPlans} />
              <Route path="/our-work" component={OurWork} />
              <Route path="/meet-the-team" component={MeetTheTeam} />
              <Route path="/contact" component={Contact} />

              <Route path="/deck-washes" component={DeckWashes} />
              <Route path="/deck-polishing" component={DeckPolishing} />
              <Route path="/protections" component={Protections} />
              <Route path="/hull-washes" component={HullWashes} />
              <Route path="/bottom-prep" component={BottomPrep} />
              <Route path="/interior-details" component={InteriorDetails} />
              <Route path="/extra-services" component={ExtraServices} />
              <Route path="/workshops" component={Workshops} />

              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogPost} />

              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ScrollWrapper>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <QuoteDrawer />
          <Toaster />
        </QuoteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
