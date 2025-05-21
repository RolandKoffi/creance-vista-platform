
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, CreditCard, Calendar, FileDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données fictives pour les transactions
const mockTransactions = [
  {
    id: "tx-001",
    date: "2023-05-15T14:35:00",
    amount: 15000,
    type: "investment",
    status: "completed",
    investorName: "Jean Dupont",
    claimTitle: "Facture Telecom SAS",
    pmeName: "TechSolutions",
    paymentMethod: "card"
  },
  {
    id: "tx-002",
    date: "2023-05-14T10:25:00",
    amount: 25000,
    type: "investment",
    status: "completed",
    investorName: "Marie Martin",
    claimTitle: "Facture Équipement",
    pmeName: "MediaGroup",
    paymentMethod: "bank"
  },
  {
    id: "tx-003",
    date: "2023-05-10T09:15:00",
    amount: 18500,
    type: "disbursement",
    status: "completed",
    investorName: null,
    claimTitle: "Facture Matériaux",
    pmeName: "BâtiPro",
    paymentMethod: "bank"
  },
  {
    id: "tx-004",
    date: "2023-05-08T16:40:00",
    amount: 9500,
    type: "investment",
    status: "pending",
    investorName: "Pierre Durand",
    claimTitle: "Facture Services IT",
    pmeName: "TechSolutions",
    paymentMethod: "mobile"
  },
  {
    id: "tx-005",
    date: "2023-05-05T11:30:00",
    amount: 32000,
    type: "repayment",
    status: "completed",
    investorName: "Multiple",
    claimTitle: "Facture Conseil",
    pmeName: "ConsultGroup",
    paymentMethod: "bank"
  },
  {
    id: "tx-006",
    date: "2023-05-03T14:20:00",
    amount: 12500,
    type: "investment",
    status: "failed",
    investorName: "Sophie Bernard",
    claimTitle: "Facture Maintenance",
    pmeName: "TechSolutions",
    paymentMethod: "card"
  },
  {
    id: "tx-007",
    date: "2023-05-01T09:45:00",
    amount: 28000,
    type: "disbursement",
    status: "completed",
    investorName: null,
    claimTitle: "Facture Marketing",
    pmeName: "MediaGroup",
    paymentMethod: "bank"
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filtrer les transactions
  const filteredTransactions = mockTransactions
    .filter(tx => 
      searchTerm === "" || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.investorName && tx.investorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tx.pmeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.claimTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(tx => typeFilter === "all" || tx.type === typeFilter)
    .filter(tx => statusFilter === "all" || tx.status === statusFilter)
    // Filtre de date (simulation simplifiée)
    .filter(tx => {
      if (dateFilter === "all") return true;
      const txDate = new Date(tx.date);
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      
      if (dateFilter === "today") {
        return txDate.toDateString() === today.toDateString();
      } else if (dateFilter === "week") {
        return txDate >= weekAgo;
      } else if (dateFilter === "month") {
        return txDate >= monthAgo;
      }
      return true;
    });
  
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const generateReport = () => {
    toast.success("Rapport généré et téléchargé avec succès");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button 
          onClick={generateReport}
          variant="outline"
          className="flex items-center"
        >
          <FileDown className="mr-2 h-4 w-4" /> Exporter
        </Button>
      </div>
      
      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>
            <SelectItem value="today">Aujourd'hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="investment">Investissements</SelectItem>
            <SelectItem value="disbursement">Décaissements</SelectItem>
            <SelectItem value="repayment">Remboursements</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="completed">Complétées</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="failed">Échouées</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {filteredTransactions.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Montant total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAmount.toLocaleString()} €
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Investissements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredTransactions
                .filter(tx => tx.type === 'investment' && tx.status === 'completed')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()} €
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Décaissements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {filteredTransactions
                .filter(tx => tx.type === 'disbursement' && tx.status === 'completed')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()} €
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tableau des transactions */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="investments">Investissements</TabsTrigger>
          <TabsTrigger value="disbursements">Décaissements</TabsTrigger>
          <TabsTrigger value="repayments">Remboursements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredTransactions}
                columns={transactionColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredTransactions.filter(tx => tx.type === 'investment')}
                columns={transactionColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="disbursements">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredTransactions.filter(tx => tx.type === 'disbursement')}
                columns={transactionColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repayments">
          <Card>
            <CardContent className="pt-6">
              <DataTable
                data={filteredTransactions.filter(tx => tx.type === 'repayment')}
                columns={transactionColumns}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Colonnes du tableau de transactions
const transactionColumns = [
  { header: "ID", accessorKey: "id" },
  { header: "Date", accessorKey: "date",
    cell: (tx) => new Date(tx.date).toLocaleString()
  },
  { header: "Montant", accessorKey: "amount",
    cell: (tx) => `${tx.amount.toLocaleString()} €`
  },
  { header: "Type", accessorKey: "type",
    cell: (tx) => (
      <div className="flex items-center">
        {tx.type === 'investment' && <CreditCard className="mr-2 h-4 w-4 text-green-600" />}
        {tx.type === 'disbursement' && <CreditCard className="mr-2 h-4 w-4 text-finance-red" />}
        {tx.type === 'repayment' && <Calendar className="mr-2 h-4 w-4 text-finance-blue" />}
        <span>
          {tx.type === 'investment' ? 'Investissement' : 
           tx.type === 'disbursement' ? 'Décaissement' : 'Remboursement'}
        </span>
      </div>
    )
  },
  { header: "Statut", accessorKey: "status",
    cell: (tx) => (
      <StatusBadge 
        status={
          tx.status === 'completed' ? 'Complétée' :
          tx.status === 'pending' ? 'En attente' : 'Échouée'
        } 
        className={
          tx.status === 'completed' ? 'bg-green-100 text-green-800' :
          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }
      />
    )
  },
  { header: "PME", accessorKey: "pmeName" },
  { header: "Créance", accessorKey: "claimTitle" },
  { header: "Investisseur", accessorKey: "investorName",
    cell: (tx) => tx.investorName || "N/A"
  },
  { header: "Actions", accessorKey: "id", 
    cell: (tx) => (
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => toast.success(`Détails de la transaction ${tx.id} affichés`)}
      >
        Détails
      </Button>
    ) 
  }
];

export default Transactions;
