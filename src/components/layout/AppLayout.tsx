
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRole } from '@/types';

interface AppLayoutProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
}

const AppLayout = ({ children, requiredRole }: AppLayoutProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-finance-blue">Chargement...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      // Redirection basée sur le rôle de l'utilisateur
      if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user.role === 'pme') {
        return <Navigate to="/pme/dashboard" replace />;
      } else if (user.role === 'investor') {
        return <Navigate to="/investor/dashboard" replace />;
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar />
      <div className={`flex-1 flex flex-col ${isMobile ? 'w-full' : ''}`}>
        <TopBar />
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
