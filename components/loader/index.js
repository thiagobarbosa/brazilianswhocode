import React from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          Women Who Design is a Twitter directory of accomplished women in the
          design industry
        </h1>
        <div className={styles.spinner} />
      </div>
    </div>
  );
};

export default Loader;
