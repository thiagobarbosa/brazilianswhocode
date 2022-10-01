import React from "react";
import classnames from "classnames";
import Link from "next/link";
import styles from "./index.module.scss";

const Button = ({
  children,
  type,
  href,
  to,
  onClick,
  width,
  size,
  disabled,
  style,
  target,
  rel,
}) => {
  const buttonStyles = classnames({
    [styles.main]: true,
    [styles.mainWidthFull]: width === "full",
    [styles.mainWidthAuto]: width === "auto",
  });
  const childStyles = classnames({
    [styles.children]: true,
    [styles.childrenSizeRegular]: size === "regular",
  });

  let El;
  let isInternalLink = href && href.startsWith("/") && !href.startsWith("//");

  if (href) {
    El = isInternalLink ? Link : "a";
  } else {
    El = "button";
  }

  const commonProps = {
    className: buttonStyles,
    type,
    onClick,
    disabled,
    style,
    target,
    rel,
  };

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...commonProps}>
          <span className={childStyles}>{children}</span>
        </a>
      </Link>
    );
  }

  return (
    <El href={href} {...commonProps}>
      <span className={childStyles}>{children}</span>
    </El>
  );
};

Button.defaultProps = {
  width: "full",
  size: "regular",
};

export default Button;
