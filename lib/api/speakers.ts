import { Speaker } from "@/types/speakers";

export async function fetchSpeakersWithSessions(): Promise<Speaker[]> {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL is not defined");
  }

  const url = `${baseUrl}/speakers`;

  const res = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch speakers data: ${res.statusText}`);
  }

  return res.json();
}

export async function fetchSpeakerById(speakerId: string): Promise<Speaker> {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    throw new Error("API_URL is not defined");
  }

  const url = `${baseUrl}/speakers/${speakerId}`;

  const res = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch speaker data: ${res.statusText}`);
  }
  const data = await res.json();

  const normalizedSpeaker: Speaker = {
    ...data,
    avatarUrl: data.avatarUrl ?? data.profilePictureUrl ?? null,
    sessions: data.sessions || [],
  };

  return normalizedSpeaker;
}
