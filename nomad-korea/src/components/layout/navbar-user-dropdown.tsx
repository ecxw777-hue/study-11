"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/login/actions";
import { useMembership } from "@/hooks/use-membership";

interface NavbarUserDropdownProps {
  email: string;
}

export function NavbarUserDropdown({ email }: NavbarUserDropdownProps) {
  const { isPro } = useMembership();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-dim transition-colors hover:text-foreground">
          <span className="max-w-36 truncate">{email}</span>
          {isPro && (
            <Badge className="bg-nk-accent px-1.5 py-0 text-xs text-white">
              Pro
            </Badge>
          )}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 bg-background border-border">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            내 프로필
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/#membership" className="cursor-pointer">
            멤버십
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem asChild>
          <form action={logout} className="w-full">
            <button type="submit" className="w-full text-left text-sm text-dim hover:text-foreground">
              로그아웃
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
