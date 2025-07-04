"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { SmileyQuestionnaireItem } from "./SmileyQuestionnaireItem";
import { useState } from "react";
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

export const Questionnaire = ({
  onClick,
  category,
}: QuestionnaireProps): JSX.Element => {
  const [status, setStatus] = useState<FEEDBACK_RESULT>();
  const [displayError, setDisplayError] = useState(false);
  const { trackFeedback } = useFeedbackEvents();

  return (
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
      <fieldset>
        <legend>
          <h3 className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}>
            Comment s&apos;est passée cette simulation pour vous ?
          </h3>
        </legend>
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
      </fieldset>
      <div
        className={fr.cx("fr-btns-group", "fr-btns-group--inline", "fr-mt-2w")}
      >
        <Button priority="secondary" type="submit">
          Envoyer
        </Button>
      </div>
    </form>
  );
};
