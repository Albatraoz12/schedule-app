import { createClient } from "@/lib/supabase-server";
import { cache } from "react";

export const getLessions = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

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
