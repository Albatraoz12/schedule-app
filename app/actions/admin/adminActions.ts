"use server";

import { getAuthenticatedUser } from "@/lib/dal/user/user-dal";
import { createClient } from "@/lib/supabase/supabase-server";
import {
  createUserSchema,
  CreateUserSchema,
  updateUserSchema,
} from "@/lib/schemas/user-schema";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/supabase.admin";

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
    class: formData.get("class"),
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

export async function createUser(data: CreateUserSchema) {
  const isUser = await getAuthenticatedUser();
  if (!isUser) return { message: "Not authorized", success: false };

  const parsed = createUserSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { email, password, full_name, role, class: classId } = parsed.data;

  // Create user
  const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name },
    app_metadata: { user_roles: role },
  });

  if (error) return { success: false, error: error.message };

  // create class connection user to class
  if (classId && user?.user) {
    const { error: classError } = await supabaseAdmin
      .from("class_students")
      .insert({ student_id: user.user.id, class_id: classId });

    if (classError) {
      return { success: false, error: classError.message };
    }
  }

  revalidatePath("/dashboard/admin/findstudents");
  return { success: true, user };
}

export async function deleteUser(userId: string) {
  const isUser = await getAuthenticatedUser();
  if (!isUser || isUser.role !== "admin") {
    return { success: false, message: "Not authorized" };
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/findstudents");
  return { success: true, message: "Användaren raderades" };
}
