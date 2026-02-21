"use server";
import { createClient } from "@/lib/supabase/supabase-server";
import { cache } from "react";
import { getAuthenticatedUser } from "../user/user-dal";
import { Room } from "@/types/databse";

//Get all the lessions for the user
export const getLessions = cache(async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  //RLS will decode JWT and return the correct data for the user
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
  console.log(data);
  return data ?? [];
});

//Get all the avalible rooms
export const getRooms = async (): Promise<Room[]> => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from("rooms").select(`*`);

  if (!data || error) return [];

  return data;
};
