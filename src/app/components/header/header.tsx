// import { GlobalContext } from "@/app/wrapper";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { IRouteConfig } from "@/routes";
import Nav from "./Nav";
import MobileMenuButton from "./MobileMenuButton";
import Theme from "./ThemeToggler";
import ThemeToggler from "./ThemeToggler";
import Box from "@mui/material/Box";

const Header = ({
  routes,
  session,
  toggleMenu,
}: {
  routes: IRouteConfig[];
  session: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Box
      component={"header"}
      id={styles["header"]}
      className="px-6 py-4 flex justify-between content-center"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <Link className="text-3xl p-0 m-0 self-center" href="/">
        Title
      </Link>
      <div className="flex self-center">
        <ThemeToggler />
        <Nav routes={routes} />
      </div>
      <MobileMenuButton toggleMenu={toggleMenu} />
    </Box>
  );
};

export default Header;
