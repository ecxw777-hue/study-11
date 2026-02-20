import { Badge } from "@/components/ui/badge";
import { getPm25Label, getPm25Color } from "@/lib/utils";

interface Pm25BadgeProps {
  pm25: number;
}

export function Pm25Badge({ pm25 }: Pm25BadgeProps) {
  const color = getPm25Color(pm25);
  const label = getPm25Label(pm25);

  return (
    <Badge variant="outline" className="border-border bg-surface">
      <span className={color}>
        🌫️ PM2.5 {pm25} · {label}
      </span>
    </Badge>
  );
}
