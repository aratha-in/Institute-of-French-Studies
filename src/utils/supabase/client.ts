import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    // Return a dummy proxy to prevent Next.js from crashing during build-time page prerendering
    return new Proxy({} as any, {
      get(target, prop) {
        if (prop === "from") {
          return () => ({
            insert: () => Promise.resolve({ data: null, error: new Error("Supabase is not configured on this environment.") }),
            select: () => Promise.resolve({ data: [], error: new Error("Supabase is not configured on this environment.") })
          });
        }
        return () => {
          throw new Error("Supabase client is not configured. Missing environment variables.");
        };
      }
    });
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
