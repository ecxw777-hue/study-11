export function MapViewPlaceholder() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">
        🗺️ 노마드 지도
      </h2>
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-surface md:h-80">
        <div className="text-center">
          <span className="text-4xl">🗺️</span>
          <p className="mt-2 text-sm text-dim">
            인터랙티브 지도가 여기에 표시됩니다
          </p>
          <p className="text-xs text-dim">
            도시를 클릭하면 상세 정보를 볼 수 있어요
          </p>
        </div>
      </div>
    </section>
  );
}
