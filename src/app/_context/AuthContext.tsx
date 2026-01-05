"use client";

import { supabaseBrowserClient as supabase } from "@/lib/supabase/browser";
import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";

const SessionContext = createContext<Session | null | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const pathName = usePathname();

  useEffect(() => {
    let mounted = true;

    // 1. Get initial session
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
      }
    });

    // 2. Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (
      session === null &&
      !pathName.startsWith("/sign-in") &&
      !pathName.startsWith("/sign-up")
    ) {
      redirect("/sign-in");
    }
  }, [session, pathName]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
