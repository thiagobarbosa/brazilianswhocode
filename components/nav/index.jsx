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
      <Link href="/">
        <a>
          <Logo className={styles.logo} />
        </a>
      </Link>
      <nav className={styles.links}>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>
        <Link href="/nominate">
          <a className={styles.link}>Nominate</a>
        </Link>
        <Link href="/jobs">
          <a className={styles.link}>Jobs</a>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
