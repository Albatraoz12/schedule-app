"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { useState, useEffect, useRef } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(mobile ? "timeGridDay" : "timeGridWeek");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const events = lessions.map((lession) => {
    const room = lession.rooms || rooms.find((r) => r.id === lession.room_id);

    return {
      id: lession.id,
      title: lession.name,
      start: `${lession.date}T${lession.lession_start}`,
      end: `${lession.date}T${lession.lession_end}`,
      backgroundColor: "#3788d8",
      borderColor: "#3788d8",
      extendedProps: {
        lession: lession,
        roomName: room?.name || "Okänt rum",
      },
    };
  });

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-2 md:p-4"
        style={{
          height: isMobile ? "600px" : "800px",
          fontSize: "12px",
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
          locale={svLocale}
          headerToolbar={
            isMobile
              ? {
                  left: "prev,next",
                  center: "title",
                  right: "",
                }
              : {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }
          }
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
                <div
                  className={`font-semibold ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  {arg.event.title}
                </div>
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
