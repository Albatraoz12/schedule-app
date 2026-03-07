import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(2, "Namnet måste vara minst 2 tecken"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().min(10, "Ogiltigt telefonnummer"),
  bio: z.string().max(500, "Bio får max vara 500 tecken"),
  role: z.enum(["student", "admin", "teacher"]),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const createUserSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(8, "Lösenord måste vara minst 8 tecken"),
  full_name: z.string().min(2, "Namn måste vara minst 2 tecken"),
  role: z.enum(["teacher", "student"], "Välj en roll"),
  class: z.string().min(1, "Välj en class"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
