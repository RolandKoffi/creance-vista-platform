import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const InvestorProfile = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Main St, Anytown");
  
  const [riskProfile, setRiskProfile] = useState<"conservative" | "moderate" | "aggressive">("moderate");
  const [notifyNewOpportunities, setNotifyNewOpportunities] = useState<boolean>(true);
  const [notifyPayments, setNotifyPayments] = useState<boolean>(true);
  const [marketingEmails, setMarketingEmails] = useState<boolean>(false);
  
  const handleSubmit = () => {
    toast.success("Profil mis à jour avec succès!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <Button onClick={handleSubmit}>
          Enregistrer les modifications
        </Button>
      </div>
      
      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Profil de risque</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={riskProfile} onValueChange={(value) => setRiskProfile(value as "conservative" | "moderate" | "aggressive")}>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservateur</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Modéré</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Agressif</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="newOpportunities">Nouvelles opportunités</Label>
                  <Switch 
                    id="newOpportunities" 
                    checked={notifyNewOpportunities} 
                    onCheckedChange={setNotifyNewOpportunities} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="paymentNotifications">Notifications de paiement</Label>
                  <Switch 
                    id="paymentNotifications" 
                    checked={notifyPayments} 
                    onCheckedChange={setNotifyPayments} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketingEmails">Emails marketing</Label>
                  <Switch 
                    id="marketingEmails" 
                    checked={marketingEmails} 
                    onCheckedChange={setMarketingEmails} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Changer votre mot de passe ou activer l'authentification à deux facteurs.</p>
              <Button variant="outline" className="mt-4">
                Changer le mot de passe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorProfile;
