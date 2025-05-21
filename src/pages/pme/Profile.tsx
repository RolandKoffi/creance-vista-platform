
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload } from "lucide-react";
import { mockPMEs } from "@/data/mock-data";
import { toast } from "sonner";

const Profile = () => {
  // Mock data for logged-in PME
  const currentPmeId = "pme-1";
  const pmeData = mockPMEs.find(pme => pme.id === currentPmeId) || {
    companyName: "TechSolutions SAS",
    siret: "12345678901234",
    address: "123 Avenue de la République, 75011 Paris",
    contactPerson: "Marie Dubois",
    contactEmail: "contact@techsolutions.fr",
    contactPhone: "+33123456789",
    description: "Entreprise spécialisée dans le développement de solutions technologiques B2B."
  };
  
  const [pme, setPme] = useState(pmeData);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    toast.success("Profil mis à jour avec succès");
    setIsEditing(false);
  };
  
  const handleUpload = () => {
    toast.success("Document téléchargé avec succès");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profil de l'entreprise</h1>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            Modifier le profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="company-info">
        <TabsList className="mb-4">
          <TabsTrigger value="company-info">Informations entreprise</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="banking">Informations bancaires</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company-info">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">Raison sociale</label>
                  <Input 
                    id="companyName" 
                    value={pme.companyName}
                    onChange={(e) => setPme({...pme, companyName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="siret" className="text-sm font-medium">SIRET</label>
                  <Input 
                    id="siret" 
                    value={pme.siret}
                    onChange={(e) => setPme({...pme, siret: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactPerson" className="text-sm font-medium">Personne de contact</label>
                  <Input 
                    id="contactPerson" 
                    value={pme.contactPerson}
                    onChange={(e) => setPme({...pme, contactPerson: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-medium">Email de contact</label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={pme.contactEmail}
                    onChange={(e) => setPme({...pme, contactEmail: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactPhone" className="text-sm font-medium">Téléphone de contact</label>
                  <Input 
                    id="contactPhone" 
                    value={pme.contactPhone}
                    onChange={(e) => setPme({...pme, contactPhone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                <Textarea 
                  id="address" 
                  value={pme.address}
                  onChange={(e) => setPme({...pme, address: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description de l'activité</label>
                <Textarea 
                  id="description" 
                  value={pme.description}
                  onChange={(e) => setPme({...pme, description: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents légaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Extrait KBIS</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing} onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Remplacer
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Statuts de l'entreprise</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing} onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Remplacer
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Bilans financiers</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing} onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Remplacer
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Pièce d'identité du dirigeant</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing} onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Remplacer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <CardTitle>Informations bancaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bankName" className="text-sm font-medium">Banque</label>
                  <Input 
                    id="bankName" 
                    value="Crédit Industriel"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="accountNumber" className="text-sm font-medium">Numéro de compte</label>
                  <Input 
                    id="accountNumber" 
                    value="FR76 XXXX XXXX XXXX XXXX"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bic" className="text-sm font-medium">BIC</label>
                  <Input 
                    id="bic" 
                    value="CIDFFR21XXX"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="accountName" className="text-sm font-medium">Titulaire du compte</label>
                  <Input 
                    id="accountName" 
                    value="TechSolutions SAS"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <FileText className="h-10 w-10 text-finance-blue" />
                <div>
                  <h3 className="font-medium">RIB enregistré</h3>
                  <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                </div>
                {isEditing && (
                  <Button variant="outline" className="ml-auto" onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Remplacer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
