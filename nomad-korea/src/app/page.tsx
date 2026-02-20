import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyBottomCta } from "@/components/layout/sticky-bottom-cta";
import { HeroSection } from "@/components/sections/hero-section";
import { QuickStatsBar } from "@/components/sections/quick-stats-bar";
import { FilterSortBar } from "@/components/sections/filter-sort-bar";
import { MainContent } from "@/components/sections/main-content";
import { MapViewPlaceholder } from "@/components/sections/map-view-placeholder";
import { SeasonalCarousel } from "@/components/sections/seasonal-carousel";
import { MembershipCta } from "@/components/sections/membership-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <QuickStatsBar />
      <FilterSortBar />
      <MainContent />
      <MapViewPlaceholder />
      <SeasonalCarousel />
      <MembershipCta />
      <Footer />
      <StickyBottomCta />
    </>
  );
}
