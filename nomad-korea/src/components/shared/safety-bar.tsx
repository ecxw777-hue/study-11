import { getSafetyLabel } from "@/lib/utils";

interface SafetyBarProps {
  rating: number;
}

export function SafetyBar({ rating }: SafetyBarProps) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-dim">안전</span>
      <div className="h-1.5 flex-1 rounded-full bg-border">
        <div
          className="h-full rounded-full bg-nk-green"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-nk-green">{getSafetyLabel(rating)}</span>
    </div>
  );
}
