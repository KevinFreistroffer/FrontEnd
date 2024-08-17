import { GlobalContext } from "@/app/wrapper";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import React, { use, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { privateRoutes, publicRoutes, routes } from "@/routes";
import Nav from "./nav";
import MobileMenuButton from "./mobileMenuButton";
import { validateSession } from "@/utils";

const Header: React.FC = async () => {
  const userSession = await validateSession();
  const routes = [...publicRoutes];

  if (userSession) {
    routes.push(...privateRoutes);
  }
  return (
    <header
      id={styles["header"]}
      className="px-6 py-4 flex justify-between content-center"
    >
      <Link className="text-3xl p-0 m-0 self-center" href="/">
        Title
      </Link>
      <Nav routes={routes} />
      <MobileMenuButton />
    </header>
  );
};

export default Header;
