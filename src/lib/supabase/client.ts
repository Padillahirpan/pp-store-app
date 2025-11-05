import { ENVIRONMENTS } from "@/src/configs/environments";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = ENVIRONMENTS;

  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
