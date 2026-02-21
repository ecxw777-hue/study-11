import { City } from "@/types";
import { CityCard } from "./city-card";

interface CityCardGridProps {
  cities: City[];
  view?: "grid" | "list";
}

export function CityCardGrid({ cities, view = "grid" }: CityCardGridProps) {
  if (cities.length === 0) {
    return (
      <div id="cities" className="py-16 text-center text-dim">
        <p className="text-lg">조건에 맞는 도시가 없습니다.</p>
        <p className="mt-1 text-sm">필터를 변경해 보세요.</p>
      </div>
    );
  }

  return (
    <div
      id="cities"
      className={
        view === "list"
          ? "flex flex-col gap-3"
          : "grid grid-cols-1 gap-6 md:grid-cols-2"
      }
    >
      {cities.map((city) => (
        <CityCard key={city.id} city={city} view={view} />
      ))}
    </div>
  );
}
