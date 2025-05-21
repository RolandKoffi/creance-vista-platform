
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { mockClaims } from "@/data/mock-data";
import { FileText, Plus, Search } from "lucide-react";
import { toast } from "sonner";

const Claims = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrer les créances pour la PME connectée (simulation)
  const currentPmeId = "pme-1";
  const pmeClaims = mockClaims.filter(claim => claim.pmeId === currentPmeId);
  
  // Filtrer par statut et recherche
  const filteredClaims = (status) => {
    return pmeClaims
      .filter(claim => status === 'all' || claim.status === status)
      .filter(claim => 
        claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        claim.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };
  
  const handleWithdrawFunds = (claimId) => {
    toast.success(`Demande de retrait des fonds envoyée pour la créance ${claimId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes créances</h1>
        <Button 
          onClick={() => navigate("/pme/submit-claim")}
          className="bg-finance-blue hover:bg-finance-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Nouvelle créance
        </Button>
      </div>
      
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Rechercher une créance..."
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
              Créances actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pmeClaims.filter(c => c.status === 'active').length}
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
            <div className="text-2xl font-bold text-finance-blue">
              {pmeClaims.reduce((sum, claim) => sum + claim.amount, 0).toLocaleString()} €
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Fonds disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-finance-red">
              {pmeClaims
                .filter(c => c.fundingProgress === 100 && !c.fundsWithdrawn)
                .reduce((sum, claim) => sum + claim.amount, 0)
                .toLocaleString()} €
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Liste des créances */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="repaid">Remboursées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6 space-y-6">
              {renderClaimsList(filteredClaims('all'), handleWithdrawFunds)}
            </TabsContent>
            
            <TabsContent value="active" className="mt-6 space-y-6">
              {renderClaimsList(filteredClaims('active'), handleWithdrawFunds)}
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6 space-y-6">
              {renderClaimsList(filteredClaims('pending'), handleWithdrawFunds)}
            </TabsContent>
            
            <TabsContent value="repaid" className="mt-6 space-y-6">
              {renderClaimsList(filteredClaims('repaid'), handleWithdrawFunds)}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

// Fonction pour afficher la liste des créances
const renderClaimsList = (claims, onWithdrawFunds) => {
  if (claims.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune créance trouvée</h3>
        <p className="mt-1 text-sm text-gray-500">
          Vous n'avez pas encore de créances dans cette catégorie.
        </p>
      </div>
    );
  }
  
  return claims.map(claim => (
    <div key={claim.id} className="border rounded-lg overflow-hidden mb-4 bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{claim.title}</h3>
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
            </div>
            <p className="text-sm text-gray-500">Client: {claim.clientName}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-finance-blue">{claim.amount.toLocaleString()} €</div>
            <p className="text-sm text-gray-500">
              Échéance: {new Date(claim.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Financement: {claim.fundingProgress}%</span>
            <span>
              {Math.round(claim.amount * claim.fundingProgress / 100).toLocaleString()} € / 
              {claim.amount.toLocaleString()} €
            </span>
          </div>
          <Progress value={claim.fundingProgress} className="h-2" />
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div>
            <div className="text-gray-500">Statut</div>
            <div>
              {claim.status === 'pending' ? 'En attente' :
               claim.status === 'active' ? 'Active' : 'Remboursée'}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Date de création</div>
            <div>{new Date(claim.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-gray-500">Investisseurs</div>
            <div>{claim.investors?.length || 0}</div>
          </div>
          <div>
            <div className="text-gray-500">Risque</div>
            <div>
              {claim.riskLevel === 'low' ? 'Faible' : 
               claim.riskLevel === 'medium' ? 'Moyen' : 'Élevé'}
            </div>
          </div>
        </div>
        
        {claim.fundingProgress === 100 && !claim.fundsWithdrawn && (
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => onWithdrawFunds(claim.id)}
              className="bg-finance-red hover:bg-finance-red/90"
            >
              Retirer les fonds
            </Button>
          </div>
        )}
      </div>
    </div>
  ));
};

export default Claims;
