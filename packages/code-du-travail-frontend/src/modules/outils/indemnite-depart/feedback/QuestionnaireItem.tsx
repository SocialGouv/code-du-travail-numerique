"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { useState } from "react";
import { FEEDBACK_RESULT } from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { BadIcon } from "./icons/BadIcon";
import { MediumIcon } from "./icons/MediumIcon";
import { GoodIcon } from "./icons/GoodIcon";
import { css } from "@styled-system/css";

type QuestionnaireItemProps = {
  useNumberedScale?: boolean;
  badEventValue?: FEEDBACK_RESULT;
  averageEventValue?: FEEDBACK_RESULT;
  goodEventValue?: FEEDBACK_RESULT;
  badText?: string;
  averageText?: string;
  goodText?: string;
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
  // For numbered scale (1-5)
  values?: [
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
  ];
  labels?: [string, string, string, string, string];
};

export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

export const QuestionnaireItem = ({
  useNumberedScale = false,
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
  values,
  labels,
}: QuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  const fieldsetId = title
    ? `fieldset-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  // Render numbered scale buttons (1-5)
  if (useNumberedScale && values && labels) {
    return (
      <div
        className={`fr.cx("fr-mb-3w", "fr-ml-2v") ${scaleContainer}`}
        data-testid={dataTestId}
      >
        <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
          {title && (
            <legend className={fr.cx("fr-mb-2v")} id={`${fieldsetId}-legend`}>
              {title}
            </legend>
          )}
          <p className={fr.cx("fr-text--sm", "fr-mb-1w")}>
            <span className={desktopLabelStyle}>
              Sur une échelle de 1 à 5, 1 n&apos;est pas clair du tout et 5 est
              très clair.
            </span>
            <span className={mobileLabelStyle}>
              Notez de 1 à 5
              <br />
              (1: Pas clair du tout → 5: Très clair)
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
  }

  // Original 3-button smiley version
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
                onChange(badEventValue!);
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
                onChange(averageEventValue!);
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
                onChange(goodEventValue!);
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

const container = css({
  maxWidth: "600px",
});

const scaleContainer = css({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  marginBottom: "1rem",
});

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
  marginTop: "1rem",
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

const labelLeftStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginRight: "1.25rem",
  width: "120px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const labelRightStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginLeft: "1.25rem",
  width: "120px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const mobileLabelStyle = css({
  display: "none",
  "@media (max-width: 768px)": {
    display: "inline-block",
    fontSize: "0.75rem",
    width: "100%",
  },
});

const desktopLabelStyle = css({
  "@media (max-width: 768px)": {
    display: "none",
  },
});
