import React from "react";
import { Link } from "react-router-dom";

import { NavigateButton } from "src/components/NavigateButton";

import styles from "./styles.module.scss";

export const SignInButton = () => {
  return (
    <Link to="/sign-in" className={styles.button}>
      <NavigateButton text={"SignInButton"} isMain />
    </Link>
  );
};

