export interface Room {
  id: string;
  name: string;
}

export interface Lession {
  id: string;
  date: string;
  lession_start: string;
  lession_end: string;
  name: string;
  room_id: string;
  rooms?: Room;
}

export interface LessionCalType {
  id: string;
  date: string;
  lession_start: string;
  lession_end: string;
  name: string;
  class_id: string;
  room_id: string;
  rooms?: Room;
}

export interface LessionCalendarProps {
  lessions: Lession[];
  rooms: Room[];
}

export interface LessionDetailsProps {
  lession: Lession;
  rooms: Room[];
  onClose: () => void;
}
