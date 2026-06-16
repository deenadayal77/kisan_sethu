import { cn } from "@/lib/utils";
import {
  getQualityGradeBgColor,
  getQualityGradeTextColor,
  getQualityGradeBorderColor,
} from "@/lib/utils";

interface QualityBadgeProps {
  grade: string | null;
  score?: number;
  className?: string;
}

export function QualityBadge({
  grade = null,
  score,
  className,
}: QualityBadgeProps) {
  if (!grade) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-semibold",
        getQualityGradeBgColor(grade),
        getQualityGradeTextColor(grade),
        getQualityGradeBorderColor(grade),
        className
      )}
    >
      <span>{grade}</span>
      {score !== undefined && <span className="text-xs">({score}%)</span>}
    </div>
  );
}
