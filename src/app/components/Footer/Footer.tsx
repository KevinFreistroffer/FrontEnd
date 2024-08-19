import React from "react";
import styles from "./styles.module.css";

const Footer: React.FC = () => {
  return (
    <footer id={styles["footer"]} className="p-8">
      {/* Your footer content goes here */}
      <h1>Footer</h1>
    </footer>
  );
};

export default Footer;
