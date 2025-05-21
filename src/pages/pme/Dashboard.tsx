
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockClaims, mockTransactions } from "@/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, Building, CreditCard, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const PMEDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Filtrer les données pour cette PME
  const pmeClaims = mockClaims.filter(claim => claim.pmeId === user.id);
  const pmeTransactions = mockTransactions.filter(tx => tx.userId === user.id);
  
  // Calculer les statistiques
  const totalClaimsCount = pmeClaims.length;
  const totalClaimsAmount = pmeClaims.reduce((sum, claim) => sum + claim.amount, 0);
  const totalFundedAmount = pmeClaims.reduce((sum, claim) => 
    sum + (claim.amount * claim.fundingProgress / 100), 0);
  const averageFundingProgress = pmeClaims.length > 0 
    ? pmeClaims.reduce((sum, claim) => sum + claim.fundingProgress, 0) / pmeClaims.length 
    : 0;
  
  // Calculer les fonds disponibles
  const availableFunds = pmeTransactions
    .filter(tx => tx.type === 'disbursement' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  // Action pour retirer les fonds
  const handleWithdrawFunds = () => {
    if (availableFunds <= 0) {
      toast.error("Aucun fonds disponible pour le retrait");
    } else {
      toast.success(`Demande de retrait des ${availableFunds.toLocaleString()} € envoyée`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord PME</h1>
        <Link to="/pme/submit-claim">
          <Button className="bg-finance-orange hover:bg-finance-orange/90">
            Nouvelle créance
          </Button>
        </Link>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Créances totales"
          value={totalClaimsCount.toString()}
          icon={<FileText size={24} />}
        />
        <StatsCard
          title="Montant total"
          value={`${totalClaimsAmount.toLocaleString()} €`}
          icon={<CreditCard size={24} />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Montant financé"
          value={`${Math.round(totalFundedAmount).toLocaleString()} €`}
          icon={<BarChart size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Fonds disponibles"
          value={`${availableFunds.toLocaleString()} €`}
          icon={<Building size={24} />}
        />
      </div>
      
      {/* Carte de progression du financement */}
      <Card>
        <CardHeader>
          <CardTitle>Progression du financement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Financement moyen</span>
              <span className="text-sm font-medium">{Math.round(averageFundingProgress)}%</span>
            </div>
            <Progress value={averageFundingProgress} className="h-2" />
            
            <div className="mt-6">
              {availableFunds > 0 && (
                <Button 
                  className="bg-finance-blue hover:bg-finance-blue/90"
                  onClick={handleWithdrawFunds}
                >
                  Retirer les fonds disponibles ({availableFunds.toLocaleString()} €)
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Liste des créances */}
      <Card>
        <CardHeader>
          <CardTitle>Mes créances</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={pmeClaims}
            columns={[
              { header: "Titre", accessorKey: "title" },
              { header: "Montant", accessorKey: "amount",
                cell: (claim) => `${claim.amount.toLocaleString()} €`
              },
              { header: "Date d'échéance", accessorKey: "dueDate", 
                cell: (claim) => new Date(claim.dueDate).toLocaleDateString() 
              },
              { header: "Statut", accessorKey: "status", 
                cell: (claim) => <StatusBadge status={claim.status} /> 
              },
              { header: "Progression", accessorKey: "fundingProgress", 
                cell: (claim) => (
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{claim.soldParts} / {claim.totalParts} parts</span>
                      <span>{claim.fundingProgress}%</span>
                    </div>
                    <Progress value={claim.fundingProgress} className="h-2" />
                  </div>
                ) 
              },
              { header: "Actions", accessorKey: "id", 
                cell: (claim) => (
                  <Link to={`/pme/claims/${claim.id}`}>
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </Link>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Transactions récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={pmeTransactions}
            columns={[
              { header: "Type", accessorKey: "type",
                cell: (tx) => (
                  <span className="capitalize">
                    {tx.type === 'disbursement' ? 'Versement' : 
                     tx.type === 'repayment' ? 'Remboursement' : 
                     'Investissement'}
                  </span>
                )
              },
              { header: "Montant", accessorKey: "amount",
                cell: (tx) => `${tx.amount.toLocaleString()} €`
              },
              { header: "Date", accessorKey: "date", 
                cell: (tx) => new Date(tx.date).toLocaleDateString() 
              },
              { header: "Statut", accessorKey: "status", 
                cell: (tx) => <StatusBadge status={tx.status} /> 
              },
              { header: "Détails", accessorKey: "notes", 
                cell: (tx) => tx.notes || '-' 
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PMEDashboard;
