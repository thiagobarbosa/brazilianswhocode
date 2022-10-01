import _ from "lodash-es";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import styles from "../components/about/index.module.scss";

export default function Nominate() {
  return (
    <>
      <Head>
        <title>Nominate | Women Who Design</title>
      </Head>
      <Nav theme="light" />
      <div className={styles.container}>
        <h1 className={styles.h1}>Nominate</h1>

        <p className={styles.p}>
          If you know a woman whose voice is valuable to the design industry,
          please DM{" "}
          <a
            href="https://twitter.com/womenwhodesign"
            target="_blank"
            rel="noopener noreferrer"
          >
            @womenwhodesign
          </a>{" "}
          on Twitter with her Twitter handle and a few words about why you’re
          nominating her.
        </p>

        <div className={styles.backContainer}>
          <Link href="/">
            <a className={styles.backLink}>Back to directory</a>
          </Link>
        </div>
      </div>
    </>
  );
}
