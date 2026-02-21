import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata = {
  title: "비밀번호 찾기 — Nomad Korea",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xl font-bold tracking-tight">
                Nomad<span className="text-nk-accent">Korea</span>
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-foreground">
              비밀번호 찾기
            </h1>
            <p className="mt-2 text-sm text-dim">
              가입한 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {success}
              </div>
            )}

            <ResetPasswordForm />
          </div>

          <p className="mt-6 text-center text-sm text-dim">
            비밀번호가 기억나셨나요?{" "}
            <Link
              href="/login"
              className="font-medium text-nk-accent transition-colors hover:text-nk-accent/80"
            >
              로그인
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
