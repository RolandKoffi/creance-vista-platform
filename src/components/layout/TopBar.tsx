
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/data/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TopBar = () => {
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (!user) return null;

  // Filtrer les notifications pour l'utilisateur actuel
  const userNotifications = mockNotifications.filter(
    (notif) => notif.userId === user.id
  );
  const unreadCount = userNotifications.filter((notif) => !notif.read).length;

  // Obtenir les initiales de l'utilisateur
  const getInitials = () => {
    if (!user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <span className="font-semibold text-lg text-finance-blue">
          {user.role === "admin" && "Administration"}
          {user.role === "pme" && "Espace PME"}
          {user.role === "investor" && "Espace Investisseur"}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Centre de notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-finance-orange text-white"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Notifications</h3>
            </div>
            {userNotifications.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto">
                {userNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                      !notif.read ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 mr-2 ${
                          !notif.read ? "bg-finance-blue" : "bg-transparent"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            )}
            <div className="p-2 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-center text-finance-blue"
              >
                Voir toutes les notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Menu utilisateur */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Avatar>
                <AvatarFallback className="bg-finance-blue text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-4">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="border-t border-gray-100 pt-2 flex flex-col space-y-1">
                <Link
                  to={`/${user.role}/profile`}
                  className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100"
                >
                  <User size={16} className="mr-2" />
                  Profil
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 justify-start"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default TopBar;
