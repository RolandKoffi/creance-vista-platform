
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  switch (status.toLowerCase()) {
    case "active":
    case "completed":
    case "verified":
      return (
        <Badge
          className={cn("bg-green-100 text-green-800 hover:bg-green-200", className)}
        >
          {status}
        </Badge>
      );
    case "pending":
      return (
        <Badge
          className={cn("bg-yellow-100 text-yellow-800 hover:bg-yellow-200", className)}
        >
          {status}
        </Badge>
      );
    case "rejected":
    case "expired":
    case "failed":
      return (
        <Badge
          className={cn("bg-red-100 text-red-800 hover:bg-red-200", className)}
        >
          {status}
        </Badge>
      );
    default:
      return (
        <Badge
          className={cn("bg-blue-100 text-blue-800 hover:bg-blue-200", className)}
        >
          {status}
        </Badge>
      );
  }
};

export default StatusBadge;
