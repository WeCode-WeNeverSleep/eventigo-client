import type { Metadata } from "next";
import { NavbarSession } from "@/components/navbar/navbar-session";
import { Sidebar } from "@/components/UI/sidebar";

export const metadata: Metadata = {
  title: "EventiGO",
  icons: {
    icon: "icons/favicon.ico",
  },
};

export default function SessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <aside className="border-r border-border hidden lg:flex flex-col">
        <Sidebar />
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
