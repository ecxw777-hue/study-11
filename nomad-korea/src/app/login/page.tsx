import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "로그인 — Nomad Korea",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xl font-bold tracking-tight">
                Nomad<span className="text-nk-accent">Korea</span>
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-foreground">
              다시 오신 것을 환영합니다
            </h1>
            <p className="mt-2 text-sm text-dim">
              계정에 로그인하고 노마드 여정을 이어가세요
            </p>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-border bg-surface p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <LoginForm />
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-dim">
            아직 계정이 없으신가요?{" "}
            <Link
              href="/register"
              className="font-medium text-nk-accent transition-colors hover:text-nk-accent/80"
            >
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
