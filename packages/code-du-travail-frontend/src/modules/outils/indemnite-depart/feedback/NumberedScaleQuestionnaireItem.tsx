"use client";

import { useState } from "react";
import { FEEDBACK_RESULT } from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

export enum Status {
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

// Props for the NumberedScaleQuestionnaireItem component
export type NumberedScaleQuestionnaireItemProps = {
  values: [
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
  ];
  labels: [string, string, string, string, string];
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
  hint?: string;
};

// Component for numbered scale feedback (1-5)
export const NumberedScaleQuestionnaireItem = ({
  values,
  labels,
  title,
  displayError,
  onChange,
  dataTestId,
  hint,
}: NumberedScaleQuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = title
    ? `fieldset-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <div
      className={`${fr.cx("fr-ml-1w", "fr-mb-2w")} ${scaleContainer}`}
      data-testid={dataTestId}
    >
      <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
        {title && (
          <legend
            className={fr.cx("fr-mb-2v", "fr-label")}
            id={`${fieldsetId}-legend`}
          >
            {title}
            <span
              className={`${fr.cx("fr-text--sm", "fr-mb-1w", "fr-hint-text")} ${desktopLabelStyle}`}
            >
              {hint}
            </span>
          </legend>
        )}

        <div className={scaleContainer}>
          <p className={labelLeftStyle} aria-hidden="true">
            {labels[0]}
          </p>
          <div className={`${fr.cx("fr-fieldset")} ${containerRadioStyle}`}>
            <ul className={ul}>
              {[
                Status.ONE,
                Status.TWO,
                Status.THREE,
                Status.FOUR,
                Status.FIVE,
              ].map((buttonStatus, index) => (
                <li key={buttonStatus}>
                  <input
                    id={`${fieldsetId}-${buttonStatus}`}
                    data-testId={`${dataTestId}-${buttonStatus}`}
                    className="fr-sr-only"
                    type="radio"
                    onChange={() => {
                      setStatus(buttonStatus);
                      onChange(values[index]);
                    }}
                    name={values[index]}
                  />
                  <label
                    htmlFor={`${fieldsetId}-${buttonStatus}`}
                    className={`${numberRadioStyle} ${status === buttonStatus ? radioSelectedStyle : ""}`}
                  >
                    {index + 1}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <p
            className={`${labelRightStyle} ${fr.cx("fr-ml-2w")}`}
            aria-hidden="true"
          >
            {labels[4]}
          </p>
        </div>
      </fieldset>
      {displayError && (
        <p className="fr-error-text">Vous devez choisir une des réponses</p>
      )}
    </div>
  );
};

const numberRadioStyle = css({
  width: "100%",
  border: "1px solid var(--background-alt-grey-hover)",
  padding: "0.5rem 1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "var(--background-flat-blue-france)",
  fontWeight: 500,
});

const radioSelectedStyle = css({
  borderColor: "var(--background-flat-blue-france)",
  backgroundColor: "var(--background-flat-blue-france)",
  color: "white",
});

const ul = css({
  listStyle: "none!",
  margin: 0,
  paddingLeft: 0,
  width: "100%",
  "@media (min-width: 48em)": {
    columns: 5,
  },
});

const containerRadioStyle = css({
  width: "100%",
  position: "initial",
  justifyContent: "center",
  marginLeft: "1rem",
  marginRight: "1rem",
});

const scaleContainer = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
});

const labelLeftStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginRight: "1.25rem",
  width: "130px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const labelRightStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginLeft: "1.25rem",
  width: "130px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const desktopLabelStyle = css({
  "@media (max-width: 768px)": {
    display: "none",
  },
});
