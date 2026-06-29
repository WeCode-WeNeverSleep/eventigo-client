"use client";

import { useState } from "react";
import { Session } from "@/types/sessions";
import { groupSessionsByDay } from "@/utils/date";
import { DayTabs } from "./DayTabs";
import { FeaturedSession } from "./FeaturedSession";
import { SessionRow } from "./SessionRow";
import { EmptyState } from "./EmptyState";

interface ScheduleViewProps {
  sessions: Session[];
}

export function ScheduleView({ sessions }: ScheduleViewProps) {
  const sessionsByDay = groupSessionsByDay(sessions);
  const sortedDays = Object.keys(sessionsByDay).sort();

  const defaultDay =
    sortedDays.find((day) => sessionsByDay[day].some((s) => s.isLive)) ??
    sortedDays[0] ??
    "";

  const [activeDay, setActiveDay] = useState<string>(defaultDay);

  const dailySessions = sessionsByDay[activeDay] ?? [];

  const featured = dailySessions.find((s) => s.isLive) ?? dailySessions[0];
  const rest = dailySessions.filter((s) => s !== featured);

  if (sortedDays.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="Schedule not available"
        message="Sessions for this event have not been published yet."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <DayTabs
          days={sortedDays}
          activeDay={activeDay}
          onChange={setActiveDay}
        />
      </div>

      {featured ? (
        <FeaturedSession session={featured} />
      ) : (
        <EmptyState
          icon="calendar"
          title="Schedule not available"
          message="Sessions for this event have not been published yet."
        />
      )}

      {rest.map((session) => (
        <SessionRow key={session.id} session={session} />
      ))}
    </div>
  );
}
