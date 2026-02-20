import Image from "next/image";
import { City } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { NomadScoreBar } from "@/components/shared/nomad-score-bar";
import { SafetyBar } from "@/components/shared/safety-bar";
import { InternetSpeedBadge } from "@/components/shared/internet-speed-badge";
import { Pm25Badge } from "@/components/shared/pm25-badge";
import { WeatherStrip } from "@/components/shared/weather-strip";
import { KtxTimeBadge } from "@/components/shared/ktx-time-badge";
import { LikeDislikeBar } from "@/components/shared/like-dislike-bar";
import { CityTags } from "@/components/shared/city-tags";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-nk-accent/30 hover:shadow-lg hover:shadow-nk-accent/5">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={city.image}
          alt={`${city.nameKo} (${city.name})`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{city.nameKo}</h3>
              <p className="text-sm text-white/70">{city.name}</p>
            </div>
            <WeatherStrip weather={city.weather} />
          </div>
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {city.region}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <NomadScoreBar score={city.nomadScore} />

        <div className="flex flex-wrap gap-2">
          <InternetSpeedBadge speed={city.internetSpeed} />
          <Pm25Badge pm25={city.pm25} />
          <KtxTimeBadge minutes={city.ktxFromSeoul} />
        </div>

        <SafetyBar rating={city.safetyRating} />

        <div className="flex items-center justify-between">
          <span className="text-sm text-dim">월 생활비</span>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(city.monthlyCost)}
          </span>
        </div>

        <LikeDislikeBar likes={city.likes} dislikes={city.dislikes} />

        <p className="text-sm leading-relaxed text-dim">{city.description}</p>

        <CityTags tags={city.tags} />
      </div>
    </article>
  );
}
