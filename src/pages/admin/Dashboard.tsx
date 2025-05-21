
import { Building, CreditCard, DollarSign, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockPMEs, mockClaims, mockInvestors } from "@/data/mock-data";
import { toast } from "sonner";

const AdminDashboard = () => {
  // Calcul des statistiques
  const totalPMEs = mockPMEs.length;
  const verifiedPMEs = mockPMEs.filter(pme => pme.isVerified).length;
  
  const totalInvestors = mockInvestors.length;
  const verifiedInvestors = mockInvestors.filter(investor => investor.isVerified).length;
  
  const totalClaims = mockClaims.length;
  const activeClaims = mockClaims.filter(claim => claim.status === 'active').length;
  
  const totalAmount = mockClaims.reduce((sum, claim) => sum + claim.amount, 0);
  const totalFunded = mockClaims.reduce((sum, claim) => sum + (claim.amount * claim.fundingProgress / 100), 0);
  
  // Fonction pour gérer les actions
  const handleAction = (action: string, type: string, id: string) => {
    toast.success(`Action "${action}" effectuée sur ${type} ${id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="PMEs enregistrées"
          value={totalPMEs.toString()}
          icon={<Building size={24} />}
        />
        <StatsCard
          title="Investisseurs"
          value={totalInvestors.toString()}
          icon={<Users size={24} />}
        />
        <StatsCard
          title="Créances actives"
          value={`${activeClaims}/${totalClaims}`}
          icon={<FileText size={24} />}
        />
        <StatsCard
          title="Montant total"
          value={`${Math.round(totalAmount / 1000)} K€`}
          icon={<DollarSign size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Montant financé"
          value={`${Math.round(totalFunded / 1000)} K€`}
          icon={<CreditCard size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      {/* PMEs en attente de validation */}
      <Card>
        <CardHeader>
          <CardTitle>PMEs en attente de validation</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockPMEs.filter(pme => !pme.isVerified)}
            columns={[
              { header: "Nom", accessorKey: "companyName" },
              { header: "SIRET", accessorKey: "siret" },
              { header: "Contact", accessorKey: "contactPerson" },
              { header: "Date d'inscription", accessorKey: "createdAt", 
                cell: (pme) => new Date(pme.createdAt).toLocaleDateString() 
              },
              { header: "Actions", accessorKey: "id", 
                cell: (pme) => (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAction('validate', 'PME', pme.id)}
                    >
                      Valider
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500"
                      onClick={() => handleAction('reject', 'PME', pme.id)}
                    >
                      Rejeter
                    </Button>
                  </div>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Créances en attente de validation */}
      <Card>
        <CardHeader>
          <CardTitle>Créances en attente de validation</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockClaims.filter(claim => claim.status === 'pending')}
            columns={[
              { header: "PME", accessorKey: "pmeName" },
              { header: "Titre", accessorKey: "title" },
              { header: "Montant", accessorKey: "amount",
                cell: (claim) => `${claim.amount.toLocaleString()} €`
              },
              { header: "Date d'échéance", accessorKey: "dueDate", 
                cell: (claim) => new Date(claim.dueDate).toLocaleDateString() 
              },
              { header: "Risque", accessorKey: "riskLevel",
                cell: (claim) => (
                  <StatusBadge 
                    status={
                      claim.riskLevel === 'low' ? 'Faible' : 
                      claim.riskLevel === 'medium' ? 'Moyen' : 'Élevé'
                    } 
                    className={
                      claim.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      claim.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  />
                )
              },
              { header: "Actions", accessorKey: "id", 
                cell: (claim) => (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAction('validate', 'Créance', claim.id)}
                    >
                      Valider
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500"
                      onClick={() => handleAction('reject', 'Créance', claim.id)}
                    >
                      Rejeter
                    </Button>
                  </div>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Investisseurs en attente de validation */}
      <Card>
        <CardHeader>
          <CardTitle>Investisseurs en attente de validation</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockInvestors.filter(investor => !investor.isVerified)}
            columns={[
              { header: "Nom", accessorKey: "lastName",
                cell: (investor) => `${investor.firstName} ${investor.lastName}`
              },
              { header: "Identifiant", accessorKey: "idNumber" },
              { header: "Email", accessorKey: "userId",
                cell: (investor) => {
                  const user = mockInvestors.find(user => user.id === investor.id);
                  return user ? user.id : 'N/A';
                }
              },
              { header: "Date d'inscription", accessorKey: "createdAt", 
                cell: (investor) => new Date(investor.createdAt).toLocaleDateString() 
              },
              { header: "Actions", accessorKey: "id", 
                cell: (investor) => (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAction('validate', 'Investisseur', investor.id)}
                    >
                      Valider
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500"
                      onClick={() => handleAction('reject', 'Investisseur', investor.id)}
                    >
                      Rejeter
                    </Button>
                  </div>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="bg-finance-orange hover:bg-finance-orange/90 h-12"
          onClick={() => toast.success("Remboursement lancé pour toutes les créances échues")}
        >
          Lancer les remboursements
        </Button>
        <Button 
          className="bg-finance-blue hover:bg-finance-blue/90 h-12"
          onClick={() => toast.success("Déblocage des fonds effectué")}
        >
          Débloquer les fonds
        </Button>
        <Button 
          className="bg-gray-800 hover:bg-gray-700 h-12"
          onClick={() => toast.success("Notifications envoyées à tous les utilisateurs")}
        >
          Envoyer notifications
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
