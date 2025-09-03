"use client";

import { useState, useEffect, useRef } from "react";
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
  title: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  id?: string;
  hint?: string;
};

// Component for numbered scale feedback (1-5)
export const NumberedScaleQuestionnaireItem = ({
  values,
  labels,
  title,
  displayError,
  onChange,
  id,
  hint,
}: NumberedScaleQuestionnaireItemProps) => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = `fieldset-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${fieldsetId}-error`;
  const errorRef = useRef<HTMLParagraphElement>(null);
  const firstRadioRef = useRef<HTMLInputElement>(null);

  // Gestion du focus sur le premier radio button en cas d'erreur
  useEffect(() => {
    if (displayError) {
      setTimeout(() => {
        if (firstRadioRef.current) {
          firstRadioRef.current.focus();
        }
      }, 100);
    }
  }, [displayError]);

  return (
    <div
      className={`${fr.cx("fr-ml-1w", "fr-mb-2w")} ${scaleContainer}`}
      id={id}
    >
      <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
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
                    ref={index === 0 ? firstRadioRef : undefined}
                    id={`${fieldsetId}-${buttonStatus}`}
                    className="fr-sr-only"
                    type="radio"
                    aria-describedby={displayError ? errorId : undefined}
                    onChange={() => {
                      setStatus(buttonStatus);
                      onChange(values[index]);
                    }}
                    name={fieldsetId}
                    data-testid={`${id}-${buttonStatus}`}
                  />
                  <label
                    htmlFor={`${fieldsetId}-${buttonStatus}`}
                    className={`${numberRadioStyle} ${radioFocusStyle} ${status === buttonStatus ? radioSelectedStyle : ""}`}
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
        <p
          ref={errorRef}
          id={errorId}
          className="fr-error-text"
          role="alert"
          aria-live="polite"
          tabIndex={-1}
        >
          Vous devez répondre à au moins une des questions
        </p>
      )}
    </div>
  );
};

const numberRadioStyle = css({
  width: "100%",
  border: "1px solid",
  borderColor: "var(--background-alt-grey-hover)",
  padding: "0.5rem 1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "var(--background-flat-blue-france)",
  fontWeight: 500,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "var(--background-flat-blue-france)",
    backgroundColor: "var(--background-alt-blue-france)",
  },
  "&:focus": {
    outline: "2px solid var(--background-flat-blue-france)",
    outlineOffset: "2px",
    borderColor: "var(--background-flat-blue-france)",
    backgroundColor: "var(--background-alt-blue-france)",
  },
});

const radioFocusStyle = css({
  "input:focus + &": {
    outline: "2px solid var(--background-flat-blue-france)",
    outlineOffset: "2px",
    borderColor: "var(--background-flat-blue-france)",
  },
});

const radioSelectedStyle = css({
  borderColor: "var(--background-flat-blue-france)",
  backgroundColor: "var(--background-flat-blue-france)",
  color: "white",
  "&:hover": {
    borderColor: "var(--background-flat-blue-france)",
    backgroundColor: "var(--background-alt-blue-france)",
  },
  "&:focus": {
    outline: "2px solid var(--background-flat-blue-france)",
    outlineOffset: "2px",
  },
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
