import { NavbarLanding } from "@/components/navbar/navbar-landing";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/UI/Footer";
import { getEvents } from "@/lib/api/event";
import { isLiveStatus } from "@/utils/eventUtils";

export default async function LiveEventsPage() {
  const allEvents = await getEvents().catch(() => []);
  
  const liveEvents = allEvents.filter((event) => 
    isLiveStatus(event.startDate, event.endDate)
  );

  const dashboard = process.env.DASHBOARD_URL;
  if (!dashboard) {
    return "DASHBOARD_URL is missing";
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLanding dashboard={dashboard} />

      <main className="flex-1 w-full xl:px-38 lg:px-38 px-4 sm:px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-title text-text-main">
            Live Events
          </h1>
          <p className="text-text-muted mt-2 text-lg max-w-2xl">
            Happening right now! Join these ongoing conferences, workshops and meetups.
          </p>
        </div>

        {liveEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-2xl bg-surface/30">
            <p className="text-lg text-text-muted">
              No events are live at the moment.
            </p>
            <p className="text-sm text-text-muted/70 mt-1">
              Check back later or explore all upcoming events!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
