import * as React from "react";

import styles from "./StepProgress.styles.css";
import {
  StepStates,
  ProgressStep,
  StepProgressProps,
  ReducerAction,
  IBinaryType,
} from "./StepProgress.models";
import { Button } from "../index";

function stepsReducer(
  steps: ProgressStep[],
  action: ReducerAction
): ProgressStep[] {
  return steps.map(function (step, i) {
    if (i < action.payload.index) {
      step.state = StepStates.COMPLETED;
    } else if (i === action.payload.index) {
      step.state = action.payload.state;
    } else {
      step.state = StepStates.NOT_STARTED;
    }
    return step;
  });
}

const validator = (value: string | undefined) => {
  if (typeof value !== "string") {
    return false;
  }

  return value === "1" || value === "0";
};

export let values: { [x: string]: string } = {};

export const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const name = e.target.name;
  const value = e.target.value;

  if (!name || !value) {
    return;
  }

  values[name] = value;
};

export const progressLinks = () => [{ rel: "stylesheet", href: styles }];

export const StepInput = ({ identifier }: { identifier: string }) => (
  <div key={identifier} className='wrapper_step-input' id={identifier}>
    <label>
      <input
        className='step-input'
        defaultChecked={values[identifier] ? values[identifier] === "1" : false}
        type='radio'
        title={identifier}
        name={identifier}
        value={IBinaryType.YES}
        onChange={setValue}
      />
      <span className='step-input_name'>
        {identifier === "gender" ? "Female" : "Yes"}
      </span>
    </label>
    <label>
      <input
        className='step-input'
        defaultChecked={values[identifier] ? values[identifier] === "0" : false}
        type='radio'
        title={identifier}
        name={identifier}
        value={IBinaryType.NO}
        onChange={setValue}
      />
      <span className='step-input_name'>
        {identifier === "gender" ? "Male" : "No"}
      </span>
    </label>
  </div>
);

const StepProgressBar = (props: StepProgressProps): JSX.Element => {
  const {
    steps,
    startingStep,
    wrapperClass,
    progressClass,
    stepClass,
    labelClass,
    subtitleClass,
    contentClass,
    buttonWrapperClass,
    primaryBtnClass,
    secondaryBtnClass,
    submitBtnName,
    onSubmit,
    previousBtnName,
    nextBtnName,
  } = props;
  const [state, dispatch] = React.useReducer(stepsReducer, steps);
  const [currentIndex, setCurrentIndex] = React.useState(startingStep);

  React.useEffect(() => {
    dispatch({
      type: "init",
      payload: { index: currentIndex, state: StepStates.CURRENT },
    });

    return () => {
      values = {};
    };
  }, []);

  function submitHandler(): void {
    onSubmit?.();
  }

  function nextHandler(): void {
    if (currentIndex === steps.length - 1) {
      return;
    }
    let isStateValid = true;
    const stepValidator = state[currentIndex].validator || validator;
    const id =
      typeof state[currentIndex].content === "function"
        ? state[currentIndex].content(values).props.id
        : state[currentIndex].content?.props?.id;
    const value = values[id];

    if (stepValidator) {
      isStateValid = stepValidator(value);
    } else if (!value) {
      isStateValid = false;
    }

    dispatch({
      type: "next",
      payload: {
        index: isStateValid ? currentIndex + 1 : currentIndex,
        state: isStateValid ? StepStates.CURRENT : StepStates.ERROR,
      },
    });

    if (isStateValid) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevHandler(): void {
    if (currentIndex === 0) {
      return;
    }

    dispatch({
      type: "previous",
      payload: {
        index: currentIndex - 1,
        state: StepStates.CURRENT,
      },
    });
    setCurrentIndex(currentIndex - 1);
  }

  return (
    <div className={`progress-bar-wrapper ${wrapperClass || ""}`}>
      <div className={`step-content ${contentClass || ""}`}>
        {props.steps.map((s, i) => (
          <div
            key={Math.random() * 1000 + 846 + 516 - 151 / 123}
            style={{ display: currentIndex === i ? "block" : "none" }}
          >
            {typeof s.content === "function" ? s.content(values) : s.content}
          </div>
        ))}
      </div>
      <div className={`step-buttons ${buttonWrapperClass || ""}`}>
        <Button
          className={`step-action-btn ${currentIndex === 0 ? "disabled" : ""} ${
            secondaryBtnClass || ""
          }`}
          onClick={prevHandler}
        >
          {previousBtnName ? previousBtnName : "Previous"}
        </Button>
        {currentIndex === state.length - 1 && (
          <Button
            style={{ backgroundColor: "#00318b" }}
            className={`step-action-btn .step-action-btn_primary ${
              primaryBtnClass || ""
            }`}
            onClick={submitHandler}
            type='submit'
          >
            {submitBtnName || "Submit"}
          </Button>
        )}
        {currentIndex !== state.length - 1 && (
          <Button
            className={`step-action-btn step-action-btn_primary ${
              primaryBtnClass || ""
            }`}
            onClick={nextHandler}
          >
            {nextBtnName ? nextBtnName : "Next"}
          </Button>
        )}
      </div>
      <ul className={`step-progress-bar ${progressClass || ""}`}>
        {state.map(function (step, i) {
          return (
            <li
              key={i}
              className={`progress-step${
                step.state === StepStates.COMPLETED ? ` completed` : ""
              }${step.state === StepStates.CURRENT ? ` current` : ""}${
                step.state === StepStates.ERROR ? ` has-error` : ""
              } ${stepClass || ""}`}
            >
              {step.state === StepStates.COMPLETED && (
                <span className='step-icon'>
                  <svg
                    width='1.3rem'
                    viewBox='0 0 13 9'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1 3.5L4.5 7.5L12 1'
                      stroke='white'
                      strokeWidth='1.5'
                    />
                  </svg>
                </span>
              )}
              {step.state === StepStates.ERROR && (
                <span className='step-icon'>!</span>
              )}
              {step.state !== StepStates.COMPLETED &&
                step.state !== StepStates.ERROR && (
                  <span className='step-index'>{i + 1}</span>
                )}
              <div className={`step-label ${labelClass || ""}`}>
                {step.label}
                {step.subtitle && (
                  <div className={`step-label-subtitle ${subtitleClass || ""}`}>
                    {step.subtitle}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StepProgressBar;
