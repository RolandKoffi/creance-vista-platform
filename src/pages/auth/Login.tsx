
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from '@/data/mock-data';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler un délai de chargement
    setTimeout(() => {
      const user = mockUsers.find(user => user.email === email);
      if (user && password === 'password') {
        login(user);
        toast.success('Connexion réussie');

        // Rediriger vers le dashboard approprié en fonction du rôle
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'pme') {
          navigate('/pme/dashboard');
        } else if (user.role === 'investor') {
          navigate('/investor/dashboard');
        }
      } else {
        toast.error('Identifiants incorrects');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-finance-blue">FINCREDIBL</h1>
          <p className="text-finance-gray-medium mt-2">Plateforme de Cession de Créances</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                  <a href="/auth/forgot-password" className="text-sm text-finance-blue hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-finance-blue hover:bg-finance-blue/90" disabled={isLoading}>
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500">
                  Pas encore inscrit ? {' '}
                  <a href="/auth/register" className="text-finance-blue hover:underline">
                    Créer un compte
                  </a>
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Utilisateurs de test:</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">Admin</p>
              <p>admin@creances.com</p>
            </div>
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">PME</p>
              <p>contact@entreprise1.com</p>
            </div>
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">Investisseur</p>
              <p>investisseur1@mail.com</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Mot de passe pour tous: "password"</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
