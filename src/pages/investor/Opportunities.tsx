
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { mockClaims } from "@/data/mock-data";
import { ArrowDown, ArrowUp, DollarSign, Search, Sliders } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Opportunities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('expectedReturn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<typeof mockClaims[0] | null>(null);
  const [partsToInvest, setPartsToInvest] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState(false);

  // Filtrer les créances actives
  const activeClaims = mockClaims.filter(claim => claim.status === 'active');

  // Appliquer les filtres
  const filteredClaims = activeClaims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.pmeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || claim.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  // Trier les créances
  const sortedClaims = [...filteredClaims].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'expectedReturn':
        valueA = a.expectedReturn;
        valueB = b.expectedReturn;
        break;
      case 'amount':
        valueA = a.amount;
        valueB = b.amount;
        break;
      case 'dueDate':
        valueA = new Date(a.dueDate).getTime();
        valueB = new Date(b.dueDate).getTime();
        break;
      case 'funding':
        valueA = a.fundingProgress;
        valueB = b.fundingProgress;
        break;
      default:
        valueA = a.expectedReturn;
        valueB = b.expectedReturn;
    }

    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });

  const handleOpenInvestModal = (claim: typeof mockClaims[0]) => {
    setSelectedClaim(claim);
    setPartsToInvest(1);
    setInvestModalOpen(true);
  };

  const handleInvest = () => {
    if (!selectedClaim) return;
    
    setLoading(true);
    
    // Simuler le processus de paiement
    setTimeout(() => {
      toast.success(`Investissement de ${partsToInvest * selectedClaim.partPrice} € effectué avec succès!`);
      setInvestModalOpen(false);
      setLoading(false);
      navigate('/investor/dashboard');
    }, 1500);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Opportunités d'investissement</h1>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher par nom d'entreprise ou titre"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="w-44">
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par risque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les risques</SelectItem>
                    <SelectItem value="low">Risque faible</SelectItem>
                    <SelectItem value="medium">Risque moyen</SelectItem>
                    <SelectItem value="high">Risque élevé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-44">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expectedReturn">Rendement</SelectItem>
                    <SelectItem value="amount">Montant</SelectItem>
                    <SelectItem value="dueDate">Échéance</SelectItem>
                    <SelectItem value="funding">Progression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSortOrder}
                className="flex-shrink-0"
              >
                {sortOrder === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des opportunités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedClaims.length > 0 ? (
          sortedClaims.map((claim) => (
            <Card key={claim.id} className="overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{claim.title}</h3>
                    <p className="text-sm text-gray-500">{claim.pmeName}</p>
                  </div>
                  <StatusBadge 
                    status={
                      claim.riskLevel === 'low' ? 'Risque faible' : 
                      claim.riskLevel === 'medium' ? 'Risque moyen' : 'Risque élevé'
                    } 
                    className={
                      claim.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      claim.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  />
                </div>
                
                <div className="mt-4">
                  <p className="text-sm line-clamp-2 text-gray-600">{claim.description}</p>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Montant total:</span>
                    <span className="font-medium">{claim.amount.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rendement:</span>
                    <span className="font-medium text-green-600">{claim.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Échéance:</span>
                    <span className="font-medium">{new Date(claim.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prix par part:</span>
                    <span className="font-medium">{claim.partPrice} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Parts disponibles:</span>
                    <span className="font-medium">{claim.totalParts - claim.soldParts} / {claim.totalParts}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progression du financement</span>
                    <span>{claim.fundingProgress}%</span>
                  </div>
                  <Progress value={claim.fundingProgress} className="h-2" />
                </div>
                
                <div className="mt-4">
                  <Button 
                    className="w-full bg-finance-blue hover:bg-finance-blue/90"
                    disabled={claim.fundingProgress >= 100}
                    onClick={() => handleOpenInvestModal(claim)}
                  >
                    {claim.fundingProgress >= 100 ? "Entièrement financé" : "Investir maintenant"}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-lg mx-auto">
              <Sliders className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune opportunité trouvée</h3>
              <p className="mt-2 text-gray-600">
                Essayez de modifier vos critères de recherche ou revenez plus tard pour de nouvelles opportunités d'investissement.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal d'investissement */}
      {selectedClaim && (
        <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Investir dans "{selectedClaim.title}"</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Entreprise:</span>
                  <span className="font-medium">{selectedClaim.pmeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Rendement attendu:</span>
                  <span className="font-medium text-green-600">{selectedClaim.expectedReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date d'échéance:</span>
                  <span className="font-medium">{new Date(selectedClaim.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="border-t border-b py-4 space-y-4">
                <div>
                  <Label htmlFor="parts">Nombre de parts à acheter</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setPartsToInvest(Math.max(1, partsToInvest - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="parts"
                      type="number"
                      min="1"
                      max={selectedClaim.totalParts - selectedClaim.soldParts}
                      value={partsToInvest}
                      onChange={(e) => setPartsToInvest(parseInt(e.target.value) || 1)}
                      className="text-center"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setPartsToInvest(Math.min(selectedClaim.totalParts - selectedClaim.soldParts, partsToInvest + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prix par part:</span>
                    <span className="font-medium">{selectedClaim.partPrice} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Montant total:</span>
                    <span className="font-medium">{(selectedClaim.partPrice * partsToInvest).toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rendement estimé:</span>
                    <span className="font-medium text-green-600">
                      +{Math.round(selectedClaim.partPrice * partsToInvest * selectedClaim.expectedReturn / 100).toLocaleString()} €
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="payment">Mode de paiement</Label>
                  <Tabs defaultValue="card" className="mt-2" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="card">Carte</TabsTrigger>
                      <TabsTrigger value="mobile_money">Mobile Money</TabsTrigger>
                      <TabsTrigger value="bank_transfer">Virement</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="border rounded-md p-4 mt-2">
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="cardNumber">Numéro de carte</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="expiryDate">Date d'expiration</Label>
                            <Input id="expiryDate" placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="mobile_money" className="border rounded-md p-4 mt-2">
                      <div>
                        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                        <Input id="phoneNumber" placeholder="0X XX XX XX XX" />
                      </div>
                    </TabsContent>
                    <TabsContent value="bank_transfer" className="border rounded-md p-4 mt-2">
                      <p className="text-sm text-gray-600">
                        Effectuez un virement vers notre compte bancaire:<br />
                        IBAN: FR76 3000 4000 0300 0000 0000 000<br />
                        BIC: BNPAFRPP<br />
                        Référence: INV-{selectedClaim.id}-{Date.now()}
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setInvestModalOpen(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleInvest}
                className="bg-finance-blue hover:bg-finance-blue/90"
                disabled={loading}
              >
                {loading ? 'Traitement en cours...' : (
                  <>
                    <DollarSign size={16} className="mr-2" />
                    Payer {(selectedClaim.partPrice * partsToInvest).toLocaleString()} €
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Opportunities;
