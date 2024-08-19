"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface IProps {
  path: string;
  display: string;
}

const NavLink = ({ path, display }: IProps) => {
  const pathname = usePathname();
  return (
    <Link
      key={path}
      href={path}
      className={`mx-2 content-center mx-2 ${
        pathname === path ? "font-bold" : "font-light"
      }`}
    >
      {display}
    </Link>
  );
};

export default NavLink;
