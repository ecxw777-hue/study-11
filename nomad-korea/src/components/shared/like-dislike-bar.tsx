interface LikeDislikeBarProps {
  likes: number;
  dislikes: number;
}

export function LikeDislikeBar({ likes, dislikes }: LikeDislikeBarProps) {
  const total = likes + dislikes;
  const likePercent = total > 0 ? (likes / total) * 100 : 50;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-nk-green">👍 {likes}</span>
      <div className="h-1.5 flex-1 rounded-full bg-nk-red/30">
        <div
          className="h-full rounded-full bg-nk-green"
          style={{ width: `${likePercent}%` }}
        />
      </div>
      <span className="text-xs text-nk-red">👎 {dislikes}</span>
    </div>
  );
}
