
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre message a été envoyé avec succès");
    setFormData({ subject: "", message: "" });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Formulaire de contact */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Informations de contact */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nos coordonnées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-600">support@fincredibl.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Téléphone</h4>
                    <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Horaires d'assistance</h4>
                    <p className="text-sm text-gray-600">Lundi à Vendredi, 9h - 18h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-2">Réponse rapide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Nous nous engageons à répondre à toutes les demandes sous 24h ouvrées.
                </p>
                <h3 className="text-sm font-medium mb-2">FAQ</h3>
                <p className="text-sm text-gray-600">
                  Consultez notre <a href="#" className="text-blue-600 hover:underline">Centre d'aide</a> pour des réponses aux questions fréquentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
