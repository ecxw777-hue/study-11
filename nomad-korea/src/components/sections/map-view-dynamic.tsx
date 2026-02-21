"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/sections/map-view").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">🗺️ 노마드 지도</h2>
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-border bg-surface">
          <p className="text-sm text-dim">지도를 불러오는 중...</p>
        </div>
      </section>
    ),
  }
);

export { MapView };
