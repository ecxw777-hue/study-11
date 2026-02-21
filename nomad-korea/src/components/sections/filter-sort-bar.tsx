"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FilterSortBarProps {
  region: string;
  sort: string;
  view: string;
  onRegionChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewChange: (value: string) => void;
}

export function FilterSortBar({
  region,
  sort,
  view,
  onRegionChange,
  onSortChange,
  onViewChange,
}: FilterSortBarProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4">
        {/* Region filter */}
        <Select value={region} onValueChange={onRegionChange}>
          <SelectTrigger className="flex-1 border-border bg-surface">
            <SelectValue placeholder="지역" />
          </SelectTrigger>
          <SelectContent className="border-border bg-surface">
            <SelectItem value="all">전체 지역</SelectItem>
            <SelectItem value="capital">수도권</SelectItem>
            <SelectItem value="gyeongsang">경상도</SelectItem>
            <SelectItem value="jeolla">전라도</SelectItem>
            <SelectItem value="chungcheong">충청도</SelectItem>
            <SelectItem value="gangwon">강원도</SelectItem>
            <SelectItem value="jeju">제주</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="flex-1 border-border bg-surface">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent className="border-border bg-surface">
            <SelectItem value="score">노마드 스코어순</SelectItem>
            <SelectItem value="internet">인터넷 속도순</SelectItem>
            <SelectItem value="cost-low">생활비 낮은순</SelectItem>
            <SelectItem value="cost-high">생활비 높은순</SelectItem>
            <SelectItem value="safety">안전 등급순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
          </SelectContent>
        </Select>

        {/* View toggle */}
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && onViewChange(v)}
          className="ml-auto shrink-0 border border-border"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="그리드 뷰"
            className="data-[state=on]:bg-nk-accent/20 data-[state=on]:text-nk-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="리스트 뷰"
            className="data-[state=on]:bg-nk-accent/20 data-[state=on]:text-nk-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <rect x="1" y="1" width="14" height="3" rx="1" />
              <rect x="1" y="6" width="14" height="3" rx="1" />
              <rect x="1" y="11" width="14" height="3" rx="1" />
            </svg>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </section>
  );
}
