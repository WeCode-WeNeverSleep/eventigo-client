"use client";

import {
  faCalendarDays,
  faLocationDot,
  faClock,
  faChevronRight,
  faTableList,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { Event } from "@/types/event";
import type { Session } from "@/types/sessions";

export interface EventHeroCardConfig {
  titleSplitAt?: number;
  ticketHref?: string;
}

export interface EventHeroCardProps {
  event: Event;
  config?: EventHeroCardConfig;
}

interface DayItem {
  shortDay: string;
  date: number;
  isToday: boolean;
  isLive: boolean;
}

function formatDateRange(startDate: Date, endDate: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${startDate.toLocaleDateString("en-US", opts)} – ${endDate.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

function buildDays(
  startDate: Date,
  endDate: Date,
  sessions: Session[],
): DayItem[] {
  const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: DayItem[] = [];
  const cursor = new Date(startDate);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  while (cursor <= end) {
    const ts = cursor.getTime();
    const dayIsLive = sessions.some((s) => {
      if (!s.isLive) return false;
      const d = new Date(s.startTime);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === ts;
    });
    days.push({
      shortDay: SHORT_DAYS[cursor.getDay()],
      date: cursor.getDate(),
      isToday: ts === today.getTime(),
      isLive: dayIsLive,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function countUniqueSpeakers(sessions: Session[]): number {
  return new Set(sessions.flatMap((s) => s.speakers.map((sp) => sp.id))).size;
}

const DARK_GRADIENT = `
  radial-gradient(ellipse at 12% 115%, rgba(99, 40, 180, 0.22) 0%, transparent 52%),
  radial-gradient(ellipse at 90% -5%,  rgba(19, 220, 246, 0.07) 0%, transparent 48%),
  rgb(10, 18, 28)
`;
const LIGHT_GRADIENT = `linear-gradient(135deg, #d5eef8 0%, #e8e0f8 100%)`;

export function EventHeroCard({ event, config = {} }: EventHeroCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";
  const { titleSplitAt, ticketHref } = config;

  const dateRange = formatDateRange(event.startDate, event.endDate);
  const year = event.startDate.getFullYear().toString();
  const days = buildDays(event.startDate, event.endDate, event.sessions);
  const liveSession =
    event.sessions
      .filter((s) => s.isLive)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0] ?? null;
  const titlePrefix =
    titleSplitAt != null ? event.title.slice(0, titleSplitAt) : "";
  const titleMain =
    titleSplitAt != null ? event.title.slice(titleSplitAt) : event.title;

  const stats = [
    { value: countUniqueSpeakers(event.sessions), label: "Speakers" },
    { value: event.sessions.length, label: "Sessions" },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-10"
      style={{ background: isLight ? LIGHT_GRADIENT : DARK_GRADIENT }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {event.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-widest text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {event.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-widest text-text-muted">
              <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3" />
              {dateRange}
            </span>
          </div>

          <div className="flex flex-col leading-none gap-1">
            <h1 className="font-title font-bold text-5xl md:text-6xl lg:text-7xl">
              <span className="text-text-main">{titlePrefix}</span>
              <span className={isLight ? "text-primary" : "text-text-main"}>
                {titleMain}
              </span>
            </h1>
            <span className="font-title font-bold text-5xl md:text-6xl lg:text-7xl text-text-muted">
              {year}.
            </span>
          </div>

          <p className="max-w-md font-sans text-sm leading-relaxed text-text-muted">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {ticketHref && (
              <Link
                href={ticketHref}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground shadow-[0_0_16px_rgba(19,220,246,0.30)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_24px_rgba(19,220,246,0.50)] active:scale-95"
              >
                <FontAwesomeIcon icon={faTicket} className="h-3.5 w-3.5" />
                Get a ticket
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            )}
            <Link
              href={`/events/${event.id}/schedule`}
              className={[
                "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300",
                ticketHref
                  ? "border border-border bg-surface/60 text-text-main hover:bg-surface"
                  : "border border-primary/40 bg-primary/10 text-primary hover:border-primary/70 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(19,220,246,0.20)]",
              ].join(" ")}
            >
              {!ticketHref && (
                <FontAwesomeIcon icon={faTableList} className="h-3.5 w-3.5" />
              )}
              View full schedule
              <FontAwesomeIcon
                icon={faChevronRight}
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5 lg:w-95 xl:w-100">
          {liveSession ? (
            <div className="rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-sm shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-live/15 px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-live">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
                  On stage now
                </span>
                <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-muted">
                  {liveSession.room.name}
                </span>
              </div>
              <p className="mb-3 font-sans text-base font-semibold leading-snug text-text-main">
                {liveSession.title}
              </p>
              <div className="flex items-center gap-4 font-sans text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                  {liveSession.startTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  {" — "}
                  {liveSession.endTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3" />
                  {liveSession.room.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-background/50 p-5 text-center">
              <p className="font-sans text-sm text-text-muted">
                No session currently on stage
              </p>
            </div>
          )}

          {days.length > 0 &&
            (() => {
              const MAX = 5;
              const todayIndex = days.findIndex((d) => d.isToday);
              const center = todayIndex >= 0 ? todayIndex : 0;
              const start = Math.max(
                0,
                Math.min(center - Math.floor(MAX / 2), days.length - MAX),
              );
              const visibleDays = days.slice(start, start + MAX);

              return (
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${MAX}, minmax(0, 1fr))`,
                  }}
                >
                  {visibleDays.map((day) => (
                    <Link
                      href={`/events/${event.id}/schedule`}
                      key={`${day.shortDay}-${day.date}`}
                      className={[
                        "flex flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition-all duration-200 hover:-translate-y-1",
                        day.isToday
                          ? "border-primary/60 bg-primary/10 shadow-[0_0_12px_rgba(19,220,246,0.10)]"
                          : "border-border bg-background/50 hover:border-border/80",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-sans text-[10px] font-semibold uppercase tracking-widest",
                          day.isToday
                            ? "text-primary/70"
                            : "text-text-muted/70",
                        ].join(" ")}
                      >
                        {day.shortDay}
                      </span>
                      <span
                        className={[
                          "font-title text-2xl font-bold leading-tight",
                          day.isToday ? "text-primary" : "text-text-main",
                        ].join(" ")}
                      >
                        {day.date}
                      </span>
                      {day.isLive && (
                        <span className="font-sans text-[9px] font-semibold uppercase tracking-widest leading-none mt-0.5 text-live">
                          Live
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              );
            })()}

          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-xl border 
                border-border bg-background/50 px-3 py-3 text-center hover:bg-primary/10 hover:delay-100"
              >
                <span className="font-title text-2xl font-bold text-text-main">
                  {stat.value}
                </span>
                <span className="font-sans text-[9px] font-semibold uppercase tracking-widest text-text-muted/70 mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
