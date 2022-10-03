import React from "react";
import Link from "next/link";
import Logo from "../logo";
import styles from "./index.module.scss";

const Nav = (props) => {
  return (
    <div
      className={styles.container}
      style={{
        "--background": props.theme === "dark" && "var(--gray)",
        "--text": props.theme === "dark" && "#fff",
      }}
    >
      <div className={styles.logoContainer} >
      <Link href="/">
        <a>
          <Logo className={styles.logo} />
        </a>
      </Link>
      </div>
      
      <nav className={styles.links}>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
        <Link href="https://twitter.com/BR_whocode" >
          <a className={styles.link} target="_blank">Twitter</a>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
