"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { mainNav } from "@/data/navigation";

export function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-background">
        <SheetTitle className="text-lg font-bold">
          Nomad<span className="text-nk-accent">Korea</span>
        </SheetTitle>
        <nav className="mt-8 flex flex-col gap-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base text-dim transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#membership"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-lg bg-nk-accent px-4 py-3 text-center text-sm font-medium text-white"
          >
            멤버십 가입
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
