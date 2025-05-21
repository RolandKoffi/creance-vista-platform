
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockClaims, mockInvestments } from "@/data/mock-data";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, Clock, DollarSign, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const InvestorDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Filtrer les investissements pour cet investisseur
  const investorInvestments = mockInvestments.filter(inv => inv.investorId === user.id);
  
  // Calculer les statistiques
  const totalInvested = investorInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = investorInvestments.reduce((sum, inv) => sum + inv.expectedReturn, 0);
  const portfolioCount = new Set(investorInvestments.map(inv => inv.claimId)).size;
  
  // Liste des opportunités disponibles
  const availableClaims = mockClaims
    .filter(claim => claim.status === 'active' && claim.fundingProgress < 100)
    .sort((a, b) => b.expectedReturn - a.expectedReturn);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord investisseur</h1>
        <Link to="/investor/opportunities">
          <Button className="bg-finance-orange hover:bg-finance-orange/90">
            Explorer les opportunités
          </Button>
        </Link>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total investi"
          value={`${totalInvested.toLocaleString()} €`}
          icon={<CreditCard size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Rendement attendu"
          value={`${totalReturn.toLocaleString()} €`}
          icon={<DollarSign size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="ROI moyen"
          value={totalInvested > 0 ? `${Math.round((totalReturn / totalInvested) * 100)}%` : "0%"}
          icon={<BarChart size={24} />}
        />
        <StatsCard
          title="Créances en portefeuille"
          value={portfolioCount.toString()}
          icon={<Clock size={24} />}
        />
      </div>
      
      {/* Liste des investissements */}
      <Card>
        <CardHeader>
          <CardTitle>Mes investissements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={investorInvestments}
            columns={[
              { header: "Entreprise", accessorKey: "pmeId",
                cell: (inv) => {
                  const claim = mockClaims.find(claim => claim.id === inv.claimId);
                  return claim ? claim.pmeName : 'N/A';
                }
              },
              { header: "Titre", accessorKey: "claimId",
                cell: (inv) => {
                  const claim = mockClaims.find(claim => claim.id === inv.claimId);
                  return claim ? claim.title : 'N/A';
                }
              },
              { header: "Montant investi", accessorKey: "amount",
                cell: (inv) => `${inv.amount.toLocaleString()} €`
              },
              { header: "Parts", accessorKey: "parts" },
              { header: "Rendement", accessorKey: "expectedReturn",
                cell: (inv) => (
                  <div className="flex items-center">
                    <span className="font-medium text-green-600">
                      +{inv.expectedReturn.toLocaleString()} €
                    </span>
                    <span className="text-xs ml-1 text-gray-500">
                      ({Math.round((inv.expectedReturn / inv.amount) * 100)}%)
                    </span>
                  </div>
                )
              },
              { header: "Date de paiement", accessorKey: "expectedPaymentDate",
                cell: (inv) => new Date(inv.expectedPaymentDate).toLocaleDateString()
              },
              { header: "Actions", accessorKey: "id", 
                cell: (inv) => (
                  <Link to={`/investor/investments/${inv.id}`}>
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
      
      {/* Opportunités recommandées */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunités recommandées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableClaims.slice(0, 3).map((claim) => (
              <Card key={claim.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{claim.title}</h3>
                      <p className="text-sm text-gray-500">{claim.pmeName}</p>
                    </div>
                    <StatusBadge 
                      status={
                        claim.riskLevel === 'low' ? 'Risque faible' : 
                        claim.riskLevel === 'medium' ? 'Risque moyen' : 'Risque élevé'
                      } 
                      className={
                        claim.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                        claim.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    />
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Montant:</span>
                      <span className="font-medium">{claim.amount.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rendement:</span>
                      <span className="font-medium text-green-600">{claim.expectedReturn}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Échéance:</span>
                      <span className="font-medium">{new Date(claim.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Prix par part:</span>
                      <span className="font-medium">{claim.partPrice} €</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{claim.soldParts} / {claim.totalParts} parts vendues</span>
                      <span>{claim.fundingProgress}%</span>
                    </div>
                    <Progress value={claim.fundingProgress} className="h-2" />
                  </div>
                  
                  <div className="mt-4">
                    <Link to={`/investor/opportunities/${claim.id}`}>
                      <Button className="w-full bg-finance-blue hover:bg-finance-blue/90">
                        Investir maintenant
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/investor/opportunities">
              <Button variant="outline">
                Voir toutes les opportunités
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Calendrier des paiements */}
      <Card>
        <CardHeader>
          <CardTitle>Calendrier des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={investorInvestments
              .sort((a, b) => new Date(a.expectedPaymentDate).getTime() - new Date(b.expectedPaymentDate).getTime())}
            columns={[
              { header: "Créance", accessorKey: "claimId",
                cell: (inv) => {
                  const claim = mockClaims.find(claim => claim.id === inv.claimId);
                  return claim ? claim.title : 'N/A';
                }
              },
              { header: "Date de paiement", accessorKey: "expectedPaymentDate",
                cell: (inv) => new Date(inv.expectedPaymentDate).toLocaleDateString()
              },
              { header: "Montant attendu", accessorKey: "amount",
                cell: (inv) => `${(inv.amount + inv.expectedReturn).toLocaleString()} €`
              },
              { header: "Dont rendement", accessorKey: "expectedReturn",
                cell: (inv) => `+${inv.expectedReturn.toLocaleString()} €`
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorDashboard;
