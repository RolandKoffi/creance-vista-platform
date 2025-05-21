
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { UserRole } from '@/types';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserRole>('pme');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de chargement
    setTimeout(() => {
      toast.success(`Inscription réussie en tant que ${userType === 'pme' ? 'PME' : 'Investisseur'}`);
      navigate('/auth/login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-finance-blue">FINCREDIBL</h1>
          <p className="text-finance-gray-medium mt-2">Plateforme de Cession de Créances</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Créer un compte</CardTitle>
            <CardDescription className="text-center">
              Choisissez votre type de compte et inscrivez-vous
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="pme" onValueChange={(value) => setUserType(value as UserRole)}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pme">PME</TabsTrigger>
                <TabsTrigger value="investor">Investisseur</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="pme">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium">Nom de l'entreprise</label>
                      <Input id="companyName" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="siret" className="text-sm font-medium">Numéro SIRET</label>
                      <Input id="siret" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email professionnel</label>
                    <Input id="email" type="email" placeholder="contact@votreentreprise.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contactPerson" className="text-sm font-medium">Personne à contacter</label>
                      <Input id="contactPerson" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="passwordConfirm" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <Input id="passwordConfirm" type="password" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="terms" className="w-4 h-4" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      J'accepte les {" "}
                      <a href="/terms" className="text-finance-blue hover:underline">
                        conditions d'utilisation
                      </a>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-finance-blue hover:bg-finance-blue/90" disabled={isLoading}>
                    {isLoading ? 'Inscription en cours...' : 'S\'inscrire en tant que PME'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="investor">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="vous@exemple.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="idNumber" className="text-sm font-medium">Numéro d'identité</label>
                    <Input id="idNumber" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                    <Input id="address" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="passwordConfirm" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <Input id="passwordConfirm" type="password" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="terms" className="w-4 h-4" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      J'accepte les {" "}
                      <a href="/terms" className="text-finance-blue hover:underline">
                        conditions d'utilisation
                      </a>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-finance-blue hover:bg-finance-blue/90" disabled={isLoading}>
                    {isLoading ? 'Inscription en cours...' : 'S\'inscrire en tant qu\'Investisseur'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="px-6 pb-6 pt-2 text-center">
            <p className="text-sm text-gray-600">
              Déjà inscrit ? {" "}
              <a href="/auth/login" className="text-finance-blue hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
