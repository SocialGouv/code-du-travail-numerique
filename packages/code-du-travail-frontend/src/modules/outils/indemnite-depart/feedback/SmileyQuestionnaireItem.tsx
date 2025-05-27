"use client";

import { useState } from "react";
import { FEEDBACK_RESULT } from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { BadIcon } from "./icons/BadIcon";
import { MediumIcon } from "./icons/MediumIcon";
import { GoodIcon } from "./icons/GoodIcon";
import { css } from "@styled-system/css";

export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
}

// Props for the SmileyQuestionnaireItem component
export type SmileyQuestionnaireItemProps = {
  badEventValue: FEEDBACK_RESULT;
  averageEventValue: FEEDBACK_RESULT;
  goodEventValue: FEEDBACK_RESULT;
  badText?: string;
  averageText?: string;
  goodText?: string;
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
};

// Component for smiley feedback (3 options)
export const SmileyQuestionnaireItem = ({
  badEventValue,
  averageEventValue,
  goodEventValue,
  badText,
  averageText,
  goodText,
  title,
  displayError,
  onChange,
  dataTestId,
}: SmileyQuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = title
    ? `fieldset-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <div className={fr.cx("fr-mb-3w", "fr-ml-2v")} data-testid={dataTestId}>
      <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
        {title && (
          <legend className={fr.cx("fr-mb-2v")} id={`${fieldsetId}-legend`}>
            {title}
          </legend>
        )}
        <div
          className={fr.cx("fr-btns-group", "fr-btns-group--inline")}
          role="group"
          aria-labelledby={title ? `${fieldsetId}-legend` : undefined}
          style={{ justifyContent: "center", gap: "1rem" }}
        >
          <div className={radioCardStyle}>
            <input
              type="radio"
              name={fieldsetId}
              id={`${fieldsetId}-bad`}
              className="fr-radio"
              checked={status === Status.BAD}
              onChange={() => {
                setStatus(Status.BAD);
                onChange(badEventValue);
              }}
              data-testid={`${dataTestId}-bad`}
              aria-label={`Noter ${badText ?? "Pas bien"}${
                status === Status.BAD ? " (sélectionné)" : ""
              }`}
            />
            <label htmlFor={`${fieldsetId}-bad`} className={radioLabelStyle}>
              <div className={radioContentStyle}>
                <BadIcon width={"32px"} isActive={status === Status.BAD} />
                <span className={radioTextStyle}>{badText ?? "Pas bien"}</span>
              </div>
            </label>
          </div>
          <div className={radioCardStyle}>
            <input
              type="radio"
              name={fieldsetId}
              id={`${fieldsetId}-average`}
              className="fr-radio"
              checked={status === Status.AVERAGE}
              onChange={() => {
                setStatus(Status.AVERAGE);
                onChange(averageEventValue);
              }}
              data-testid={`${dataTestId}-average`}
              aria-label={`Noter ${averageText ?? "Moyen"}${
                status === Status.AVERAGE ? " (sélectionné)" : ""
              }`}
            />
            <label
              htmlFor={`${fieldsetId}-average`}
              className={radioLabelStyle}
            >
              <div className={radioContentStyle}>
                <MediumIcon
                  width={"32px"}
                  isActive={status === Status.AVERAGE}
                />
                <span className={radioTextStyle}>{averageText ?? "Moyen"}</span>
              </div>
            </label>
          </div>
          <div className={radioCardStyle}>
            <input
              type="radio"
              name={fieldsetId}
              id={`${fieldsetId}-good`}
              className="fr-radio"
              checked={status === Status.GOOD}
              onChange={() => {
                setStatus(Status.GOOD);
                onChange(goodEventValue);
              }}
              data-testid={`${dataTestId}-good`}
              aria-label={`Noter ${goodText ?? "Très bien"}${
                status === Status.GOOD ? " (sélectionné)" : ""
              }`}
            />
            <label htmlFor={`${fieldsetId}-good`} className={radioLabelStyle}>
              <div className={radioContentStyle}>
                <GoodIcon width={"32px"} isActive={status === Status.GOOD} />
                <span className={radioTextStyle}>
                  {goodText ?? "Très bien"}
                </span>
              </div>
            </label>
          </div>
        </div>
      </fieldset>
      {displayError && (
        <p className="fr-error-text">Vous devez choisir une des réponses</p>
      )}
    </div>
  );
};

// Styles
const radioCardStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  border: "1px solid var(--border-default-grey)",
  borderRadius: "4px",
  padding: "1rem",
  width: "120px !important",
  height: "120px",
  position: "relative",
  "@media (max-width: 480px)": {
    width: "100% !important",
    height: "100px",
    padding: "0.5rem",
  },
  "&:has(input:checked)": {
    borderColor: "var(--border-active-blue-france)",
    backgroundColor: "var(--background-alt-blue-france)",
  },
});

const radioLabelStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  cursor: "pointer",
});

const radioContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  "@media (max-width: 480px)": {
    marginTop: "0.5rem",
    gap: "0.25rem",
  },
});

const radioTextStyle = css({
  fontSize: "1rem",
  textAlign: "center",
  "@media (max-width: 480px)": {
    fontSize: "0.875rem",
  },
});
