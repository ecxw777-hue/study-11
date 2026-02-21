"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NomadScoreBar } from "@/components/shared/nomad-score-bar";
import { SafetyBar } from "@/components/shared/safety-bar";
import { InternetSpeedBadge } from "@/components/shared/internet-speed-badge";
import { Pm25Badge } from "@/components/shared/pm25-badge";
import { KtxTimeBadge } from "@/components/shared/ktx-time-badge";
import { CityTags } from "@/components/shared/city-tags";
import { formatCurrency } from "@/lib/utils";
import type { City } from "@/types";

const TAB_IDS = ["overview", "spaces", "pros-cons"] as const;
type TabId = (typeof TAB_IDS)[number];

function getInitialTab(): TabId {
  if (typeof window === "undefined") return "overview";
  const hash = window.location.hash.slice(1);
  return TAB_IDS.includes(hash as TabId) ? (hash as TabId) : "overview";
}

interface CityDetailTabsProps {
  city: City;
}

export function CityDetailTabs({ city }: CityDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    setActiveTab(getInitialTab());

    function onHashChange() {
      const hash = window.location.hash.slice(1);
      if (TAB_IDS.includes(hash as TabId)) {
        setActiveTab(hash as TabId);
      }
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function handleTabChange(value: string) {
    const tab = value as TabId;
    setActiveTab(tab);
    history.replaceState(null, "", `#${tab}`);
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-8 w-full overflow-x-auto">
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="spaces">코워킹·카페</TabsTrigger>
        <TabsTrigger value="pros-cons">장단점</TabsTrigger>
      </TabsList>

      {/* 개요 탭 */}
      <TabsContent value="overview" className="space-y-10">
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">핵심 지표</h2>
          <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
            <NomadScoreBar score={city.nomadScore} />
            <SafetyBar rating={city.safetyRating} />

            <div className="flex flex-wrap gap-2">
              <InternetSpeedBadge speed={city.internetSpeed} />
              <Pm25Badge pm25={city.pm25} />
              <KtxTimeBadge minutes={city.ktxFromSeoul} />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-dim">월 평균 생활비</span>
              <span className="text-xl font-bold text-foreground">
                {formatCurrency(city.monthlyCost)}
              </span>
            </div>

            <CityTags tags={city.tags} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">도시 소개</h2>
          <p className="leading-relaxed text-dim">{city.detailedDescription}</p>
        </section>
      </TabsContent>

      {/* 코워킹·카페 탭 */}
      <TabsContent value="spaces" className="space-y-10">
        {city.coworkingSpaces.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-foreground">코워킹 스페이스</h2>
            <div className="space-y-3">
              {city.coworkingSpaces.map((space) => (
                <div
                  key={space.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{space.name}</h3>
                    <span className="shrink-0 text-sm font-medium text-nk-accent">
                      {formatCurrency(space.pricePerDay)}/일
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-dim">{space.address}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-nk-blue">WiFi {space.wifi}Mbps</span>
                    <div className="flex flex-wrap gap-1.5">
                      {space.features.map((feat, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-border px-2 py-0.5 text-xs text-dim"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {city.recommendedCafes.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-foreground">추천 카페</h2>
            <div className="space-y-3">
              {city.recommendedCafes.map((cafe) => (
                <div
                  key={cafe.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{cafe.name}</h3>
                    <span
                      className={`shrink-0 text-xs ${cafe.powerOutlets ? "text-nk-green" : "text-dim"}`}
                    >
                      {cafe.powerOutlets ? "콘센트 있음" : "콘센트 없음"}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-dim">{cafe.address}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-nk-blue">WiFi {cafe.wifi}Mbps</span>
                    <span className="text-sm text-dim">{cafe.vibe}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {city.coworkingSpaces.length === 0 && city.recommendedCafes.length === 0 && (
          <p className="py-10 text-center text-dim">등록된 코워킹 스페이스나 카페가 없습니다.</p>
        )}
      </TabsContent>

      {/* 장단점 탭 */}
      <TabsContent value="pros-cons">
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">장단점</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-nk-green/20 bg-nk-green/5 p-5">
              <h3 className="mb-3 font-semibold text-nk-green">장점</h3>
              <ul className="space-y-2">
                {city.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dim">
                    <span className="mt-0.5 text-nk-green">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-nk-red/20 bg-nk-red/5 p-5">
              <h3 className="mb-3 font-semibold text-nk-red">단점</h3>
              <ul className="space-y-2">
                {city.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dim">
                    <span className="mt-0.5 text-nk-red">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </TabsContent>
    </Tabs>
  );
}
