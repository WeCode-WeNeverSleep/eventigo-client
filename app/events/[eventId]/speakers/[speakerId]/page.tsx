import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Speaker } from "@/types/speakers";
import { fetchSpeakerById } from "@/lib/api/speakers";
import { getSessionsByEvent } from "@/lib/api/session";

interface PageProps {
  params: Promise<{ eventId: string; speakerId: string }>;
}

export default async function SpeakerDetailsPage({ params }: PageProps) {
  const { eventId, speakerId } = await params;
  const sessions = await getSessionsByEvent(eventId);
  let speaker: Speaker;

  try {
    speaker = await fetchSpeakerById(speakerId);
  } catch (error) {
    console.error("Failed to load speaker:", error);
    return (
      <div className="min-h-screen bg-background text-text-main px-4 md:px-8 flex items-center justify-center">
        <p className="text-xl font-semibold">
          Error loading speaker. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text-main px-4 md:px-8 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/events/${eventId}/speakers`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-main hover:text-text-muted transition"
        >
          <IoMdArrowRoundBack />
          Back to speakers
        </Link>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="flex gap-3">
              <div>
                <img
                  src={speaker.avatarUrl}
                  alt={speaker.fullName}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-bold font-title tracking-widest">
                  {speaker.fullName}
                </h1>
                <p className="text-lg text-text-muted leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {speaker.externalLinks && speaker.externalLinks.length > 0 ? (
                speaker.externalLinks.map((link, idx) => {
                  const domain = link.includes("//")
                    ? link.split("//")[1]?.split("/")[0]
                    : link.split("/")[0];
                  return (
                    <a
                      key={idx}
                      href={link.startsWith("http") ? link : `https://${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary border border-border rounded-full px-4 py-2 hover:bg-background transition-colors"
                    >
                      <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                      <span>{domain || "Link"}</span>
                    </a>
                  );
                })
              ) : (
                <span className="text-sm text-text-muted italic">
                  No links available
                </span>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold font-title mb-4">
                Participating Sessions
              </h2>
              <div className="grid gap-4">
                {sessions && sessions.length > 0 ? (
                  sessions
                    .filter((session) => 
                      session.speakers?.some((s) => s.id === speakerId)
                    )
                    .map((session) => (
                      <div
                        key={session.id}
                        className="p-4 rounded-2xl border border-border bg-background/50 flex justify-between items-center group hover:border-primary/30 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                              session.isLive 
                                ? "border-primary text-primary bg-primary/10" 
                                : new Date() > session.endTime 
                                  ? "border-border text-text-muted bg-border/10" 
                                  : "border-primary/30 text-primary/70 bg-primary/5"
                            }`}>
                              {session.isLive ? "Live" : new Date() > session.endTime ? "Passed" : "Upcoming"}
                            </span>
                            <p className="text-xs text-text-muted">
                              {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {session.title}
                          </p>
                          <p className="text-sm text-text-muted">
                            {session.room?.name || "No room assigned"}
                          </p>
                        </div>
                        <Link
                          href={`/events/${eventId}/sessions/${session.id}`}
                          className="text-primary text-sm font-medium hover:underline px-4 py-2 rounded-full border border-//border hover:bg-primary/10 transition-colors"
                        >
                          View Session
                        </Link>
                      </div>
                    ))
                ) : (
                  <p className="text-text-muted italic">
                    No sessions participated in.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
