"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { getAuthenticatedUser } from "../user/user-dal";

// Fetches all the users, only admins can do this
export const getAllStudents = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const { data } = await supabase.from("profiles").select("*");

  return data;
};
