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
import { CityCard } from "@/components/sections/city-card";
import { ShareButtons } from "@/components/shared/share-buttons";
import { cities } from "@/data/cities";
import { formatCurrency } from "@/lib/utils";

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

  const title = `${city.nameKo} (${city.name}) — Nomad Korea`;
  const url = `https://nomadkorea.com/cities/${city.slug}`;

  return {
    title,
    description: city.description,
    openGraph: {
      title,
      description: city.description,
      url,
      siteName: "Nomad Korea",
      type: "article",
      images: [
        {
          url: city.image,
          width: 1200,
          height: 630,
          alt: `${city.nameKo} (${city.name})`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: city.description,
      images: [city.image],
    },
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

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white md:text-4xl">{city.nameKo}</h1>
                  <p className="mt-1 text-lg text-white/70">{city.name}</p>
                </div>
                <span className="mb-1 rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  {city.region}
                </span>
              </div>
              <ShareButtons
                url={`https://nomadkorea.com/cities/${city.slug}`}
                title={`${city.nameKo} (${city.name}) — Nomad Korea`}
                description={city.description}
                imageUrl={city.image}
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-10 px-4 py-10">
          {/* 핵심 지표 대시보드 */}
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

          {/* 상세 설명 */}
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">도시 소개</h2>
            <p className="leading-relaxed text-dim">{city.detailedDescription}</p>
          </section>

          {/* 장단점 */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-foreground">장단점</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-nk-green/20 bg-nk-green/5 p-5">
                <h3 className="mb-3 font-semibold text-nk-green">👍 장점</h3>
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
                <h3 className="mb-3 font-semibold text-nk-red">👎 단점</h3>
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

          {/* 코워킹 스페이스 */}
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
                    <p className="mb-3 text-sm text-dim">📍 {space.address}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-nk-blue">⚡ WiFi {space.wifi}Mbps</span>
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

          {/* 추천 카페 */}
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
                        {cafe.powerOutlets ? "🔌 콘센트 있음" : "콘센트 없음"}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-dim">📍 {cafe.address}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-nk-blue">⚡ WiFi {cafe.wifi}Mbps</span>
                      <span className="text-sm text-dim">{cafe.vibe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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
