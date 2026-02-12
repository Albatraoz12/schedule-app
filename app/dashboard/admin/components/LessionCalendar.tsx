"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { useEffect, useRef, useState } from "react";
import LessionDetails from "./LessionDetails";
import { LessionCalType, LessionCalendarProps } from "@/types/databse";
import UpdateLession from "./UpdateLession";

export default function LessionCalendar({
  lessions,
  rooms,
  userId,
}: LessionCalendarProps) {
  const [selectedLession, setSelectedLession] = useState<LessionCalType | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
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

  const handleEventClick = (info: any) => {
    setSelectedLession(info.event.extendedProps.lession);
    setShowDetails(true);
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-4"
        style={{ height: "800px" }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
          locale={svLocale}
          headerToolbar={
            isMobile
              ? {
                  right: "prev,next",
                  center: "title",
                  left: "",
                }
              : {
                  right: "today prev,next",
                  center: "title",
                  left: "dayGridMonth,timeGridWeek,timeGridDay",
                }
          }
          slotMinTime="07:00:00"
          slotMaxTime="18:00:00"
          slotDuration="00:30:00"
          allDaySlot={false}
          weekends={false}
          events={events}
          eventClick={handleEventClick}
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
                  className={`font-semibold ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
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

      {showDetails &&
        selectedLession &&
        (userId === selectedLession.user_id ? (
          <UpdateLession
            lession={selectedLession}
            rooms={rooms}
            onClose={() => setShowDetails(false)}
          />
        ) : (
          <LessionDetails
            lession={selectedLession}
            rooms={rooms}
            onClose={() => setShowDetails(false)}
          />
        ))}
    </>
  );
}
