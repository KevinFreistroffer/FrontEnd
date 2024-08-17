"use client";

import React, { useContext } from "react";
import styles from "./styles.module.css";
import { IRouteConfig } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ routes }: { routes: IRouteConfig[] }) => {
  const pathname = usePathname();
  return (
    <nav
      id={styles["nav"]}
      className="flex align-center p-0 m-0 content-center"
    >
      {routes.map(({ path, display }: { path: string; display: string }) => (
        <Link
          key={path}
          href={path}
          className={`mx-2 content-center mx-2 ${
            pathname === path ? "font-bold" : "font-light"
          }`}
        >
          {display}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
