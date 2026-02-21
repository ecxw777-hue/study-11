import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyBottomCta } from "@/components/layout/sticky-bottom-cta";
import { HeroSection } from "@/components/sections/hero-section";
import { QuickStatsBar } from "@/components/sections/quick-stats-bar";
import { CityExplorer } from "@/components/sections/city-explorer";
import { SeasonalCarousel } from "@/components/sections/seasonal-carousel";
import { MembershipCta } from "@/components/sections/membership-cta";
import { MapView } from "@/components/sections/map-view-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <QuickStatsBar />
      <CityExplorer />
      <MapView />
      <SeasonalCarousel />
      <MembershipCta />
      <Footer />
      <StickyBottomCta />
    </>
  );
}
