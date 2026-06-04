import Speaker from "@/components/SpeakerComponent/SpeakerComponent";
import QuestionForm from "@/components/question-component/QuestionForm";
import SessionHeroCard from "@/components/sessions/sessionHeroCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getSessionById } from "@/lib/api/session";
import type { SessionPageProps } from "@/types/sessionPageProps";
import Link from "next/link";

const socketUrl = process.env.SOCKET_URL;

export default async function SessionPage({ params }: SessionPageProps) {
  const { eventId, sessionId } = await params;

  const session = await getSessionById(eventId, sessionId);

  if (!socketUrl) {
    return "SOCKET_URL is missing";
  }

  return (
    <main className="min-h-screen bg-background text-text-main px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/events/${eventId}/sessions`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-text-main hover:text-text-muted transition"
        >
          <IoMdArrowRoundBack />
          Back to sessions
        </Link>

        <SessionHeroCard session={session} />

        <section className="mt-8 grid gap-4 md:grid-cols-1 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <QuestionForm sessionId={session.id} socketUrl={socketUrl} />
          </div>
          <div className="lg:col-span-4">
            <Speaker speakers={session.speakers} />
          </div>
        </section>
      </div>
    </main>
  );
}
