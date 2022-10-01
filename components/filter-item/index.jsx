import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import SquareCheckIcon from "../../icons/square-check";
import SquareIcon from "../../icons/square";

const FilterItem = ({ isChecked, onChange, title, id, type, count }) => {
  const pillStyles = classnames({
    [styles.main]: true,
    [styles.mainPill]: type === "pill",
    [styles.mainRow]: type === "row",
  });

  const labelStyles = classnames({
    [styles.label]: true,
    [styles.labelPill]: type === "pill",
    [styles.labelRow]: type === "row",
  });
  return (
    <span key={id} className={pillStyles}>
      <input
        id={id}
        type="checkbox"
        value={id}
        onChange={onChange}
        checked={isChecked}
        className={styles.input}
      />
      <label htmlFor={id} className={labelStyles}>
        {type === "row" && (
          <>{isChecked ? <SquareCheckIcon /> : <SquareIcon />}</>
        )}
        <span className={styles.labelTitle}>{title}</span>
        {type === "row" && <span className={styles.count}>{count}</span>}
      </label>
    </span>
  );
};

export default FilterItem;
