import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockPMEs } from "@/data/mock-data";
import { toast } from "sonner";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, User, Building, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PMEs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPME, setSelectedPME] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filtrer les PMEs par statut (vérifié ou non) et par terme de recherche
  const filteredPMEs = (isVerified: boolean) => {
    return mockPMEs
      .filter(pme => pme.isVerified === isVerified)
      .filter(pme => 
        pme.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pme.siret.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pme.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  const handleAction = (action: string, pmeId: string) => {
    if (action === 'validate') {
      toast.success(`PME ${pmeId} validée avec succès`);
    } else if (action === 'reject') {
      toast.error(`PME ${pmeId} rejetée`);
    } else if (action === 'suspend') {
      toast.info(`PME ${pmeId} suspendue temporairement`);
    }
  };
  
  const handleViewDetails = (pme) => {
    setSelectedPME(pme);
    setDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des PMEs</h1>
      
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Rechercher une PME par nom, SIRET..."
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
              Total PMEs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-blue">
              {mockPMEs.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              PMEs vérifiées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockPMEs.filter(pme => pme.isVerified).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              PMEs en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {mockPMEs.filter(pme => !pme.isVerified).length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tableau des PMEs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">En attente de validation</TabsTrigger>
          <TabsTrigger value="verified">PMEs vérifiées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>PMEs en attente de validation</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredPMEs(false)}
                columns={[
                  { header: "Nom", accessorKey: "companyName" },
                  { header: "SIRET", accessorKey: "siret" },
                  { header: "Contact", accessorKey: "contactPerson" },
                  { header: "Date d'inscription", accessorKey: "createdAt", 
                    cell: (pme) => new Date(pme.createdAt).toLocaleDateString() 
                  },
                  { header: "Statut", accessorKey: "isVerified",
                    cell: (pme) => (
                      <StatusBadge 
                        status="En attente" 
                        className="bg-yellow-100 text-yellow-800"
                      />
                    )
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (pme) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(pme)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAction('validate', pme.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Valider
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500"
                          onClick={() => handleAction('reject', pme.id)}
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
              <CardTitle>PMEs vérifiées</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredPMEs(true)}
                columns={[
                  { header: "Nom", accessorKey: "companyName" },
                  { header: "SIRET", accessorKey: "siret" },
                  { header: "Contact", accessorKey: "contactPerson" },
                  { header: "Date de validation", accessorKey: "verifiedAt", 
                    cell: (pme) => pme.verifiedAt ? new Date(pme.verifiedAt).toLocaleDateString() : 'N/A'
                  },
                  { header: "Statut", accessorKey: "isVerified",
                    cell: (pme) => (
                      <StatusBadge 
                        status="Vérifié" 
                        className="bg-green-100 text-green-800"
                      />
                    )
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (pme) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewDetails(pme)}
                          variant="outline"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-yellow-500"
                          onClick={() => handleAction('suspend', pme.id)}
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
      
      {/* Dialogue de détails PME */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de la PME</DialogTitle>
            <DialogDescription>
              Informations complètes et documents associés
            </DialogDescription>
          </DialogHeader>
          
          {selectedPME && (
            <div className="mt-4 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-finance-blue h-12 w-12 rounded-full flex items-center justify-center text-white">
                  <Building size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedPME.companyName}</h2>
                  <p className="text-gray-500">SIRET: {selectedPME.siret}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                  <p>{selectedPME.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p>{selectedPME.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date de création</h3>
                  <p>{new Date(selectedPME.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  <StatusBadge 
                    status={selectedPME.isVerified ? "Vérifié" : "En attente"} 
                    className={selectedPME.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>KBIS</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Statuts</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Bilan financier</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <User className="h-6 w-6 mr-2 text-finance-blue" />
                      <span>Pièce d'identité dirigeant</span>
                    </div>
                    <Button variant="outline" size="sm">Visualiser</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Fermer
                </Button>
                {!selectedPME.isVerified && (
                  <>
                    <Button 
                      onClick={() => {
                        handleAction('reject', selectedPME.id);
                        setDialogOpen(false);
                      }}
                      variant="outline"
                      className="text-red-500"
                    >
                      Rejeter
                    </Button>
                    <Button 
                      onClick={() => {
                        handleAction('validate', selectedPME.id);
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

export default PMEs;
