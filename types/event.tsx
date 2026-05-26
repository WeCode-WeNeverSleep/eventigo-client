import type { Session } from "./sessions";

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  location: string;
  organizerId: string;
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EventCardProps {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  time: string;
  location: string;
  cta: string;
}