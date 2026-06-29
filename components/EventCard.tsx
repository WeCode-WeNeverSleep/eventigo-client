"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { Event } from "@/types/event";
import { isLiveStatus, formatEventDate } from "@/utils/eventUtils";
import Link from "next/link";

export interface EventCardProps {
  event: Event;
  cat?: string;
}

export function EventCard({
  event,
  cta = "View event details",
}: EventCardProps) {
  const now = new Date();
  const isLive = isLiveStatus(event.startDate, event.endDate);
  const isPassed = now > new Date(event.endDate);
  const { day, month } = formatEventDate(event.startDate);
  const time = `${event.startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} - ${event.endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;

  const getStatusLabel = () => {
    if (isLive) return "LIVE";
    if (isPassed) return "PASSED";
    return "UPCOMING";
  };

  const getStatusStyles = () => {
    if (isLive) return "text-live bg-red-500/5 border-red-500/20";
    if (isPassed) return "text-text-muted opacity-50 bg-slate-500/5";
    return "text-text-muted";
  };

  return (
    <div className="border border-border rounded-4xl p-6 bg-background hover:bg-surface transition-colors h-full flex flex-col w-full max-w-sm px-4">
      <div className="flex items-start justify-between mb-8">
        <div className="border-border border-2 py-2 px-5 rounded-2xl flex flex-col items-center">
          <h3 className="text-3xl font-bold text-primary">{day}</h3>
          <h3 className="text-text-muted font-thin">{month}</h3>
        </div>

        <span
          className={`text-xs tracking-widest uppercase flex items-center gap-2 rounded-3xl border border-border px-3 py-1 ${getStatusStyles()}`}
        >
          {isLive && (
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          )}
          {getStatusLabel()}
        </span>
      </div>

      <div className="flex-1 mb-6">
        <h2 className="text-xl font-bold font-title text-text-main mb-3">
          {event.title}
        </h2>
        <p className="text-text-muted text-base leading-relaxed">
          {event.description}
        </p>
      </div>

      <div className="mb-6 border-2 border-border py-3 flex items-center justify-center gap-4 rounded-2xl px-4">
        <div className="flex items-center gap-2 text-sm text-text-muted whitespace-nowrap">
          <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary" />
          <span>{time}</span>
        </div>
        <div className="w-px h-5 bg-border shrink-0" />
        <div className="flex items-center gap-2 text-sm text-text-muted min-w-0">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="w-4 h-4 text-primary shrink-0"
          />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      <Link
        href={`/events/${event.id}/sessions`}
        className="flex items-center gap-2 text-primary hover:bg-background text-sm font-medium transition-colors group border border-border rounded-4xl py-2 justify-center"
      >
        {cta}
        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
      </Link>
    </div>
  );
}
