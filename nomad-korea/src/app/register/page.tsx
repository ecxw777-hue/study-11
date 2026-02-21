import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "회원가입 — Nomad Korea",
};

export default async function RegisterPage({
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
              노마드 여정을 시작하세요
            </h1>
            <p className="mt-2 text-sm text-dim">
              무료 가입으로 42개 도시 정보와 커뮤니티를 이용하세요
            </p>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-border bg-surface p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <RegisterForm />

            {/* Terms */}
            <p className="mt-4 text-center text-xs leading-relaxed text-dim">
              가입하면{" "}
              <Link href="#" className="underline hover:text-foreground">
                이용약관
              </Link>{" "}
              및{" "}
              <Link href="#" className="underline hover:text-foreground">
                개인정보처리방침
              </Link>
              에 동의하게 됩니다.
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-dim">
            이미 계정이 있으신가요?{" "}
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
