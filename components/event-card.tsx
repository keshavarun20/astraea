"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Radio,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getCategoryMeta,
  formatCoord,
  formatDate,
  formatTime,
} from "@/lib/constants";
import { useLocation } from "@/lib/hooks/useEonet";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { UnifiedEvent } from "@/lib/types";
import type { EonetEvent, GdacsEvent } from "@/lib/hooks/useEonet";

type Props = {
  event: UnifiedEvent;
  index: number;
};

const ALERT_COLORS: Record<string, string> = {
  Red: "#FF3A6E",
  Orange: "#FF6B35",
  Green: "#00FF9C",
};

export default function EventCard({ event, index }: Props) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const meta = getCategoryMeta([{ title: event.category }]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.6) }}
        className="flex flex-col bg-[#080E1A] border border-[#1a2840] cursor-pointer group hover:border-[#2a3850] hover:bg-[#0a1220] transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Top accent bar */}
        <div
          className="h-0.5 w-full shrink-0"
          style={{
            background: `linear-gradient(90deg, ${meta.color}, transparent)`,
          }}
        />

        {/* Card body */}
        {/* Card body */}
        <div className="flex gap-3 p-4 items-start h-[120px] overflow-hidden">
          {/* Category block */}
          <div
            className="shrink-0 w-11 h-11 flex flex-col items-center justify-center gap-1 border"
            style={
              {
                "--c": meta.color,
                borderColor: "color-mix(in srgb, var(--c) 30%, transparent)",
                background: "color-mix(in srgb, var(--c) 10%, transparent)",
              } as React.CSSProperties
            }
          >
            <span className="text-base leading-none">{meta.icon}</span>
            <span
              className="text-[7px] tracking-wider"
              style={{ color: meta.color }}
            >
              {meta.code}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-[12px] font-bold text-[#C8D8E8] leading-snug group-hover:text-white transition-colors line-clamp-2 flex-1 min-h-[32px]">
                {event.title}
              </h3>
              {isMobile ? (
                <ChevronDown
                  className="shrink-0 w-3.5 h-3.5 text-[#4a6080] transition-transform duration-200 mt-0.5"
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              ) : (
                <ChevronRight className="shrink-0 w-3.5 h-3.5 text-[#4a6080] group-hover:text-[#00FF9C] transition-colors mt-0.5" />
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 items-center">
              <Badge
                className="text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono"
                style={
                  {
                    "--c": meta.color,
                    borderColor:
                      "color-mix(in srgb, var(--c) 30%, transparent)",
                    background: "color-mix(in srgb, var(--c) 10%, transparent)",
                    color: meta.color,
                  } as React.CSSProperties
                }
              >
                {meta.code} · {meta.label}
              </Badge>

              {/* Source badge */}
              <Badge
                className={`text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono ${
                  event.source === "GDACS"
                    ? "border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF]"
                    : "border-[#4a6080]/30 bg-[#4a6080]/10 text-[#4a6080]"
                }`}
              >
                {event.source}
              </Badge>

              {/* GDACS alert level */}
              {event.alertLevel && (
                <Badge
                  className="text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono"
                  style={
                    {
                      "--c": ALERT_COLORS[event.alertLevel] ?? "#4a6080",
                      borderColor:
                        "color-mix(in srgb, var(--c) 30%, transparent)",
                      background:
                        "color-mix(in srgb, var(--c) 10%, transparent)",
                      color: "var(--c)",
                    } as React.CSSProperties
                  }
                >
                  ⚠ {event.alertLevel.toUpperCase()}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 overflow-hidden max-h-[18px]">
              {event.date && (
                <span className="flex items-center gap-1 text-[10px] text-[#4a6080]">
                  <Calendar className="w-2.5 h-2.5" />
                  {formatDate(event.date)}
                </span>
              )}
              {event.lat != null && event.lon != null && (
                <span className="flex items-center gap-1 text-[10px] text-[#4a6080]">
                  <MapPin className="w-2.5 h-2.5" />
                  {formatCoord(event.lat, "lat")}{" "}
                  {formatCoord(event.lon, "lon")}
                </span>
              )}
              {event.country && (
                <span className="flex items-center gap-1 text-[10px] text-[#4a6080]">
                  🌍 {event.country}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile inline expand */}
        <AnimatePresence initial={false}>
          {isMobile && open && (
            <motion.div
              key={event.id + "-expand"}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Separator className="bg-[#1a2840]" />
              <div className="p-4">
                <EventDetails event={event} meta={meta} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Desktop sheet */}
      {!isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="w-[480px] bg-[#04060D] border-l border-[#1a2840] p-0 overflow-y-auto"
          >
            <div
              className="h-0.5 w-full shrink-0"
              style={{
                background: `linear-gradient(90deg, ${meta.color}, transparent)`,
              }}
            />
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#1a2840]">
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 flex flex-col items-center justify-center gap-1 border"
                  style={
                    {
                      "--c": meta.color,
                      borderColor:
                        "color-mix(in srgb, var(--c) 30%, transparent)",
                      background:
                        "color-mix(in srgb, var(--c) 10%, transparent)",
                    } as React.CSSProperties
                  }
                >
                  <span className="text-xl leading-none">{meta.icon}</span>
                  <span
                    className="text-[7px] tracking-wider"
                    style={{ color: meta.color }}
                  >
                    {meta.code}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-[#C8D8E8] text-[14px] font-bold leading-snug text-left">
                    {event.title}
                  </SheetTitle>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge
                      className="text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono"
                      style={
                        {
                          "--c": meta.color,
                          borderColor:
                            "color-mix(in srgb, var(--c) 30%, transparent)",
                          background:
                            "color-mix(in srgb, var(--c) 10%, transparent)",
                          color: meta.color,
                        } as React.CSSProperties
                      }
                    >
                      {meta.code} · {meta.label}
                    </Badge>
                    <Badge
                      className={`text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono ${
                        event.source === "GDACS"
                          ? "border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF]"
                          : "border-[#4a6080]/30 bg-[#4a6080]/10 text-[#4a6080]"
                      }`}
                    >
                      {event.source}
                    </Badge>
                    {event.alertLevel && (
                      <Badge
                        className="text-[8px] tracking-widest rounded-none px-1.5 py-0.5 border font-mono"
                        style={
                          {
                            "--c": ALERT_COLORS[event.alertLevel] ?? "#4a6080",
                            borderColor:
                              "color-mix(in srgb, var(--c) 30%, transparent)",
                            background:
                              "color-mix(in srgb, var(--c) 10%, transparent)",
                            color: "var(--c)",
                          } as React.CSSProperties
                        }
                      >
                        ⚠ {event.alertLevel.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </SheetHeader>
            <div className="px-6 py-5 flex flex-col gap-6">
              <EventDetails event={event} meta={meta} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}

function EventDetails({
  event,
  meta,
}: {
  event: UnifiedEvent;
  meta: ReturnType<typeof getCategoryMeta>;
}) {
  const { data: location, isLoading: locLoading } = useLocation(
    event.lat,
    event.lon,
  );
  const isEonet = event.source === "EONET";
  const raw = event.raw as EonetEvent & GdacsEvent;

  return (
    <>
      {/* Location panel */}
      {event.lat != null && event.lon != null && (
        <div>
          <SectionLabel
            icon={<MapPin className="w-3 h-3" />}
            label="LOCATION DETAILS"
          />
          <div className="border border-[#1a2840] bg-[#080E1A] p-4 mt-3">
            {locLoading ? (
              <div className="flex gap-2 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-[#00FF9C] animate-pulse rounded-full"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <span className="text-[11px] text-[#4a6080] ml-1">
                  RESOLVING COORDINATES...
                </span>
              </div>
            ) : location && !("error" in location) ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <DataField label="COUNTRY" value={location.country} />
                <DataField label="CODE" value={location.countryCode} />
                <DataField label="REGION" value={location.region} />
                <DataField label="CITY" value={location.city} />
                <DataField
                  label="LATITUDE"
                  value={formatCoord(event.lat, "lat")}
                />
                <DataField
                  label="LONGITUDE"
                  value={formatCoord(event.lon, "lon")}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <DataField
                  label="LATITUDE"
                  value={formatCoord(event.lat, "lat")}
                />
                <DataField
                  label="LONGITUDE"
                  value={formatCoord(event.lon, "lon")}
                />
              </div>
            )}
            <a
              href={`https://www.google.com/maps?q=${event.lat},${event.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[10px] tracking-widest border px-3 py-1.5 transition-colors hover:text-[#00FF9C] hover:border-[#00FF9C]/40"
              style={
                {
                  "--c": meta.color,
                  color: meta.color,
                  borderColor: "color-mix(in srgb, var(--c) 30%, transparent)",
                } as React.CSSProperties
              }
            >
              <ExternalLink className="w-3 h-3" />
              OPEN IN GOOGLE MAPS
            </a>
          </div>
        </div>
      )}

      <Separator className="bg-[#1a2840]" />

      {/* Event data */}
      <div>
        <SectionLabel
          icon={<Calendar className="w-3 h-3" />}
          label="EVENT DATA"
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-3">
          <DataField label="EVENT ID" value={event.id} className="col-span-2" />
          {event.date && (
            <DataField label="DATE" value={formatDate(event.date)} />
          )}
          {event.date && (
            <DataField label="TIME" value={formatTime(event.date)} />
          )}
          {event.alertLevel && (
            <DataField
              label="ALERT LEVEL"
              value={event.alertLevel.toUpperCase()}
            />
          )}
          {event.severity && (
            <DataField
              label="SEVERITY"
              value={event.severity}
              className="col-span-2"
            />
          )}
          {isEonet && (
            <>
              <DataField
                label="GEOMETRY PTS"
                value={String((raw as EonetEvent).geometry?.length ?? 0)}
              />
              <DataField
                label="SOURCES"
                value={String((raw as EonetEvent).sources?.length ?? 0)}
              />
            </>
          )}
        </div>
      </div>

      {/* EONET sources */}
      {isEonet && (raw as EonetEvent).sources?.length > 0 && (
        <>
          <Separator className="bg-[#1a2840]" />
          <div>
            <SectionLabel
              icon={<Radio className="w-3 h-3" />}
              label="SIGNAL SOURCES"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {(raw as EonetEvent).sources.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-wider border border-[#1a2840] px-3 py-1.5 text-[#4a6080] hover:text-[#00FF9C] hover:border-[#00FF9C]/30 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {s.id}
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* GDACS link */}
      {!isEonet && event.link && (
        <>
          <Separator className="bg-[#1a2840]" />
          <div>
            <SectionLabel
              icon={<Zap className="w-3 h-3" />}
              label="GDACS REPORT"
            />
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-wider border border-[#0066FF]/30 px-3 py-1.5 text-[#0066FF] hover:text-[#00FF9C] hover:border-[#00FF9C]/30 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              VIEW FULL GDACS REPORT
            </a>
          </div>
        </>
      )}
    </>
  );
}

function SectionLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <p className="text-[9px] tracking-[4px] text-[#4a6080] flex items-center gap-2">
      {icon}
      {label}
    </p>
  );
}

function DataField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[9px] tracking-[3px] text-[#4a6080] mb-1">{label}</p>
      <p className="text-[13px] text-[#C8D8E8] font-mono break-all">{value}</p>
    </div>
  );
}
