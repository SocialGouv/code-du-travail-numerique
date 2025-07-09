"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { NumberedScaleQuestionnaireItem } from "./NumberedScaleQuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import React, { forwardRef, useState } from "react";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  FEEDBACK_RESULT,
  useFeedbackEvents,
} from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { usePathname } from "next/navigation";

type QuestionnaireAdvancedProps = {
  onClick: () => void;
  category: EVENT_CATEGORY;
};

export const QuestionnaireAdvanced = forwardRef<
  HTMLHeadingElement,
  QuestionnaireAdvancedProps
>(({ onClick, category }, ref): React.ReactElement => {
  const path = usePathname();
  const [statusSimulator, setStatusSimulator] = useState<FEEDBACK_RESULT>();
  const [statusQuestion, setStatusQuestion] = useState<FEEDBACK_RESULT>();
  const [statusExplanation, setStatusExplanation] = useState<FEEDBACK_RESULT>();
  const [feedbackText, setFeedbackText] = useState<string>();
  const { trackFeedback, trackFeedbackText } = useFeedbackEvents();

  return (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}
      >
        Merci pour votre aide&nbsp;! Pouvez-vous nous en dire plus&nbsp;?
      </h2>
      <div>
        <NumberedScaleQuestionnaireItem
          title="Que pensez-vous de l'utilisation du simulateur ?"
          values={[
            FEEDBACK_RESULT.ONE,
            FEEDBACK_RESULT.TWO,
            FEEDBACK_RESULT.THREE,
            FEEDBACK_RESULT.FOUR,
            FEEDBACK_RESULT.FIVE,
          ]}
          labels={["Pas facile du tout", "", "", "", "Très facile"]}
          onChange={(status) => {
            setStatusSimulator(status);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas facile du tout et 5 est
            très facile."
          dataTestId="simulator"
        />
        <NumberedScaleQuestionnaireItem
          title="Qu'avez-vous pensé des informations et des instructions fournies ?"
          values={[
            FEEDBACK_RESULT.ONE,
            FEEDBACK_RESULT.TWO,
            FEEDBACK_RESULT.THREE,
            FEEDBACK_RESULT.FOUR,
            FEEDBACK_RESULT.FIVE,
          ]}
          labels={["Pas claires du tout", "", "", "", "Très claires"]}
          onChange={(status) => {
            setStatusQuestion(status);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas clair du tout et 5 est
            très clair."
          dataTestId="questionClarity"
        />
        <NumberedScaleQuestionnaireItem
          title="Que pensez-vous des explications du résultat obtenu ?"
          values={[
            FEEDBACK_RESULT.ONE,
            FEEDBACK_RESULT.TWO,
            FEEDBACK_RESULT.THREE,
            FEEDBACK_RESULT.FOUR,
            FEEDBACK_RESULT.FIVE,
          ]}
          labels={["Pas claires du tout", "", "", "", "Très claires"]}
          onChange={(status) => {
            setStatusExplanation(status);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas clair du tout et 5 est
            très clair."
          dataTestId="resultClarity"
        />
        <QuestionnaireText
          title="Vous souhaitez nous en dire davantage ?"
          placeholder="Exemple: la question sur la date de début du contrat n'est pas claire"
          onChange={setFeedbackText}
          dataTestId="more-input"
        />
      </div>
      <div
        className={fr.cx("fr-btns-group", "fr-btns-group--inline", "fr-mt-2w")}
      >
        <Button
          onClick={() => {
            if (statusSimulator) {
              trackFeedback(EVENT_ACTION.EASINESS, statusSimulator, category);
            }
            if (statusQuestion) {
              trackFeedback(
                EVENT_ACTION.QUESTION_CLARITY,
                statusQuestion,
                category
              );
            }
            if (statusExplanation) {
              trackFeedback(
                EVENT_ACTION.RESULT_CLARITY,
                statusExplanation,
                category
              );
            }
            if (feedbackText && path) {
              trackFeedbackText(feedbackText, path, category);
            }
            onClick();
          }}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
});

QuestionnaireAdvanced.displayName = "SatisfactionQuestionnaireAdvanced";
