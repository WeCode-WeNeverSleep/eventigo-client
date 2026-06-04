import { EventSchedule } from "@/components/schedule/EventSchedule";
import { ScheduleSection } from "@/components/schedule/ScheduleSection";
import { getSessionsByEvent } from "@/lib/api/session";
import { Session } from "@/types/sessions";
interface PageProps {
  params: {
    eventId: string;
  };
}

export default async function SchedulePage({ params }: PageProps) {
  const { eventId } = await params;

  let eventSessions: Session[] = [];

  try {
    eventSessions = await getSessionsByEvent(eventId);
  } catch (error) {
    console.error(error);
    return <div>Error loading sessions.</div>;
  }

  const sessionsByDate = eventSessions.reduce<Record<string, Session[]>>(
    (acc, session) => {
      const date = session.startTime.toISOString().split("T")[0];

      if (!acc[date]) acc[date] = [];

      acc[date].push(session);

      return acc;
    },
    {},
  );

  return (
    <div className="px-6 py-12">
      <ScheduleSection groupedSessions={sessionsByDate} />
    </div>
  );
}
