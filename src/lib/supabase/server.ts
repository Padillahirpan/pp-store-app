import { ENVIRONMENTS } from "@/src/configs/environments";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type CreateClientOptions = {
  isAdmin?: boolean;
};

export async function createClient({
  isAdmin = false,
}: CreateClientOptions = {}) {
  const cookieStore = await cookies();

  const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } =
    ENVIRONMENTS;

  return createServerClient(
    SUPABASE_URL!,
    isAdmin ? SUPABASE_SERVICE_ROLE_KEY! : SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.log(
              "Failed to set cookies in server-side Supabase client:",
              error
            );
          }
        },
      },
    }
  );
}
