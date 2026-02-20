"use server";

import { getAuthenticatedUser } from "@/lib/dal/user/user-dal";
import { createClient } from "@/lib/supabase/supabase-server";
import { updateUserSchema } from "@/lib/schemas/user-schema";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
  success: boolean;
  user?: any;
};

export const updateUser = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const user = await getAuthenticatedUser();
  if (!user) return { message: "Not authorized", success: false };

  const result = updateUserSchema.safeParse({
    id: formData.get("id"),
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    role: formData.get("role"),
  });

  if (!result.success) {
    return { message: result.error.issues[0].message, success: false };
  }

  const { id, full_name, email, phone, bio, role } = result.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name, email, phone, bio, role })
    .eq("id", id)
    .select()
    .single();

  if (error) return { message: error.message, success: false };

  revalidatePath("/admin/findstudents");

  return { message: "User Updated!", success: true, user: data };
};
