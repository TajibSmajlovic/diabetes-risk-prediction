import { useTranslation } from "react-i18next";
import Accordion from "~/components/Accordion/Accordion";
import { StepInput, setValue } from "~/components/StepProgress/StepProgress";
import { ProgressStep } from "~/components/StepProgress/StepProgress.models";
import { LOCALIZATION } from "./constants";

const questionnaire = (): ProgressStep[] => {
  const { t } = useTranslation(LOCALIZATION.PREDICT);

  return [
    {
      name: "age",
      validator: (value) => value >= 20 && value <= 100,
      content: (values: any) => (
        <div id="age">
          <div className="predict-question">{t("age_question")}</div>
          <input
            className="age-input"
            name="age"
            title="age"
            type="number"
            placeholder={t("age_placeholder")}
            min={20}
            max={100}
            defaultValue={values["age"]}
            onChange={setValue}
            autoFocus={true}
          />
          <Accordion whyContent={t("age_why")} />
        </div>
      ),
    },
    {
      name: "gender",
      content: (
        <div id="gender">
          <div className="predict-question">{t("gender_question")}</div>
          <StepInput identifier="gender" />
          <Accordion whyContent={t("gender_why")} />
        </div>
      ),
    },
    {
      name: "polyuria",
      content: (
        <div id="polyuria">
          <div className="predict-question">{t("polyuria_question")}</div>
          <StepInput identifier="polyuria" />
          <Accordion whyContent={t("polyuria_why")} />
        </div>
      ),
    },
    {
      name: "polydipsia",
      content: (
        <div id="polydipsia">
          <div className="predict-question">{t("polydipsia_question")}</div>
          <StepInput identifier="polydipsia" />
          <Accordion whyContent={t("polydipsia_why")} />
        </div>
      ),
    },
    {
      name: "sudden_weight_loss",
      content: (
        <div id="sudden_weight_loss">
          <div className="predict-question">
            {t("sudden_weight_loss_question")}
          </div>
          <StepInput identifier="sudden_weight_loss" />
          <Accordion whyContent={t("sudden_weight_loss_why")} />
        </div>
      ),
    },
    {
      name: "weakness",
      content: (
        <div id="weakness">
          <div className="predict-question">{t("weakness_question")}</div>
          <StepInput identifier="weakness" />
          <Accordion whyContent={t("weakness_why")} />
        </div>
      ),
    },
    {
      name: "polyphagia",
      content: (
        <div id="polyphagia">
          <div className="predict-question">{t("polyphagia_question")}</div>
          <StepInput identifier="polyphagia" />
          <Accordion whyContent={t("polyphagia_why")} />
        </div>
      ),
    },
    {
      name: "genital_thrush",
      content: (
        <div id="genital_thrush">
          <div className="predict-question">{t("genital_thrush_question")}</div>
          <StepInput identifier="genital_thrush" />
          <Accordion whyContent={t("genital_thrush_why")} />
        </div>
      ),
    },
    {
      name: "visual_blurring",
      content: (
        <div id="visual_blurring">
          <div className="predict-question">
            {t("visual_blurring_question")}
          </div>
          <StepInput identifier="visual_blurring" />
          <Accordion whyContent={t("visual_blurring_why")} />
        </div>
      ),
    },
    {
      name: "itching",
      content: (
        <div id="itching">
          <div className="predict-question">{t("itching_question")}</div>
          <StepInput identifier="itching" />
          <Accordion whyContent={t("itching_why")} />
        </div>
      ),
    },
    {
      name: "irritability",
      content: (
        <div id="irritability">
          <div className="predict-question">{t("irritability_question")}</div>
          <StepInput identifier="irritability" />
          <Accordion whyContent={t("irritability_why")} />
        </div>
      ),
    },
    {
      name: "delayed_healing",
      content: (
        <div id="delayed_healing">
          <div className="predict-question">
            {t("delayed_healing_question")}
          </div>
          <StepInput identifier="delayed_healing" />
          <Accordion whyContent={t("delayed_healing_why")} />
        </div>
      ),
    },
    {
      name: "partial_paresis",
      content: (
        <div id="partial_paresis">
          <div className="predict-question">
            {t("partial_paresis_question")}
          </div>
          <StepInput identifier="partial_paresis" />
          <Accordion whyContent={t("partial_paresis_question")} />
        </div>
      ),
    },
    {
      name: "muscle_stiffness",
      content: (
        <div id="muscle_stiffness">
          <div className="predict-question">
            {t("muscle_stiffness_question")}
          </div>
          <StepInput identifier="muscle_stiffness" />
          <Accordion whyContent={t("muscle_stiffness_why")} />
        </div>
      ),
    },
    {
      name: "alopecia",
      content: (
        <div id="alopecia">
          <div className="predict-question">{t("alopecia_question")}</div>
          <StepInput identifier="alopecia" />
          <Accordion whyContent={t("alopecia_why")} />
        </div>
      ),
    },
    {
      name: "obesity",
      content: (
        <div id="obesity">
          <div className="predict-question">{t("obesity_question")}</div>
          <StepInput identifier="obesity" />
          <Accordion whyContent={t("obesity_why")} />
        </div>
      ),
    },
  ];
};

export default questionnaire;
