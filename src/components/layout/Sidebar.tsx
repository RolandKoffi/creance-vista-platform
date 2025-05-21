
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutGrid,
  FileText,
  User, 
  Settings,
  Mail,
  Building,
  Users,
  CreditCard,
  Clock,
  DollarSign,
  Bell,
  ChevronLeft,
  ChevronRight,
  BarChart
} from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  if (!user) return null;

  const adminMenuItems = [
    {
      title: "Tableau de bord",
      icon: <LayoutGrid size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "PMEs",
      icon: <Building size={20} />,
      path: "/admin/pmes",
    },
    {
      title: "Investisseurs",
      icon: <Users size={20} />,
      path: "/admin/investors",
    },
    {
      title: "Créances",
      icon: <FileText size={20} />,
      path: "/admin/claims",
    },
    {
      title: "Transactions",
      icon: <CreditCard size={20} />,
      path: "/admin/transactions",
    },
    {
      title: "Notifications",
      icon: <Bell size={20} />,
      path: "/admin/notifications",
    },
    {
      title: "Paramètres",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
    {
      title: "Profil",
      icon: <User size={20} />,
      path: "/admin/profile",
    },
  ];

  const pmeMenuItems = [
    {
      title: "Tableau de bord",
      icon: <LayoutGrid size={20} />,
      path: "/pme/dashboard",
    },
    {
      title: "Mes créances",
      icon: <FileText size={20} />,
      path: "/pme/claims",
    },
    {
      title: "Nouvelle créance",
      icon: <CreditCard size={20} />,
      path: "/pme/submit-claim",
    },
    {
      title: "Profil",
      icon: <User size={20} />,
      path: "/pme/profile",
    },
    {
      title: "Contact",
      icon: <Mail size={20} />,
      path: "/pme/contact",
    },
  ];

  const investorMenuItems = [
    {
      title: "Tableau de bord",
      icon: <LayoutGrid size={20} />,
      path: "/investor/dashboard",
    },
    {
      title: "Opportunités",
      icon: <DollarSign size={20} />,
      path: "/investor/opportunities",
    },
    {
      title: "Mon portefeuille",
      icon: <BarChart size={20} />,
      path: "/investor/portfolio",
    },
    {
      title: "Historique",
      icon: <Clock size={20} />,
      path: "/investor/history",
    },
    {
      title: "Profil",
      icon: <User size={20} />,
      path: "/investor/profile",
    },
    {
      title: "Contact",
      icon: <Mail size={20} />,
      path: "/investor/contact",
    },
  ];

  let menuItems;
  switch (user.role) {
    case "admin":
      menuItems = adminMenuItems;
      break;
    case "pme":
      menuItems = pmeMenuItems;
      break;
    case "investor":
      menuItems = investorMenuItems;
      break;
    default:
      menuItems = [];
  }

  const mobileClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`
    : "";

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-finance-blue text-white transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-64",
          mobileClasses
        )}
      >
        <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
          {!isCollapsed ? (
            <div className="flex-1 flex items-center justify-between">
              <Link to="/" className="font-bold text-xl">
                FINCREDIBL
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="text-white hover:text-white hover:bg-sidebar-accent"
              >
                <ChevronLeft size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
                className="text-white hover:text-white hover:bg-sidebar-accent mx-auto"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-finance-orange text-finance-blue font-medium"
                    : "text-white hover:bg-sidebar-accent hover:text-white",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <div className={isCollapsed ? "mx-auto" : "mr-3"}>{item.icon}</div>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Bouton toggle pour mobile */}
      {isMobile && !isOpen && (
        <Button
          variant="default"
          size="icon"
          className="fixed left-4 top-4 z-50 bg-finance-blue hover:bg-finance-blue/90"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight size={20} />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
