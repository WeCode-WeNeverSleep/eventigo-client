import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EventiGO",
  icons: {
    icon: "icons/favicon.ico",
  },
};

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <main className="flex-1">{children}</main>
    </section>
  );
}
