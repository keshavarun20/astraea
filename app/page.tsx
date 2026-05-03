"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ALL_CATEGORIES } from "@/lib/constants";
import { useEonet } from "@/lib/hooks/useEonet";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
 const [days, setDays] = useState(7);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [search, setSearch] = useState(""); 

  const { data, isLoading } = useEonet(days, 100);

  // Build categoryCounts from events
  const categoryCounts: Record<string, number> = {};
  for (const event of data?.events ?? []) {
    for (const cat of event.categories) {
      categoryCounts[cat.title] = (categoryCounts[cat.title] ?? 0) + 1;
    }
  }

   const filtered = useMemo(() => {
    return (data?.events ?? []).filter(ev => {  // ← was `event.filter`, now `(data?.events ?? []).filter`
      const matchesCat =
        selectedCategory === ALL_CATEGORIES ||
        ev.categories.some(c => c.title === selectedCategory);
      const matchesSearch =
        !search ||
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.categories.some(c => c.title.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [data?.events, selectedCategory, search]);

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        eventCount={data?.events.length ?? 0}
        loading={isLoading}
        days={days}
      />

      {/* Search bar */}
      <div style={{
        borderBottom: "1px solid #1a2840",
        background: "rgba(8,14,26,0.9)",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 8,
      }}>
        <span style={{ color: "#00FF9C", fontSize: 14, flexShrink: 0 }}>⌕</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="SEARCH EVENTS, CATEGORIES..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#C8D8E8",
            fontFamily: "Share Tech Mono, monospace",
            fontSize: 11,
            letterSpacing: 2,
            flex: 1,
            caretColor: "#00FF9C",
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              background: "none",
              border: "none",
              color: "#4a6080",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "Share Tech Mono, monospace",
            }}
          >
            ✕ CLEAR
          </button>
        )}
        <span style={{ fontSize: 9, color: "#4a6080", letterSpacing: 2, flexShrink: 0 }}>
          {filtered.length} EVENTS SHOWN
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          days={days}
          onDaysChange={setDays}
          categoryCounts={categoryCounts}
        />

        <main style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {/* <EventGrid events={filtered} loading={loading} search={search} /> */}
        </main>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1a2840",
        padding: "8px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(4,6,13,0.95)",
        fontSize: 8,
        letterSpacing: 2,
        color: "#4a6080",
        flexShrink: 0,
      }}>
        <span>◈ DATA SOURCE: NASA EONET v3 API // GSFC</span>
        <span>CLICK ANY EVENT TO EXPAND // OPEN SOURCE</span>
      </div>
    </div>
  );
}
