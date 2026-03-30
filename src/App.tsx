import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import SupportStudio from "@/pages/SupportStudio";
import Blueprint from "@/pages/Blueprint";
import CustomerSpaces from "@/pages/CustomerSpaces";
import CaseWorkspace from "@/pages/CaseWorkspace";
import Insights from "@/pages/Insights";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/studio" element={<AppLayout><SupportStudio /></AppLayout>} />
          <Route path="/blueprint" element={<AppLayout><Blueprint /></AppLayout>} />
          <Route path="/customers" element={<AppLayout><CustomerSpaces /></AppLayout>} />
          <Route path="/cases" element={<AppLayout><CaseWorkspace /></AppLayout>} />
          <Route path="/insights" element={<AppLayout><Insights /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
