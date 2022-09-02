import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link, LoaderFunction, json } from "remix";
import { LOCALIZATION } from "~/utils/constants";
import remixI18n from "~/utils/localization/i18n.server";
import LanguagePicker, {
  languagePickerStyles,
} from "../LanguagePicker/LanguagePicker";

import styles from "./Navigation.style.css";

export const navigationLinks = () => [
  ...languagePickerStyles(),
  { rel: "stylesheet", href: styles },
];

const routes = {
  HOME: {
    path: "/",
    name: "home",
  },
  ABOUT_DIABETES: {
    path: "/about-diabetes",
    name: "about-diabetes",
  },
  DIABETES_NEWS: {
    path: "/diabetes-news",
    name: "diabetes-news",
  },
};

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <>
      <MobileNavigation pathname={pathname} />

      <div className="navigation-wrapper-desktop">
        <NavItems pathname={pathname} />
        <LanguagePicker />
      </div>
    </>
  );
};

const NavItems = ({
  pathname,
  onClick,
}: {
  pathname: string;
  onClick?: () => void;
}) => (
  <>
    {Object.values(routes).map((r, i) => (
      <NavItem
        key={i}
        isActive={r.path === pathname}
        onClick={onClick}
        {...r}
      />
    ))}
  </>
);

const NavItem = ({
  path,
  name,
  isActive,
  onClick,
}: {
  path: string;
  name: string;
  isActive: boolean;
  onClick?: () => void;
  [x: string]: any;
}) => {
  let { t } = useTranslation(LOCALIZATION.COMMON);

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`link ${isActive ? "active" : ""}`}
    >
      {t(name)}
    </Link>
  );
};

const ToggleButton = ({ onClick }: { onClick: () => void }) => (
  <div onClick={onClick} className="toggle-btn">
    <div />
    <div />
    <div />
  </div>
);

const MobileNavigation = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navigation-wrapper-mobile">
      <div className="logo">LOGO</div>
      <ToggleButton onClick={() => setIsOpen(!isOpen)} />
      <div className={`side-drawer ${isOpen ? "open" : "close"}`}>
        <NavItems pathname={pathname} onClick={() => setIsOpen(false)} />
        {isOpen && <LanguagePicker />}
      </div>
    </div>
  );
};

export default Navigation;
