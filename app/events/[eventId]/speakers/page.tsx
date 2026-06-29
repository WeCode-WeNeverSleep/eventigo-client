import { SpeakerCard } from "@/components/SpeakerComponent/SpeakerCard";
import { fetchSpeakersWithSessions } from "@/lib/api/speakers";
import { Speaker } from "@/types/speakers";

interface PageProps {
  params: { eventId: string };
}

export default async function SpeakerPage({ params }: PageProps) {
  const { eventId } = await params;
  let speakers: Speaker[] = [];

  try {
    const allSpeakers = await fetchSpeakersWithSessions();

    speakers = allSpeakers.filter(
      (speaker) =>
        speaker.sessions?.some((session) => session.eventId === eventId) ??
        false,
    );
  } catch (error) {
    console.error("Failed to load speakers:", error);
    return (
      <div className="min-h-screen bg-background text-text-main px-4 md:px-8 flex items-center justify-center">
        <p className="text-xl font-semibold">
          Error loading speakers. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text-main px-4 md:px-8 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-title tracking-widest mb-4">
            Our Speakers
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Meet the experts and visionaries sharing their knowledge and
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={{
                id: speaker.id,
                fullName: speaker.fullName,
                avatarUrl: speaker.avatarUrl || "",
                bio: speaker.bio,
                externalLinks: speaker.externalLinks || [],
                sessions: speaker.sessions || [],
              }}
              eventId={eventId}
            />
          ))}
        </div>

        {speakers.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p>No speakers available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
