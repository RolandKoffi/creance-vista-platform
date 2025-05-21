
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockInvestors } from "@/data/mock-data";
import { toast } from "sonner";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Investors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filtrer les investisseurs par statut (vérifié ou non) et par terme de recherche
  const filteredInvestors = (isVerified: boolean) => {
    return mockInvestors
      .filter(investor => investor.isVerified === isVerified)
      .filter(investor => 
        investor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  const handleAction = (action: string, investorId: string) => {
    if (action === 'validate') {
      toast.success(`Investisseur ${investorId} validé avec succès`);
    } else if (action === 'reject') {
      toast.error(`Investisseur ${investorId} rejeté`);
    } else if (action === 'suspend') {
      toast.info(`Investisseur ${investorId} suspendu temporairement`);
    }
  };
  
  const handleViewDetails = (investor) => {
    setSelectedInvestor(investor);
    setDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des investisseurs</h1>
      
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Rechercher un investisseur par nom, identifiant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total investisseurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {mockInvestors.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Investisseurs vérifiés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockInvestors.filter(inv => inv.isVerified).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {mockInvestors.filter(inv => !inv.isVerified).length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tableau des investisseurs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">En attente de validation</TabsTrigger>
          <TabsTrigger value="verified">Investisseurs vérifiés</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Investisseurs en attente de validation</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredInvestors(false)}
                columns={[
                  { header: "Nom", accessorKey: "lastName",
                    cell: (investor) => `${investor.firstName} ${investor.lastName}`
                  },
                  { header: "Identifiant", accessorKey: "idNumber" },
                  { header: "Date d'inscription", accessorKey: "createdAt", 
                    cell: (investor) => new Date(investor.createdAt).toLocaleDateString() 
                  },
                  { header: "Statut", accessorKey: "isVerified",
                    cell: (investor) => (
                      <StatusBadge 
                        status="En attente" 
                        className="bg-yellow-100 text-yellow-800"
                      />
                    )
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (investor) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(investor)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAction('validate', investor.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Valider
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500"
                          onClick={() => handleAction('reject', investor.id)}
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
        </TabsContent>
        
        <TabsContent value="verified">
          <Card>
            <CardHeader>
              <CardTitle>Investisseurs vérifiés</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredInvestors(true)}
                columns={[
                  { header: "Nom", accessorKey: "lastName",
                    cell: (investor) => `${investor.firstName} ${investor.lastName}`
                  },
                  { header: "Identifiant", accessorKey: "idNumber" },
                  { header: "Montant investi", accessorKey: "id",
                    cell: () => `${Math.floor(Math.random() * 50000 + 5000).toLocaleString()} €`
                  },
                  { header: "Statut", accessorKey: "isVerified",
                    cell: (investor) => (
                      <StatusBadge 
                        status="Vérifié" 
                        className="bg-green-100 text-green-800"
                      />
                    )
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (investor) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(investor)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-yellow-500"
                          onClick={() => handleAction('suspend', investor.id)}
                        >
                          Suspendre
                        </Button>
                      </div>
                    ) 
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogue de détails investisseur */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de l'investisseur</DialogTitle>
            <DialogDescription>
              Informations complètes et documents associés
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvestor && (
            <div className="mt-4 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-finance-blue h-12 w-12 rounded-full flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedInvestor.firstName} {selectedInvestor.lastName}</h2>
                  <p className="text-gray-500">ID: {selectedInvestor.idNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                  <p>{selectedInvestor.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date d'inscription</h3>
                  <p>{new Date(selectedInvestor.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  <StatusBadge 
                    status={selectedInvestor.isVerified ? "Vérifié" : "En attente"} 
                    className={selectedInvestor.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Profil de risque</h3>
                  <p>Modéré</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <User className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Pièce d'identité</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Justificatif de domicile</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>RIB</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fermer
                </Button>
                {!selectedInvestor.isVerified && (
                  <>
                    <Button 
                      onClick={() => {
                        handleAction('reject', selectedInvestor.id);
                        setDialogOpen(false);
                      }}
                      variant="outline"
                      className="text-red-500"
                    >
                      Rejeter
                    </Button>
                    <Button 
                      onClick={() => {
                        handleAction('validate', selectedInvestor.id);
                        setDialogOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Valider
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investors;
