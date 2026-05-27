import Speaker from "@/components/SpeakerComponent/SpeakerComponent";
import QuestionForm from "@/components/question-component/QuestionForm";
import SessionHeroCard from "@/components/sessions/sessionHeroCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getSessionById } from "@/lib/api/session";

type EventPageProps = {
  params: Promise<{
    eventId: string;
    sessionId: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { eventId, sessionId } = await params;

  const session = await getSessionById(eventId, sessionId);

  return (
    <main className="min-h-screen bg-background text-text-main px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <button className="mb-6 text-sm text-text-main hover:text-text-muted transition">
          <IoMdArrowRoundBack className="inline" /> Back to sessions
        </button>

        <SessionHeroCard />

        <section className="mt-8 grid gap-4 md:grid-cols-1 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <QuestionForm />
          </div>
          <div className="lg:col-span-4">
            <Speaker speakers={session.speakers} />
          </div>
        </section>
      </div>
    </main>
  );
}
