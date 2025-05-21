
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockClaims } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { Eye, FileText, Download } from "lucide-react";

const Claims = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Filtrer les créances pour cette PME
  const pmeClaims = mockClaims.filter(claim => claim.pmeId === user.id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes créances</h1>
        <Link to="/pme/submit-claim">
          <Button className="bg-red-600 hover:bg-red-700">
            Nouvelle créance
          </Button>
        </Link>
      </div>
      
      {/* Liste des créances */}
      <Card>
        <CardHeader>
          <CardTitle>Créances soumises</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={pmeClaims}
            columns={[
              { header: "Titre", accessorKey: "title" },
              { header: "Montant", accessorKey: "amount",
                cell: (claim) => `${claim.amount.toLocaleString()} €`
              },
              { header: "Date d'échéance", accessorKey: "dueDate", 
                cell: (claim) => new Date(claim.dueDate).toLocaleDateString() 
              },
              { header: "Progression", accessorKey: "fundingProgress", 
                cell: (claim) => `${claim.fundingProgress}%` 
              },
              { header: "Statut", accessorKey: "status",
                cell: (claim) => <StatusBadge status={claim.status} />
              },
              { header: "Actions", accessorKey: "id", 
                cell: (claim) => (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-1" /> Détails
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-1" /> Justificatifs
                    </Button>
                    {claim.status === 'active' && claim.fundingProgress === 100 && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Récupérer les fonds
                      </Button>
                    )}
                  </div>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Historique des paiements */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={pmeClaims.filter(claim => claim.status === 'completed')}
            columns={[
              { header: "Titre", accessorKey: "title" },
              { header: "Montant reçu", accessorKey: "amount",
                cell: (claim) => `${claim.amount.toLocaleString()} €`
              },
              { header: "Date de paiement", accessorKey: "completedAt", 
                cell: (claim) => claim.completedAt ? new Date(claim.completedAt).toLocaleDateString() : "N/A"
              },
              { header: "Reçu", accessorKey: "id", 
                cell: () => (
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-1" /> Télécharger
                  </Button>
                ) 
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Claims;
