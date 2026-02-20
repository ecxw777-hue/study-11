import { EmailSignupForm } from "@/components/shared/email-signup-form";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,74,0.08)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <div className="mb-4 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-dim">
          🇰🇷 한국에서 디지털 노마드 하기
        </div>

        <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          일하면서 여행하는
          <br />
          <span className="text-nk-accent">한국의 모든 도시</span>를 만나다
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg text-dim">
          노마드 스코어, 인터넷 속도, 생활비, 안전 정보까지.
          <br />
          당신에게 딱 맞는 한국 노마드 도시를 찾아보세요.
        </p>

        <div className="flex justify-center">
          <EmailSignupForm />
        </div>

        <p className="mt-4 text-xs text-dim">
          매주 새로운 도시 정보와 노마드 팁을 보내드려요. 언제든 구독 취소 가능.
        </p>
      </div>
    </section>
  );
}
