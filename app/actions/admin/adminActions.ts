"use server";

import { getAuthenticatedUser } from "@/lib/dal/user/user-dal";
import { createClient } from "@/lib/supabase/supabase-server";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
};

export const updateUser = async (prevState: FormState, formData: FormData) => {
  const user = await getAuthenticatedUser();

  if (!user) throw new Error("Not authorized");

  const id = formData.get("id");
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const bio = formData.get("bio");
  const role = formData.get("role");

  if (!fullName || !email || !phone || !bio || !role) {
    return { message: "All fields must be filled" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, email, phone, bio, role })
    .eq("id", id);

  if (error) return { message: error.message };

  revalidatePath("/admin/findstudents");

  return { message: "Updated user" };
};
