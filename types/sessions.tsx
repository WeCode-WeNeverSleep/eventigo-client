import { Room } from "./room";
import { Speaker } from "./speakers";

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  capacity: number | null;
  eventId: string;
  room: Room;
  isLive: boolean;
  speakers: Speaker[];
}
