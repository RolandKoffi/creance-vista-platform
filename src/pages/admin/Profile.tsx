
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  // Mock data for admin profile
  const adminData = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "admin@example.com",
    phone: "+33612345678",
  };
  
  const [admin, setAdmin] = useState(adminData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSave = () => {
    toast.success("Profil mis à jour avec succès");
    setIsEditing(false);
  };
  
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    
    toast.success("Mot de passe mis à jour avec succès");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profil administrateur</h1>
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
              className="bg-finance-blue hover:bg-finance-blue/90"
            >
              Enregistrer
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="personal-info">
        <TabsList className="mb-4">
          <TabsTrigger value="personal-info">Informations personnelles</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
                  <Input 
                    id="firstName" 
                    value={admin.firstName}
                    onChange={(e) => setAdmin({...admin, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
                  <Input 
                    id="lastName" 
                    value={admin.lastName}
                    onChange={(e) => setAdmin({...admin, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email"
                    value={admin.email}
                    onChange={(e) => setAdmin({...admin, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                  <Input 
                    id="phone" 
                    value={admin.phone}
                    onChange={(e) => setAdmin({...admin, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium">Mot de passe actuel</label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">Nouveau mot de passe</label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirmer le mot de passe</label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handlePasswordChange}
                className="mt-4 bg-finance-blue hover:bg-finance-blue/90"
              >
                Mettre à jour le mot de passe
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Authentification à deux facteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">État: <span className="text-finance-red">Désactivé</span></h3>
                  <p className="text-sm text-gray-500 mt-1">
                    L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <Button variant="outline">Configurer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Emails de nouvelles créances</h3>
                  <p className="text-sm text-gray-500">
                    Recevez un email quand une nouvelle créance est soumise
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className={isEditing ? "" : "bg-finance-blue text-white"}>Activé</Button>
                  <Button variant="outline" size="sm" disabled={!isEditing}>Désactivé</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Emails de validation d'utilisateurs</h3>
                  <p className="text-sm text-gray-500">
                    Recevez un email quand un nouvel utilisateur s'inscrit
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className={isEditing ? "" : "bg-finance-blue text-white"}>Activé</Button>
                  <Button variant="outline" size="sm" disabled={!isEditing}>Désactivé</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Emails de transactions</h3>
                  <p className="text-sm text-gray-500">
                    Recevez un email pour chaque transaction importante
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className={isEditing ? "" : "bg-finance-blue text-white"}>Activé</Button>
                  <Button variant="outline" size="sm" disabled={!isEditing}>Désactivé</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notifications système</h3>
                  <p className="text-sm text-gray-500">
                    Recevez des notifications pour les mises à jour système
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled={!isEditing}>Activé</Button>
                  <Button variant="outline" size="sm" className={isEditing ? "" : "bg-finance-blue text-white"}>Désactivé</Button>
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
