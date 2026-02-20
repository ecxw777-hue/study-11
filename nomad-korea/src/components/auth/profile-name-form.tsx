"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateName } from "@/app/profile/actions";

interface ProfileNameFormProps {
  currentName: string;
}

export function ProfileNameForm({ currentName }: ProfileNameFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    const result = await updateName(formData);
    if (result.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <Input
        name="name"
        defaultValue={currentName}
        placeholder="이름을 입력하세요"
        className="border-border bg-surface text-foreground placeholder:text-dim"
        onChange={() => setStatus("idle")}
      />
      <Button
        type="submit"
        className="w-fit bg-nk-accent text-white hover:bg-nk-accent/90"
      >
        저장
      </Button>
      {status === "success" && (
        <p className="text-sm text-green-400">이름이 변경되었습니다.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
