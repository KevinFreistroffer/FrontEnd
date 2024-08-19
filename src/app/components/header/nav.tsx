import React, { useContext } from "react";
import styles from "./styles.module.css";
import { IRouteConfig } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const Nav = ({ routes }: { routes: IRouteConfig[] }) => {
  return (
    <nav
      id={styles["nav"]}
      className="flex align-center p-0 m-0 content-center"
    >
      {routes.map(({ path, display }: { path: string; display: string }) => (
        <NavLink key={path} path={path} display={display} />
      ))}
    </nav>
  );
};

export default Nav;
