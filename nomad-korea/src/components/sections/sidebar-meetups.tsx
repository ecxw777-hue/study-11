"use client";

import { useState } from "react";
import Image from "next/image";
import { meetups } from "@/data/meetups";

const INITIAL_COUNT = 3;

export function SidebarMeetups() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? meetups : meetups.slice(0, INITIAL_COUNT);

  return (
    <div id="meetups" className="rounded-xl border border-border bg-surface p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        🗓️ 다가오는 밋업
      </h3>
      <div className="space-y-3">
        {visible.map((meetup) => (
          <div
            key={meetup.id}
            className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-background"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={meetup.image}
                alt={meetup.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {meetup.title}
              </p>
              <p className="text-xs text-dim">
                {meetup.date} · {meetup.location}
              </p>
              <p className="text-xs text-nk-accent">
                {meetup.attendees}/{meetup.maxAttendees}명 참가
              </p>
            </div>
          </div>
        ))}
      </div>
      {meetups.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-xs text-nk-accent hover:underline"
        >
          {expanded ? "접기" : `더보기 (${meetups.length - INITIAL_COUNT}개 더)`}
        </button>
      )}
    </div>
  );
}
