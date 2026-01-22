// Data access layer to fetch data to the server/client?

import { createClient } from '@/lib/supabase-server';
import { AuthClaimsDTO } from './user-dto';

export async function getAuthClaims(): Promise<AuthClaimsDTO> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error('An error accured, no valid token');
  }

  return data.claims as AuthClaimsDTO;
}
