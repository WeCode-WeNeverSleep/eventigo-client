"use client";

import { usePathname } from "next/navigation";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarLogo } from "../navbar/navbar-logo";
import Link from "next/link";
import { Event } from "@/types/event";

interface SidebarProps {
  event: Event;
}

export const Sidebar = ({ event }: SidebarProps) => {
  const pathname = usePathname();
  const eventId = event.id;

  const speakerCount = new Set(
    event.sessions.flatMap((s) => s.speakers.map((sp) => sp.id)),
  ).size;

  const liveCount = event.sessions.filter((s) => s.isLive).length;
  const upcomingCount = event.sessions.filter(
    (s) => !s.isLive && new Date(s.startTime) > new Date(),
  ).length;
  const sessionL = liveCount + upcomingCount;

  const baseLinkStyles =
    "group flex items-center justify-between py-2 px-3 rounded-l-3xl transition-all duration-150 cursor-pointer";

  const getLinkClassName = (targetPath: string) => {
    const isActive =
      pathname === targetPath || pathname.startsWith(targetPath + "/");

    if (isActive) {
      return `${baseLinkStyles} bg-gradient-to-r from-primary to-transparent text-text-main border-r-2 border-primary`;
    }

    return `${baseLinkStyles} text-text-muted hover:text-text-main`;
  };

  return (
    <div className="sticky top-0 shrink-0 h-screen w-fit flex px-8 py-10 flex-col gap-20 bg-background border-r border-border/40">
      <NavbarLogo />
      <div className="flex flex-col gap-5">
        <Link
          href={`/events/${eventId}/sessions`}
          className={getLinkClassName(`/events/${eventId}/sessions`)}
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faMicrophone}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p className="font-medium">Sessions</p>
          </div>
          <p className="text-xs font-mono font-bold">{sessionL}</p>
        </Link>

        <Link
          href={`/events/${eventId}/schedule`}
          className={getLinkClassName(`/events/${eventId}/schedule`)}
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p className="font-medium">Schedules</p>
          </div>
          <p className="text-xs font-mono font-bold">{event.sessions.length}</p>
        </Link>

        <Link
          href={`/events/${eventId}/speakers`}
          className={getLinkClassName(`/events/${eventId}/speakers`)}
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p className="font-medium">Speakers</p>
          </div>
          <p className="text-xs font-mono font-bold">{speakerCount}</p>
        </Link>
      </div>

      <div className="mt-auto text-xs font-medium">
        <p className="text-text-muted">Made By: </p>
        <span className="text-primary tracking-wider font-semibold">
          WECODE·WENEVERSLEEP
        </span>
      </div>
    </div>
  );
};
