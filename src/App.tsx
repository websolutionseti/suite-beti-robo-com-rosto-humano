
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Handoff from "./pages/Handoff";
import NotFound from "./pages/NotFound";
import { AccessibilityProvider } from "@/a11y";
import SkipLink from "@/a11y/SkipLink";
import { useColorblindSupport } from "@/hooks/useColorblindSupport";
import { LanguageProvider } from "@/hooks/useLanguage";

const AppContent = () => {
  useColorblindSupport();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/handoff02026" element={<Handoff />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  // Create QueryClient inside the component to ensure it's created in the right context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AccessibilityProvider>
          <TooltipProvider>
            <SkipLink />
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
