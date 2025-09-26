"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { NumberedScaleQuestionnaireItem } from "./NumberedScaleQuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import React, { forwardRef, useState, useEffect, useRef } from "react";
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
  const [displayErrorSimulator, setDisplayErrorSimulator] = useState(false);
  const [displayErrorQuestion, setDisplayErrorQuestion] = useState(false);
  const [displayErrorExplanation, setDisplayErrorExplanation] = useState(false);
  const { trackFeedback, trackFeedbackText } = useFeedbackEvents();
  const formRef = useRef<HTMLFormElement>(null);

  // Focus sur le titre quand le composant est monté
  useEffect(() => {
    if (ref && "current" in ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  // Helper function to focus on error field by id
  const focusErrorField = (id: string): boolean => {
    const errorField = formRef.current?.querySelector(
      `[id="${id}"] [aria-invalid="true"]`
    ) as HTMLElement;
    if (errorField) {
      errorField.focus();
      return true;
    }
    return false;
  };

  // Gestion du focus sur les erreurs
  useEffect(() => {
    setTimeout(() => {
      // Focus sur la première erreur dans l'ordre d'apparition
      if (displayErrorSimulator && focusErrorField("simulator")) {
        return;
      }
      if (displayErrorQuestion && focusErrorField("questionClarity")) {
        return;
      }
      if (displayErrorExplanation && focusErrorField("resultClarity")) {
        return;
      }
    }, 100);
  }, [displayErrorSimulator, displayErrorQuestion, displayErrorExplanation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset des erreurs
    setDisplayErrorSimulator(false);
    setDisplayErrorQuestion(false);
    setDisplayErrorExplanation(false);

    // Validation : au moins une des trois premières questions doit être remplie
    const hasAtLeastOneAnswer =
      statusSimulator || statusQuestion || statusExplanation;

    if (!hasAtLeastOneAnswer) {
      // Affiche les erreurs sur toutes les questions obligatoires
      setDisplayErrorSimulator(true);
      setDisplayErrorQuestion(true);
      setDisplayErrorExplanation(true);
      return;
    }

    // Envoi des données si validation OK
    if (statusSimulator) {
      trackFeedback(EVENT_ACTION.EASINESS, statusSimulator, category);
    }
    if (statusQuestion) {
      trackFeedback(EVENT_ACTION.QUESTION_CLARITY, statusQuestion, category);
    }
    if (statusExplanation) {
      trackFeedback(EVENT_ACTION.RESULT_CLARITY, statusExplanation, category);
    }
    if (feedbackText && path) {
      trackFeedbackText(feedbackText, path, category);
    }

    onClick();
  };

  return (
    <div>
      <h2
        ref={ref}
        tabIndex={-1}
        className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}
      >
        Merci pour votre aide&nbsp;! Pouvez-vous nous en dire plus&nbsp;?
      </h2>
      <p className={fr.cx("fr-text--sm", "fr-mb-3w")}>
        Veuillez répondre à au moins une des questions ci-dessous.
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
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
            setDisplayErrorSimulator(false);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas facile du tout et 5 est
            très facile."
          id="simulator"
          displayError={displayErrorSimulator}
          shouldFocusOnError
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
            setDisplayErrorQuestion(false);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas clair du tout et 5 est
            très clair."
          id="questionClarity"
          displayError={displayErrorQuestion}
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
            setDisplayErrorExplanation(false);
          }}
          hint="Sur une échelle de 1 à 5, 1 n'est pas clair du tout et 5 est
            très clair."
          id="resultClarity"
          displayError={displayErrorExplanation}
        />
        <QuestionnaireText
          title="Vous souhaitez nous en dire davantage ?"
          placeholder="Exemple: la question sur la date de début du contrat n'est pas claire"
          onChange={setFeedbackText}
          id="more-input"
        />
        <div
          className={fr.cx(
            "fr-btns-group",
            "fr-btns-group--inline",
            "fr-mt-2w"
          )}
        >
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </div>
  );
});

QuestionnaireAdvanced.displayName = "SatisfactionQuestionnaireAdvanced";
