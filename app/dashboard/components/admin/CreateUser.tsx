// components/create-user-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUserSchema } from "@/lib/schemas/user-schema";
import { createUser } from "@/app/actions/admin/adminActions";

export function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(data: CreateUserSchema) {
    const result = await createUser(data);

    if (result.success) {
      reset();
      alert("Användaren skapades!");
    } else {
      console.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input {...register("email")} placeholder="E-postadress" type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input {...register("full_name")} placeholder="Fullständigt namn" />
        {errors.full_name && <p>{errors.full_name.message}</p>}
      </div>

      <div>
        <input
          {...register("password")}
          placeholder="Lösenord"
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <select {...register("role")}>
          <option value="">Välj roll</option>
          <option value="teacher">Lärare</option>
          <option value="student">Elev</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Skapar..." : "Skapa användare"}
      </button>
    </form>
  );
}
