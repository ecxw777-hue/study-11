import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { footerSections } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-dim transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇰🇷</span>
            <span className="font-bold">
              Nomad<span className="text-nk-accent">Korea</span>
            </span>
          </div>
          <p className="text-sm text-dim">
            &copy; 2026 NomadKorea. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://x.com/nomadkorea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors hover:text-foreground"
            >
              𝕏
            </a>
            <a
              href="https://instagram.com/nomadkorea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors hover:text-foreground"
            >
              📷
            </a>
            <a
              href="https://discord.gg/nomadkorea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim transition-colors hover:text-foreground"
            >
              💬
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
