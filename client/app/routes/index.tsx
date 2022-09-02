import styles from "../styles/index.css";
import { Button } from "../components";
import { buttonLinks } from "../components/index.styles";
import { json, LoaderFunction } from "remix";
import { useTranslation } from "react-i18next";
import { LOCALIZATION } from "~/utils/constants";
import remixI18n from "~/utils/localization/i18n.server";

export const links = () => [
  ...buttonLinks(),
  { rel: "stylesheet", href: styles },
];

export let loader: LoaderFunction = async ({ request }) => {
  return json({
    i18n: await remixI18n.getTranslations(request, [
      LOCALIZATION.INDEX,
      LOCALIZATION.COMMON,
    ]),
  });
};

const Index = () => {
  let { t, ready } = useTranslation(LOCALIZATION.INDEX);

  if (!ready) return <div>Loading...</div>;

  return (
    <section className="main-section container">
      <div>
        <h1 className="header-1 text-max-width">{t("title")}</h1>
        <h2 className="header-2 text-max-width">{t("sub_title")}</h2>
      </div>
      <p className="subtext text-max-width">{t("text_1")}</p>
      <p className="subtext text-max-width">{t("text_2")}</p>
      <div className="btn-wrapper">
        <Button className="more-info-btn" as="link" to="about-diabetes">
          {t("more_info")}
        </Button>
        <Button className="test-now-btn" as="link" to="/predict">
          {t("test_now")}
        </Button>
        <div className="received-diagnosis">
          <hr />
          {t("received_results")}
          <Button as="link" to="submit-results">
            {t("submit_results")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
