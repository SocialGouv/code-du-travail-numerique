"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { SmileyQuestionnaireItem } from "./SmileyQuestionnaireItem";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  FEEDBACK_RESULT,
  useFeedbackEvents,
} from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";

type QuestionnaireProps = {
  onClick: () => void;
  category: EVENT_CATEGORY;
};

export const Questionnaire = forwardRef<HTMLHeadingElement, QuestionnaireProps>(
  ({ onClick, category }, ref): React.ReactElement => {
    const [status, setStatus] = useState<FEEDBACK_RESULT>();
    const [displayError, setDisplayError] = useState(false);
    const { trackFeedback } = useFeedbackEvents();

    // Focus sur le message d'erreur ou le premier radio button quand l'erreur apparaît
    useEffect(() => {
      if (displayError) {
        setTimeout(() => {
          const errorElement = document.getElementById(
            "fieldset-satisfaction-error"
          );
          const firstRadio = document.querySelector(
            "#fieldset-satisfaction-bad"
          ) as HTMLInputElement;

          if (errorElement) {
            // Focus sur le message d'erreur s'il existe
            errorElement.focus();
          } else if (firstRadio) {
            // Sinon focus sur le premier radio button
            firstRadio.focus();
          }
        }, 100);
      }
    }, [displayError]);

    return (
      <div>
        <h2
          ref={ref}
          tabIndex={-1}
          className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}
        >
          Comment s&apos;est passée cette simulation pour vous ?
        </h2>
        <form
          onSubmit={(e) => {
            if (!status) {
              setDisplayError(true);
              e.preventDefault();
            } else {
              trackFeedback(EVENT_ACTION.GLOBAL, status, category);
              onClick();
            }
          }}
        >
          <SmileyQuestionnaireItem
            badEventValue={FEEDBACK_RESULT.NOT_GOOD}
            averageEventValue={FEEDBACK_RESULT.AVERAGE}
            goodEventValue={FEEDBACK_RESULT.GOOD}
            onChange={(status: FEEDBACK_RESULT) => {
              setStatus(status);
              setDisplayError(false);
            }}
            displayError={displayError}
          />
          <div
            className={fr.cx(
              "fr-btns-group",
              "fr-btns-group--inline",
              "fr-mt-2w"
            )}
          >
            <Button
              priority="secondary"
              type="submit"
              nativeButtonProps={{ "aria-disabled": displayError }}
            >
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

Questionnaire.displayName = "SatisfactionQuestionnaire";
