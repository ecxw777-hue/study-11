"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { cities } from "@/data/cities";
import type { City } from "@/types";

// Fix Leaflet default marker icon issue with Next.js/webpack
const cityIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 14px;
    height: 14px;
    background: #6366f1;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 6px rgba(99,102,241,0.8);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -10],
});

const KOREA_CENTER: [number, number] = [36.5, 127.8];
const KOREA_ZOOM = 7;

function CityPopup({ city }: { city: City }) {
  return (
    <div className="min-w-[160px]">
      <p className="font-bold text-gray-900">{city.nameKo}</p>
      <p className="text-xs text-gray-500">{city.region}</p>
      <div className="mt-1 flex justify-between text-sm">
        <span>노마드 점수</span>
        <span className="font-semibold text-indigo-600">{city.nomadScore}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>월 비용</span>
        <span className="font-semibold">
          {(city.monthlyCost / 10000).toFixed(0)}만원
        </span>
      </div>
      <Link
        href={`/cities/${city.slug}`}
        className="mt-2 block rounded bg-indigo-600 px-3 py-1 text-center text-xs font-medium text-white hover:bg-indigo-700"
      >
        상세 보기 →
      </Link>
    </div>
  );
}

export function MapView() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">🗺️ 노마드 지도</h2>
      <div className="overflow-hidden rounded-xl border border-border" style={{ height: "400px" }}>
        <MapContainer
          center={KOREA_CENTER}
          zoom={KOREA_ZOOM}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.lat, city.lng]}
              icon={cityIcon}
            >
              <Popup>
                <CityPopup city={city} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
