"use client";
import Label from "@/components/ui/Label";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { supabaseBrowserClient as supabase } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const initSignInDetails = {
  email: { value: "", error: "" },
  password: { value: "", error: "" },
};

export default function SignInForm() {
  const [signInDetails, setSignInDetails] = useState(initSignInDetails);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInDetails.email.value.toLowerCase(),
      password: signInDetails.password.value,
    });
    if (error) {
      toast.error("Failed to sign in", { description: error.message });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <header>
        <h1 className="text-2xl font-bold tracking-wide text-neutral-200">
          Sign in
        </h1>
        <p className="text-neutral-400 text-lg">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-300 underline">
            Sign Up
          </Link>
        </p>
      </header>
      <div className="flex flex-col gap-2">
        <Label required id="sign-in-email" title="Email:" />
        <div className="w-full space-y-1.5">
          <input
            type="email"
            className={cn(
              "bg-zinc-850 text-neutral-300 px-4 py-2 w-full rounded-sm outline-offset-2 transition-all border border-zinc-600 outline-2",
              signInDetails.email.error
                ? "outline-red-400/60"
                : "outline-transparent focus:outline-zinc-400/60"
            )}
            id="sign-in-email"
            value={signInDetails.email.value}
            onChange={(e) =>
              setSignInDetails((prev) => ({
                ...prev,
                email: { value: e.target.value, error: "" },
              }))
            }
            placeholder="Enter email"
          />
          {signInDetails.email.error && (
            <p className="text-red-400 text-sm">{signInDetails.email.error}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label required id="sign-in-password" title="Password:" />
        <div className="w-full space-y-1.5">
          <input
            type="password"
            className={cn(
              "bg-zinc-850 text-neutral-300 px-4 py-2 w-full rounded-sm outline-offset-2 transition-all border border-zinc-600 outline-2",
              signInDetails.password.error
                ? "outline-red-400/60"
                : "outline-transparent focus:outline-zinc-400/60"
            )}
            id="sign-in-password"
            value={signInDetails.password.value}
            onChange={(e) =>
              setSignInDetails((prev) => ({
                ...prev,
                password: { value: e.target.value, error: "" },
              }))
            }
            placeholder="Enter password"
          />
          {signInDetails.password.error && (
            <p className="text-red-400 text-sm">
              {signInDetails.password.error}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <aside className="space-x-4 flex">
          <button
            className="py-2 px-3 rounded-md bg-zinc-850 outline outline-zinc-700 cursor-pointer hover:brightness-110 transition-all"
            type="button"
            onClick={() => setSignInDetails(initSignInDetails)}
          >
            Reset
          </button>
          <RainbowButton
            variant="default"
            className="disabled:animate-none disabled:pointer-events-none text-base py-4.5 px-3 hover:brightness-90 font-normal flex items-center gap-3"
          >
            <span>Sign in</span>
            {/* <div role="status">
          <svg
            aria-hidden="true"
            className="size-4 text-neutral-tertiary animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#000"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#FFF"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> */}
          </RainbowButton>
        </aside>
      </div>
    </form>
  );
}
