"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
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
};

// Component for numbered scale feedback (1-5)
export const NumberedScaleQuestionnaireItem = ({
  values,
  labels,
  title,
  displayError,
  onChange,
  dataTestId,
}: NumberedScaleQuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = title
    ? `fieldset-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <div
      className={`fr.cx("fr-mb-3w", "fr-ml-2v") ${scaleContainer}`}
      data-testid={dataTestId}
    >
      <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
        {title && (
          <legend
            className={fr.cx("fr-mb-2v", "fr-label")}
            id={`${fieldsetId}-legend`}
          >
            {title}
          </legend>
        )}
        <p className={fr.cx("fr-text--sm", "fr-mb-1w")}>
          <span className={`${fr.cx("fr-hint-text")} ${desktopLabelStyle}`}>
            Sur une échelle de 1 à 5, 1 n&apos;est pas clair du tout et 5 est
            très clair.
          </span>
        </p>
        <div className={scaleContainer}>
          <div className={labelLeftStyle}>{labels[0]}</div>
          <div
            className={fr.cx("fr-btns-group", "fr-btns-group--inline")}
            role="group"
            aria-labelledby={title ? `${fieldsetId}-legend` : undefined}
            style={{ justifyContent: "center" }}
          >
            {[
              Status.ONE,
              Status.TWO,
              Status.THREE,
              Status.FOUR,
              Status.FIVE,
            ].map((buttonStatus, index) => (
              <Button
                key={buttonStatus}
                id={`${fieldsetId}-${buttonStatus}`}
                data-testId={`${dataTestId}-${buttonStatus}`}
                onClick={() => {
                  setStatus(buttonStatus);
                  onChange(values[index]);
                }}
                className={`${numberButtonStyle} ${status === buttonStatus ? selectedStyle : ""} ${fr.cx("fr-mb-0")}`}
                data-testid={`${dataTestId}-${buttonStatus}`}
                priority="secondary"
                type="button"
                aria-pressed={status === buttonStatus}
                aria-label={`Noter ${index + 1}${
                  status === buttonStatus ? " (sélectionné)" : ""
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <div className={labelRightStyle}>{labels[4]}</div>
        </div>
      </fieldset>
      {displayError && (
        <p className="fr-error-text">Vous devez choisir une des réponses</p>
      )}
    </div>
  );
};

// Styles
const selectedStyle = css({
  backgroundColor: "var(--background-action-high-blue-france)!important",
  color: "var(--text-inverted-blue-france)!important",
});

const numberButtonStyle = css({
  width: "60px",
  height: "60px",
  margin: "0 0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.25rem",
  fontWeight: "bold",
  "@media (max-width: 480px)": {
    width: "35px",
    height: "35px",
    fontSize: "0.9rem",
    margin: "0 0.1rem",
    padding: "0",
  },
});

const scaleContainer = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  marginBottom: "1rem",
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
