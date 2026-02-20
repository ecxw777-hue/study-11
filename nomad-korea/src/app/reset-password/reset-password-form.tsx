"use client";

import { useState } from "react";
import { resetPassword } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ResetPasswordForm() {
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string).trim();

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

    setError("");
  }

  return (
    <form action={resetPassword} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="reset-email" className="mb-1.5 block text-sm text-foreground">
          이메일
        </label>
        <Input
          id="reset-email"
          name="email"
          type="email"
          placeholder="hello@nomadkorea.kr"
          required
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-nk-accent text-white hover:bg-nk-accent/90"
      >
        비밀번호 재설정 이메일 발송
      </Button>
    </form>
  );
}
