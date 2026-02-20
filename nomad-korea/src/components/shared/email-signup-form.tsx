"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "nomad-korea-subscribed-emails";

type Status = "idle" | "success" | "duplicate" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getStoredEmails(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function storeEmail(email: string): void {
  const emails = getStoredEmails();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...emails, email]));
}

export function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }

    const stored = getStoredEmails();
    if (stored.includes(email)) {
      setStatus("duplicate");
      return;
    }

    storeEmail(email);
    setEmail("");
    setStatus("success");
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input
          type="email"
          placeholder="이메일 주소 입력"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          className="border-border bg-surface text-foreground placeholder:text-dim"
        />
        <Button
          type="submit"
          className="shrink-0 bg-nk-accent text-white hover:bg-nk-accent/90"
        >
          구독하기
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-green-400">
          구독해 주셔서 감사합니다! 소식을 가장 먼저 전달해 드릴게요.
        </p>
      )}
      {status === "duplicate" && (
        <p className="mt-2 text-sm text-yellow-400">
          이미 구독 중인 이메일입니다.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">
          올바른 이메일 형식을 입력해 주세요.
        </p>
      )}
    </div>
  );
}
