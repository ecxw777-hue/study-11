"use client";

import { quickStats } from "@/data/stats";
import { CountUp } from "@/components/shared/count-up";

export function QuickStatsBar() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-foreground md:text-4xl">
              <CountUp
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <p className="mt-1 text-sm text-dim">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
