
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
  // Paramètres de commission
  const [commissionRate, setCommissionRate] = useState("2.5");
  const [minInvestmentAmount, setMinInvestmentAmount] = useState("1000");
  const [maxInvestmentAmount, setMaxInvestmentAmount] = useState("50000");
  const [discountRate, setDiscountRate] = useState("3.0");
  
  // Paramètres de notification
  const [notifyNewClaims, setNotifyNewClaims] = useState(true);
  const [notifyRepayments, setNotifyRepayments] = useState(true);
  const [notifyVerifications, setNotifyVerifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Paramètres de sécurité
  const [twoFactorRequired, setTwoFactorRequired] = useState(true);
  const [maximumLoginAttempts, setMaximumLoginAttempts] = useState("5");
  const [sessionTimeout, setSessionTimeout] = useState("60");
  
  const handleSaveFinanceSettings = () => {
    toast.success("Paramètres financiers mis à jour avec succès");
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Paramètres de notification mis à jour avec succès");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Paramètres de sécurité mis à jour avec succès");
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres de la plateforme</h1>
      
      <Tabs defaultValue="finance">
        <TabsList className="mb-4">
          <TabsTrigger value="finance">Finances</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>
        
        {/* Paramètres financiers */}
        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres financiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Taux de commission (%)</Label>
                  <Input
                    id="commission-rate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Taux prélevé sur chaque transaction
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount-rate">Taux de décote (%)</Label>
                  <Input
                    id="discount-rate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Décote appliquée aux créances
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min-investment">Investissement minimum (€)</Label>
                  <Input
                    id="min-investment"
                    type="number"
                    step="100"
                    min="0"
                    value={minInvestmentAmount}
                    onChange={(e) => setMinInvestmentAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-investment">Investissement maximum (€)</Label>
                  <Input
                    id="max-investment"
                    type="number"
                    step="1000"
                    min="1000"
                    value={maxInvestmentAmount}
                    onChange={(e) => setMaxInvestmentAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-risk-level">Niveau de risque par défaut</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="default-risk-level">
                      <SelectValue placeholder="Sélectionner un niveau de risque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="high">Élevé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-methods">Méthodes de paiement autorisées</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="payment-methods">
                      <SelectValue placeholder="Sélectionner les méthodes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="card">Carte bancaire uniquement</SelectItem>
                      <SelectItem value="bank">Virement bancaire uniquement</SelectItem>
                      <SelectItem value="card_bank">Carte + Virement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSaveFinanceSettings}
                className="w-full md:w-auto bg-finance-blue hover:bg-finance-blue/90"
              >
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de notification */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Événements</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouvelles créances</Label>
                    <p className="text-sm text-gray-500">
                      Notifier lors de la soumission d'une nouvelle créance
                    </p>
                  </div>
                  <Switch 
                    checked={notifyNewClaims} 
                    onCheckedChange={setNotifyNewClaims}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Remboursements</Label>
                    <p className="text-sm text-gray-500">
                      Notifier lors d'un remboursement de créance
                    </p>
                  </div>
                  <Switch 
                    checked={notifyRepayments} 
                    onCheckedChange={setNotifyRepayments}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vérifications d'utilisateurs</Label>
                    <p className="text-sm text-gray-500">
                      Notifier lors de l'inscription d'un nouvel utilisateur
                    </p>
                  </div>
                  <Switch 
                    checked={notifyVerifications} 
                    onCheckedChange={setNotifyVerifications}
                  />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Canaux de notification</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par e-mail</Label>
                    <p className="text-sm text-gray-500">
                      Envoyer des notifications par e-mail
                    </p>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par SMS</Label>
                    <p className="text-sm text-gray-500">
                      Envoyer des notifications par SMS
                    </p>
                  </div>
                  <Switch 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-template">Modèle d'e-mail</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="email-template">
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Modèle par défaut</SelectItem>
                      <SelectItem value="minimal">Minimaliste</SelectItem>
                      <SelectItem value="detailed">Détaillé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSaveNotificationSettings}
                className="w-full md:w-auto bg-finance-blue hover:bg-finance-blue/90"
              >
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentification</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">
                      Exiger l'A2F pour les comptes administrateurs
                    </p>
                  </div>
                  <Switch 
                    checked={twoFactorRequired} 
                    onCheckedChange={setTwoFactorRequired}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Tentatives de connexion maximales</Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      min="1"
                      max="10"
                      value={maximumLoginAttempts}
                      onChange={(e) => setMaximumLoginAttempts(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Nombre de tentatives avant blocage temporaire
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Expiration de session (min)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      min="5"
                      max="240"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Délai avant déconnexion automatique
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Politique de mot de passe</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Complexité requise</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Sélectionner une complexité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basique (8 caractères min.)</SelectItem>
                      <SelectItem value="standard">Standard (8 car. avec chiffres)</SelectItem>
                      <SelectItem value="strong">Forte (8+ car. avec chiffres et symboles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Expiration des mots de passe</Label>
                  <Select defaultValue="90">
                    <SelectTrigger id="password-expiry">
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Jamais</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="90">90 jours</SelectItem>
                      <SelectItem value="180">180 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSecuritySettings}
                className="w-full md:w-auto bg-finance-blue hover:bg-finance-blue/90"
              >
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres système */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maintenance</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-gray-500">
                      Activer le mode maintenance sur la plateforme
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Logs système</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="log-level">Niveau de journalisation</Label>
                  <Select defaultValue="info">
                    <SelectTrigger id="log-level">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Erreurs uniquement</SelectItem>
                      <SelectItem value="warn">Avertissements et erreurs</SelectItem>
                      <SelectItem value="info">Informations, avertissements et erreurs</SelectItem>
                      <SelectItem value="debug">Tout (débogage)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Période de rétention des logs</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="retention-period">
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="90">90 jours</SelectItem>
                      <SelectItem value="365">1 an</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <h3 className="text-lg font-medium">Sauvegarde</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Fréquence de sauvegarde</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Sélectionner une fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    Télécharger les logs
                  </Button>
                  <Button variant="outline">
                    Sauvegarder maintenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
