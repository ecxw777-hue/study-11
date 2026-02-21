"use client";

import { useState } from "react";
import Image from "next/image";
import { monthlyStays } from "@/data/monthly-stay";
import { formatCurrency } from "@/lib/utils";

const INITIAL_COUNT = 3;

export function SidebarMonthlyStay() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? monthlyStays : monthlyStays.slice(0, INITIAL_COUNT);

  return (
    <div
      id="monthly-stay"
      className="rounded-xl border border-border bg-surface p-4"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        🏠 인기 한달살기
      </h3>
      <div className="space-y-3">
        {visible.map((stay) => (
          <div
            key={stay.id}
            className="overflow-hidden rounded-lg border border-border transition-colors hover:border-nk-accent/30"
          >
            <div className="relative aspect-[2/1]">
              <Image
                src={stay.image}
                alt={stay.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground">
                {stay.title}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-dim">
                  {stay.city} · {stay.duration}
                </span>
                <span className="text-sm font-semibold text-nk-accent">
                  {formatCurrency(stay.price)}
                </span>
              </div>
              <div className="mt-1 text-xs text-nk-gold">
                {"★".repeat(Math.floor(stay.rating))} {stay.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
      {monthlyStays.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-xs text-nk-accent hover:underline"
        >
          {expanded ? "접기" : `더보기 (${monthlyStays.length - INITIAL_COUNT}개 더)`}
        </button>
      )}
    </div>
  );
}
