
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { mockClaims, mockInvestments } from "@/data/mock-data";
import { BarChart, BarChart2, PieChart, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Portfolio = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Filtrer les investissements de cet investisseur
  const investorInvestments = mockInvestments.filter(inv => inv.investorId === user.id);
  
  // Calculer les statistiques par catégorie
  const categoriesData = investorInvestments.reduce((acc: Record<string, number>, inv) => {
    const claim = mockClaims.find(c => c.id === inv.claimId);
    if (claim) {
      const category = claim.category || "Autre";
      acc[category] = (acc[category] || 0) + inv.amount;
    }
    return acc;
  }, {});
  
  const totalInvested = investorInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Calculer la répartition des risques
  const riskData = investorInvestments.reduce((acc: Record<string, number>, inv) => {
    const claim = mockClaims.find(c => c.id === inv.claimId);
    if (claim) {
      const risk = claim.riskLevel || "medium";
      acc[risk] = (acc[risk] || 0) + inv.amount;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mon portefeuille</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Aperçu du portefeuille</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Allocation par catégorie</h3>
              <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col space-y-3">
                {Object.entries(categoriesData).map(([category, amount]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-medium">{Math.round((amount / totalInvested) * 100)}%</span>
                    </div>
                    <Progress value={(amount / totalInvested) * 100} className="h-2" />
                  </div>
                ))}
                <div className="mt-auto text-xs text-gray-500 pt-2">
                  Total investi: {totalInvested.toLocaleString()} €
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Répartition des risques</h3>
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                {Object.entries(riskData).map(([risk, amount]) => {
                  const percentage = Math.round((amount / totalInvested) * 100);
                  return (
                    <div key={risk} className="mb-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          {risk === 'low' ? 'Risque faible' : 
                           risk === 'medium' ? 'Risque moyen' : 'Risque élevé'}
                        </span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${
                          risk === 'low' ? 'bg-green-100' : 
                          risk === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}
                      />
                    </div>
                  );
                })}
                <div className="flex justify-between mt-4 pt-2 border-t text-sm">
                  <span className="font-medium">Score de risque global:</span>
                  <span className="font-medium text-blue-600">Modéré</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Performance</h3>
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm">Rendement moyen</span>
                  <span className="text-lg font-bold text-green-600">+8.4%</span>
                </div>
                <div className="h-32 flex items-end justify-between space-x-1 mb-2">
                  {[5, 7, 4, 9, 6, 8, 10, 7, 12, 9, 11, 8].map((value, i) => (
                    <div 
                      key={i}
                      className="bg-blue-600 w-full" 
                      style={{ height: `${value * 8}%` }}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Juin</span>
                  <span>Mai</span>
                </div>
                <div className="flex justify-between mt-4 pt-2 border-t text-sm">
                  <span className="font-medium">Rendement annualisé:</span>
                  <span className="font-medium text-green-600">+9.7%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="investments">
        <TabsList className="mb-4">
          <TabsTrigger value="investments" className="flex items-center">
            <BarChart2 className="w-4 h-4 mr-2" /> Investissements
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" /> Métriques
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <PieChart className="w-4 h-4 mr-2" /> Analyse
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="investments">
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
                  { header: "Date d'investissement", accessorKey: "date",
                    cell: (inv) => new Date(inv.date).toLocaleDateString()
                  },
                  { header: "Rendement attendu", accessorKey: "expectedReturn",
                    cell: (inv) => (
                      <span className="text-green-600">+{inv.expectedReturn.toLocaleString()} € ({Math.round((inv.expectedReturn / inv.amount) * 100)}%)</span>
                    )
                  },
                  { header: "Date de paiement", accessorKey: "expectedPaymentDate",
                    cell: (inv) => new Date(inv.expectedPaymentDate).toLocaleDateString()
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (inv) => (
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    ) 
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Métriques de performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Performance par période</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">1 mois</span>
                        <span className="text-sm font-medium text-green-600">+2.1%</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">3 mois</span>
                        <span className="text-sm font-medium text-green-600">+4.5%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">6 mois</span>
                        <span className="text-sm font-medium text-green-600">+6.3%</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">1 an</span>
                        <span className="text-sm font-medium text-green-600">+9.7%</span>
                      </div>
                      <Progress value={97} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Statistiques clés</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b">
                      <span>Capital investi</span>
                      <span className="font-medium">{totalInvested.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Rendement total attendu</span>
                      <span className="font-medium text-green-600">
                        +{investorInvestments.reduce((sum, inv) => sum + inv.expectedReturn, 0).toLocaleString()} €
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>ROI moyen</span>
                      <span className="font-medium">8.4%</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Durée moyenne d'investissement</span>
                      <span className="font-medium">73 jours</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Diversification</span>
                      <span className="font-medium">{Object.keys(categoriesData).length} catégories</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Échéance moyenne</span>
                      <span className="font-medium">15 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyse de portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 mb-6">
                <p>Cette analyse permet de visualiser la composition de votre portefeuille et d'identifier des opportunités d'optimisation.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-3">Diversification</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      Bonne
                    </div>
                    <p className="text-xs text-gray-600">
                      Votre portefeuille est bien diversifié avec une répartition équilibrée entre différentes catégories et niveaux de risque.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-3">Rendement</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      8.4%
                    </div>
                    <p className="text-xs text-gray-600">
                      Votre rendement est supérieur à la moyenne de 7.2% des autres investisseurs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-medium mb-3">Opportunités</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      3 créances
                    </div>
                    <p className="text-xs text-gray-600">
                      Nous avons identifié 3 opportunités qui correspondent à votre profil d'investissement.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Télécharger le rapport complet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;
