export type SessionPageProps = {
  params: Promise<{
    eventId: string;
    sessionId: string;
  }>;
};