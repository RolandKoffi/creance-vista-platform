
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockInvestors } from "@/data/mock-data";

const Profile = () => {
  // Mock data for logged-in investor
  const currentInvestorId = "inv-1"; 
  const investorData = mockInvestors.find(inv => inv.id === currentInvestorId) || {
    firstName: "Jean",
    lastName: "Dupont", 
    idNumber: "FR1234567890",
    address: "123 Rue de Paris, 75001 Paris",
    email: "jean.dupont@example.com",
    phone: "+33612345678",
    riskProfile: "moderate",
    preferences: {
      notifyNewOpportunities: true,
      notifyPayments: true,
      marketingEmails: false
    }
  };
  
  const [investor, setInvestor] = useState(investorData);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    toast.success("Profil mis à jour avec succès");
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            Modifier mon profil
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
      
      <Tabs defaultValue="personal-info">
        <TabsList className="mb-4">
          <TabsTrigger value="personal-info">Informations personnelles</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input 
                    id="firstName" 
                    value={investor.firstName}
                    onChange={(e) => setInvestor({...investor, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input 
                    id="lastName" 
                    value={investor.lastName}
                    onChange={(e) => setInvestor({...investor, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={investor.email}
                    onChange={(e) => setInvestor({...investor, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    value={investor.phone}
                    onChange={(e) => setInvestor({...investor, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">Numéro d'identité</Label>
                  <Input 
                    id="idNumber" 
                    value={investor.idNumber}
                    onChange={(e) => setInvestor({...investor, idNumber: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Profil de risque</Label>
                  <Select 
                    disabled={!isEditing} 
                    value={investor.riskProfile}
                    onValueChange={(value) => setInvestor({...investor, riskProfile: value})}
                  >
                    <SelectTrigger id="riskProfile">
                      <SelectValue placeholder="Sélectionner un profil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservateur</SelectItem>
                      <SelectItem value="moderate">Modéré</SelectItem>
                      <SelectItem value="aggressive">Dynamique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea 
                  id="address" 
                  value={investor.address}
                  onChange={(e) => setInvestor({...investor, address: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouvelles opportunités d'investissement</Label>
                  <p className="text-sm text-gray-500">
                    Recevez des notifications quand de nouvelles créances sont disponibles
                  </p>
                </div>
                <Switch 
                  checked={investor.preferences?.notifyNewOpportunities} 
                  onCheckedChange={(checked) => 
                    setInvestor({
                      ...investor, 
                      preferences: {...investor.preferences, notifyNewOpportunities: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications de paiement</Label>
                  <p className="text-sm text-gray-500">
                    Recevez des notifications lors des remboursements
                  </p>
                </div>
                <Switch 
                  checked={investor.preferences?.notifyPayments} 
                  onCheckedChange={(checked) => 
                    setInvestor({
                      ...investor, 
                      preferences: {...investor.preferences, notifyPayments: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emails marketing</Label>
                  <p className="text-sm text-gray-500">
                    Recevez nos newsletters et promotions
                  </p>
                </div>
                <Switch 
                  checked={investor.preferences?.marketingEmails} 
                  onCheckedChange={(checked) => 
                    setInvestor({
                      ...investor, 
                      preferences: {...investor.preferences, marketingEmails: checked}
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents d'identité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Pièce d'identité</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing}>Remplacer</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Justificatif de domicile</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing}>Remplacer</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">RIB</h3>
                    <p className="text-sm text-gray-500">Validé le 15/04/2023</p>
                  </div>
                  <Button variant="outline" disabled={!isEditing}>Remplacer</Button>
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer mot de passe</Label>
                <Input id="confirm-password" type="password" disabled={!isEditing} />
              </div>
              
              {isEditing && (
                <Button className="mt-4">Changer le mot de passe</Button>
              )}
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activer l'authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">
                      Renforcez la sécurité de votre compte avec l'A2F
                    </p>
                  </div>
                  <Switch disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
