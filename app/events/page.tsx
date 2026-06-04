import { NavbarLanding } from "@/components/navbar/navbar-landing";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/UI/Footer";
import { getEvents } from "@/lib/api/event";

export default async function EventsPage() {
  const events = await getEvents().catch(() => []);

  events.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLanding />

      <main className="flex-1 w-full xl:px-38 lg:px-38 px-4 sm:px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-text-main">
            All Events
          </h1>
          <p className="text-text-muted mt-2 text-lg max-w-2xl">
            Discover all upcoming conferences, workshops and meetups curated for
            people building the modern web.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((event) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl bg-surface/30">
            <p className="text-lg text-text-muted">
              No events currently scheduled.
            </p>
            <p className="text-sm text-text-muted/70 mt-1">
              Check back later for updates!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
