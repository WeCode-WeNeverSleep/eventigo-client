import { NavbarLanding } from "@/components/navbar/navbar-landing";
import { MainCard } from "@/components/MainCard";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/UI/Footer";
import { getEvents } from "@/lib/api/event";
import Link from "next/link";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Home() {
  const events = await getEvents().catch(() => []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLanding />

      <main className="flex-1 w-full xl:px-[150px] lg:px-[150px] px-4 sm:px-6">
        <section className="flex justify-center pt-20 pb-16">
          <MainCard />
        </section>

        <section className="w-full py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-around mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-text-muted uppercase mb-3">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-primary w-3 h-3"
                />
                ON THE CALENDAR
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-title text-text-main">
                Upcoming events
              </h2>
              <p className="text-text-muted mt-2">
                Six events across the next six months — handpicked, no fluff.
              </p>
            </div>
            <Link
              href="/events"
              className="text-sm text-text-muted hover:text-text-main transition-colors flex items-center gap-1"
            >
              See full calendar <span className="text-lg">›</span>
            </Link>
          </div>

          <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {events.slice(0, 4).map((event) => (
              <EventCard
                key={event.id}
                startDate={event.startDate.toISOString()}
                endDate={event.endDate.toISOString()}
                title={event.title}
                description={event.description || ""}
                time={`${event.startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} - ${event.endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`}
                location={event.location}
                cta="View event details"
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
