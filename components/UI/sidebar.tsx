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
  const eventId = event.id;
  const speakerCount = new Set(
    event.sessions.flatMap((s) => s.speakers.map((sp) => sp.id)),
  ).size;

  const liveCount = event.sessions.filter((s) => s.isLive).length;
  const upcomingCount = event.sessions.filter(
    (s) => !s.isLive && new Date(s.startTime) > new Date(),
  ).length;
  const sessionL = liveCount + upcomingCount;

  return (
    <div className="sticky top-0 shrink-0 h-screen w-fit flex px-8 py-10 flex-col gap-20">
      <NavbarLogo />
      <div className="flex flex-col gap-5">
        <Link
          href={`/events/${eventId}/sessions`}
          className="group flex items-center justify-between py-2 px-3 rounded-l-3xl 
          hover:bg-linear-to-r hover:from-primary/55 hover:to-transparent 
          transition-colors duration-150 cursor-pointer"
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faMicrophone}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p>Sessions</p>
          </div>
          <p>{sessionL}</p>
        </Link>

        <Link
          href={`/events/${eventId}/schedule`}
          className="group flex items-center justify-between py-2 px-3 rounded-l-3xl 
          hover:bg-linear-to-r hover:from-primary/55 hover:to-transparent 
          transition-colors duration-150 cursor-pointer"
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p>Schedules</p>
          </div>
          <p>{event.sessions.length}</p>
        </Link>

        <Link
          href={`/events/${eventId}/speakers`}
          className="group flex items-center justify-between py-2 px-3 rounded-l-3xl 
          hover:bg-linear-to-r hover:from-primary/55 hover:to-transparent 
          transition-colors duration-150 cursor-pointer"
        >
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="transition-colors group-hover:text-primary cursor-pointer"
            />
            <p>Speaker</p>
          </div>
          <p>{speakerCount}</p>
        </Link>
      </div>

      <div className="mt-auto">
        <p>Made By: </p>
        <span className="text-primary">WECODE·WENEVERSLEEP</span>
      </div>
    </div>
  );
};
