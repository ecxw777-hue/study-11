"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailSignupForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-md gap-2"
    >
      <Input
        type="email"
        placeholder="이메일 주소 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-border bg-surface text-foreground placeholder:text-dim"
      />
      <Button
        type="submit"
        className="shrink-0 bg-nk-accent text-white hover:bg-nk-accent/90"
      >
        구독하기
      </Button>
    </form>
  );
}
