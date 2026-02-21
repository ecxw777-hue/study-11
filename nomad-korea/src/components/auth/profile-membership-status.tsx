"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMembership } from "@/hooks/use-membership";

export function ProfileMembershipStatus() {
  const { isPro } = useMembership();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm text-dim">현재 플랜:</span>
        {isPro ? (
          <Badge className="bg-nk-accent text-white">Pro</Badge>
        ) : (
          <Badge variant="outline" className="border-border text-dim">
            Free
          </Badge>
        )}
      </div>
      {!isPro && (
        <Button
          asChild
          size="sm"
          className="bg-nk-accent text-white hover:bg-nk-accent/90"
        >
          <Link href="/#membership">업그레이드</Link>
        </Button>
      )}
    </div>
  );
}
