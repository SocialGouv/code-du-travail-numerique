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
      <div className={fr.cx("fr-mb-3w", "fr-ml-2v")} data-testid={dataTestId}>
        <fieldset className={fr.cx("fr-fieldset")} id={fieldsetId}>
          {title && (
            <legend className={fr.cx("fr-mb-2v")} id={`${fieldsetId}-legend`}>
              {title}
            </legend>
          )}
          <p
            className={fr.cx("fr-text--sm", "fr-mb-1w")}
            style={{ textAlign: "center" }}
          >
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
                  onClick={() => {
                    setStatus(buttonStatus);
                    onChange(values[index]);
                  }}
                  className={`${numberButtonStyle} ${status === buttonStatus ? selectedStyle : ""}`}
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
          style={{ justifyContent: "center" }}
        >
          <Button
            id={`${fieldsetId}-bad`}
            onClick={() => {
              setStatus(Status.BAD);
              onChange(badEventValue!);
            }}
            className={status === Status.BAD ? selectedStyle : ""}
            data-testid={`${dataTestId}-bad`}
            priority="secondary"
            type="button"
            aria-pressed={status === Status.BAD}
            aria-label={`Noter ${badText ?? "Pas bien"}${
              status === Status.BAD ? " (sélectionné)" : ""
            }`}
          >
            <span className={buttonContentStyle}>
              <BadIcon width={"24px"} isActive={status === Status.BAD} />
              <span
                style={{
                  fontSize: window.innerWidth <= 480 ? "11px" : "inherit",
                  lineHeight: window.innerWidth <= 480 ? "1.1" : "inherit",
                }}
              >
                {badText ?? "Pas bien"}
              </span>
            </span>
          </Button>
          <Button
            id={`${fieldsetId}-average`}
            onClick={() => {
              setStatus(Status.AVERAGE);
              onChange(averageEventValue!);
            }}
            className={status === Status.AVERAGE ? selectedStyle : ""}
            data-testid={`${dataTestId}-average`}
            priority="secondary"
            type="button"
            aria-pressed={status === Status.AVERAGE}
            aria-label={`Noter ${averageText ?? "Moyen"}${
              status === Status.AVERAGE ? " (sélectionné)" : ""
            }`}
          >
            <span className={buttonContentStyle}>
              <MediumIcon width={"24px"} isActive={status === Status.AVERAGE} />
              <span
                style={{
                  fontSize: window.innerWidth <= 480 ? "11px" : "inherit",
                  lineHeight: window.innerWidth <= 480 ? "1.1" : "inherit",
                }}
              >
                {averageText ?? "Moyen"}
              </span>
            </span>
          </Button>
          <Button
            id={`${fieldsetId}-good`}
            onClick={() => {
              setStatus(Status.GOOD);
              onChange(goodEventValue!);
            }}
            className={status === Status.GOOD ? selectedStyle : ""}
            data-testid={`${dataTestId}-good`}
            priority="secondary"
            type="button"
            aria-pressed={status === Status.GOOD}
            aria-label={`Noter ${goodText ?? "Très bien"}${
              status === Status.GOOD ? " (sélectionné)" : ""
            }`}
          >
            <span className={buttonContentStyle}>
              <GoodIcon width={"24px"} isActive={status === Status.GOOD} />
              <span
                style={{
                  fontSize: window.innerWidth <= 480 ? "11px" : "inherit",
                  lineHeight: window.innerWidth <= 480 ? "1.1" : "inherit",
                }}
              >
                {goodText ?? "Très bien"}
              </span>
            </span>
          </Button>
        </div>
      </fieldset>
      {displayError && (
        <p className="fr-error-text">Vous devez choisir une des réponses</p>
      )}
    </div>
  );
};

const buttonContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  "@media (max-width: 480px)": {
    gap: "0.25rem",
  },
});

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
  justifyContent: "center",
  width: "100%",
  maxWidth: "600px",
  marginBottom: "1rem",
});

const labelLeftStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginRight: "1.25rem",
  textAlign: "right",
  width: "130px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const labelRightStyle = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginLeft: "1.25rem",
  textAlign: "left",
  width: "130px",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const numberStyle = css({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const labelRangeStyle = css({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  marginBottom: "0.5rem",
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
