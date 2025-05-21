
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  return (
    <Card className={cn("finance-stat-card", className)}>
      <CardContent className="p-4 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && (
            <div className="flex items-center">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">depuis le mois dernier</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-full p-2 bg-finance-blue/10 text-finance-blue">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
