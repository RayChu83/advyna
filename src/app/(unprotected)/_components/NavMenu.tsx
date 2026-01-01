"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import NavLink from "../../../components/ui/NavLink";
import { AiOutlineMenu } from "react-icons/ai";
import { Tooltip, TooltipContent } from "../../../components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { GoArrowRight } from "react-icons/go";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function NavMenu() {
  const router = useRouter();
  // state used for determining whether the user scrolled (navbar white background)
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const hasScroll =
      document.documentElement.scrollHeight > window.innerHeight;
    // if scroll position is 0.02 of the screen and there is a scrollbar on page, set scrolled = true
    setScrolled(latest > 0.02 && hasScroll);
  });

  return (
    <motion.nav>
      <motion.header
        className={`py-4 px-6 flex items-center justify-between gap-8 fixed w-full top-0 z-50 transition-all duration-700 border-b border border-transparent ${
          scrolled || mobileNavOpen
            ? " bg-[#18181b]/75 inset-shadow-sm inset-shadow-black/10 backdrop-blur-lg border-zinc-800"
            : ""
        }`}
      >
        <aside className="flex items-center justify-center gap-8">
          <Link className="flex items-center gap-0.5" href="/">
            <Image
              src="/logos/svg/advyna_colored_clear.svg"
              width={36}
              height={36}
              alt="Advyna Logo"
            />
            <h1 className="font-semibold text-xl text-white">Advyna</h1>
          </Link>
          <NavLink pathname={pathname} href="/" className="md:block! hidden!">
            Home
          </NavLink>
          <NavLink
            pathname={pathname}
            href="/how-it-works"
            className="md:block! hidden!"
          >
            How it works
          </NavLink>
          <NavLink
            pathname={pathname}
            href="/testimonials"
            className="md:block! hidden!"
          >
            Testimonials
          </NavLink>
        </aside>
        <aside className="flex items-center justify-center gap-8">
          <NavLink
            pathname={pathname}
            href="/faq"
            className="md:block! hidden!"
          >
            FAQ
          </NavLink>
          <NavLink
            pathname={pathname}
            href="/contact"
            className="md:block! hidden!"
          >
            Contact
          </NavLink>
          <div className="flex items-center gap-4">
            <RainbowButton
              className={cn(
                "rounded-full hover:brightness-90 text-sm px-3",
                mobileNavOpen ? "md:opacity-100 opacity-0" : null
              )}
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              Get started
            </RainbowButton>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="md:hidden block text-lg text-zinc-400 hover:text-zinc-300 active:text-zinc-300 transition-all duration-300 cursor-pointer"
                  onClick={() => setMobileNavOpen((prev) => !prev)}
                >
                  <AiOutlineMenu />
                </button>
              </TooltipTrigger>
              <TooltipContent>Show menu</TooltipContent>
            </Tooltip>
          </div>
        </aside>
      </motion.header>
      <MobileNavMenu
        pathname={pathname}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        router={router}
      />
    </motion.nav>
  );
}
function MobileNavMenu({
  pathname,
  mobileNavOpen,
  setMobileNavOpen,
  router,
}: {
  pathname: string;
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
}) {
  return (
    <section
      className={cn(
        "bg-[#18181b]/75 inset-shadow-sm inset-shadow-black/10 backdrop-blur-lg fixed top-17 w-full z-50 flex flex-col items-center justify-between transition-all duration-700 md:-left-full",
        !mobileNavOpen ? "-left-full" : "left-0"
      )}
      style={{ height: "calc(100dvh - 68px)" }}
    >
      <div className="flex flex-col items-center justify-between w-full p-4 gap-2">
        <NavLink
          pathname={pathname}
          href="/"
          className={`w-full flex items-center justify-between p-4 transition-all duration-300 hover:bg-white/10 active:bg-white/10`}
          onClick={() => {
            setMobileNavOpen(false);
          }}
        >
          Home <GoArrowRight className="text-xl" />
        </NavLink>
        <NavLink
          pathname={pathname}
          href="/how-it-works"
          className={`w-full flex items-center justify-between p-4 transition-all duration-300 hover:bg-white/10 active:bg-white/10`}
          onClick={() => {
            setMobileNavOpen(false);
          }}
        >
          How it works <GoArrowRight className="text-xl" />
        </NavLink>
        <NavLink
          pathname={pathname}
          href="/testimonials"
          className={`w-full flex items-center justify-between p-4 transition-all duration-300 hover:bg-white/10 active:bg-white/10`}
          onClick={() => {
            setMobileNavOpen(false);
          }}
        >
          Testimonials <GoArrowRight className="text-xl" />
        </NavLink>
        <NavLink
          pathname={pathname}
          href="/faq"
          className={`w-full flex items-center justify-between p-4 transition-all duration-300 hover:bg-white/10 active:bg-white/10`}
          onClick={() => {
            setMobileNavOpen(false);
          }}
        >
          FAQ <GoArrowRight className="text-xl" />
        </NavLink>
        <NavLink
          pathname={pathname}
          href="/contact"
          className={`w-full flex items-center justify-between p-4 transition-all duration-300 hover:bg-white/10 active:bg-white/10`}
          onClick={() => {
            setMobileNavOpen(false);
          }}
        >
          Contact <GoArrowRight className="text-xl" />
        </NavLink>
      </div>
      <div className="p-4 w-full">
        <RainbowButton
          className={cn("p-5 rounded-full hover:brightness-90 w-full")}
          onClick={() => {
            router.push("/sign-in");
          }}
        >
          Get started
        </RainbowButton>
      </div>
    </section>
  );
}
