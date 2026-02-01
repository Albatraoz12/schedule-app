"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { useState } from "react";

interface Room {
  id: string;
  name: string;
}

interface Lession {
  id: string;
  date: string;
  lession_start: string;
  lession_end: string;
  name: string;
  class_id: string;
  room_id: string;
  rooms?: Room;
}

interface LessionCalendarProps {
  lessions: Lession[];
  rooms: Room[];
}

export default function LessionCalendar({
  lessions,
  rooms,
}: LessionCalendarProps) {
  // Formatera lektioner för FullCalendar
  const events = lessions.map((lession) => {
    const room = lession.rooms || rooms.find((r) => r.id === lession.room_id);

    return {
      id: lession.id,
      title: lession.name,
      start: `${lession.date}T${lession.lession_start}`,
      end: `${lession.date}T${lession.lession_end}`,
      backgroundColor: "#3788d8", // ✅ Direkt blå färg
      borderColor: "#3788d8", // ✅ Direkt blå färg
      extendedProps: {
        lession: lession,
        roomName: room?.name || "Okänt rum",
      },
    };
  });

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-4"
        style={{ height: "800px" }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={svLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          slotMinTime="07:00:00"
          slotMaxTime="18:00:00"
          slotDuration="00:30:00"
          allDaySlot={false}
          weekends={false}
          events={events}
          height="100%"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          nowIndicator={true}
          eventContent={(arg) => {
            return (
              <div className="p-1">
                <div className="font-semibold text-sm">{arg.event.title}</div>
                <div className="text-xs">
                  {arg.event.extendedProps.roomName}
                </div>
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
