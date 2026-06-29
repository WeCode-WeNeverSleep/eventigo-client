import { notFound } from "next/navigation";
import { getEventById } from "@/lib/api/event";
import { ScheduleView } from "@/components/schedule/ScheduleView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function SchedulePage({ params }: PageProps) {
  const { eventId } = await params;

  let event;
  try {
    event = await getEventById(eventId);
  } catch {
    notFound();
  }

  if (!event) {
    notFound();
  }

  const sessions = event.sessions ?? [];

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  const dateRange = `${start.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })} – ${end.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  const speakerCount = new Set(
    sessions.flatMap((s) => s.speakers?.map((sp) => sp.id) || []),
  ).size;

  return (
    <div className="w-full gap-5 flex flex-col bg-background text-text-main font-sans">
      <div className="flex items-start justify-around gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-main mb-1">
            {event.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            {event.location && (
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <FontAwesomeIcon icon={faLocationDot} className="w-2.5" />
                {event.location}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-text-muted/70">
              <FontAwesomeIcon icon={faCalendarDays} className="w-2.5" />
              {dateRange}
            </span>
          </div>
        </div>

        <div className="flex gap-5 shrink-0">
          {[
            { value: speakerCount, label: "SPEAKERS" },
            { value: sessions.length, label: "SESSIONS" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="text-2xl font-bold tabular-nums tracking-tight text-text-main">
                {stat.value}
              </div>
              <div className="text-[9px] tracking-widest text-text-muted mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto">
        <ScheduleView sessions={sessions} />
      </div>
    </div>
  );
}
