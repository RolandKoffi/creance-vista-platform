
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClaims, mockInvestors } from "@/data/mock-data";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Portfolio = () => {
  // Simuler un investisseur connecté
  const currentInvestorId = "inv-1";
  const investor = mockInvestors.find((inv) => inv.id === currentInvestorId);
  
  // Filtrer les créances de l'investisseur (simulation)
  const investorClaims = mockClaims.filter((claim) => 
    claim.investors?.some(inv => inv.investorId === currentInvestorId)
  );

  // Données pour le graphique
  const portfolioByStatus = [
    { name: 'Actives', value: investorClaims.filter(c => c.status === 'active').length },
    { name: 'En attente', value: investorClaims.filter(c => c.status === 'pending').length },
    { name: 'Remboursées', value: investorClaims.filter(c => c.status === 'repaid').length },
  ];

  const COLORS = ['#0046b8', '#d81b60', '#4CAF50'];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mon portefeuille</h1>
      
      {/* Statistiques du portefeuille */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Montant total investi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {investorClaims.reduce((sum, claim) => {
                const investment = claim.investors?.find(inv => inv.investorId === currentInvestorId);
                return sum + (investment?.amount || 0);
              }, 0).toLocaleString()} €
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rendement moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              8.5%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Créances actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {investorClaims.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Répartition du portefeuille */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Répartition du portefeuille</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Diversification</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Secteur industriel</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Services</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Commerce</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Technologie</span>
                  <span>10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
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
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="repaid">Remboursées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="space-y-4">
                {investorClaims
                  .filter(claim => claim.status === 'active')
                  .map(claim => (
                    <div key={claim.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{claim.title}</h3>
                          <p className="text-sm text-gray-500">{claim.pmeName}</p>
                        </div>
                        <StatusBadge 
                          status="Active" 
                          className="bg-green-100 text-green-800"
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <div className="text-gray-500">Montant investi</div>
                          <div className="font-medium">
                            {claim.investors?.find(inv => inv.investorId === currentInvestorId)?.amount.toLocaleString()} €
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Rendement</div>
                          <div className="font-medium text-finance-red">8%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Date d'échéance</div>
                          <div className="font-medium">{new Date(claim.dueDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Risque</div>
                          <div className="font-medium">
                            {claim.riskLevel === 'low' ? 'Faible' : 
                             claim.riskLevel === 'medium' ? 'Moyen' : 'Élevé'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {investorClaims.filter(claim => claim.status === 'active').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Vous n'avez pas de créances actives
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="text-center py-8 text-gray-500">
                Vous n'avez pas de créances en attente
              </div>
            </TabsContent>
            
            <TabsContent value="repaid">
              <div className="text-center py-8 text-gray-500">
                Vous n'avez pas encore de créances remboursées
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
