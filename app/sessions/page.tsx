import { SessionCard } from "@/components/sessions/sessionCard";
import { Session } from "@/types/sessions";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sessions: Session[] = [
  {
    id: "1",
    title: "Next.js 15: The Future of Web",
    description:
      "Deep dive into the new React Compiler and Server Actions in the latest Next.js release.",
    starTime: new Date("2026-05-15T09:00:00"),
    endTime: new Date("2026-05-15T18:30:00"),
    capacity: 150,
    isLive: true, // Let's test the live badge!
    room: { id: "r1", name: "Grand Hall" },
    speakers: [
      {
        id: "s1",
        fullName: "Alex Rivera",
        profilePictureUrl: "https://i.pravatar.cc/150?u=alex",
        bio: "Next.js Core Contributor",
        externalLinks: [],
      },
    ],
  },
  {
    id: "2",
    title: "PostgreSQL at Scale",
    description:
      "Learn how to optimize your queries and handle millions of rows without breaking a sweat.",
    starTime: new Date("2026-05-15T21:00:00"),
    endTime: new Date("2026-05-15T22:00:00"),
    capacity: null, // Test the null capacity
    isLive: false,
    room: { id: "r2", name: "Lab 404" },
    speakers: [
      {
        id: "s2",
        fullName: "Sarah Chen",
        profilePictureUrl: "https://i.pravatar.cc/150?u=sarah",
        bio: "Database Architect",
        externalLinks: [],
      },
      {
        id: "s3",
        fullName: "Marc Fontana",
        profilePictureUrl: "https://i.pravatar.cc/150?u=marc",
        bio: "Backend Lead",
        externalLinks: [],
      },
    ],
  },
];

export default function SessionsPage() {
  const now = new Date();

  const upcomingAndLive = sessions.filter((s) => s.endTime > now);
  const liveSessions = upcomingAndLive.filter((s) => s.isLive);
  const upcomingSessions = upcomingAndLive.filter((s) => !s.isLive);

  return (
    <div className="flex flex-col gap-12">
      {liveSessions.length > 0 && (
        <section>
          <div className="flex flex-col justify-center gap-2 mb-6">
            <p className="flex items-center uppercase text-xs text-text-muted tracking-widest gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-primary" />
              happening now
            </p>
            <h2 className="text-3xl font-bold font-title tracking-widest">
              Live Sessions
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4">
            {liveSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {upcomingSessions.length > 0 && (
        <section>
          <div className="flex flex-col justify-center gap-2 mb-6">
            <p className="flex items-center uppercase text-xs text-text-muted tracking-widest gap-2">
              <FontAwesomeIcon icon={faCalendar} className="text-primary" /> on
              the schedule
            </p>
            <h2 className="text-3xl font-bold tracking-widest font-title">
              Coming Up Next
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {upcomingAndLive.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p>All sessions for today have concluded.</p>
        </div>
      )}
    </div>
  );
}
