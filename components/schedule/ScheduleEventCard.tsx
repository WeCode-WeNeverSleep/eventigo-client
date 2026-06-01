"use client";

import {
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Session } from "@/types/sessions";

interface Props {
  session: Session;
}

export function ScheduleEventCard({ session }: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur">
      
      <div className="flex items-center justify-between">
        {session.isLive ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-live/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-live">
            <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
            Live Now
          </span>
        ) : (
          <span className="text-xs uppercase tracking-wider text-text-muted">
            Upcoming
          </span>
        )}

        <span className="text-xs uppercase tracking-widest text-text-muted">
          {session.room?.name}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold">
        {session.title}
      </h3>

      <p className="mt-2 text-sm text-text-muted">
        {session.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-5 text-sm text-text-muted">
        
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faClock} />

          {new Date(session.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}

          {" - "}

          {new Date(session.endTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>

        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />
          {session.room?.name}
        </div>
      </div>

      {/* SPEAKERS */}
      {session.speakers?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {session.speakers.map((speaker) => (
            <span
              key={speaker.id}
              className="rounded-full border border-border px-3 py-1 text-xs"
            >
              {speaker.fullName}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}