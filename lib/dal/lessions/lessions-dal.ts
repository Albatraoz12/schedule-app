"use server";
import { createClient } from "@/lib/supabase/supabase-server";
import { cache } from "react";
import { getAuthenticatedUser } from "../user/user-dal";
import { revalidatePath } from "next/cache";

export const getLessions = cache(async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("create_lession")
    .select(
      `
      *,
      class:class_id(id, class_name, teacher_id),
      room:room_id(id, name)
    `,
    )
    .order("date", { ascending: true })
    .order("lession_start", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  return data ?? [];
});

export const getRooms = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from("rooms").select(`*`);

  if (!data || error) return null;

  return data;
};
