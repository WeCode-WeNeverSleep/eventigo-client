import type { Event } from "@/types/event";
import type { Session } from "@/types/sessions";

function mapSession(raw: any): Session {
  const startTime = new Date(raw.startTime);
  const endTime = new Date(raw.endTime);
  const now = new Date();
  return {
    ...raw,
    startTime,
    endTime,
    isLive: now >= startTime && now <= endTime,
  };
}

function mapEvent(raw: any): Event {
  return {
    ...raw,
    startDate: new Date(raw.startDate),
    endDate: new Date(raw.endDate),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    sessions: (raw.sessions ?? []).map(mapSession),
  };
}

export async function getEvents(): Promise<Event[]> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not defined");

  const res = await fetch(`${baseUrl}/events`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.statusText}`);

  const rawData = await res.json();
  return rawData.map(mapEvent);
}

export async function getEventById(eventId: string): Promise<Event> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API_URL is not defined");

  const res = await fetch(`${baseUrl}/events/${eventId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch event: ${res.statusText}`);

  const rawData = await res.json();
  return mapEvent(rawData);
}

export function getLiveSession(event: Event): Session | null {
  return (
    event.sessions
      .filter((s) => s.isLive)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0] ?? null
  );
}
