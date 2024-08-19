"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ColorModeContext } from "@/app/Providers";

interface ThemeProps {}

const ThemeToggler = () => {
  const { toggleColorMode, mode } = React.useContext(ColorModeContext);
  return (
    <div className="mr-6">
      {/* Your theme content goes here */}
      {mode === "light" ? (
        <i
          className="fa-regular fa-moon text-3xl"
          onClick={() => toggleColorMode()}
        ></i>
      ) : (
        <i
          className="fa-regular fa-sun text-3xl"
          onClick={() => toggleColorMode()}
        ></i>
      )}
    </div>
  );
};

export default ThemeToggler;
