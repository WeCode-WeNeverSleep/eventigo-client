import { ModeToggle } from "@/components/theme-toggle";
import EventPage from "./event/page";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <EventPage />
    </>
  );
}
