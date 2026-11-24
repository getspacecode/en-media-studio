"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Link as ScrollLink } from "react-scroll";

// Na početnoj skroluje do sekcije, a na ostalim stranicama vodi na /#sekcija.
export default function NavLink({
  to,
  className,
  onClick,
  children,
}: {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <ScrollLink
        to={to}
        smooth
        duration={500}
        className={className}
        onClick={onClick}
      >
        {children}
      </ScrollLink>
    );
  }

  return (
    <NextLink href={`/#${to}`} className={className} onClick={onClick}>
      {children}
    </NextLink>
  );
}
