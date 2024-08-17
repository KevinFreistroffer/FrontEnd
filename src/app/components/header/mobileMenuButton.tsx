"use client";

import React, { useContext } from "react";
import styles from "./styles.module.css";
import { GlobalContext } from "@/app/wrapper";

const MobileMenuButton = () => {
  const { toggleMenu } = useContext(GlobalContext);
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
