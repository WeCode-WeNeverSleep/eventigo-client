import { Session } from "./sessions";

export interface Speaker {
  id: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  externalLinks: string[];
  sessions: Session[];
}
