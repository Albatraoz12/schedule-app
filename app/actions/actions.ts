"use server";

import { getAuthClaims } from "@/lib/dal/user-dal";
import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LoginState = {
  error: string;
  success: boolean;
};
type lessionSate = {
  error?: string;
  message?: string;
  success: boolean;
};

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Email eller lösenord saknas", success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

export async function createLession(
  prevState: lessionSate,
  formData: FormData,
): Promise<lessionSate> {
  const user = await getAuthClaims();

  if (!user) return { error: "Not authorized", success: false };

  const date = formData.get("date");
  const lession_start = formData.get("lessionStart");
  const lession_end = formData.get("lessionEnd");
  const name = formData.get("lessionName");

  if (!date || !lession_start || !lession_end || !name)
    return {
      error: "All fields must be filled ",
      success: false,
    };

  const supabase = await createClient();
  const { error } = await supabase
    .from("create_lession")
    .insert({
      date,
      lession_start,
      lession_end,
      name,
      user_id: user.sub,
      class_id: "5ae915cf-2a5b-40cb-a702-e9d097b2ab56",
      room_id: "11b2cd02-06b4-4981-bf75-3a5f5f7d7f95",
    })
    .single();

  if (error)
    return {
      error: "You dont have promision to do this action",
      success: false,
    };

  revalidatePath("/dashboard");
  return {
    message: "Succsefully created a lession",
    success: true,
  };
}
