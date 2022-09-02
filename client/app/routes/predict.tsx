import { useEffect } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useActionData,
} from "remix";
import { gql } from "@apollo/client";

import styles from "../styles/predict.css";
import StepProgressBar, {
  progressLinks,
} from "../components/StepProgress/StepProgress";
import { accordionLinks } from "~/components/Accordion/Accordion";
import { buttonLinks } from "../components/index.styles";
import questionnaire from "~/utils/questionnaire";
import client from "~/utils/apollo-client";
import { setGeneratedCode } from "~/utils/localStorage";
import { Button } from "~/components";
import remixI18n from "~/utils/localization/i18n.server";
import { LOCALIZATION } from "~/utils/constants";

export const links = () => [
  ...progressLinks(),
  ...buttonLinks(),
  ...accordionLinks(),
  { rel: "stylesheet", href: styles },
];

export let loader: LoaderFunction = async ({ request }) => {
  return json({
    i18n: await remixI18n.getTranslations(request, [
      LOCALIZATION.PREDICT,
      LOCALIZATION.COMMON,
    ]),
  });
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  const age = formData.get("age");
  const polyuria = formData.get("polyuria");
  const polydipsia = formData.get("polydipsia");
  const sudden_weight_loss = formData.get("sudden_weight_loss");
  const weakness = formData.get("weakness");
  const polyphagia = formData.get("polyphagia");
  const genital_thrush = formData.get("genital_thrush");
  const itching = formData.get("itching");
  const irritability = formData.get("irritability");
  const delayed_healing = formData.get("delayed_healing");
  const partial_paresis = formData.get("partial_paresis");
  const muscle_stiffness = formData.get("muscle_stiffness");
  const alopecia = formData.get("alopecia");
  const obesity = formData.get("obesity");
  const gender = formData.get("gender");
  const visual_blurring = formData.get("visual_blurring");

  try {
    const result = await client.mutate({
      mutation: gql`
      mutation {
        predict(
          args: {
           age: ${age},
           polyuria: ${polyuria},
           polydipsia: ${polydipsia},
           suddenWeightLoss: ${sudden_weight_loss},
           weakness: ${weakness},
           polyphagia: ${polyphagia},
           genitalThrush: ${genital_thrush},
           itching: ${itching},
           irritability: ${irritability},
           delayedHealing: ${delayed_healing},
           partialParesis: ${partial_paresis},
           muscleStiffness: ${muscle_stiffness},
           alopecia: ${alopecia},
           obesity: ${obesity},
           gender: ${gender},
           visualBlurring: ${visual_blurring},
          }
        ) {
          predictedResult
          code
        }
      }
    `,
    });

    return json({ ...result.data.predict });
  } catch (error) {
    return json({ error });
  }
};

const PredictDiabetes = () => {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.code) {
      setGeneratedCode(actionData.code);
    }
  }, [actionData?.code]);

  return (
    <section className='predict-wrapper'>
      {actionData?.predictedResult === undefined && !actionData?.code ? (
        <Form id='predict-form' method='post'>
          <StepProgressBar startingStep={0} steps={questionnaire()} />
        </Form>
      ) : (
        <div
          style={{
            color: actionData?.predictedResult ? "red" : "var(--secondary)",
          }}
          className='predict-result'
        >
          <div className='predict-result_title'>
            <h4
              style={{
                color: actionData?.predictedResult
                  ? "#842029"
                  : "var(--primary)",
              }}
            >
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "4px",
                  border: actionData?.predictedResult
                    ? "1px solid #f5c2c7"
                    : "1px solid #b6d4fe",
                  backgroundColor: actionData?.predictedResult
                    ? "#f8d7da"
                    : "#cff4fc",
                }}
              >
                {actionData?.predictedResult
                  ? "Experts advice needed!"
                  : "Low or no risk at all!"}
              </div>
            </h4>
            {actionData?.predictedResult && AlertIcon}
          </div>
          <div className='predict-result_body'>
            {actionData?.predictedResult
              ? "Our machine learning model has predicted that you are at risk of having diabetes. We recommend you to consult a doctor as soon as possible."
              : "Our machine learning model has predicted that you are NOT at risk of having diabetes. Stay safe and healthy!"}
            <hr />
            <span>
              If you decide to go to the doctor, we would appreciate very much
              if you submit your diagnosis result with this code:
              {actionData?.code && <div>{actionData?.code}</div>}
            </span>
          </div>
          <Button
            style={{
              border: actionData?.predictedResult
                ? "1px solid red"
                : "1px solid var(--secondary)",
              color: actionData?.predictedResult ? "red" : "var(--secondary)",
              backgroundColor: actionData?.predictedResult ? "white" : "white",
            }}
            as='link'
            to='/'
          >
            I Understand
          </Button>
        </div>
      )}
    </section>
  );
};

export function ErrorBoundary() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className='lds-heart'>
        <div></div>
      </div>
    </div>
  );
}

const AlertIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='54'
    height='52'
    viewBox='0 0 54 52'
  >
    <g
      id='Single_icon'
      data-name='Single icon'
      transform='translate(0.229 0.128)'
    >
      <g
        id='Placement_Area'
        data-name='Placement Area'
        transform='translate(-0.229 -0.128)'
        fill='red'
        stroke='rgba(0,0,0,0)'
        strokeWidth='1'
        opacity='0'
      >
        <rect width='54' height='52' stroke='none' />
        <rect x='0.5' y='0.5' width='53' height='51' fill='none' />
      </g>
      <g id='Icon' transform='translate(-0.229 -0.128)'>
        <g
          id='Canvas'
          fill='#c9252d'
          stroke='#6e6e6e'
          strokeWidth='1'
          opacity='0'
        >
          <rect width='54' height='52' stroke='none' />
          <rect x='0.5' y='0.5' width='53' height='51' fill='none' />
        </g>
        <path
          id='Path_12'
          data-name='Path 12'
          d='M24.772,1.782.322,45.534A1.462,1.462,0,0,0,1.6,47.709H50.5a1.462,1.462,0,0,0,1.275-2.175L27.324,1.782a1.462,1.462,0,0,0-2.552,0Zm4.2,39.349a.731.731,0,0,1-.731.731H23.855a.731.731,0,0,1-.731-.731V36.747a.731.731,0,0,1,.731-.731H28.24a.731.731,0,0,1,.731.731Zm0-8.77a.731.731,0,0,1-.731.731H23.855a.731.731,0,0,1-.731-.731V14.822a.731.731,0,0,1,.731-.731H28.24a.731.731,0,0,1,.731.731Z'
          transform='translate(0.673 2.216)'
          fill='#c9252d'
        />
      </g>
    </g>
  </svg>
);

export default PredictDiabetes;
