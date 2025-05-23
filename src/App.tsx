
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Pages d'authentification
import Login from "./pages/auth/Login";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages simplifiées
import Dashboard from "./pages/Dashboard";

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
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            
            {/* Dashboard unifié pour tous les rôles */}
            <Route 
              path="/admin/dashboard" 
              element={
                <AppLayout requiredRole="admin">
                  <Dashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/pme/dashboard" 
              element={
                <AppLayout requiredRole="pme">
                  <Dashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/investor/dashboard" 
              element={
                <AppLayout requiredRole="investor">
                  <Dashboard />
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
