
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClaims } from "@/data/mock-data";
import { toast } from "sonner";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filtrer les créances par statut et par terme de recherche
  const filteredClaims = (status) => {
    return mockClaims
      .filter(claim => status === 'all' || claim.status === status)
      .filter(claim => 
        claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.pmeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  const handleAction = (action: string, claimId: string) => {
    if (action === 'validate') {
      toast.success(`Créance ${claimId} validée avec succès`);
    } else if (action === 'reject') {
      toast.error(`Créance ${claimId} rejetée`);
    } else if (action === 'cancel') {
      toast.info(`Créance ${claimId} annulée`);
    }
  };
  
  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    setDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des créances</h1>
      
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Rechercher une créance par titre, PME..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total créances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {mockClaims.length}
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
            <div className="text-2xl font-bold text-green-600">
              {mockClaims.filter(claim => claim.status === 'active').length}
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
            <div className="text-2xl font-bold text-yellow-600">
              {mockClaims.filter(claim => claim.status === 'pending').length}
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
            <div className="text-2xl font-bold text-finance-red">
              {mockClaims.reduce((total, claim) => total + claim.amount, 0).toLocaleString()} €
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tableau des créances */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="repaid">Remboursées</TabsTrigger>
          <TabsTrigger value="all">Toutes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Créances en attente de validation</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredClaims('pending')}
                columns={[
                  { header: "PME", accessorKey: "pmeName" },
                  { header: "Titre", accessorKey: "title" },
                  { header: "Montant", accessorKey: "amount",
                    cell: (claim) => `${claim.amount.toLocaleString()} €`
                  },
                  { header: "Échéance", accessorKey: "dueDate", 
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
                          onClick={() => handleViewDetails(claim)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAction('validate', claim.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Valider
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500"
                          onClick={() => handleAction('reject', claim.id)}
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
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Créances actives</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredClaims('active')}
                columns={[
                  { header: "PME", accessorKey: "pmeName" },
                  { header: "Titre", accessorKey: "title" },
                  { header: "Montant", accessorKey: "amount",
                    cell: (claim) => `${claim.amount.toLocaleString()} €`
                  },
                  { header: "Progression", accessorKey: "fundingProgress",
                    cell: (claim) => (
                      <div className="w-full">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{claim.fundingProgress}%</span>
                          <span>{Math.round(claim.amount * claim.fundingProgress / 100).toLocaleString()} €</span>
                        </div>
                        <Progress value={claim.fundingProgress} className="h-2" />
                      </div>
                    )
                  },
                  { header: "Échéance", accessorKey: "dueDate", 
                    cell: (claim) => new Date(claim.dueDate).toLocaleDateString() 
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (claim) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(claim)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-yellow-500"
                          onClick={() => handleAction('cancel', claim.id)}
                        >
                          Annuler
                        </Button>
                      </div>
                    ) 
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repaid">
          <Card>
            <CardHeader>
              <CardTitle>Créances remboursées</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredClaims('repaid')}
                columns={[
                  { header: "PME", accessorKey: "pmeName" },
                  { header: "Titre", accessorKey: "title" },
                  { header: "Montant", accessorKey: "amount",
                    cell: (claim) => `${claim.amount.toLocaleString()} €`
                  },
                  { header: "Date de remboursement", accessorKey: "repaidAt", 
                    cell: (claim) => new Date().toLocaleDateString() // Simulé
                  },
                  { header: "Rendement", accessorKey: "yield",
                    cell: () => "8.5%"
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (claim) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(claim)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                      </div>
                    ) 
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les créances</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredClaims('all')}
                columns={[
                  { header: "PME", accessorKey: "pmeName" },
                  { header: "Titre", accessorKey: "title" },
                  { header: "Montant", accessorKey: "amount",
                    cell: (claim) => `${claim.amount.toLocaleString()} €`
                  },
                  { header: "Statut", accessorKey: "status",
                    cell: (claim) => (
                      <StatusBadge 
                        status={
                          claim.status === 'pending' ? 'En attente' :
                          claim.status === 'active' ? 'Active' : 'Remboursée'
                        } 
                        className={
                          claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          claim.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }
                      />
                    )
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
                          onClick={() => handleViewDetails(claim)}
                          variant="outline"
                        >
                          Détails
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
      
      {/* Dialogue de détails créance */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de la créance</DialogTitle>
            <DialogDescription>
              Informations complètes et documents associés
            </DialogDescription>
          </DialogHeader>
          
          {selectedClaim && (
            <div className="mt-4 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-finance-blue h-12 w-12 rounded-full flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedClaim.title}</h2>
                  <p className="text-gray-500">PME: {selectedClaim.pmeName}</p>
                </div>
                <StatusBadge 
                  status={
                    selectedClaim.status === 'pending' ? 'En attente' :
                    selectedClaim.status === 'active' ? 'Active' : 'Remboursée'
                  } 
                  className={
                    selectedClaim.status === 'pending' ? 'bg-yellow-100 text-yellow-800 ml-auto' :
                    selectedClaim.status === 'active' ? 'bg-green-100 text-green-800 ml-auto' :
                    'bg-blue-100 text-blue-800 ml-auto'
                  }
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Montant</h3>
                  <p className="text-lg font-semibold">{selectedClaim.amount.toLocaleString()} €</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Client</h3>
                  <p>{selectedClaim.clientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date d'échéance</h3>
                  <p>{new Date(selectedClaim.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Niveau de risque</h3>
                  <StatusBadge 
                    status={
                      selectedClaim.riskLevel === 'low' ? 'Faible' : 
                      selectedClaim.riskLevel === 'medium' ? 'Moyen' : 'Élevé'
                    } 
                    className={
                      selectedClaim.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      selectedClaim.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">État du financement</h3>
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{selectedClaim.fundingProgress}% financé</span>
                    <span>
                      {Math.round(selectedClaim.amount * selectedClaim.fundingProgress / 100).toLocaleString()} € / 
                      {selectedClaim.amount.toLocaleString()} €
                    </span>
                  </div>
                  <Progress value={selectedClaim.fundingProgress} className="h-2" />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-gray-700">
                  {selectedClaim.description || "Cette créance concerne une facture émise à l'encontre du client mentionné ci-dessus. Le document a été vérifié et validé par notre équipe."}
                </p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Documents associés</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Facture originale</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Bon de commande</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Contrat signé</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fermer
                </Button>
                {selectedClaim.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => {
                        handleAction('reject', selectedClaim.id);
                        setDialogOpen(false);
                      }}
                      variant="outline"
                      className="text-red-500"
                    >
                      Rejeter
                    </Button>
                    <Button 
                      onClick={() => {
                        handleAction('validate', selectedClaim.id);
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

export default Claims;
