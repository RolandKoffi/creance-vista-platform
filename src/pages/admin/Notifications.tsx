import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DataTable from "@/components/dashboard/DataTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bell } from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    userId: "user-1",
    title: "Nouvelle opportunité d'investissement",
    message: "Une nouvelle créance correspondant à vos critères est disponible.",
    type: "info",
    read: false,
    date: "2023-11-15T10:00:00",
    link: "/investor/opportunities",
  },
  {
    id: "2",
    userId: "user-2",
    title: "Paiement confirmé",
    message: "Votre paiement pour l'investissement dans la créance Facture Telecom a été confirmé.",
    type: "success",
    read: true,
    date: "2023-11-14T15:30:00",
    link: "/investor/portfolio",
  },
  {
    id: "3",
    userId: "user-3",
    title: "Avertissement : Documents PME requis",
    message: "Votre profil PME est incomplet. Veuillez soumettre les documents requis.",
    type: "warning",
    read: false,
    date: "2023-11-13T08:45:00",
    link: "/pme/profile",
  },
  {
    id: "4",
    userId: "user-1",
    title: "Erreur de paiement",
    message: "Votre tentative de paiement a échoué. Veuillez vérifier vos informations de paiement.",
    type: "error",
    read: false,
    date: "2023-11-12T18:20:00",
    link: "/investor/portfolio",
  },
  {
    id: "5",
    userId: "user-2",
    title: "Mise à jour du système",
    message: "Le système sera en maintenance le 16 novembre de 22h à 2h.",
    type: "info",
    read: true,
    date: "2023-11-11T12:00:00",
    link: null,
  },
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredNotifications = mockNotifications.filter((notification) => {
    const searchTermLower = searchTerm.toLowerCase();
    const titleLower = notification.title.toLowerCase();
    const messageLower = notification.message.toLowerCase();

    const matchesSearchTerm =
      searchTerm === "" ||
      titleLower.includes(searchTermLower) ||
      messageLower.includes(searchTermLower);

    const matchesTypeFilter =
      typeFilter === "all" || notification.type === typeFilter;

    return matchesSearchTerm && matchesTypeFilter;
  });

  const notificationColumns = [
    {
      header: "Titre",
      accessorKey: "title",
    },
    {
      header: "Message",
      accessorKey: "message",
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (info) => new Date(info.date).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (info) => (
        <Button onClick={() => toast.message(`Notification ${info.id} marquée comme lue`)}>
          Marquer comme lu
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Marquer tout comme lu
        </Button>
      </div>
      
      <div className="flex space-x-4 items-center mb-4">
        <Select defaultValue="all" onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="info">Information</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <DataTable data={filteredNotifications} columns={notificationColumns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
