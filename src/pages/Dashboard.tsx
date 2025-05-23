
import { useAuth } from '@/hooks/useAuth';
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
      return <AdminDashboard />;
    case 'pme':
      return <PMEDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    default:
      return <div>Rôle non reconnu</div>;
  }
};

export default Dashboard;
