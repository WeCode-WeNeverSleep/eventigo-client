import { Session } from "@/types/sessions";
import Link from "next/link";
import { formatTime } from "@/utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faClock,
  faLocationDot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface FeaturedSessionProps {
  session: Session;
}

export function FeaturedSession({ session }: FeaturedSessionProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-6 overflow-hidden border border-primary/20 bg-linear-to-br from-primary/10 to-background">
      {session.isLive ? (
        <div className="flex items-center gap-2 bg-live/30 px-3 py-1.5 rounded-full border border-live/70 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-live text-xs font-bold tracking-widest">
            LIVE NOW
          </span>
        </div>
      ) : (
        ""
      )}
      <p className="text-[10px] tracking-widest text-text-muted mb-2 uppercase">
        Session
      </p>
      <h2 className="text-lg font-bold leading-snug tracking-tight text-text-main max-w-md mb-4">
        {session.title}
      </h2>

      {session.speakers.length > 0 && (
        <div className="flex flex-wrap items-center gap-5 mb-4">
          {session.speakers.map((sp) => (
            <div key={sp.id} className="flex items-center gap-1.5">
              {sp.avatarUrl ? (
                <img
                  src={sp.avatarUrl}
                  alt={sp.fullName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] text-primary font-bold">
                  {sp.fullName.charAt(0)}
                </div>
              )}
              <span className="text-[20px] text-text-muted">{sp.fullName}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-5 flex-wrap">
        <span className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <FontAwesomeIcon icon={faClock} className="w-2.5" />
          {formatTime(session.startTime)} – {formatTime(session.endTime)}
        </span>
        <span className="flex items-center gap-2 text-[11px] text-text-muted">
          <FontAwesomeIcon icon={faLocationDot} className="w-2.5" />
          {session.room.name}
        </span>
        {session.capacity != null && (
          <span className="flex items-center gap-1.5 text-[11px] text-text-muted">
            <FontAwesomeIcon icon={faUsers} className="w-2.5" />
            {session.capacity} places
          </span>
        )}
      </div>

      <Link
        href={`/events/${session.eventId}/sessions/${session.id}`}
        className="mt-auto w-full bg-text-muted/10 hover:bg-text-muted/40 border border-border rounded-full py-3 flex items-center justify-center gap-2 text-sm font-bold transition-all"
      >
        {session.isLive ? "Join the session" : "View session"}
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </Link>
    </div>
  );
}
