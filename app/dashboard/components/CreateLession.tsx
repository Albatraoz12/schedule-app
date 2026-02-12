"use client";

import { createLession } from "@/app/actions/actions";
import { useActionState } from "react";

const CreateLession = ({ rooms, classes }: any) => {
  const [state, action, isLoading] = useActionState(createLession, {
    message: "",
    success: false,
  });

  return (
    <section>
      <h1>Create Lession</h1>
      <form action={action}>
        <input type="date" name="date" id="date" />
        <input
          type="time"
          placeholder="hello"
          name="lessionStart"
          id="lessionStart"
        />
        <input
          type="time"
          placeholder="hello"
          name="lessionEnd"
          id="lessionEnd"
        />
        <input
          type="text"
          placeholder="Historia"
          name="lessionName"
          id="lessionName"
        />
        <select name="room" id="room">
          {rooms.map((room: any) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button disabled={isLoading}>
          {isLoading ? "creating..." : "create"}
        </button>
      </form>
      {state.error ? (
        <p className="text-red-600 text-sm">{state.error}</p>
      ) : (
        <p className="text-green-600 text-sm">{state.message}</p>
      )}
    </section>
  );
};

export default CreateLession;
