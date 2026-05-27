import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Session } from "@/types/sessions";

type SessionHeroCardProps = {
  session: Session;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionHeroCard({ session }: SessionHeroCardProps) {
  return (
    <section className="min-h-120 relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/50 via-background/70 to-primary/30 p-15 md:p-15 shadow-2xl">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="flex flex-col min-h-100 justify-between relative z-10">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-text-muted">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium text-text-main ${session.isLive ? "bg-live" : "bg-primary/20"
              }`}
          >
            {session.isLive && (
              <span className="h-2 w-2 rounded-full bg-red-700 animate-pulse" />
            )}

            {session.isLive ? "Live Now" : "Upcoming"}
          </span>

          <span>{session.id.slice(0, 8)}</span>
          <span>{session.room.name}</span>
          <span>
            {session.capacity ? `${session.capacity} seats` : "No capacity limit"}
          </span>
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          {session.title}
        </h1>

        <p className="max-w-3xl font-title text-md text-text-muted leading-7 md:text-md">
          {session.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-text-muted">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faClock} className="text-primary" />
            {formatTime(session.startTime)} - {formatTime(session.endTime)}
          </div>

          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
            {session.room.name}
          </div>

          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faTowerBroadcast} className="text-primary" />
            Live Q&amp;A session
          </div>
        </div>
      </div>
    </section>
  );
}