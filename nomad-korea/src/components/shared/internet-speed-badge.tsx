import { Badge } from "@/components/ui/badge";

interface InternetSpeedBadgeProps {
  speed: number;
}

export function InternetSpeedBadge({ speed }: InternetSpeedBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="border-nk-blue/30 bg-nk-blue/10 text-nk-blue"
    >
      ⚡ {speed}Mbps
    </Badge>
  );
}
