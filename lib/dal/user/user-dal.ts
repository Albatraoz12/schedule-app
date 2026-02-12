// Data access layer to fetch data to the server/client?

import { createClient } from "@/lib/supabase/supabase-server";
import { AuthClaimsDTO, UserDTO } from "./user-dto";
import { cache } from "react";

export const getAuthClaims = cache(async (): Promise<AuthClaimsDTO> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error("An error accured, no valid token");
  }

  return data?.claims as AuthClaimsDTO;
});

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
