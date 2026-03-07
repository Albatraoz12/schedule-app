// Data access layer to fetch data to the server/client?

import { createClient } from "@/lib/supabase/supabase-server";
import { UserDTO } from "./user-dto";
import { cache } from "react";

export const getAuthenticatedUser = cache(async (): Promise<UserDTO> => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return {
    id: user.id,
    email: user.email ?? "",
    createdAt: user.created_at,
    role: user.app_metadata.user_role,
  };
});
