"use client";

import { useState } from "react";
import Link from "next/link";

export function StickyBottomCta() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1">
          <p className="text-sm font-medium">나만의 노마드 도시를 찾아보세요</p>
          <p className="text-xs text-dim">42개 도시 정보 무료 열람</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="#cities"
            className="rounded-lg bg-nk-accent px-4 py-2 text-sm font-medium text-white"
          >
            탐색하기
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-dim hover:text-foreground"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
