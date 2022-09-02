import { ReactChild } from "react";
import { Link } from "remix";

import styles from "./Button.style.css";

export const buttonLinks = () => [{ rel: "stylesheet", href: styles }];

const Button = ({
  className = "primary",
  as = "button",
  to = "",
  onClick,
  children,
  ...rest
}: {
  className?: string;
  as?: "link" | "button";
  to?: string;
  onClick?: () => void;
  children: any;
  [x: string]: any;
}) => {
  const Component =
    as === "link" ? (
      <Link className={`button ${className}`} to={to} {...rest}>
        {children}
      </Link>
    ) : (
      <button
        className={`button ${className}`}
        onClick={onClick}
        type="button"
        {...rest}
      >
        {children}
      </button>
    );

  return Component;
};

export default Button;
