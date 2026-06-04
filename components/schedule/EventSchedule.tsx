"use client";

import { useMemo } from "react";
import { ScheduleEventCard } from "./ScheduleEventCard";
import type { Session } from "@/types/sessions";

interface EventScheduleProps {
  sessions: Session[];
}

export function EventSchedule({ sessions }: EventScheduleProps) {
  const groupedSessions = useMemo(() => {
    const grouped: Record<string, Session[]> = {};

    sessions.forEach((session) => {
      const day = new Date(session.startTime).toISOString().split("T")[0];

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(session);
    });

    return grouped;
  }, [sessions]);

  const sortedDays = Object.keys(groupedSessions).sort();

  const formatDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="space-y-10">
      <div>
        <span className="text-primary text-sm uppercase tracking-[0.3em]">
          Event Program
        </span>

        <h2 className="mt-2 font-title text-4xl font-bold">Schedule</h2>

        <p className="mt-2 text-text-muted">
          Discover all talks, workshops and keynotes.
        </p>
      </div>

      <div className="space-y-10">
        {sortedDays.length > 0 ? (
          sortedDays.map((day) => (
            <div key={day} className="space-y-4">
              {/* DAY HEADER */}
              <h3 className="text-xl font-bold border-b border-border pb-2">
                {formatDayLabel(day)}
              </h3>

              {/* SESSIONS */}
              <div className="grid gap-5">
                {groupedSessions[day].map((session) => (
                  <ScheduleEventCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-border p-8 text-center">
            No sessions available.
          </div>
        )}
      </div>
    </section>
  );
}
