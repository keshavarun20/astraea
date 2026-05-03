"use client";

import {
  SiGithub,
  SiX,
  SiDiscord,
  SiNasa,
} from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { MdSatelliteAlt } from "react-icons/md";

// ─── Sub-components ────────────────────────────────────────────────────────────

function FooterItem({
  label,
  value,
  color,
  href,
}: {
  label: string;
  value: string;
  color: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-1.5 group/item whitespace-nowrap">
      <span className="text-[8px] tracking-[2px] text-[#4a6080]">{label} //</span>
      <span
        className="text-[9px] tracking-[2px] font-bold transition-opacity group-hover/item:opacity-80"
        style={{ color }}
      >
        {value}
      </span>
      {href && (
        <FiExternalLink
          size={8}
          className="opacity-0 group-hover/item:opacity-60 transition-opacity"
          style={{ color }}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center p-1 text-[#4a6080] hover:text-[#00FF9C] transition-all duration-200 group/social"
    >
      <Icon size={14} className="transition-transform group-hover/social:scale-110" />
    </a>
  );
}

// ─── Main Footer ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-[#1a2840] bg-[#04060D]/95 shrink-0 font-mono">

      {/* ── Top Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3 gap-3">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <MdSatelliteAlt
            size={14}
            className="text-[#00FF9C] opacity-70"
            style={{ filter: "drop-shadow(0 0 4px rgba(0,255,156,0.5))" }}
          />
          <span
            className="font-vt323 text-2xl text-[#00FF9C]"
            style={{ textShadow: "0 0 10px rgba(0,255,156,0.4)" }}
          >
            ASTRAEA
          </span>
          <span className="text-[#1a2840]">//</span>
          <span className="text-[9px] tracking-[3px] text-[#4a6080]">TERRA</span>
        </div>

        {/* Data Sources */}
        <div className="flex flex-wrap items-center gap-3">
          <FooterItem label="DATA" value="NASA EONET v3" color="#00FF9C" href="https://eonet.gsfc.nasa.gov/" />
          <FooterItem label="DATA" value="GDACS" color="#0066FF" href="https://www.gdacs.org/" />
          <FooterItem label="GEOCODING" value="BigDataCloud" color="#4a6080" href="https://www.bigdatacloud.com/" />
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF9C]" />
          </span>
          <span className="text-[9px] tracking-[3px] text-[#4a6080]">LIVE FEED ACTIVE</span>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#0d1525] px-6 py-2 flex flex-col sm:flex-row items-center sm:justify-between gap-1.5 sm:gap-2">

        {/* Copyright + Author */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="text-[8px] tracking-[2px] text-[#4a6080]">
            © {new Date().getFullYear()} ASTRAEA
          </span>
          <span className="text-[#1a2840]">·</span>
          <span className="text-[8px] tracking-[2px] text-[#4a6080]">DEVELOPED BY</span>
          <span
            className="text-[8px] tracking-[2px] font-bold text-[#00FF9C]"
            style={{ textShadow: "0 0 6px rgba(0,255,156,0.3)" }}
          >
            KESHAV
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-0.5">
          <SocialLink href="https://github.com/keshavarun20" icon={SiGithub} label="GitHub" />
          <SocialLink href="https://x.com/boi_Genz" icon={SiX} label="X / Twitter" />
          <SocialLink href="https://discord.com" icon={SiDiscord} label="Discord" />
          <SocialLink href="https://nasa.gov" icon={SiNasa} label="NASA" />
        </div>
      </div>

    </footer>
  );
}