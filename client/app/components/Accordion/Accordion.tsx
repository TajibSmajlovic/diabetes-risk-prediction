import { useState } from "react";
import styles from "./Accordion.styles.css";

export const accordionLinks = () => [{ rel: "stylesheet", href: styles }];

const Accordion = ({ whyContent }: { whyContent: string }) => {
  const rnd = Math.random() * 100;

  return (
    <div className="accordion">
      <input
        title="accordion"
        type="checkbox"
        id={`accordion_check-${rnd}`}
        defaultChecked={false}
      />
      <label className="accordion-label" htmlFor={`accordion_check-${rnd}`}>
        Why is this relevant?
      </label>
      <div className="accordion-content">{whyContent}</div>
    </div>
  );
};

export default Accordion;
