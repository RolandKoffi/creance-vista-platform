
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './admin/Dashboard';
import PMEDashboard from './pme/Dashboard';
import InvestorDashboard from './investor/Dashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Chargement...</div>;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'pme':
      return <Navigate to="/pme/dashboard" replace />;
    case 'investor':
      return <Navigate to="/investor/dashboard" replace />;
    default:
      return <div>Rôle non reconnu</div>;
  }
};

export default Dashboard;
