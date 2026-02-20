import { WeatherInfo } from "@/types";

interface WeatherStripProps {
  weather: WeatherInfo;
}

export function WeatherStrip({ weather }: WeatherStripProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span>{weather.icon}</span>
      <span className="text-foreground">{weather.temp}°C</span>
      <span className="text-dim">{weather.condition}</span>
    </div>
  );
}
