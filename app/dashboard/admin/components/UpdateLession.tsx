"use client";
import { updateLession } from "@/app/actions/actions";
import { deleteLession } from "@/lib/dal/lessions/lessions-dal";
import { LessionDetailsProps } from "@/types/databse";
import React, { useActionState, useEffect } from "react";

const UpdateLession = ({ lession, rooms, onClose }: LessionDetailsProps) => {
  const [state, action, isLoading] = useActionState(updateLession, {
    message: "",
    success: false,
  });

  const handleDelete = async () => {
    const res = await deleteLession(lession.id);

    if (res?.success) {
      onClose();
    }
  };

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <section
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        action={action}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{lession.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 text-2xl cursor-pointer hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <input type="hidden" name="id" value={lession.id} />
            <label htmlFor="date" className="block text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={lession.date}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lessionStart" className="block text-sm font-medium">
              Starts
            </label>
            <input
              type="time"
              defaultValue={lession.lession_start}
              name="lessionStart"
              id="lessionStart"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lessionEnd" className="block text-sm font-medium">
              Ends
            </label>
            <input
              type="time"
              name="lessionEnd"
              id="lessionEnd"
              defaultValue={lession.lession_end}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lessionName" className="block text-sm font-medium">
              Lession
            </label>
            <input
              type="text"
              placeholder="Historia"
              defaultValue={lession.name}
              name="lessionName"
              id="lessionName"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="room" className="block text-sm font-medium">
              Room
            </label>
            <select
              name="room"
              id="room"
              defaultValue={lession.room_id}
              className="w-full border rounded px-3 py-2"
            >
              {rooms.map((room: any) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state.message && !state.success && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {state.message}
          </div>
        )}

        {state.success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
            Lektionen uppdaterades!
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => handleDelete()}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Delete
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateLession;
