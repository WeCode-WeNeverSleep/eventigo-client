import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="sticky top-0 shrink-0 h-screen w-fit flex px-8 py-10 flex-col gap-20">
      <div className="group flex items-center gap-4 cursor-pointer">
        <Image
          src="/logo.png"
          alt="EventiGO Logo"
          width={50}
          height={50}
          className="border border-primary rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="font-black text-xl">
            Eventi<span className="text-primary">GO</span>
          </h1>
          <p className="font-extralight text-sm">v.2026</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div
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
          <p>24</p>
        </div>

        <div
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
          <p>24</p>
        </div>

        <div
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
          <p>24</p>
        </div>
      </div>

      <div className="mt-auto">
        <p>Made By: </p>
        <span className="text-primary">WECODE·WENEVERSLEEP</span>
      </div>
    </div>
  );
};
