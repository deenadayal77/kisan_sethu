import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <Skeleton className="h-4 w-1/3 mb-3" />
      <Skeleton className="h-10 w-1/2" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="py-3 px-4"><Skeleton className="h-4 w-full" /></td>
      <td className="py-3 px-4"><Skeleton className="h-4 w-full" /></td>
      <td className="py-3 px-4"><Skeleton className="h-4 w-full" /></td>
      <td className="py-3 px-4"><Skeleton className="h-4 w-full" /></td>
      <td className="py-3 px-4"><Skeleton className="h-4 w-full" /></td>
    </tr>
  );
}
