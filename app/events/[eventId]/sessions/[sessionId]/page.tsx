import Speaker from "@/components/SpeakerComponent/SpeakerComponent";
import QuestionForm from "@/components/question-component/QuestionForm";
import SessionHeroCard from "@/components/sessions/sessionHeroCard";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EventPage() {
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
            <Speaker />
          </div>
        </section>
      </div>
    </main>
  );
}
