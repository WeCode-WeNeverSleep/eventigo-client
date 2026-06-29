import type { Metadata } from "next";
import { NavbarSession } from "@/components/navbar/navbar-session";
import { Sidebar } from "@/components/UI/sidebar";
import { getEventById } from "@/lib/api/event";

export const metadata: Metadata = {
  title: "EventiGO",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function SessionsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  
  let event;
  try {
    event = await getEventById(eventId);
  } catch (error) {
    console.error("Error fetching event in layout:", error);
    return (
      <div className="min-h-screen bg-background text-text-main px-4 md:px-8 flex items-center justify-center">
        <p className="text-xl font-semibold">Event not found or failed to load.</p>
      </div>
    );
  }

  const dashboard = process.env.DASHBOARD_URL;
  if (!dashboard) {
    return "DASHBOARD_URL is missing";
  }

  return (
    <section className="flex">
      <aside className="border-r border-border hidden lg:flex flex-col">
        <Sidebar event={event} />
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="w-full">
          <NavbarSession dashboard={dashboard} />
        </div>

        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </section>
  );
}
