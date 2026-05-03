"use client";

import { Skeleton } from "@/components/ui/skeleton";
import EventCard from "@/components/event-card";
import type { UnifiedEvent } from "@/lib/types";

type Props = {
  events: UnifiedEvent[];
  loading: boolean;
  search: string;
};

export default function EventGrid({ events, loading, search }: Props) {
  if (loading) return <LoadingState />;
  if (events.length === 0) return <EmptyState search={search} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start">
      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 py-24">
      <div className="font-vt323 text-6xl text-[#00FF9C] animate-[float_2s_ease-in-out_infinite] [text-shadow:0_0_20px_rgba(0,255,156,0.5)]">
        ◈
      </div>
      <p className="text-[10px] tracking-[6px] text-[#4a6080]">
        FETCHING SATELLITE DATA...
      </p>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1 h-1 bg-[#00FF9C] animate-[blink_1s_step-end_infinite]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[#080E1A] border border-[#1a2840] p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <Skeleton className="w-11 h-11 rounded-none bg-[#1a2840]" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-3/4 rounded-none bg-[#1a2840]" />
                <Skeleton className="h-3 w-1/2 rounded-none bg-[#1a2840]" />
              </div>
            </div>
            <Skeleton className="h-2 w-1/3 rounded-none bg-[#1a2840]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-24">
      <p className="font-vt323 text-4xl text-[#1a2840]">NO SIGNAL</p>
      <p className="text-[10px] tracking-[3px] text-[#4a6080]">
        {search
          ? `NO MATCHES FOR "${search.toUpperCase()}"`
          : "NO EVENTS IN THIS TIME WINDOW"}
      </p>
    </div>
  );
}