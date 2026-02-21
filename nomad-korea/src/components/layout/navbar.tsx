import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { NavbarMobileMenu } from "./navbar-mobile-menu";
import { NavbarUserDropdown } from "./navbar-user-dropdown";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const user = supabase
    ? (await supabase.auth.getUser()).data.user
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-nk-accent">🇰🇷</span>
          <span className="text-lg font-bold tracking-tight">
            Nomad<span className="text-nk-accent">Korea</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-dim transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <NavbarUserDropdown email={user.email ?? ""} />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-dim transition-colors hover:text-foreground"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-nk-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        <NavbarMobileMenu user={user ? { email: user.email ?? "" } : null} />
      </div>
    </header>
  );
}
