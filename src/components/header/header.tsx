"use client";

import { GlobalContext } from "@/app/wrapper";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/app/routes";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { toggleMenu } = useContext(GlobalContext);

  return (
    <header
      id={styles["header"]}
      className="px-6 py-4 flex justify-between content-center"
    >
      <Link className="text-3xl p-0 m-0 self-center" href="/">
        Title
      </Link>
      <nav
        id={styles["nav"]}
        className="flex align-center p-0 m-0 content-center"
      >
        {publicRoutes.map(
          ({ path, display }: { path: string; display: string }) => (
            <Link
              key={path}
              href={path}
              className={`mx-2 content-center mx-2 ${
                pathname === path ? "font-bold" : "font-light"
              }`}
            >
              {display}
            </Link>
          )
        )}
      </nav>
      <button
        id={styles["menu-button"]}
        type="button"
        onClick={() => {
          toggleMenu((shown) => !shown);
        }}
      >
        <span id={styles["bars"]} className="fa-solid fa-bars"></span>
      </button>
    </header>
  );
};

export default Header;
