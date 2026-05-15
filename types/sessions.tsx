import { Room } from "./room";
import { Speaker } from "./speakers";

export interface Session {
  id: string;
  title: string;
  description: string;
  starTime: Date;
  endTime: Date;
  capacity: number | null;
  room: Room;
  isLive: boolean;
  speakers: Speaker[];
}
