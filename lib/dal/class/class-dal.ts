import { createClient } from "@/lib/supabase/supabase-server";
import { getAuthenticatedUser } from "../user/user-dal";

export default async function getClasses() {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("class")
    .select("class_name")
    .eq("teacher_id", user.id);

  if (error) {
    console.error("Supabase error:", error);
  }

  return data;
}
