"use client";
import { useCountdown } from "@/hooks/use-contdown";
import { Session } from "@/types/sessions";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronCircleRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface SessionCardProps {
  session: Session;
}

export const SessionCard = ({ session }: SessionCardProps) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const countdown = useCountdown(session.startTime);
  const getDuration = (s: Date) => {
    const hours = s.getHours();
    const minutes = s.getMinutes();
    return { hours, minutes };
  };
  const starTime = getDuration(session.startTime);
  const endTime = getDuration(session.endTime);

  return (
    <div className="w-full flex flex-col rounded-4xl bg-background border border-border p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        {session.isLive ? (
          <div className="flex items-center gap-2 bg-live/30 px-3 py-1.5 rounded-full border border-live/70">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-live text-xs font-bold tracking-widest">
              LIVE NOW
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-background/30 px-3 py-1.5 rounded-full border border-border">
            <span className="text-primary text-xs font-bold tracking-widest">
              {countdown}
            </span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="text-primary text-[10px] font-black tracking-widest uppercase">
          Frontend
        </span>
        <h3 className="text-2xl font-bold  mt-1 leading-tight">
          {session.title}
        </h3>
        <p className="text-text-muted text-sm mt-2 line-clamp-2 leading-relaxed">
          {session.description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-4 bg-text-muted/10 border border-border/40 rounded-full px-4 py-2.5 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="text-primary" />
          <span className="font-medium">
            {starTime.hours}:{starTime.minutes} - {endTime.hours}:
            {endTime.minutes}
          </span>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
          <span className="font-medium">{session.room.name}</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between mb-6">
        <div className="flex items-center -space-x-3">
          {session.speakers.map((speaker, i) => (
            <div
              key={speaker.id}
              style={{ backgroundColor: i % 2 === 0 ? "#13DCF6" : "#c611ff" }}
              className="w-10 h-10 rounded-full border-2 border-border flex items-center bg-red-500 justify-center text-xs font-bold text-primary"
            >
              {speaker.avatarUrl ? (
                <img
                  src={speaker.avatarUrl}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                getInitials(speaker.fullName)
              )}
            </div>
          ))}
        </div>

        <div className="text-right">
          <p className="text-sm font-bold">{session.speakers[0]?.fullName}</p>
          {session.speakers.length > 1 && (
            <p className="text-xs text-text-muted">
              +{session.speakers.length - 1} more speaker
            </p>
          )}
        </div>
      </div>

      <Link
        href={`/events/${session.eventId}/sessions/${session.id}`}
        className="mt-auto w-full bg-text-muted/10 hover:bg-text-muted/40 border border-white/10 rounded-full py-3 flex items-center justify-center gap-2 text-sm font-bold transition-all"
      >
        {session.isLive ? "Join the session" : "View session"}
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </Link>
    </div>
  );
};
