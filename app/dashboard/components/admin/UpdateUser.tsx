"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useEffect } from "react";
import { updateUserSchema, UpdateUserInput } from "@/lib/schemas/user-schema";
import { updateUser } from "@/app/actions/admin/adminActions";
import { Student } from "../../admin/findstudents/page";
import { formatDate } from "@/lib/helper";

const UpdateUser = ({ student }: { student: Student }) => {
  const [state, formAction, isLoading] = useActionState(updateUser, {
    message: "",
    success: false,
  });

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: student.id,
      full_name: student.full_name,
      email: student.email,
      phone: student.phone,
      bio: student.bio,
      role: student.role as "student" | "admin" | "teacher",
    },
  });

  // Reset from after submitting
  useEffect(() => {
    if (state.success && state.user) {
      reset({
        id: state.user.id,
        full_name: state.user.full_name,
        email: state.user.email,
        phone: state.user.phone,
        bio: state.user.bio,
        role: state.user.role,
      });
    }
  }, [state.success, state.user, reset]);

  return (
    <div className="rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {state.user?.full_name ?? student.full_name}
      </h2>

      <form action={formAction} className="space-y-3">
        <input type="hidden" {...register("id")} />

        <div className="flex flex-col gap-1">
          <label htmlFor="full_name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="full_name"
            type="text"
            {...register("full_name")}
            className="border rounded px-3 py-2 text-sm"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs">{errors.full_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border rounded px-3 py-2 text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="border rounded px-3 py-2 text-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            {...register("bio")}
            className="border rounded px-3 py-2 text-sm resize-none"
          />
          {errors.bio && (
            <p className="text-red-500 text-xs">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            {...register("role")}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs">{errors.role.message}</p>
          )}
        </div>

        <div className="text-xs text-gray-400 mt-2">
          <p>Created: {formatDate(student.created_at)}</p>
          <p>Updated: {formatDate(student.updated_at)}</p>
        </div>

        {state.message && (
          <p
            className={`text-sm ${state.success ? "text-green-600" : "text-red-500"}`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
