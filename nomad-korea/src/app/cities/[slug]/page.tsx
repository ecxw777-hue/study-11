import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NomadScoreBar } from "@/components/shared/nomad-score-bar";
import { SafetyBar } from "@/components/shared/safety-bar";
import { InternetSpeedBadge } from "@/components/shared/internet-speed-badge";
import { Pm25Badge } from "@/components/shared/pm25-badge";
import { KtxTimeBadge } from "@/components/shared/ktx-time-badge";
import { CityTags } from "@/components/shared/city-tags";
import { LikeDislikeBar } from "@/components/shared/like-dislike-bar";
import { CityCard } from "@/components/sections/city-card";
import { CityDetailTabs } from "@/components/city-detail-tabs";
import { cities } from "@/data/cities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `${city.nameKo} (${city.name}) — Nomad Korea`,
    description: city.description,
  };
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) notFound();

  const similarCities = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main>
        {/* 히어로 섹션 */}
        <section className="relative h-72 w-full overflow-hidden md:h-96">
          <Image
            src={city.image}
            alt={`${city.nameKo} (${city.name})`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            {/* 브레드크럼 */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    홈
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#cities" className="transition-colors hover:text-white">
                    도시 탐색
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white" aria-current="page">
                  {city.nameKo}
                </li>
              </ol>
            </nav>

            <div className="flex items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">{city.nameKo}</h1>
                <p className="mt-1 text-lg text-white/70">{city.name}</p>
              </div>
              <span className="mb-1 rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
                {city.region}
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-10">
<CityDetailTabs city={city} />

          {/* 비슷한 도시 */}
          {similarCities.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold text-foreground">
                비슷한 도시 <span className="text-sm font-normal text-dim">({city.region})</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {similarCities.map((similar) => (
                  <CityCard key={similar.id} city={similar} />
                ))}
              </div>
            </section>
          )}

          {/* 홈으로 돌아가기 */}
          <div className="border-t border-border pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-foreground"
            >
              ← 모든 도시 보기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
