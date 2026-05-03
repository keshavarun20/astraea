"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import EventGrid from "@/components/event-grid";
import { useEonet, useGdacs } from "@/lib/hooks/useEonet";
import { normalizeEonet, normalizeGdacs } from "@/lib/types";
import { ALL_CATEGORIES } from "@/lib/constants";

export default function Home() {
  const [days, setDays] = useState(30);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const { data, isLoading: eonetLoading } = useEonet(days, 100);
  const { data: gdacsData, isLoading: gdacsLoading } = useGdacs();

  const isLoading = eonetLoading || gdacsLoading;

  const allEvents = useMemo(() => {
    const eonet = (data?.events ?? []).map(normalizeEonet);
    const gdacs = (gdacsData?.events ?? []).map(normalizeGdacs);
    return [...eonet, ...gdacs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [data, gdacsData]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ev of allEvents) {
      counts[ev.category] = (counts[ev.category] ?? 0) + 1;
    }
    return counts;
  }, [allEvents]);

  const filtered = useMemo(() => {
    return allEvents.filter((ev) => {
      const matchesCat =
        selectedCategory === ALL_CATEGORIES || ev.category === selectedCategory;
      const matchesSearch =
        !search ||
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.category.toLowerCase().includes(search.toLowerCase()) ||
        (ev.country ?? "").toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allEvents, selectedCategory, search]);

  const handleDaysChange = (d: number) => {
    setDays(d);
    setSelectedCategory(ALL_CATEGORIES);
    setSearch("");
  };

  return (
    <div className="relative z-[1] min-h-screen flex flex-col">
      <Header eventCount={filtered.length} loading={isLoading} days={days} />

      {/* Search bar */}
      <div className="sticky top-0 z-[8] border-b border-[#1a2840] bg-[#04060D]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-6 h-11">
          <Search className="w-4 h-4 text-[#00FF9C] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH EVENTS, CATEGORIES, COUNTRIES..."
            className="flex-1 bg-transparent border-none outline-none text-[#C8D8E8] placeholder:text-[#4a6080] text-[11px] tracking-widest caret-[#00FF9C]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#4a6080] hover:text-[#C8D8E8] transition-colors"
            >
              <X className="w-3 h-3" />
              CLEAR
            </button>
          )}
          <Separator orientation="vertical" className="h-4 bg-[#1a2840]" />
          <span className="text-[10px] tracking-[3px] text-[#4a6080] shrink-0">
            {filtered.length} EVENTS
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          days={days}
          onDaysChange={handleDaysChange}
          categoryCounts={categoryCounts}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <EventGrid events={filtered} loading={isLoading} search={search} />
          </div>
        </main>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1a2840] bg-[#04060D]/95 flex justify-between items-center px-6 py-2 shrink-0">
        <span className="text-[9px] tracking-[3px] text-[#4a6080]">
          ◈ NASA EONET v3 + GDACS // GLOBAL COVERAGE
        </span>
        <span className="text-[9px] tracking-[3px] text-[#4a6080]">
          CLICK ANY EVENT TO EXPAND · OPEN IN MAPS AVAILABLE
        </span>
      </div>
    </div>
  );
}