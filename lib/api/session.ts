import { Session } from "@/types/sessions";

export async function getSessionsByEvent(eventId: string): Promise<Session[]> {
  const baseUrl = process.env.API_URL;
  const url = `${baseUrl}/events/${eventId}/sessions`;

  console.log("Fetchin from: ", url);
  if (!baseUrl) {
    throw new Error("API_URL is not defined");
  }

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sessions: ${res.statusText}`);
  }

  const rawData = await res.json();

  return rawData.map((session: any) => {
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    const now = new Date();

    return {
      ...session,
      startTime,
      endTime,
      isLive: now >= startTime && now <= endTime,
    };
  });
}

export async function getSessionById(eventId: string, sessionId: string) {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL is not defined");
  }

  const url = `${baseUrl}/events/${eventId}/sessions/${sessionId}`;

  const res = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch session: ${res.status} ${res.statusText}`);
  }

  const session = await res.json();

  return {
    ...session,
    startTime: new Date(session.startTime),
    endTime: new Date(session.endTime),
    isLive:
      new Date() >= new Date(session.startTime) &&
      new Date() <= new Date(session.endTime),
  };
}