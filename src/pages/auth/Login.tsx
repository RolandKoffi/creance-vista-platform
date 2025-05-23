
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { simpleUsers } from '@/data/simple-data';
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

    setTimeout(() => {
      const user = simpleUsers.find(user => user.email === email);
      if (user && password === 'password') {
        login(user);
        toast.success('Connexion réussie');

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
          <h1 className="text-3xl font-bold text-blue-600">FINCREDIBL</h1>
          <p className="text-gray-600 mt-2">Plateforme de Cession de Créances</p>
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
                <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
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
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Utilisateurs de test:</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">Admin</p>
              <p>admin@fincredibl.com</p>
            </div>
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">PME</p>
              <p>contact@techpme.com</p>
            </div>
            <div className="p-2 bg-gray-100 rounded">
              <p className="font-semibold">Investisseur</p>
              <p>jean.dupont@investisseur.com</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Mot de passe pour tous: "password"</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
