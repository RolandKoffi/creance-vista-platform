
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  // Rediriger automatiquement vers la page de connexion
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-finance-blue mb-2">FINCREDIBL</h1>
        <p className="text-xl text-gray-600">Plateforme de Cession de Créances</p>
      </div>
      
      <div className="max-w-md text-center mb-8">
        <p className="text-gray-700">
          Connectez les PME aux investisseurs pour un financement rapide et sécurisé des créances commerciales.
        </p>
      </div>
      
      <div className="space-x-4">
        <Button 
          onClick={() => navigate('/auth/login')}
          className="bg-finance-blue hover:bg-finance-blue/90"
        >
          Connexion
        </Button>
        <Button 
          onClick={() => navigate('/auth/register')}
          variant="outline"
        >
          Inscription
        </Button>
      </div>
    </div>
  );
};

export default Index;
