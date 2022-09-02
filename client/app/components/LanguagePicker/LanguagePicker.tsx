import { useRef } from "react";
import { ActionFunction, json, Link, useLoaderData, useLocation } from "remix";
import remixI18n from "~/utils/localization/i18n.server";

import styles from "./LanguagePicker.styles.css";

import bosnia_flag from "~/images/bosnia-flag.png";
import turkey_flag from "~/images/turkey-flag.png";
import uk_flag from "~/images/uk-flag.png";

type lngType = "en" | "bh" | "tr";

const languages = {
  en: { img: uk_flag },
  bh: { img: bosnia_flag },
  tr: { img: turkey_flag },
};

export const languagePickerStyles = () => [{ rel: "stylesheet", href: styles }];

export const loader: ActionFunction = async ({ request }) => {
  const locale = await remixI18n.getLocale(request);

  return json({ locale });
};

const LanguagePicker = () => {
  const { locale }: { locale: lngType } = useLoaderData();
  const location = useLocation();
  const ref = useRef(null) as any;

  return (
    <div>
      <div className="dropdown">
        <input ref={ref} type="checkbox" id="dropdown" />

        <label className="dropdown__face" htmlFor="dropdown">
          <div className="dropdown__text">
            <img src={languages[locale].img} alt="" />
          </div>
        </label>

        <ul className="dropdown__items">
          {Object.keys(languages).map((lng) => (
            <Link
              key={lng}
              style={{
                marginRight: 5,
                fontWeight: locale === lng ? "bold" : "normal",
              }}
              to={`${
                location.pathname === "/" ? "" : location.pathname
              }/?lng=${lng}`}
              onClick={() => {
                if (ref.current) {
                  ref.current.click();
                }
              }}
            >
              <img src={languages[lng].img} alt="" />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      {Object.keys(languages).map((lng) => (
        <Link
          key={lng}
          style={{
            marginRight: 5,
            fontWeight: locale === lng ? "bold" : "normal",
          }}
          to={`/?lng=${lng}`}
        >
          {languages[lng].nativeName}
        </Link>
      ))}
    </div>
  );
};

export default LanguagePicker;
