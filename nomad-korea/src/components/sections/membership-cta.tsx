"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMembership } from "@/hooks/use-membership";

export function MembershipCta() {
  const { isPro, upgradeToPro } = useMembership();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleConfirm() {
    upgradeToPro();
    setOpen(false);
    setSuccess(true);
  }

  return (
    <section
      id="membership"
      className="border-y border-border bg-surface py-16"
    >
      <div className="mx-auto max-w-7xl px-4 text-center">
        <span className="inline-block rounded-full bg-nk-accent/10 px-3 py-1 text-sm text-nk-accent">
          멤버십
        </span>
        <h2 className="mt-4 text-3xl font-bold text-foreground">
          노마드코리아 멤버가 되어보세요
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-dim">
          전국 코워킹 스페이스 할인, 밋업 우선 참가, 도시별 심층 리포트를
          받아보세요.
        </p>

        {success && (
          <p className="mt-4 text-sm font-medium text-green-400">
            프로 멤버십 업그레이드가 완료되었습니다! 모든 혜택을 누려보세요.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Free Plan */}
          <div className="w-full max-w-xs rounded-xl border border-border bg-background p-6">
            <p className="text-sm text-dim">무료</p>
            <p className="mt-1 text-3xl font-bold text-foreground">₩0</p>
            <p className="text-xs text-dim">/월</p>
            <ul className="mt-4 space-y-2 text-left text-sm text-dim">
              <li>✓ 기본 도시 정보</li>
              <li>✓ 커뮤니티 접근</li>
              <li>✓ 뉴스레터</li>
            </ul>
            <Button
              variant="outline"
              className="mt-6 w-full border-border"
              disabled={!isPro}
            >
              {!isPro ? "현재 플랜" : "무료 플랜"}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="w-full max-w-xs rounded-xl border-2 border-nk-accent bg-background p-6">
            <p className="text-sm text-nk-accent">프로</p>
            <p className="mt-1 text-3xl font-bold text-foreground">₩9,900</p>
            <p className="text-xs text-dim">/월</p>
            <ul className="mt-4 space-y-2 text-left text-sm text-dim">
              <li>✓ 심층 도시 리포트</li>
              <li>✓ 코워킹 할인 (최대 30%)</li>
              <li>✓ 밋업 우선 참가</li>
              <li>✓ 1:1 노마드 컨설팅</li>
            </ul>
            {isPro ? (
              <Button
                className="mt-6 w-full bg-nk-accent text-white hover:bg-nk-accent/90"
                disabled
              >
                현재 플랜 ✓
              </Button>
            ) : (
              <Button
                className="mt-6 w-full bg-nk-accent text-white hover:bg-nk-accent/90"
                onClick={() => setOpen(true)}
              >
                프로 시작하기
              </Button>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-border bg-background p-5 text-left"
            >
              <p className="text-sm leading-relaxed text-dim">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl">{t.avatar}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-dim">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              프로 멤버십 시작하기
            </DialogTitle>
            <DialogDescription className="text-dim">
              월 ₩9,900으로 심층 도시 리포트, 코워킹 할인, 밋업 우선 참가 등
              모든 프로 혜택을 이용하실 수 있습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-border bg-surface p-4 text-sm text-dim">
            <p className="font-medium text-foreground">결제 정보</p>
            <p className="mt-2">플랜: 프로 멤버십</p>
            <p>금액: ₩9,900 / 월</p>
            <p className="mt-2 text-xs text-dim">
              * 데모 버전입니다. 실제 결제가 이루어지지 않습니다.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="border-border"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              className="bg-nk-accent text-white hover:bg-nk-accent/90"
              onClick={handleConfirm}
            >
              결제 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
