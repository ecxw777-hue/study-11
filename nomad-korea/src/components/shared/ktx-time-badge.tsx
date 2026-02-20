import { Badge } from "@/components/ui/badge";

interface KtxTimeBadgeProps {
  minutes: number;
}

export function KtxTimeBadge({ minutes }: KtxTimeBadgeProps) {
  if (minutes === 0) {
    return (
      <Badge variant="outline" className="border-border bg-surface text-dim">
        📍 서울
      </Badge>
    );
  }

  if (minutes < 0) {
    return (
      <Badge variant="outline" className="border-border bg-surface text-dim">
        ✈️ 항공편
      </Badge>
    );
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const display = hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;

  return (
    <Badge variant="outline" className="border-border bg-surface text-dim">
      🚄 서울에서 {display}
    </Badge>
  );
}
