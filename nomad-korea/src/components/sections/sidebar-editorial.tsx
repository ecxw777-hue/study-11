export function SidebarEditorial() {
  const articles = [
    {
      title: "2026년 디지털 노마드 비자 총정리",
      category: "가이드",
      readTime: "5분",
    },
    {
      title: "서울 vs 부산: 노마드 생활비 비교",
      category: "비교",
      readTime: "3분",
    },
    {
      title: "제주 한달살기 꿀팁 10가지",
      category: "팁",
      readTime: "7분",
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        📝 에디토리얼
      </h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <div
            key={article.title}
            className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-background"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-nk-accent/10 px-1.5 py-0.5 text-xs text-nk-accent">
                {article.category}
              </span>
              <span className="text-xs text-dim">
                읽기 {article.readTime}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-foreground">
              {article.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
