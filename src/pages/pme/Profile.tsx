
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mockPMEs } from "@/data/mock-data";
import { Upload } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Trouver les données de la PME actuelle
  const pmeData = mockPMEs.find(pme => pme.id === user.id) || {
    companyName: "",
    siret: "",
    address: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    description: ""
  };
  
  const [formData, setFormData] = useState(pmeData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil mis à jour avec succès");
  };
  
  const handleFileUpload = () => {
    toast.success("Document téléchargé avec succès");
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
      
      <Tabs defaultValue="information">
        <TabsList className="mb-4">
          <TabsTrigger value="information">Informations générales</TabsTrigger>
          <TabsTrigger value="documents">Documents légaux</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="information">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input 
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siret">SIRET</Label>
                    <Input 
                      id="siret"
                      name="siret"
                      value={formData.siret}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Personne de contact</Label>
                    <Input 
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input 
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Téléphone</Label>
                    <Input 
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description de l'entreprise</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents légaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 border border-dashed rounded-lg flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Déposez vos fichiers ici ou</p>
                  <Button type="button" variant="outline" onClick={handleFileUpload}>
                    Parcourir les fichiers
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Formats acceptés : PDF, JPG, PNG. Max 10 Mo par fichier.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Documents requis</h3>
                  <ul className="space-y-2">
                    <li className="p-3 bg-green-50 border border-green-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Extrait Kbis</p>
                        <p className="text-xs text-gray-500">Téléchargé le 15/04/2025</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                    <li className="p-3 bg-green-50 border border-green-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">RIB</p>
                        <p className="text-xs text-gray-500">Téléchargé le 15/04/2025</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                    <li className="p-3 bg-yellow-50 border border-yellow-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Pièce d'identité du gérant</p>
                        <p className="text-xs text-gray-500">En attente de validation</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="button" onClick={() => toast.success("Mot de passe changé avec succès")} className="bg-blue-600 hover:bg-blue-700">
                  Changer le mot de passe
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
