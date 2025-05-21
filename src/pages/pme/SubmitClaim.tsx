
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { CreditCard, Upload } from 'lucide-react';

const SubmitClaim = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimData, setClaimData] = useState({
    title: '',
    amount: '',
    dueDate: '',
    description: '',
    riskLevel: 'medium',
    documents: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClaimData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClaimData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setClaimData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files as FileList)],
      }));
    }
  };

  const removeFile = (index: number) => {
    setClaimData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi des données
    setTimeout(() => {
      toast.success('Créance soumise avec succès! Elle est en attente de validation par l\'administration.');
      setIsSubmitting(false);
      navigate('/pme/dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Soumettre une nouvelle créance</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2" size={20} />
            Détails de la créance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de la créance</Label>
                <Input
                  id="title"
                  name="title"
                  value={claimData.title}
                  onChange={handleChange}
                  placeholder="Ex: Facture Client XYZ"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Montant (€)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="5000"
                    step="1000"
                    value={claimData.amount}
                    onChange={handleChange}
                    placeholder="Ex: 50000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 5 000 €</p>
                </div>
                <div>
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={claimData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={claimData.description}
                  onChange={handleChange}
                  placeholder="Décrivez la nature de cette créance, son origine et toute information pertinente..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="riskLevel">Niveau de risque estimé</Label>
                <Select 
                  value={claimData.riskLevel} 
                  onValueChange={(value) => handleSelectChange('riskLevel', value)}
                >
                  <SelectTrigger id="riskLevel">
                    <SelectValue placeholder="Sélectionnez un niveau de risque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="high">Élevé</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Le niveau de risque final sera déterminé par l'administrateur
                </p>
              </div>

              <div>
                <Label htmlFor="documents">Documents justificatifs</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Déposez les fichiers ici ou
                    </p>
                    <label
                      htmlFor="documents-upload"
                      className="mt-2 cursor-pointer rounded-md bg-finance-blue px-3 py-1 text-sm font-medium text-white hover:bg-finance-blue/90"
                    >
                      Parcourir les fichiers
                      <Input
                        id="documents-upload"
                        name="documents"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Factures, contrats, bons de commande, etc. (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>

                {claimData.documents.length > 0 && (
                  <div className="mt-4 border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Nom du fichier</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Taille</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {claimData.documents.map((file, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{file.name}</td>
                            <td className="px-4 py-2">{file.type}</td>
                            <td className="px-4 py-2">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </td>
                            <td className="px-4 py-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFile(index)}
                              >
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/pme/dashboard')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-finance-blue hover:bg-finance-blue/90"
                disabled={isSubmitting || claimData.documents.length === 0}
              >
                {isSubmitting ? 'Soumission en cours...' : 'Soumettre la créance'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comment ça fonctionne?</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Soumettez votre créance avec tous les documents justificatifs nécessaires.</li>
            <li>Notre équipe d'administrateurs validera votre créance sous 24-48h.</li>
            <li>Une fois validée, votre créance sera disponible pour les investisseurs.</li>
            <li>Lorsque le financement atteindra 80-100%, les fonds seront débloqués et disponibles pour retrait.</li>
            <li>À l'échéance, vous remboursez le montant principal plus les intérêts convenus.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitClaim;
