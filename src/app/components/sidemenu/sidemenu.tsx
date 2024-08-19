"use client";

import React, { forwardRef, useContext } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IRouteConfig, publicRoutes, routes } from "@/routes";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  routes: IRouteConfig[];
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Ref = HTMLDivElement;

const SideMenu = forwardRef<Ref, IProps>(({ routes, toggleMenu }, ref) => {
  const pathname = usePathname();

  return (
    <div ref={ref} id={styles["sidemenu"]} className="p-6">
      <nav
        id={styles["nav"]}
        className="flex align-center flex-col p-0 m-0 content-center"
      >
        {routes.map(({ path, display }: { path: string; display: string }) => (
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
        ))}
      </nav>
    </div>
  );
});

export default SideMenu;
