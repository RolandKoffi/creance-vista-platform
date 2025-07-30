import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, CreditCard } from 'lucide-react';
import { AchatPartsData } from '@/api/investisseurService';

interface MobileMoneyPaymentProps {
  achatData: Omit<AchatPartsData, 'methode_paiement'>;
  onSubmit: (data: AchatPartsData) => void;
  isLoading?: boolean;
}

export function MobileMoneyPayment({ achatData, onSubmit, isLoading }: MobileMoneyPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'bank_transfer'>('mobile_money');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileProvider, setMobileProvider] = useState<'orange' | 'mtn' | 'moov' | 'wave'>('orange');
  const [transactionRef, setTransactionRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: AchatPartsData = {
      ...achatData,
      methode_paiement: paymentMethod,
      ...(paymentMethod === 'mobile_money' && {
        mobile_number: mobileNumber,
        mobile_provider: mobileProvider,
        transaction_reference: transactionRef,
      }),
    };

    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Méthode de paiement
        </CardTitle>
        <CardDescription>
          Choisissez votre méthode de paiement préférée
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-method">Méthode de paiement</Label>
            <Select value={paymentMethod} onValueChange={(value: 'mobile_money' | 'bank_transfer') => setPaymentMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile_money">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile Money
                  </div>
                </SelectItem>
                <SelectItem value="bank_transfer">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Virement bancaire
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === 'mobile_money' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="mobile-provider">Opérateur</Label>
                <Select value={mobileProvider} onValueChange={(value: 'orange' | 'mtn' | 'moov' | 'wave') => setMobileProvider(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orange">Orange Money</SelectItem>
                    <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                    <SelectItem value="moov">Moov Money</SelectItem>
                    <SelectItem value="wave">Wave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile-number">Numéro de téléphone</Label>
                <Input
                  id="mobile-number"
                  type="tel"
                  placeholder="+225 XX XX XX XX XX"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-ref">Référence de transaction (optionnel)</Label>
                <Input
                  id="transaction-ref"
                  type="text"
                  placeholder="REF-XXXX-XXXX"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Instructions:</strong>
                  <br />
                  1. Composez le code USSD de votre opérateur
                  <br />
                  2. Suivez les instructions pour effectuer le paiement
                  <br />
                  3. Notez la référence de transaction si disponible
                </p>
              </div>
            </>
          )}

          {paymentMethod === 'bank_transfer' && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💰 <strong>Coordonnées bancaires:</strong>
                <br />
                Banque: UBA Côte d'Ivoire
                <br />
                Compte: CI05 CI001 00000 00000000000 15
                <br />
                Titulaire: CreditBourse SARL
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Montant total:</span>
              <span className="font-medium">{achatData.nombre_parts * 50000} FCFA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Nombre de parts:</span>
              <span>{achatData.nombre_parts}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || (paymentMethod === 'mobile_money' && !mobileNumber)}
          >
            {isLoading ? 'Traitement...' : 'Confirmer l\'achat'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}