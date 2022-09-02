import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useActionData,
} from "remix";

import client from "~/utils/apollo-client";
import remixI18n from "~/utils/localization/i18n.server";
import { Button } from "~/components";
import { buttonLinks } from "~/components/index.styles";
import { progressLinks } from "~/components/StepProgress/StepProgress";
import { clearGeneratedCode, getGeneratedCode } from "~/utils/localStorage";
import { IBinaryType } from "~/components/StepProgress/StepProgress.models";
import { LOCALIZATION } from "~/utils/constants";

import styles from "../styles/submit-results.css";

export const links = () => [
  ...progressLinks(),
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

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  const predictedResult = formData.get("predicted-result");
  const code = formData.get("code");

  try {
    const res = await client.mutate({
      mutation: gql`
      mutation {
        submitResult(
          predictedResult: ${predictedResult}
          code: "${code}"
        ) 
      }
    `,
    });

    return json(res.data.submitResult);
  } catch (error) {
    return json(false);
  }
};

const SubmitResults = () => {
  const [codeFromStorage, setCodeFromStorage] = useState<string | null>("");
  const actionData = useActionData();
  let { t, ready } = useTranslation(LOCALIZATION.INDEX);

  if (!ready) return <div>Loading...</div>;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCodeFromStorage(() => getGeneratedCode());
    }
  }, []);

  useEffect(() => {
    if (actionData) {
      clearGeneratedCode();
    }
  }, [actionData]);

  return actionData ? (
    <div className='submit-wrapper'>
      <div className='success-wrapper'>
        You have successfully submitted your diagnosis received from the doctor!
      </div>
      <div className='btn-wrapper'>
        <Button className='more-info-btn' as='link' to='/'>
          Back
        </Button>
      </div>
    </div>
  ) : (
    <Form id='submit-result-form' method='post'>
      <div className='submit-wrapper'>
        <div className='text'>
          By submitting results Your diagnosis received from the doctor has been
          saved! you are helping us in improving prediction accuracy of our
          application. Thank you for that!
        </div>
        <label>
          <input
            style={{
              textAlign: "center",
              fontSize: "2rem",
              borderColor: actionData === false ? "#f5c2c7" : "#e0ecde",
            }}
            className='code-input'
            name='code'
            defaultValue={codeFromStorage ?? ""}
            readOnly={!!codeFromStorage}
            placeholder='Your code'
            autoFocus={true}
            {...(!!codeFromStorage && { value: codeFromStorage })}
          />
          {actionData === false && (
            <div
              style={{ color: "#842029", textAlign: "center", marginTop: 12 }}
            >
              Invalid code!
            </div>
          )}
        </label>
        <div className='wrapper_step-input'>
          <label>
            <input
              className='step-input'
              type='radio'
              name='predicted-result'
              value={IBinaryType.YES}
            />
            <span className='step-input_name'>{t("Yes")}</span>
          </label>
          <label>
            <input
              className='step-input'
              type='radio'
              name='predicted-result'
              value={IBinaryType.NO}
            />
            <span className='step-input_name'>{t("No")}</span>
          </label>
        </div>
        <div className='btn-wrapper'>
          <Button className='more-info-btn' as='link' to='/'>
            {t("back")}
          </Button>
          <Button className='test-now-btn' type='submit'>
            {t("submit")}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SubmitResults;
