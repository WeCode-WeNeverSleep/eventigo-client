import { Session } from "@/types/sessions";
import Link from "next/link";
import { formatTime } from "@/utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUser,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface SessionRowProps {
  session: Session;
}

export function SessionRow({ session }: SessionRowProps) {
  return (
    <div className="group rounded-xl px-5 py-4 flex items-center justify-between transition-all bg-surface/40 border border-border hover:border-primary/30 hover:bg-surface/60">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {session.isLive && (
            <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-live/90 text-primary-foreground">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          )}
          <p className="text-[9px] tracking-widest text-text-muted/50 uppercase truncate">
            {session.room.name}
          </p>
        </div>

        <h3 className="text-[13px] font-semibold text-text-main/85 tracking-tight leading-snug truncate mb-1.5">
          {session.title}
        </h3>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] text-text-muted">
            <FontAwesomeIcon icon={faClock} className="w-2" />
            {formatTime(session.startTime)} – {formatTime(session.endTime)}
          </span>
          {session.speakers.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-text-muted truncate">
              <FontAwesomeIcon icon={faUser} className="w-2" />
              {session.speakers.map((s) => s.fullName).join(", ")}
            </span>
          )}
        </div>
      </div>

      <Link href={`/events/${session.eventId}/sessions/${session.id}`}>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="shrink-0 ml-3 text-text-muted group-hover:text-primary/40 transition-colors w-3"
        />
      </Link>
    </div>
  );
}
