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
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
};

// Component for smiley feedback (3 options)
export const SmileyQuestionnaireItem = ({
  badEventValue,
  averageEventValue,
  goodEventValue,
  displayError,
  onChange,
}: SmileyQuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = `fieldset-satisfaction`;

  return (
    <div>
      <div
        className={fr.cx("fr-btns-group", "fr-btns-group--inline")}
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
          />
          <label htmlFor={`${fieldsetId}-bad`} className={radioLabelStyle}>
            <div className={radioContentStyle}>
              <BadIcon
                width={"32px"}
                isActive={status === Status.BAD}
                aria-hidden="true"
                focusable="false"
              />
              <span className={radioTextStyle}>Pas bien</span>
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
          />
          <label htmlFor={`${fieldsetId}-average`} className={radioLabelStyle}>
            <div className={radioContentStyle}>
              <MediumIcon
                width={"32px"}
                isActive={status === Status.AVERAGE}
                aria-hidden="true"
                focusable="false"
              />
              <span className={radioTextStyle}>Moyen</span>
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
          />
          <label htmlFor={`${fieldsetId}-good`} className={radioLabelStyle}>
            <div className={radioContentStyle}>
              <GoodIcon
                width={"32px"}
                isActive={status === Status.GOOD}
                aria-hidden="true"
                focusable="false"
              />
              <span className={radioTextStyle}>Très bien</span>
            </div>
          </label>
        </div>
      </div>

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
