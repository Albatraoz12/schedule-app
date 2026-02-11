'use server';

import { getAuthClaims, getAuthenticatedUser } from '@/lib/dal/user-dal';
import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type LoginState = {
  error?: string;
  success?: boolean;
};
type lessionSate = {
  error?: string;
  message?: string;
  success: boolean;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Email or password is missing', success: false };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, success: false };
  }
  revalidatePath('/', 'layout');
  redirect(`/dashboard/${data.user.app_metadata.user_role}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function createLession(
  prevState: lessionSate,
  formData: FormData
): Promise<lessionSate> {
  const user = await getAuthenticatedUser();

  if (!user) return { error: 'Not authorized', success: false };

  const date = formData.get('date') as string;
  const lession_start = formData.get('lessionStart') as string;
  const lession_end = formData.get('lessionEnd') as string;
  const name = formData.get('lessionName') as string;
  const room_id = formData.get('room') as string;

  if (!date || !lession_start || !lession_end || !name)
    return {
      error: 'All fields must be filled',
      success: false,
    };

  const supabase = await createClient();

  const { data: conflictingLessons, error: checkError } = await supabase
    .from('create_lession')
    .select('id')
    .eq('room_id', room_id)
    .eq('date', date)
    .or(`and(lession_start.lt.${lession_end},lession_end.gt.${lession_start})`);

  if (checkError) {
    return {
      error: 'Failed to check room availability',
      success: false,
    };
  }

  if (conflictingLessons && conflictingLessons.length > 0) {
    return {
      error: 'This room is already booked during this time',
      success: false,
    };
  }

  const { error } = await supabase
    .from('create_lession')
    .insert({
      date,
      lession_start,
      lession_end,
      name,
      user_id: user.id,
      class_id: '5ae915cf-2a5b-40cb-a702-e9d097b2ab56',
      room_id: room_id,
    })
    .single();

  if (error)
    return {
      error: "You don't have permission to do this action",
      success: false,
    };

  revalidatePath(`/dashboard/${user.role}`);
  return {
    message: 'Successfully created a lesson',
    success: true,
  };
}

export async function updateLession(
  prevState: lessionSate,
  formData: FormData
): Promise<lessionSate> {
  const user = await getAuthenticatedUser();

  if (!user) return { error: 'Not authorized', success: false };

  const id = formData.get('id') as string;
  const date = formData.get('date') as string;
  const lession_start = formData.get('lessionStart') as string;
  const lession_end = formData.get('lessionEnd') as string;
  const name = formData.get('lessionName') as string;
  const room_id = formData.get('room') as string;

  if (!date || !lession_start || !lession_end || !name)
    return {
      error: 'All fields must be filled',
      success: false,
    };

  const supabase = await createClient();

  const { data: conflictingLessons, error: checkError } = await supabase
    .from('create_lession')
    .select('id')
    .eq('room_id', room_id)
    .eq('date', date)
    .neq('id', id)
    .or(`and(lession_start.lt.${lession_end},lession_end.gt.${lession_start})`);

  if (checkError) {
    return {
      error: 'Failed to check room availability',
      success: false,
    };
  }

  if (conflictingLessons && conflictingLessons.length > 0) {
    return {
      error: 'This room is already booked during this time',
      success: false,
    };
  }

  const { error } = await supabase
    .from('create_lession')
    .update({
      date,
      lession_start,
      lession_end,
      name,
      class_id: '5ae915cf-2a5b-40cb-a702-e9d097b2ab56',
      room_id: room_id,
    })
    .eq('id', id)
    .select();

  if (error)
    return {
      error: "You don't have permission to do this action",
      success: false,
    };

  revalidatePath(`/dashboard/${user.role}`);
  return {
    message: 'Successfully created a lesson',
    success: true,
  };
}
