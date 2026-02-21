"use client";

import { useState } from "react";
import { signup } from "@/app/register/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name) {
      e.preventDefault();
      setError("이름을 입력해주세요.");
      return;
    }

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

    if (password !== confirmPassword) {
      e.preventDefault();
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
  }

  return (
    <form action={signup} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-foreground">
          이름 (닉네임)
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="디지털유목민"
          required
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1.5 block text-sm text-foreground">
          이메일
        </label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          placeholder="hello@nomadkorea.kr"
          required
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <div>
        <label htmlFor="reg-password" className="mb-1.5 block text-sm text-foreground">
          비밀번호
        </label>
        <Input
          id="reg-password"
          name="password"
          type="password"
          placeholder="8자 이상 입력"
          required
          minLength={8}
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <div>
        <label
          htmlFor="reg-confirm-password"
          className="mb-1.5 block text-sm text-foreground"
        >
          비밀번호 확인
        </label>
        <Input
          id="reg-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력"
          required
          minLength={8}
          className="border-border bg-background text-foreground placeholder:text-dim"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-nk-accent text-white hover:bg-nk-accent/90"
      >
        회원가입
      </Button>
    </form>
  );
}
