"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { QuestionnaireItem } from "./QuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import { useState } from "react";
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

export const QuestionnaireAdvanced = ({
  onClick,
  category,
}: QuestionnaireAdvancedProps): React.ReactElement => {
  const path = usePathname();
  const [statusSimulator, setStatusSimulator] = useState<FEEDBACK_RESULT>();
  const [statusQuestion, setStatusQuestion] = useState<FEEDBACK_RESULT>();
  const [statusExplanation, setStatusExplanation] = useState<FEEDBACK_RESULT>();
  const [feedbackText, setFeedbackText] = useState<string>();
  const { trackFeedback, trackFeedbackText } = useFeedbackEvents();

  return (
    <div>
      <h3 className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}>
        Merci pour votre aide ! Pouvez-vous nous en dire plus ?
      </h3>
      <div>
        <QuestionnaireItem
          badEventValue={FEEDBACK_RESULT.NOT_AT_ALL}
          averageEventValue={FEEDBACK_RESULT.AVERAGE}
          goodEventValue={FEEDBACK_RESULT.EASY}
          title="Le simulateur était-il facile à utiliser ?"
          badText="Pas du tout"
          goodText="Facile"
          onChange={(status) => {
            setStatusSimulator(status);
          }}
          dataTestId="simulator"
        />
        <QuestionnaireItem
          badEventValue={FEEDBACK_RESULT.NOT_AT_ALL}
          averageEventValue={FEEDBACK_RESULT.AVERAGE}
          goodEventValue={FEEDBACK_RESULT.YES}
          title="Les questions étaient-elles claires et compréhensibles ?"
          badText="Pas du tout"
          goodText="Oui"
          onChange={(status) => {
            setStatusQuestion(status);
          }}
          dataTestId="questionClarity"
        />
        <QuestionnaireItem
          badEventValue={FEEDBACK_RESULT.NOT_AT_ALL}
          averageEventValue={FEEDBACK_RESULT.AVERAGE}
          goodEventValue={FEEDBACK_RESULT.YES}
          title="Les explications du résultat obtenu étaient-elles claires et compréhensibles ?"
          badText="Pas du tout"
          goodText="Oui"
          onChange={(status) => {
            setStatusExplanation(status);
          }}
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
};
