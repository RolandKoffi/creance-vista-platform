
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockInvestors } from "@/data/mock-data";
import { Upload, CreditCard } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Trouver les données de l'investisseur actuel
  const investorData = mockInvestors.find(investor => investor.id === user.id) || {
    firstName: "",
    lastName: "",
    idNumber: "",
    address: "",
    email: "",
    phone: "",
    riskProfile: "medium",
    preferences: {
      notifyNewOpportunities: true,
      notifyPayments: true,
      marketingEmails: false
    }
  };
  
  const [formData, setFormData] = useState(investorData);
  const [preferenceData, setPreferenceData] = useState(investorData.preferences);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferenceData({
      ...preferenceData,
      [key]: value
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
      
      <Tabs defaultValue="personal">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
          <TabsTrigger value="identity">Vérification d'identité</TabsTrigger>
          <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
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
                  <div className="space-y-2">
                    <Label htmlFor="riskProfile">Profil de risque</Label>
                    <Select defaultValue={formData.riskProfile}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre profil de risque" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Prudent</SelectItem>
                        <SelectItem value="medium">Équilibré</SelectItem>
                        <SelectItem value="high">Dynamique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="identity">
          <Card>
            <CardHeader>
              <CardTitle>Vérification d'identité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 border border-dashed rounded-lg flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Déposez vos documents d'identité ici ou</p>
                  <Button type="button" variant="outline" onClick={handleFileUpload}>
                    Parcourir les fichiers
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Formats acceptés : PDF, JPG, PNG. Max 5 Mo par fichier.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Documents requis</h3>
                  <ul className="space-y-2">
                    <li className="p-3 bg-green-50 border border-green-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Carte d'identité (recto)</p>
                        <p className="text-xs text-gray-500">Téléchargé le 15/04/2025</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                    <li className="p-3 bg-green-50 border border-green-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Carte d'identité (verso)</p>
                        <p className="text-xs text-gray-500">Téléchargé le 15/04/2025</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                    <li className="p-3 bg-yellow-50 border border-yellow-100 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Justificatif de domicile</p>
                        <p className="text-xs text-gray-500">En attente de validation</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Voir</Button>
                        <Button variant="outline" size="sm">Remplacer</Button>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-md">
                  <div>
                    <h3 className="text-sm font-medium">Statut de vérification</h3>
                    <p className="text-xs text-gray-600">Votre compte est en cours de vérification</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                    En cours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Moyens de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium">Carte Visa terminant par 4567</h3>
                      <p className="text-xs text-gray-600">Expire le 12/27</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 text-sm">
                      Supprimer
                    </Button>
                  </div>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => toast.success("Nouveau moyen de paiement ajouté")}>
                  Ajouter un moyen de paiement
                </Button>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Historique des paiements</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Achat de parts - PME Innovante</p>
                        <p className="text-xs text-gray-500">15/04/2025</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">1 500,00 €</p>
                        <p className="text-xs text-green-600">Terminé</p>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Achat de parts - Tech Solutions</p>
                        <p className="text-xs text-gray-500">02/04/2025</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">2 200,00 €</p>
                        <p className="text-xs text-green-600">Terminé</p>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Achat de parts - Eco Services</p>
                        <p className="text-xs text-gray-500">20/03/2025</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">750,00 €</p>
                        <p className="text-xs text-green-600">Terminé</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Nouvelles opportunités d'investissement</p>
                        <p className="text-xs text-gray-600">Recevez des notifications quand de nouvelles créances sont disponibles</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="notifyNewOpportunities"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          checked={preferenceData.notifyNewOpportunities}
                          onChange={() => handlePreferenceChange('notifyNewOpportunities', !preferenceData.notifyNewOpportunities)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Paiements et remboursements</p>
                        <p className="text-xs text-gray-600">Soyez informé des paiements reçus et des échéances à venir</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="notifyPayments"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          checked={preferenceData.notifyPayments}
                          onChange={() => handlePreferenceChange('notifyPayments', !preferenceData.notifyPayments)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Emails marketing</p>
                        <p className="text-xs text-gray-600">Recevez des informations sur nos nouveaux produits et services</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="marketingEmails"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          checked={preferenceData.marketingEmails}
                          onChange={() => handlePreferenceChange('marketingEmails', !preferenceData.marketingEmails)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Préférences d'investissement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minReturn">Rendement minimum recherché</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un rendement minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="12">12%+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxRisk">Niveau de risque maximum</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un niveau de risque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyen</SelectItem>
                          <SelectItem value="high">Élevé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredSectors">Secteurs préférés</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez vos secteurs préférés" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les secteurs</SelectItem>
                          <SelectItem value="tech">Technologie</SelectItem>
                          <SelectItem value="retail">Commerce</SelectItem>
                          <SelectItem value="health">Santé</SelectItem>
                          <SelectItem value="eco">Développement durable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredDuration">Durée préférée</Label>
                      <Select defaultValue="90">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une durée" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 jours</SelectItem>
                          <SelectItem value="60">60 jours</SelectItem>
                          <SelectItem value="90">90 jours</SelectItem>
                          <SelectItem value="180">180 jours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => toast.success("Préférences mises à jour")} className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les préférences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
