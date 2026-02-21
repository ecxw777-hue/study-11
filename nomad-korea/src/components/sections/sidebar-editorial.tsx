"use client";

import { useState } from "react";
import { editorials } from "@/data/editorial";

const INITIAL_COUNT = 3;

export function SidebarEditorial() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? editorials : editorials.slice(0, INITIAL_COUNT);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        📝 에디토리얼
      </h3>
      <div className="space-y-3">
        {visible.map((article) => (
          <div
            key={article.id}
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-background"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-nk-accent/10 px-1.5 py-0.5 text-xs text-nk-accent">
                {article.category}
              </span>
              <span className="text-xs text-dim">읽기 {article.readTime}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-foreground">
              {article.title}
            </p>
          </div>
        ))}
      </div>
      {editorials.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-xs text-nk-accent hover:underline"
        >
          {expanded ? "접기" : `더보기 (${editorials.length - INITIAL_COUNT}개 더)`}
        </button>
      )}
    </div>
  );
}
