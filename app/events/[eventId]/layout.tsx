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
  const event = await getEventById(eventId);
  return (
    <section className="flex">
      <aside className="border-r border-border hidden lg:flex flex-col">
        <Sidebar event={event} />
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="w-full">
          <NavbarSession />
        </div>

        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </section>
  );
}
