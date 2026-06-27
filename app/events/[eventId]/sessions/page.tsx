import { SessionCard } from "@/components/sessions/sessionCard";
import { getSessionsByEvent } from "@/lib/api/session";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Session } from "@/types/sessions";
import { EventHeroCard } from "@/components/events/event-hero-card";
import { getEventById } from "@/lib/api/event";
import { Event } from "@/types/event";

interface PageProps {
  params: { eventId: string };
}

export default async function SessionsPage({ params }: PageProps) {
  const { eventId } = await params;

  let eventSessions: Session[] = [];
  let event: Event;

  try {
    eventSessions = await getSessionsByEvent(eventId);
    event = await getEventById(eventId);
  } catch (error) {
    console.error(error);
    return <div>Error loading sessions.</div>;
  }

  const now = new Date();

  const upcomingAndLive = eventSessions.filter(
    (session) => new Date(session.endTime) > now,
  );

  const passedSessions = eventSessions.filter(
    (session) => new Date(session.endTime) <= now,
  );

  const liveSessions = upcomingAndLive.filter((session) => session.isLive);

  const upcomingSessions = upcomingAndLive.filter((session) => !session.isLive);

  return (
    <div className="flex flex-col gap-12">
      <EventHeroCard event={event} />
      {liveSessions.length > 0 && (
        <section>
          <div className="flex flex-col gap-2 mb-6">
            <p className="flex items-center uppercase text-xs text-text-muted tracking-widest gap-2">
              <FontAwesomeIcon icon={faPodcast} className="text-primary" />
              happening now
            </p>

            <h2 className="text-3xl font-bold font-title tracking-widest">
              Live Sessions
            </h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {liveSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {upcomingSessions.length > 0 && (
        <section>
          <div className="flex flex-col gap-2 mb-6">
            <p className="flex items-center uppercase text-xs text-text-muted tracking-widest gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-primary" />
              on the schedule
            </p>

            <h2 className="text-3xl font-bold tracking-widest font-title">
              Coming Up Next
            </h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {passedSessions.length > 0 && (
        <section>
          <div className="flex flex-col gap-2 mb-6">
            <p className="flex items-center uppercase text-xs text-text-muted tracking-widest gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-primary" />
              already happened
            </p>

            <h2 className="text-3xl font-bold tracking-widest font-title">
              Passed Sessions
            </h2>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {passedSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {upcomingAndLive.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p>All sessions for today have concluded.</p>
        </div>
      )}
    </div>
  );
}
