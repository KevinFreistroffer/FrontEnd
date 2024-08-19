"use client";
import { routes } from "@/routes";
import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import SideMenu from "../SideMenu/SideMenu";
import { useClickOutside } from "@/app/hooks/useOnOutsideClick";
import { useAuth } from "@/app/hooks/useAuth";

interface Props {
  // Define the props for your component here
  session: boolean;
}

const HeaderAndSideNavComponent: React.FC<Props> = ({ session }) => {
  const isAuth = useAuth();
  console.log("isAuth()()()()()", isAuth);
  const [showMenu, toggleMenu] = React.useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    console.log("fjdkls");
    toggleMenu(false);
  });

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      toggleMenu(false);
    }
  }, [windowWidth]);
  return (
    <>
      <Header routes={routes} session={session} toggleMenu={toggleMenu} />
      {showMenu && (
        <SideMenu ref={ref} routes={routes} toggleMenu={toggleMenu} />
      )}
    </>
  );
};

export default HeaderAndSideNavComponent;
