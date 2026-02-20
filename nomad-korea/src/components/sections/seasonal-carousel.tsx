"use client";

import Image from "next/image";
import { seasonalPicks } from "@/data/seasonal-picks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SeasonalCarousel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-xl font-bold text-foreground">
        🌸 계절별 추천 도시
      </h2>

      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {seasonalPicks.map((pick) => (
            <CarouselItem
              key={pick.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-nk-accent/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pick.image}
                    alt={pick.cityKo}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-nk-accent/90 px-2 py-1 text-xs font-medium text-white">
                      {pick.season}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">
                      {pick.cityKo}
                    </h3>
                    <span className="text-xs text-nk-gold">
                      {pick.highlight}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-dim">
                    {pick.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden border-border bg-surface text-foreground hover:bg-background md:flex" />
        <CarouselNext className="hidden border-border bg-surface text-foreground hover:bg-background md:flex" />
      </Carousel>
    </section>
  );
}
