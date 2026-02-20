import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProfileNameForm } from "@/components/auth/profile-name-form";
import { ProfileMembershipStatus } from "@/components/auth/profile-membership-status";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name: string = (user.user_metadata?.full_name as string) ?? "";
  const joinedAt = new Date(user.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-2xl px-4 py-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-dim">
          <Link href="/" className="hover:text-foreground">
            홈
          </Link>
          <span>/</span>
          <span className="text-foreground">프로필</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground">내 프로필</h1>

        {/* 사용자 정보 */}
        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            계정 정보
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-dim">이메일</dt>
              <dd className="text-foreground">{user.email}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-dim">가입일</dt>
              <dd className="text-foreground">{joinedAt}</dd>
            </div>
          </dl>
        </section>

        {/* 이름 수정 */}
        <section className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            이름 수정
          </h2>
          <ProfileNameForm currentName={name} />
        </section>

        {/* 멤버십 상태 */}
        <section className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            멤버십
          </h2>
          <ProfileMembershipStatus />
        </section>

        {/* 로그아웃 */}
        <section className="mt-6">
          <form action={logout}>
            <Button
              type="submit"
              variant="outline"
              className="border-border text-dim hover:text-foreground"
            >
              로그아웃
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
