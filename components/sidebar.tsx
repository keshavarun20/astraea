"use client";

import { CATEGORY_META, DAYS_OPTIONS, ALL_CATEGORIES } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

type Props = {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  days: number;
  onDaysChange: (d: number) => void;
  categoryCounts: Record<string, number>;
};

const totalCount = (counts: Record<string, number>) =>
  Object.values(counts).reduce((a, b) => a + b, 0);

function SidebarContent({
  selectedCategory,
  onCategoryChange,
  days,
  onDaysChange,
  categoryCounts,
}: Props) {
  const allCategories = [
    { title: ALL_CATEGORIES, code: "ALL", color: "#00FF9C" },
    ...Object.entries(CATEGORY_META).map(([title, meta]) => ({
      title,
      code: meta.code,
      color: meta.color,
    })),
  ];

  return (
    <div className="flex flex-col h-full gap-8 py-6">
      {/* Time window */}
      <div className="px-4">
        <SectionLabel>TIME WINDOW</SectionLabel>
        <div className="flex flex-col gap-1 mt-3">
          {DAYS_OPTIONS.map((opt) => {
            const active = days === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onDaysChange(opt.value)}
                className={`flex justify-between items-center px-3 py-2 text-[11px] tracking-widest transition-all text-left border ${
                  active
                    ? "border-[#00FF9C]/30 bg-[#00FF9C]/10 text-[#00FF9C]"
                    : "border-transparent text-[#4a6080] hover:text-[#C8D8E8]"
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-[9px] opacity-50">{opt.value}D</span>
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-[#1a2840]" />

      {/* Categories */}
      <div className="px-4 flex-1">
        <SectionLabel>FILTER BY TYPE</SectionLabel>
        <div className="flex flex-col gap-1 mt-3">
          {allCategories.map((cat) => {
            const active = selectedCategory === cat.title;
            const count =
              cat.title === ALL_CATEGORIES
                ? totalCount(categoryCounts)
                : (categoryCounts[cat.title] ?? 0);

            return (
              <button
                key={cat.title}
                onClick={() => onCategoryChange(cat.title)}
                className={`flex justify-between items-center px-3 py-2 text-[11px] tracking-wider transition-all text-left border ${
                  active ? "border" : "border-transparent hover:text-[#C8D8E8]"
                }`}
                style={
                  active
                    ? ({
                        "--c": cat.color,
                        borderColor: "color-mix(in srgb, var(--c) 30%, transparent)",
                        background: "color-mix(in srgb, var(--c) 8%, transparent)",
                        color: cat.color,
                      } as React.CSSProperties)
                    : ({ color: "#4a6080" } as React.CSSProperties)
                }
              >
                <span>
                  {cat.title === ALL_CATEGORIES
                    ? "◈ ALL EVENTS"
                    : `${cat.code} · ${cat.title}`}
                </span>
                {count > 0 && (
                  <span
                    className="font-vt323 text-lg leading-none px-1"
                    style={{ color: active ? cat.color : "#4a6080" }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-[#1a2840]" />

      {/* Legend */}
      <div className="px-4">
        <SectionLabel>SIGNAL LEGEND</SectionLabel>
        <div className="flex flex-col gap-2 mt-3">
          <LegendRow color="#00FF9C" label="ACTIVE EVENT" />
          <LegendRow color="#0066FF" label="TRACKED SOURCE" />
          <LegendRow color="#FF3A6E" label="LIVE FEED" />
          <LegendRow color="#4a6080" label="STATIC DATA" />
        </div>
      </div>
    </div>
  );
}

export default function Sidebar(props: Props) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[#1a2840] bg-[#04060D]/60 shrink-0">
        <ScrollArea className="flex-1">
          <SidebarContent {...props} />
        </ScrollArea>
      </aside>

      {/* Mobile/tablet sheet */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="w-12 h-12 bg-[#00FF9C] text-[#04060D] hover:bg-[#00FF9C]/80 rounded-none border border-[#00FF9C] [box-shadow:0_0_20px_rgba(0,255,156,0.4)]"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-[#04060D] border-r border-[#1a2840] p-0"
          >
            <ScrollArea className="h-full">
              <SidebarContent {...props} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] tracking-[4px] text-[#4a6080] border-b border-[#1a2840] pb-2">
      {children}
    </p>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-2 h-2 shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span className="text-[9px] tracking-[2px] text-[#4a6080]">{label}</span>
    </div>
  );
}