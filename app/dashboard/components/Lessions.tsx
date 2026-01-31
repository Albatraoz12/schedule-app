"use client";
import { deleteLession } from "@/lib/dal/lessions/lessions-dal";
import { useState } from "react";

const Lessions = ({ lessions }: any) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteLession(id);
    setDeletingId(null);
  };

  return (
    <>
      {lessions &&
        lessions.length > 0 &&
        lessions?.map((lession: any) => (
          <div key={lession.id} className="py-2 border">
            <p>{lession.name}</p>
            <p>{lession.date}</p>
            <p>{lession.lession_start}</p>
            <p>{lession.lession_end}</p>
            <p>{lession.class.class_name}</p>
            <p>{lession.room.name}</p>
            <div className="flex gap-3 items-center">
              <button
                className="bg-red-600 text-white p-1 px-3 cursor-pointer"
                onClick={() => handleDelete(lession.id)}
                disabled={deletingId === lession.id}
              >
                {deletingId === lession.id ? "Deleting..." : "Delete"}
              </button>
              <button className="bg-yellow-500 text-white p-1 px-3 cursor-pointer">
                Update
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Lessions;
