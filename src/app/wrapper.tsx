"use client";

import Header from "@/components/header/header";
import SideMenu from "@/components/sidemenu/sidemenu";
import Link from "next/link";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "../hooks/useOnOutsideClick";
import { Inter } from "next/font/google";

interface WrapperProps {
  children: ReactNode;
}

export interface IContext {
  showMenu: boolean;
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IContext>({
  showMenu: false,
  toggleMenu: function () {
    this.showMenu = !this.showMenu;
  },
});

const inter = Inter({ subsets: ["latin"] });

const Wrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}): JSX.Element => {
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
    <div className={inter.className}>
      <GlobalContext.Provider
        value={{
          showMenu,
          toggleMenu,
        }}
      >
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        {showMenu && <SideMenu ref={ref} />}
      </GlobalContext.Provider>
    </div>
  );
};

export default Wrapper;
