import { Session } from "./sessions";

export interface Speaker {
  id: string;
  fullName: string;
  profilePictureUrl: string;
  bio: string;
  externalLinks: string[];
  session?: Session;
}
