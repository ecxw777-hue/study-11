"use client";

import { useState } from "react";
import { cities } from "@/data/cities";
import { FilterSortBar } from "./filter-sort-bar";
import { CityCardGrid } from "./city-card-grid";
import { Sidebar } from "./sidebar";

const REGION_MAP: Record<string, string> = {
  capital: "수도권",
  gyeongsang: "경상도",
  jeolla: "전라도",
  chungcheong: "충청도",
  gangwon: "강원도",
  jeju: "제주",
};

export function CityExplorer() {
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState("score");
  const [view, setView] = useState("grid");

  const filtered =
    region === "all"
      ? cities
      : cities.filter((c) => c.region === REGION_MAP[region]);

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "score":
        return b.nomadScore - a.nomadScore;
      case "internet":
        return b.internetSpeed - a.internetSpeed;
      case "cost-low":
        return a.monthlyCost - b.monthlyCost;
      case "cost-high":
        return b.monthlyCost - a.monthlyCost;
      case "safety":
        return b.safetyRating - a.safetyRating;
      case "popular":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  return (
    <>
      <FilterSortBar
        region={region}
        sort={sort}
        view={view}
        onRegionChange={setRegion}
        onSortChange={setSort}
        onViewChange={setView}
      />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <CityCardGrid cities={sorted} view={view as "grid" | "list"} />
          </div>
          <div className="w-full lg:w-80">
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
