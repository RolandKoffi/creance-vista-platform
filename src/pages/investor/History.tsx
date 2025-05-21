
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClaims, mockInvestments } from "@/data/mock-data";
import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";

const History = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  // Créer l'historique des transactions
  const investorInvestments = mockInvestments.filter(inv => inv.investorId === user.id);
  
  // Créer l'historique des paiements (simulé)
  const paymentHistory = investorInvestments
    .filter(inv => new Date(inv.expectedPaymentDate) < new Date())
    .map(inv => {
      const claim = mockClaims.find(claim => claim.id === inv.claimId);
      return {
        id: `payment-${inv.id}`,
        date: inv.expectedPaymentDate,
        type: "Remboursement",
        description: `Remboursement ${claim?.title || "Créance"}`,
        amount: inv.amount + inv.expectedReturn,
        status: Math.random() > 0.2 ? "completed" : "pending"
      };
    });
    
  // Créer l'historique des investissements
  const investmentHistory = investorInvestments.map(inv => {
    const claim = mockClaims.find(claim => claim.id === inv.claimId);
    return {
      id: `invest-${inv.id}`,
      date: inv.date,
      type: "Investissement",
      description: `Investissement ${claim?.title || "Créance"}`,
      amount: -inv.amount,
      status: "completed"
    };
  });
  
  // Combiner et trier par date
  const allTransactions = [...paymentHistory, ...investmentHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  // Filtrer par recherche
  const filteredTransactions = allTransactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Historique</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Historique des transactions</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredTransactions}
            columns={[
              { header: "Date", accessorKey: "date", 
                cell: (item) => new Date(item.date).toLocaleDateString() 
              },
              { header: "Description", accessorKey: "description" },
              { header: "Type", accessorKey: "type" },
              { header: "Montant", accessorKey: "amount",
                cell: (item) => (
                  <span className={item.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} €
                  </span>
                )
              },
              { header: "Statut", accessorKey: "status",
                cell: (item) => (
                  <span className={
                    item.status === 'completed' ? 'px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium' : 
                    'px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium'
                  }>
                    {item.status === 'completed' ? 'Complété' : 'En attente'}
                  </span>
                )
              },
              { header: "Reçu", accessorKey: "id", 
                cell: (item) => (
                  item.status === 'completed' ? (
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" /> Reçu
                    </Button>
                  ) : null
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">Total investi</h3>
            <div className="text-2xl font-bold mb-1">
              {investorInvestments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()} €
            </div>
            <p className="text-xs text-gray-600">
              Sur {investorInvestments.length} investissements
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">Total remboursé</h3>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {paymentHistory
                .filter(payment => payment.status === 'completed')
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()} €
            </div>
            <p className="text-xs text-gray-600">
              Sur {paymentHistory.filter(payment => payment.status === 'completed').length} remboursements
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium mb-2">En attente</h3>
            <div className="text-2xl font-bold mb-1">
              {paymentHistory
                .filter(payment => payment.status === 'pending')
                .reduce((sum, payment) => sum + payment.amount, 0)
                .toLocaleString()} €
            </div>
            <p className="text-xs text-gray-600">
              Sur {paymentHistory.filter(payment => payment.status === 'pending').length} remboursements en attente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => console.log("Télécharger l'historique complet")}>
          <Download className="h-4 w-4 mr-2" /> Exporter l'historique
        </Button>
      </div>
    </div>
  );
};

export default History;
