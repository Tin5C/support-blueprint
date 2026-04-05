import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import SupportStudio from "@/pages/SupportStudio";
import Blueprint from "@/pages/Blueprint";
import Templates from "@/pages/Templates";
import Insights from "@/pages/Insights";
import Admin from "@/pages/Admin";
import TeamsCustomerSpaces from "@/pages/TeamsCustomerSpaces";
import SolutionIntelligence from "@/pages/SolutionIntelligence";
import TeamsLiveCases from "@/pages/TeamsLiveCases";
import TeamsApprovals from "@/pages/TeamsApprovals";
import TeamsAgentActivity from "@/pages/TeamsAgentActivity";
import TeamsEscalations from "@/pages/TeamsEscalations";
import EnterpriseContext from "@/pages/EnterpriseContext";
import ReadinessReport from "@/pages/ReadinessReport";
import ExpertReview from "@/pages/ExpertReview";
import ProcurementPackage from "@/pages/ProcurementPackage";
import SupportPreview from "@/pages/SupportPreview";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Launch Studio */}
          <Route path="/context" element={<AppLayout><EnterpriseContext /></AppLayout>} />
          <Route path="/intelligence" element={<AppLayout><SolutionIntelligence /></AppLayout>} />
          <Route path="/readiness" element={<AppLayout><ReadinessReport /></AppLayout>} />
          <Route path="/review" element={<AppLayout><ExpertReview /></AppLayout>} />
          <Route path="/package" element={<AppLayout><ProcurementPackage /></AppLayout>} />
          <Route path="/preview" element={<AppLayout><SupportPreview /></AppLayout>} />
          {/* Support Studio */}
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/blueprints" element={<AppLayout><Blueprint /></AppLayout>} />
          <Route path="/studio" element={<AppLayout><SupportStudio /></AppLayout>} />
          <Route path="/teams/cases" element={<AppLayout><TeamsLiveCases /></AppLayout>} />
          <Route path="/teams/approvals" element={<AppLayout><TeamsApprovals /></AppLayout>} />
          <Route path="/teams/escalations" element={<AppLayout><TeamsEscalations /></AppLayout>} />
          <Route path="/insights" element={<AppLayout><Insights /></AppLayout>} />
          {/* Shared */}
          <Route path="/templates" element={<AppLayout><Templates /></AppLayout>} />
          <Route path="/admin" element={<AppLayout><Admin /></AppLayout>} />
          <Route path="/teams/customers" element={<AppLayout><TeamsCustomerSpaces /></AppLayout>} />
          <Route path="/teams/agents" element={<AppLayout><TeamsAgentActivity /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
