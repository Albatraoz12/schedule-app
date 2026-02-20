"use client";
import { updateLession, deleteLession } from "@/app/actions/actions";
import { LessionDetailsProps } from "@/types/databse";
import React, { useActionState, useEffect } from "react";

type Room = { id: string; name: string };

const UpdateLession = ({ lession, rooms, onClose }: LessionDetailsProps) => {
  const [state, action, isLoading] = useActionState(updateLession, {
    message: "",
    success: false,
  });

  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteLession,
    {
      message: "",
      success: false,
    },
  );

  useEffect(() => {
    if (state.success || deleteState.success) {
      onClose();
    }
  }, [state.success, deleteState.success, onClose]);

  return (
    <section
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
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

        {/* Update form */}
        <form action={action} className="space-y-3">
          <input type="hidden" name="id" value={lession.id} />

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Date
            </label>
            <input
              key={`date-${lession.date}`}
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
              key={`start-${lession.lession_start}`}
              type="time"
              name="lessionStart"
              id="lessionStart"
              defaultValue={lession.lession_start}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lessionEnd" className="block text-sm font-medium">
              Ends
            </label>
            <input
              key={`end-${lession.lession_end}`}
              type="time"
              name="lessionEnd"
              id="lessionEnd"
              defaultValue={lession.lession_end}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="lessionName" className="block text-sm font-medium">
              Lesson
            </label>
            <input
              key={`name-${lession.name}`}
              type="text"
              placeholder="Historia"
              name="lessionName"
              id="lessionName"
              defaultValue={lession.name}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="room" className="block text-sm font-medium">
              Room
            </label>
            <select
              key={`room-${lession.room_id}`}
              name="room"
              id="room"
              defaultValue={lession.room_id}
              className="w-full border rounded px-3 py-2"
            >
              {rooms.map((room: Room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {state.message && !state.success && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>

        {/* Delete form */}
        <form action={deleteAction} className="mt-3">
          <input type="hidden" name="id" value={lession.id} />

          {deleteState.message && !deleteState.success && (
            <div className="mb-3 p-3 bg-red-100 text-red-700 rounded">
              {deleteState.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isDeleting}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateLession;
