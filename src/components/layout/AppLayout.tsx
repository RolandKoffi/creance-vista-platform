
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
  requiredRole?: string | string[];
}

const AppLayout = ({ children, requiredRole }: AppLayoutProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-blue-600">Chargement...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-blue-600 lg:hidden">FINCREDIBL</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-sm text-gray-700 hidden sm:block">Bonjour, {user?.name}</span>
              <span className="text-sm text-gray-700 sm:hidden">{user?.name}</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/auth/login';
                }}
                className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
