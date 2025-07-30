import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileMoneyPayment } from '@/components/investor/MobileMoneyPayment';
import { toast } from 'sonner';
import { AchatPartsData, acheterPartsWithMobileMoney } from '@/api/investisseurService';

export default function MobileMoneyDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const mockCreance = {
    id: 1,
    nom_entreprise: "TechCorp SARL",
    montant_total: 5000000,
    nombre_parts: 100,
    montant_par_part: 50000,
    parts_restantes: 85,
    echeance: "2024-12-31",
    client_nom: "Entreprise ABC"
  };

  const handlePurchase = async (achatData: AchatPartsData) => {
    setIsLoading(true);
    try {
      // Simulation de l'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Données d\'achat:', achatData);
      
      if (achatData.methode_paiement === 'mobile_money') {
        toast.success(`Achat confirmé via ${achatData.mobile_provider?.toUpperCase()} (${achatData.mobile_number})`);
      } else {
        toast.success('Achat confirmé via virement bancaire');
      }
      
      setShowPayment(false);
    } catch (error) {
      toast.error('Erreur lors de l\'achat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Démonstration Mobile Money</h1>
          <p className="text-muted-foreground">
            Test de l'intégration des paiements mobile money pour les investissements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Créance disponible */}
          <Card>
            <CardHeader>
              <CardTitle>Créance disponible</CardTitle>
              <CardDescription>
                Facture de {mockCreance.nom_entreprise}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Client:</span>
                  <span className="text-sm font-medium">{mockCreance.client_nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Montant total:</span>
                  <span className="text-sm font-medium">{mockCreance.montant_total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Parts disponibles:</span>
                  <span className="text-sm font-medium">{mockCreance.parts_restantes}/{mockCreance.nombre_parts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prix par part:</span>
                  <span className="text-sm font-medium">{mockCreance.montant_par_part.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Échéance:</span>
                  <span className="text-sm font-medium">{mockCreance.echeance}</span>
                </div>
              </div>

              <Button 
                onClick={() => setShowPayment(true)} 
                className="w-full"
                disabled={showPayment}
              >
                Acheter 10 parts (500,000 FCFA)
              </Button>
            </CardContent>
          </Card>

          {/* Interface de paiement */}
          <div>
            {showPayment ? (
              <MobileMoneyPayment
                achatData={{
                  creance_id: mockCreance.id,
                  nombre_parts: 10,
                }}
                onSubmit={handlePurchase}
                isLoading={isLoading}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de paiement supportées</CardTitle>
                  <CardDescription>
                    Options disponibles pour les investisseurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        📱
                      </div>
                      <div>
                        <p className="font-medium">Orange Money</p>
                        <p className="text-sm text-muted-foreground">*144# ou app Orange Money</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        📱
                      </div>
                      <div>
                        <p className="font-medium">MTN Mobile Money</p>
                        <p className="text-sm text-muted-foreground">*133# ou app MoMo</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        📱
                      </div>
                      <div>
                        <p className="font-medium">Moov Money</p>
                        <p className="text-sm text-muted-foreground">*155# ou app Moov Money</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        💳
                      </div>
                      <div>
                        <p className="font-medium">Wave</p>
                        <p className="text-sm text-muted-foreground">App Wave ou QR code</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        🏦
                      </div>
                      <div>
                        <p className="font-medium">Virement bancaire</p>
                        <p className="text-sm text-muted-foreground">Transfert vers compte UBA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Astuce:</strong> Les paiements mobile money sont traités instantanément, 
                      tandis que les virements bancaires peuvent prendre 1-2 jours ouvrables.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Section d'information */}
        <Card>
          <CardHeader>
            <CardTitle>Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">1️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Choisir une créance</h3>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez une créance validée et le nombre de parts à acheter
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">2️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Payer via mobile money</h3>
                <p className="text-sm text-muted-foreground">
                  Utilisez votre opérateur mobile préféré pour effectuer le paiement
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">3️⃣</span>
                </div>
                <h3 className="font-semibold mb-2">Recevoir le remboursement</h3>
                <p className="text-sm text-muted-foreground">
                  À l'échéance, recevez votre part du remboursement automatiquement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}