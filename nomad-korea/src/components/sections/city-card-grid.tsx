import { cities } from "@/data/cities";
import { CityCard } from "./city-card";

export function CityCardGrid() {
  return (
    <div
      id="cities"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2"
    >
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}
