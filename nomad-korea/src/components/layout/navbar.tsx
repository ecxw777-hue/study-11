import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { NavbarMobileMenu } from "./navbar-mobile-menu";

export function Navbar() {
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
          <Link
            href="#membership"
            className="rounded-lg bg-nk-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            멤버십 가입
          </Link>
        </div>

        <NavbarMobileMenu />
      </div>
    </header>
  );
}
