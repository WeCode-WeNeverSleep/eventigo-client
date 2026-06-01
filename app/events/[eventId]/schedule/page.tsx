import { EventSchedule } from "@/components/schedule/EventSchedule";
import { getSessionsByEvent } from "@/lib/api/session";
interface PageProps {
  params: {
    eventId: string;
  };
}

export default async function SchedulePage({ params }: PageProps) {
  const { eventId } = params;

  const sessions = await getSessionsByEvent(eventId).catch(() => []);

  return (
    <div className="px-6 py-12">
      <EventSchedule sessions={sessions} />
    </div>
  );
}