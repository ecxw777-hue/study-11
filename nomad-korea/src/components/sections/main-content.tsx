import { cities } from "@/data/cities";
import { CityCardGrid } from "./city-card-grid";
import { Sidebar } from "./sidebar";

export function MainContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <CityCardGrid cities={cities} />
        </div>
        <div className="w-full lg:w-80">
          <Sidebar />
        </div>
      </div>
    </section>
  );
}
