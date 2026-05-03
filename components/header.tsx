"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

type Props = {
  eventCount: number;
  loading: boolean;
  days: number;
};

export default function Header({ eventCount, loading, days }: Props) {
  const [time, setTime] = useState("");
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      );
      setTick((t) => !t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-10 border-b border-[#1a2840] bg-[#04060D]/95 backdrop-blur-sm w-full overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-10 border-b border-[#0d1525]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-[#00FF9C] text-[10px] tracking-[3px] sm:tracking-[4px] shrink-0">
            ◈ NASA / GSFC
          </span>
          <Separator
            orientation="vertical"
            className="h-3 bg-[#1a2840] shrink-0"
          />
          <span className="text-[#4a6080] text-[10px] tracking-[1px] sm:tracking-[2px] truncate hidden sm:block">
            EARTH OBSERVATORY NETWORK EVENT TRACKER
          </span>
          <span className="text-[#4a6080] text-[10px] tracking-[1px] truncate sm:hidden">
            EON TRACKER
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span
            className="text-[10px] transition-colors duration-500"
            style={{ color: tick ? "#00FF9C" : "#006633" }}
          >
            ●
          </span>
          {/* Show date + time on mobile, full string on sm+ */}
          <span className="text-[#4a6080] text-[9px] font-mono sm:hidden">
            {time.substring(0, 10)} {time.substring(11, 19)} UTC
          </span>
          <span className="text-[#4a6080] text-[11px] font-mono hidden sm:block">
            {time}
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-4 gap-3 sm:gap-6">
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[6px] text-[#4a6080] mb-1 sm:mb-2">
            ACTIVE NATURAL EVENTS // GLOBAL MONITOR
          </p>
          <h1 className="font-vt323 text-3xl sm:text-6xl md:text-7xl leading-none tracking-wide sm:tracking-widest">
            <span className="text-[#00FF9C] [text-shadow:0_0_20px_rgba(0,255,156,0.5)]">
              ASTRAEA
            </span>
            <span className="text-[#1a2840] mx-1 sm:mx-3">//</span>
            <span className="text-[#C8D8E8]">TERRA</span>
          </h1>
          <p className="text-[#4a6080] text-[10px] sm:text-[11px] tracking-[1px] sm:tracking-[3px] mt-1 sm:mt-2">
            OBSERVING EARTH FROM ABOVE · NASA EONET + GDACS
          </p>
        </div>

        {/* Stats — 2x2 grid on mobile, row on sm+ */}
        <div className="grid grid-cols-4 sm:flex gap-2 sm:gap-3 sm:items-end sm:pb-1 sm:shrink-0">
          <StatPill
            label="EVENTS"
            value={loading ? "—" : String(eventCount)}
            color="#00FF9C"
            pulse
          />
          <StatPill label="WINDOW" value={`${days}D`} color="#0066FF" />
          <StatPill label="SOURCE" value="2" color="#4a6080" />
          <StatPill label="STATUS" value="LIVE" color="#FF3A6E" pulse />
        </div>
      </div>
    </header>
  );
}

function StatPill({
  label,
  value,
  color,
  pulse,
}: {
  label: string;
  value: string;
  color: string;
  pulse?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-1 px-3 py-2 border shrink-0"
      style={{
        borderColor: `${color}33`,
        background: `${color}0d`,
        animation: pulse ? "pulse-glow 2s ease-in-out infinite" : "none",
      }}
    >
      <span
        className="text-[8px] tracking-[3px]"
        style={{ color, opacity: 0.7 }}
      >
        {label}
      </span>
      <span
        className="font-vt323 text-2xl leading-none"
        style={{ color, textShadow: `0 0 10px ${color}80` }}
      >
        {value}
      </span>
    </div>
  );
}
