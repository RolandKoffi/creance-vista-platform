
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Pages d'authentification
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages Admin
import AdminDashboard from "./pages/admin/Dashboard";

// Pages PME
import PMEDashboard from "./pages/pme/Dashboard";
import SubmitClaim from "./pages/pme/SubmitClaim";
import Claims from "./pages/pme/Claims";
import PMEProfile from "./pages/pme/Profile";
import PMEContact from "./pages/pme/Contact";

// Pages Investisseur
import InvestorDashboard from "./pages/investor/Dashboard";
import Opportunities from "./pages/investor/Opportunities";
import Portfolio from "./pages/investor/Portfolio";
import History from "./pages/investor/History";
import InvestorProfile from "./pages/investor/Profile";
import InvestorContact from "./pages/investor/Contact";

// Page 404
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirection par défaut vers login */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            
            {/* Routes d'authentification */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Routes Admin */}
            <Route 
              path="/admin/dashboard" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminDashboard />
                </AppLayout>
              } 
            />
            
            {/* Routes PME */}
            <Route 
              path="/pme/dashboard" 
              element={
                <AppLayout requiredRole="pme">
                  <PMEDashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/submit-claim" 
              element={
                <AppLayout requiredRole="pme">
                  <SubmitClaim />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/claims" 
              element={
                <AppLayout requiredRole="pme">
                  <Claims />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/profile" 
              element={
                <AppLayout requiredRole="pme">
                  <PMEProfile />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/contact" 
              element={
                <AppLayout requiredRole="pme">
                  <PMEContact />
                </AppLayout>
              } 
            />
            
            {/* Routes Investisseur */}
            <Route 
              path="/investor/dashboard" 
              element={
                <AppLayout requiredRole="investor">
                  <InvestorDashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/opportunities" 
              element={
                <AppLayout requiredRole="investor">
                  <Opportunities />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/portfolio" 
              element={
                <AppLayout requiredRole="investor">
                  <Portfolio />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/history" 
              element={
                <AppLayout requiredRole="investor">
                  <History />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/profile" 
              element={
                <AppLayout requiredRole="investor">
                  <InvestorProfile />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/contact" 
              element={
                <AppLayout requiredRole="investor">
                  <InvestorContact />
                </AppLayout>
              } 
            />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
