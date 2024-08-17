"use client";

import React, { forwardRef, useContext } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { GlobalContext } from "@/app/wrapper";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/app/routes";

const SideMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const pathname = usePathname();
  const { toggleMenu } = useContext(GlobalContext);
  return (
    <div ref={ref} id={styles["sidemenu"]} className="p-6">
      <nav
        id={styles["nav"]}
        className="flex align-center flex-col p-0 m-0 content-center"
      >
        {publicRoutes.map(
          ({ path, display }: { path: string; display: string }) => (
            <Link
              key={path}
              href={path}
              className={`mx-2 content-center  mx-2 ${
                pathname === path ? "font-bold" : "font-light"
              }`}
              onClick={() => toggleMenu(false)}
            >
              {display}
            </Link>
          )
        )}
      </nav>
    </div>
  );
});

export default SideMenu;
