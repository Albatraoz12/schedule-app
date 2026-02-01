"use client";

import { updateLession } from "@/app/actions/actions";
import { useActionState, useEffect } from "react";

const UpdateLession = ({ lession, onCancel, rooms }: any) => {
  const [state, action, isLoading] = useActionState(updateLession, {
    message: "",
    success: false,
  });
  console.log(state.success);

  useEffect(() => {
    if (state.success) {
      onCancel();
    }
  }, [state.success, onCancel]);

  return (
    <div>
      <h1>Updatelessions</h1>
      <form action={action}>
        <input type="hidden" name="id" value={lession.id} />
        <input type="date" name="date" id="date" defaultValue={lession.date} />
        <input
          type="time"
          defaultValue={lession.lession_start}
          name="lessionStart"
          id="lessionStart"
        />
        <input
          type="time"
          name="lessionEnd"
          id="lessionEnd"
          defaultValue={lession.lession_end}
        />
        <input
          type="text"
          placeholder="Historia"
          defaultValue={lession.name}
          name="lessionName"
          id="lessionName"
        />
        <select name="room" id="room" defaultValue={lession.room_id}>
          {rooms.map((room: any) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <button type="button" onClick={() => onCancel()}>
            Cancel
          </button>
          <button type="submit">{isLoading ? "updating..." : "update"}</button>
        </div>
      </form>
      <div>
        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      </div>
    </div>
  );
};

export default UpdateLession;
