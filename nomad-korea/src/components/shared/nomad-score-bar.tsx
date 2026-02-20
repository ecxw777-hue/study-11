import { getScoreColor, getScoreBarColor } from "@/lib/utils";

interface NomadScoreBarProps {
  score: number;
}

export function NomadScoreBar({ score }: NomadScoreBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-dim">노마드 스코어</span>
      <div className="h-2 flex-1 rounded-full bg-border">
        <div
          className={`h-full rounded-full ${getScoreBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-sm font-bold ${getScoreColor(score)}`}>
        {score}
      </span>
    </div>
  );
}
