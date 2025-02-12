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

export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
}

export const QuestionnaireItem = ({
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
}: QuestionnaireItemProps): JSX.Element => {
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
        >
          <Button
            id={`${fieldsetId}-bad`}
            onClick={() => {
              setStatus(Status.BAD);
              onChange(badEventValue);
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
              <BadIcon width={"32px"} isActive={status === Status.BAD} />
              {badText ?? "Pas bien"}
            </span>
          </Button>
          <Button
            id={`${fieldsetId}-average`}
            onClick={() => {
              setStatus(Status.AVERAGE);
              onChange(averageEventValue);
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
              <MediumIcon width={"32px"} isActive={status === Status.AVERAGE} />
              {averageText ?? "Moyen"}
            </span>
          </Button>
          <Button
            id={`${fieldsetId}-good`}
            onClick={() => {
              setStatus(Status.GOOD);
              onChange(goodEventValue);
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
              <GoodIcon width={"32px"} isActive={status === Status.GOOD} />
              {goodText ?? "Très bien"}
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
});

const selectedStyle = css({
  backgroundColor: "var(--hover)!",
});
