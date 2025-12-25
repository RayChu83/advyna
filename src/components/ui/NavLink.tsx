import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function NavLink({
  pathname,
  href,
  className,
  children,
  onClick,
}: {
  pathname: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition-all duration-300 tracking-wider text-nowrap outline-none",
        className,
        pathname === href
          ? "text-white font-medium"
          : "animated-underline text-zinc-400 hover:text-zinc-300"
      )}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </Link>
  );
}
