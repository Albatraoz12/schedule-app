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
      <h1 className="text-center text-3xl my-4 underline">Create Lession</h1>
      <form
        action={action}
        className="flex flex-col lg:flex-row justify-center items-center gap-5"
      >
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            className="border border-black/35 rounded p-1"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="lessionStart">Start</label>
          <input
            type="time"
            placeholder="hello"
            name="lessionStart"
            id="lessionStart"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="lessionEnd">End</label>
          <input
            type="time"
            placeholder="hello"
            name="lessionEnd"
            id="lessionEnd"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="lessionName">Lession name</label>
          <input
            type="text"
            placeholder="Historia"
            name="lessionName"
            id="lessionName"
            className="border border-black/35 rounded p-1"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="klass">Class</label>
          <select name="klass" id="klass">
            {classes.map((klass: any) => (
              <option key={klass.id} value={klass.id}>
                {klass.class_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="room">Room</label>
          <select name="room" id="room">
            {rooms.map((room: any) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            disabled={isLoading}
            className="bg-green-400 text-white px-4 py-2 hover:bg-green-600 cursor-pointer"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
      {state.error ? (
        <p className="text-red-600 text-sm text-center mt-4">{state.error}</p>
      ) : (
        <p className="text-green-600 text-sm text-center mt-4">
          {state.message}
        </p>
      )}
    </section>
  );
};

export default CreateLession;
