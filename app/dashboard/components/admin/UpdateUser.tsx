"use client";

import { useActionState } from "react";
import { Student } from "../../admin/findstudents/page";
import { updateUser } from "@/app/actions/admin/adminActions";
import { formatDate } from "@/lib/helper";

const UpdateUser = ({ student }: { student: Student }) => {
  const [state, action, isLoading] = useActionState(updateUser, {
    message: "",
  });

  const currentStudent = state.user ?? student;

  return (
    <div className="rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{currentStudent.full_name}</h2>
      <form action={action} className="space-y-3">
        <input type="hidden" name="id" value={currentStudent.id} />

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`fullName-${currentStudent.id}`}
            className="text-sm font-medium"
          >
            Full name
          </label>
          <input
            key={`fullName-${currentStudent.full_name}`}
            type="text"
            id={`fullName-${currentStudent.id}`}
            name="fullName"
            defaultValue={currentStudent.full_name}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`email-${currentStudent.id}`}
            className="text-sm font-medium"
          >
            Email
          </label>
          <input
            key={`email-${currentStudent.email}`}
            type="email"
            id={`email-${currentStudent.id}`}
            name="email"
            defaultValue={currentStudent.email}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`phone-${currentStudent.id}`}
            className="text-sm font-medium"
          >
            Telefon
          </label>
          <input
            key={`phone-${currentStudent.phone}`}
            type="tel"
            id={`phone-${currentStudent.id}`}
            name="phone"
            defaultValue={currentStudent.phone}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`bio-${currentStudent.id}`}
            className="text-sm font-medium"
          >
            Bio
          </label>
          <textarea
            key={`bio-${currentStudent.bio}`}
            id={`bio-${currentStudent.id}`}
            name="bio"
            defaultValue={currentStudent.bio}
            rows={3}
            className="border rounded px-3 py-2 text-sm resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`role-${currentStudent.id}`}
            className="text-sm font-medium"
          >
            Role
          </label>
          <select
            key={`role-${currentStudent.role}`}
            id={`role-${currentStudent.id}`}
            name="role"
            defaultValue={currentStudent.role}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="text-xs text-gray-400 mt-2">
          <p>Created: {formatDate(currentStudent.created_at)}</p>
          <p>Updated: {formatDate(currentStudent.updated_at)}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>

      {state.message && (
        <p className="text-green-600 text-sm mt-2">{state.message}</p>
      )}
    </div>
  );
};

export default UpdateUser;
