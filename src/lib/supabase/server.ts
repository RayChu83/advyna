import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const serverClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        }));
      },
      setAll(cookies) {
        try {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set({
              name,
              value,
              ...options,
            });
          });
        } catch {
          // This will throw in Server Components.
          // Safe to ignore if you refresh sessions in middleware.
        }
      },
    },
  });
};
