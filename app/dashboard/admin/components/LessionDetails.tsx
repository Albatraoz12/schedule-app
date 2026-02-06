"use client";

import { LessionDetailsProps } from "@/types/databse";

export default function LessionDetails({
  lession,
  rooms,
  onClose,
}: LessionDetailsProps) {
  const room = lession.rooms || rooms.find((r) => r.id === lession.room_id);
  console.log(room);

  // Formatera datum till svenskt format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/90  flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{lession.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-2xl cursor-pointer hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 font-semibold">Date</p>
            <p className="text-gray-800 capitalize">
              {formatDate(lession.date)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Time</p>
            <p className="text-gray-800">
              {lession.lession_start} - {lession.lession_end}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-semibold">Room</p>
            <p className="text-gray-800">{room?.name || "Okänt rum"}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
