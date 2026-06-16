import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-card p-6 shadow-card-sm hover:shadow-card-md transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary font-medium">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-text-primary mt-2">
            {value}
          </p>
        </div>
        {icon && (
          <div className="text-primary text-2xl opacity-20">{icon}</div>
        )}
      </div>
      {trend && (
        <div className={cn("text-xs font-medium mt-4", {
          "text-success": trend === "up",
          "text-error": trend === "down",
          "text-text-secondary": trend === "neutral",
        })}>
          {trend === "up" && "↑ Increase"}
          {trend === "down" && "↓ Decrease"}
          {trend === "neutral" && "— No change"}
        </div>
      )}
    </div>
  );
}
