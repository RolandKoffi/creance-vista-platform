
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Pages d'authentification et landing page
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPMEs from "./pages/admin/PMEs";
import AdminInvestors from "./pages/admin/Investors";
import AdminClaims from "./pages/admin/Claims";
import AdminTransactions from "./pages/admin/Transactions";
import AdminNotifications from "./pages/admin/Notifications";
import AdminSettings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/Profile";

// Pages PME
import PMEDashboard from "./pages/pme/Dashboard";
import PMEClaims from "./pages/pme/Claims";
import PMESubmitClaim from "./pages/pme/SubmitClaim";
import PMEProfile from "./pages/pme/Profile";
import PMEContact from "./pages/pme/Contact";

// Pages Investisseur
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorOpportunities from "./pages/investor/Opportunities";
import InvestorPortfolio from "./pages/investor/Portfolio";
import InvestorHistory from "./pages/investor/History";
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
            <Route path="/" element={<LandingPage />} />
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
            <Route 
              path="/admin/pmes" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminPMEs />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/investors" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminInvestors />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/claims" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminClaims />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/transactions" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminTransactions />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/notifications" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminNotifications />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminSettings />
                </AppLayout>
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <AppLayout requiredRole="admin">
                  <AdminProfile />
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
              path="/pme/claims" 
              element={
                <AppLayout requiredRole="pme">
                  <PMEClaims />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/submit-claim" 
              element={
                <AppLayout requiredRole="pme">
                  <PMESubmitClaim />
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
                  <InvestorOpportunities />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/portfolio" 
              element={
                <AppLayout requiredRole="investor">
                  <InvestorPortfolio />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/history" 
              element={
                <AppLayout requiredRole="investor">
                  <InvestorHistory />
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
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
