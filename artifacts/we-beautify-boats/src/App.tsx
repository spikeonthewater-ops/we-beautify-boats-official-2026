import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import SeasonalPlans from "@/pages/SeasonalPlans";
import OurWork from "@/pages/OurWork";
import MeetTheTeam from "@/pages/MeetTheTeam";
import Contact from "@/pages/Contact";

// Service Detail Pages
import DeckWashes from "@/pages/services/DeckWashes";
import DeckPolishing from "@/pages/services/DeckPolishing";
import Protections from "@/pages/services/Protections";
import HullWashes from "@/pages/services/HullWashes";
import BottomPrep from "@/pages/services/BottomPrep";
import InteriorDetails from "@/pages/services/InteriorDetails";

import { useScrollToTop } from "@/hooks/use-navigation";

const queryClient = new QueryClient();

function ScrollWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}

function Router() {
  return (
    <ScrollWrapper>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
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
            
            <Route component={NotFound} />
          </Switch>
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
