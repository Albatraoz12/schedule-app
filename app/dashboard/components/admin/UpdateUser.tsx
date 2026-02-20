"use client";

import { useActionState } from "react";
import { Student } from "../../admin/findstudents/page";
import { updateUser } from "@/app/actions/admin/adminActions";
import { formatDate } from "@/lib/helper";

const UpdateUser = ({ student }: { student: Student }) => {
  const [state, action, isLoading] = useActionState(updateUser, {
    message: "",
  });

  return (
    <div key={student.id} className="rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{student.full_name}</h2>
      <form action={action} className="space-y-3">
        <h1>{student.id}</h1>
        <div className="flex flex-col gap-1">
          <input type="hidden" name="id" value={student.id} />
          <label
            htmlFor={`fullName-${student.id}`}
            className="text-sm font-medium"
          >
            Full name
          </label>
          <input
            type="text"
            id={`fullName-${student.id}`}
            name="fullName"
            defaultValue={student.full_name}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`email-${student.id}`}
            className="text-sm font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id={`email-${student.id}`}
            name="email"
            defaultValue={student.email}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`phone-${student.id}`}
            className="text-sm font-medium"
          >
            Telefon
          </label>
          <input
            type="tel"
            id={`phone-${student.id}`}
            name="phone"
            defaultValue={student.phone}
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`bio-${student.id}`} className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id={`bio-${student.id}`}
            name="bio"
            defaultValue={student.bio}
            rows={3}
            className="border rounded px-3 py-2 text-sm resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`role-${student.id}`} className="text-sm font-medium">
            Role
          </label>
          <select
            id={`role-${student.id}`}
            name="role"
            defaultValue={student.role}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="text-xs text-gray-400 mt-2">
          <p>Created: {formatDate(student.created_at)}</p>
          <p>Updated: {formatDate(student.updated_at)}</p>
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
      {state.message && (
        <p className="text-green-600 text-sm">User updated successfully</p>
      )}
    </div>
  );
};

export default UpdateUser;
