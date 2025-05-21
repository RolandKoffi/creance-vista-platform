
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Send, Bell, Mail, MessageSquare, CheckCheck, FileText, User, CreditCard, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DataTable from "@/components/dashboard/DataTable";

// Données fictives pour les notifications
const mockNotifications = [
  {
    id: "notif-001",
    date: "2023-05-15T14:35:00",
    title: "Nouvelle créance soumise",
    message: "Une nouvelle créance a été soumise par TechSolutions SAS",
    type: "claim",
    status: "unread",
    recipient: "admin"
  },
  {
    id: "notif-002",
    date: "2023-05-15T10:22:00",
    title: "Nouvel investisseur inscrit",
    message: "Jean Dupont s'est inscrit en tant qu'investisseur",
    type: "user",
    status: "read",
    recipient: "admin"
  },
  {
    id: "notif-003",
    date: "2023-05-14T16:45:00",
    title: "Créance validée",
    message: "Votre créance 'Facture Telecom SAS' a été validée",
    type: "claim",
    status: "unread",
    recipient: "pme-1"
  },
  {
    id: "notif-004",
    date: "2023-05-14T09:30:00",
    title: "Nouvelle opportunité d'investissement",
    message: "Une nouvelle créance est disponible à l'investissement",
    type: "investment",
    status: "read",
    recipient: "all-investors"
  },
  {
    id: "notif-005",
    date: "2023-05-13T11:20:00",
    title: "Remboursement effectué",
    message: "Un remboursement de 15 000€ a été effectué pour la créance 'Facture Matériaux'",
    type: "payment",
    status: "read",
    recipient: "all-investors"
  },
  {
    id: "notif-006",
    date: "2023-05-12T14:10:00",
    title: "PME vérifiée",
    message: "MediaGroup SAS a été vérifiée et peut maintenant soumettre des créances",
    type: "user",
    status: "read",
    recipient: "pme-2"
  },
  {
    id: "notif-007",
    date: "2023-05-11T10:05:00",
    title: "Financement complété",
    message: "La créance 'Facture Services IT' a été entièrement financée",
    type: "investment",
    status: "read",
    recipient: "pme-1"
  },
  {
    id: "notif-008",
    date: "2023-05-10T09:45:00",
    title: "Problème de paiement",
    message: "Un problème est survenu lors du traitement du paiement de l'investisseur Pierre Durand",
    type: "payment",
    status: "unread",
    recipient: "admin"
  },
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  
  // Filtrer les notifications
  const filteredNotifications = mockNotifications
    .filter(notification => 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(notification => {
      if (recipientType === "all") return true;
      if (recipientType === "admin") return notification.recipient === "admin";
      if (recipientType === "pmes") return notification.recipient.startsWith("pme-");
      if (recipientType === "investors") return notification.recipient.includes("investor") || notification.recipient === "all-investors";
      return true;
    });
  
  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    toast.success("Notification envoyée avec succès");
    setNotificationTitle("");
    setNotificationMessage("");
  };
  
  const handleMarkAsRead = (notificationId: string) => {
    toast.success(`Notification ${notificationId} marquée comme lue`);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Centre de notifications</h1>
      
      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Historique</TabsTrigger>
          <TabsTrigger value="send">Envoyer une notification</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Historique des notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Rechercher une notification..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={recipientType} onValueChange={setRecipientType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Destinataire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="pmes">PMEs</SelectItem>
                    <SelectItem value="investors">Investisseurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DataTable
                data={filteredNotifications}
                columns={[
                  { header: "Date", accessorKey: "date",
                    cell: (notification) => new Date(notification.date).toLocaleString()
                  },
                  { header: "Titre", accessorKey: "title" },
                  { header: "Message", accessorKey: "message" },
                  { header: "Type", accessorKey: "type",
                    cell: (notification) => (
                      <div className="flex items-center">
                        {notification.type === 'claim' && <FileText className="mr-2 h-4 w-4 text-blue-600" />}
                        {notification.type === 'user' && <User className="mr-2 h-4 w-4 text-green-600" />}
                        {notification.type === 'payment' && <CreditCard className="mr-2 h-4 w-4 text-red-600" />}
                        {notification.type === 'investment' && <DollarSign className="mr-2 h-4 w-4 text-yellow-600" />}
                        <span>
                          {notification.type === 'claim' ? 'Créance' : 
                           notification.type === 'user' ? 'Utilisateur' : 
                           notification.type === 'payment' ? 'Paiement' : 'Investissement'}
                        </span>
                      </div>
                    )
                  },
                  { header: "Destinataire", accessorKey: "recipient",
                    cell: (notification) => {
                      if (notification.recipient === 'admin') return "Administration";
                      if (notification.recipient === 'all-investors') return "Tous les investisseurs";
                      if (notification.recipient.startsWith('pme-')) return "PME";
                      if (notification.recipient.startsWith('inv-')) return "Investisseur";
                      return notification.recipient;
                    }
                  },
                  { header: "Statut", accessorKey: "status",
                    cell: (notification) => (
                      <div className={`flex items-center ${notification.status === 'unread' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                        {notification.status === 'unread' ? 
                          <Bell className="mr-2 h-4 w-4" /> : 
                          <CheckCheck className="mr-2 h-4 w-4" />
                        }
                        <span>
                          {notification.status === 'unread' ? 'Non lue' : 'Lue'}
                        </span>
                      </div>
                    )
                  },
                  { header: "Actions", accessorKey: "id", 
                    cell: (notification) => (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={notification.status === 'read'}
                        >
                          Marquer comme lu
                        </Button>
                      </div>
                    ) 
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Envoyer une nouvelle notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-type">Type de destinataire</Label>
                  <Select defaultValue="all-users">
                    <SelectTrigger id="recipient-type">
                      <SelectValue placeholder="Sélectionner les destinataires" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">Tous les utilisateurs</SelectItem>
                      <SelectItem value="all-pmes">Toutes les PMEs</SelectItem>
                      <SelectItem value="all-investors">Tous les investisseurs</SelectItem>
                      <SelectItem value="verified-pmes">PMEs vérifiées uniquement</SelectItem>
                      <SelectItem value="verified-investors">Investisseurs vérifiés uniquement</SelectItem>
                      <SelectItem value="specific">Utilisateur spécifique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-type">Type de notification</Label>
                  <Select defaultValue="in-app">
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-app">Application uniquement</SelectItem>
                      <SelectItem value="email">Email uniquement</SelectItem>
                      <SelectItem value="sms">SMS uniquement</SelectItem>
                      <SelectItem value="all">Tous les canaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-title">Titre de la notification</Label>
                <div className="flex items-center gap-2">
                  <Select defaultValue="custom" className="w-[180px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Type de message" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Bienvenue</SelectItem>
                      <SelectItem value="verification">Vérification</SelectItem>
                      <SelectItem value="payment">Paiement</SelectItem>
                      <SelectItem value="reminder">Rappel</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="notification-title"
                    placeholder="Titre de la notification"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification-message">Message</Label>
                <Textarea
                  id="notification-message"
                  placeholder="Contenu de la notification..."
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  rows={5}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Switch id="urgent" />
                  <Label htmlFor="urgent">Marquer comme urgent</Label>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Prévisualiser</Button>
                  <Button onClick={handleSendNotification} className="bg-finance-red hover:bg-finance-red/90">
                    <Send className="mr-2 h-4 w-4" /> Envoyer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Modèles de notification</h3>
                
                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-finance-blue" />
                    <div>
                      <h4 className="font-medium">Bienvenue</h4>
                      <p className="text-sm text-gray-500">Email de bienvenue pour nouveaux utilisateurs</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <CheckCheck className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-medium">Vérification</h4>
                      <p className="text-sm text-gray-500">Confirmation de vérification de compte</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-finance-red" />
                    <div>
                      <h4 className="font-medium">Paiement</h4>
                      <p className="text-sm text-gray-500">Confirmation de transaction</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Bell className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h4 className="font-medium">Rappel</h4>
                      <p className="text-sm text-gray-500">Rappel d'échéance de créance</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-sender">Email expéditeur</Label>
                    <Input
                      id="email-sender"
                      defaultValue="notifications@fincredibl.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-reply-to">Répondre à</Label>
                    <Input
                      id="email-reply-to"
                      defaultValue="support@fincredibl.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sms-sender">Expéditeur SMS</Label>
                    <Input
                      id="sms-sender"
                      defaultValue="FINCREDIBL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">Fournisseur SMS</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger id="sms-provider">
                        <SelectValue placeholder="Sélectionner un fournisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="infobip">Infobip</SelectItem>
                        <SelectItem value="vonage">Vonage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button className="mt-4 bg-finance-blue hover:bg-finance-blue/90">
                Enregistrer les paramètres
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
