"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/app/login/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    if (!email) {
      e.preventDefault();
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      e.preventDefault();
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (!password || password.length < 8) {
      e.preventDefault();
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setError("");
  }

  return (
    <form action={login} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-foreground">
          이메일
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hello@nomadkorea.kr"
          required
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="text-sm text-foreground">
            비밀번호
          </label>
          <Link
            href="/reset-password"
            className="text-xs text-dim transition-colors hover:text-nk-accent"
          >
            비밀번호 찾기
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-nk-accent text-white hover:bg-nk-accent/90"
      >
        로그인
      </Button>
    </form>
  );
}
