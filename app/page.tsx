import { ModeToggle } from "@/components/theme-toggle";
import QuestionForm from "@/components/question-component/QuestionForm";
import SpeakerComponent from "@/components/SpeakerComponent/SpeakerComponent";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <div className="flex flex-col md:flex-row px-5">
        <div className="md:w-2/3 w-full">
          <QuestionForm />
        </div>

        <div className="md:w-1/3 w-full">
          <SpeakerComponent />
        </div>
      </div>
    </>
  );
}
