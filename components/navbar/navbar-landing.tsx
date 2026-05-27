"use client";

import { NavbarLogo } from "./navbar-logo";
import { NavbarLinks } from "./navbar-links";
import { ModeToggle } from "@/components/theme-toggle";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function NavbarLanding() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="w-full flex h-14 items-center justify-between xl:px-[150px] lg:px-[150px] px-4 sm:px-6">
        <NavbarLogo />

        <div className="flex flex-1 items-center justify-center px-4">
          <NavbarLinks />
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link
            href="/dashboard"
            id="open-dashboard-btn"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-3 text-sm font-semibold font-sans leading-none text-primary-foreground shadow-[0_0_16px_rgba(19,220,246,0.35)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(19,220,246,0.6)] hover:brightness-110 active:scale-95"
          >
            Open dashboard
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
