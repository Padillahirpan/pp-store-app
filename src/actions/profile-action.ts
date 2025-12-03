"use server";

import { createClient } from "../lib/supabase/server";

export async function getProfileById(id: string) {
  const supabase = await createClient({ isAdmin: true });
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}
