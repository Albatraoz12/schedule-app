"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Student } from "../../admin/findstudents/page";
import { RotateCw, Trash2 } from "lucide-react";
import UpdateUser from "./UpdateUser";

const UserLists = ({ students }: { students: Student[] }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleOpen = (student: Student) => setSelectedStudent(student);
  const handleClose = () => setSelectedStudent(null);

  return (
    <>
      <div className="flex flex-col gap-3 w-full h-full">
        {students.map((student: Student) => (
          <div
            key={student.id}
            className="border rounded-lg p-4 shadow-sm w-full flex items-center justify-between"
          >
            <h2>{student.full_name}</h2>
            <div className="flex gap-1 items-center justify-center">
              <RotateCw
                className="text-yellow-400 cursor-pointer hover:text-yellow-600 transition-colors"
                size={25}
                onClick={() => handleOpen(student)}
              />
              <Trash2 className="text-red-600 cursor-pointer" size={25} />
            </div>
          </div>
        ))}
      </div>

      {selectedStudent &&
        createPortal(
          <section
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm w-full h-full"
            onClick={handleClose}
          >
            <div
              className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>

              <UpdateUser student={selectedStudent} />
            </div>
          </section>,
          document.body
        )}
    </>
  );
};

export default UserLists;
