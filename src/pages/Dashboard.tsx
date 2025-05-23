
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { simpleClaims } from '@/data/simple-data';

const Dashboard = () => {
  const { user } = useAuth();

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tableau de bord Administrateur</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total PME</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">1</div>
            <p className="text-sm text-gray-600">PME inscrites</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Investisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">1</div>
            <p className="text-sm text-gray-600">Investisseurs actifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Créances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{simpleClaims.length}</div>
            <p className="text-sm text-gray-600">Créances totales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPMEDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tableau de bord PME</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes Créances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{simpleClaims.length}</div>
            <p className="text-sm text-gray-600">Créances soumises</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Montant Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {simpleClaims.reduce((acc, claim) => acc + claim.amount, 0).toLocaleString()}€
            </div>
            <p className="text-sm text-gray-600">En financement</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mes Créances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simpleClaims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{claim.title}</h3>
                <p className="text-sm text-gray-600">{claim.description}</p>
                <div className="mt-2 flex justify-between">
                  <span className="font-medium">{claim.amount.toLocaleString()}€</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    claim.status === 'funded' ? 'bg-green-100 text-green-800' : 
                    claim.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInvestorDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tableau de bord Investisseur</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Opportunités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {simpleClaims.filter(c => c.status === 'active').length}
            </div>
            <p className="text-sm text-gray-600">Créances disponibles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Montant Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {simpleClaims
                .filter(c => c.status === 'active')
                .reduce((acc, claim) => acc + (claim.amount * (100 - claim.fundingProgress) / 100), 0)
                .toLocaleString()}€
            </div>
            <p className="text-sm text-gray-600">À investir</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Opportunités d'Investissement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simpleClaims.filter(c => c.status === 'active').map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{claim.title}</h3>
                <p className="text-sm text-gray-600">{claim.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Montant:</span>
                    <span className="ml-2 font-medium">{claim.amount.toLocaleString()}€</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Rendement:</span>
                    <span className="ml-2 font-medium text-green-600">{claim.expectedReturn}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Progression:</span>
                    <span className="ml-2 font-medium">{claim.fundingProgress}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Risque:</span>
                    <span className={`ml-2 font-medium ${
                      claim.riskLevel === 'low' ? 'text-green-600' :
                      claim.riskLevel === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {claim.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {user.role === 'admin' && renderAdminDashboard()}
      {user.role === 'pme' && renderPMEDashboard()}
      {user.role === 'investor' && renderInvestorDashboard()}
    </div>
  );
};

export default Dashboard;
