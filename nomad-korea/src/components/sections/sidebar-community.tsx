import { communityPosts } from "@/data/community-feed";

export function SidebarCommunity() {
  return (
    <div
      id="community"
      className="rounded-xl border border-border bg-surface p-4"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        💬 커뮤니티
      </h3>
      <div className="space-y-3">
        {communityPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg p-2 transition-colors hover:bg-background"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{post.avatar}</span>
              <span className="text-sm font-medium text-foreground">
                {post.author}
              </span>
              <span className="text-xs text-dim">{post.timestamp}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-dim">
              {post.content}
            </p>
            <div className="mt-2 flex gap-4 text-xs text-dim">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
