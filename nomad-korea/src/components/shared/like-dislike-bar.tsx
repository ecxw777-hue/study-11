"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "nomad-korea-city-votes";

type Vote = "like" | "dislike" | null;

function getStoredVotes(): Record<string, Vote> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function storeVote(citySlug: string, vote: Vote): void {
  const votes = getStoredVotes();
  if (vote === null) {
    delete votes[citySlug];
  } else {
    votes[citySlug] = vote;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
}

interface LikeDislikeBarProps {
  likes: number;
  dislikes: number;
  interactive?: boolean;
  citySlug?: string;
}

export function LikeDislikeBar({
  likes,
  dislikes,
  interactive = false,
  citySlug,
}: LikeDislikeBarProps) {
  const [currentVote, setCurrentVote] = useState<Vote>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  useEffect(() => {
    if (interactive && citySlug) {
      const votes = getStoredVotes();
      const saved = votes[citySlug] ?? null;
      setCurrentVote(saved);
      if (saved === "like") {
        setLikeCount(likes + 1);
      } else if (saved === "dislike") {
        setDislikeCount(dislikes + 1);
      }
    }
  }, [interactive, citySlug, likes, dislikes]);

  function handleVote(type: "like" | "dislike") {
    if (!interactive || !citySlug) return;

    if (currentVote === type) {
      // 같은 버튼 재클릭 → 투표 취소
      setCurrentVote(null);
      storeVote(citySlug, null);
      if (type === "like") {
        setLikeCount(likes);
      } else {
        setDislikeCount(dislikes);
      }
      toast("투표가 취소되었습니다.");
      return;
    }

    // 새 투표 또는 전환
    const prevVote = currentVote;
    setCurrentVote(type);
    storeVote(citySlug, type);

    if (type === "like") {
      setLikeCount(likes + 1);
      setDislikeCount(prevVote === "dislike" ? dislikes : dislikeCount);
      toast.success("이 도시를 추천했습니다! 👍");
    } else {
      setDislikeCount(dislikes + 1);
      setLikeCount(prevVote === "like" ? likes : likeCount);
      toast.error("이 도시를 비추천했습니다. 👎");
    }
  }

  if (!interactive) {
    return (
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-nk-green">
          👍 <span>{likes}</span>
        </span>
        <span className="flex items-center gap-1 text-xs text-nk-red">
          <span>{dislikes}</span> 👎
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleVote("like")}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${
            currentVote === "like"
              ? "bg-nk-green/20 text-nk-green ring-1 ring-nk-green/50"
              : "text-dim hover:bg-nk-green/10 hover:text-nk-green"
          }`}
        >
          👍 {likeCount}
        </button>

        <button
          type="button"
          onClick={() => handleVote("dislike")}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${
            currentVote === "dislike"
              ? "bg-nk-red/20 text-nk-red ring-1 ring-nk-red/50"
              : "text-dim hover:bg-nk-red/10 hover:text-nk-red"
          }`}
        >
          {dislikeCount} 👎
        </button>
      </div>

      <p className="text-center text-xs text-dim">
        {currentVote
          ? currentVote === "like"
            ? "이 도시를 추천하셨습니다"
            : "이 도시를 비추천하셨습니다"
          : "이 도시를 추천하시나요?"}
      </p>
    </div>
  );
}
