"use client";

import React, { useContext } from "react";
import styles from "./styles.module.css";

const MobileMenuButton = ({
  toggleMenu,
}: {
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      id={styles["menu-button"]}
      type="button"
      onClick={() => {
        toggleMenu((shown) => !shown);
      }}
    >
      <span id={styles["bars"]} className="fa-solid fa-bars"></span>
    </button>
  );
};

export default MobileMenuButton;
