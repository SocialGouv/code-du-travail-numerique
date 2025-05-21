import { Button, Heading, theme } from "@socialgouv/cdtn-ui";
import { QuestionnaireItem } from "./QuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import styled from "styled-components";
import { useState } from "react";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  FEEDBACK_RESULT,
  trackFeedback,
  trackFeedbackText,
} from "./tracking";
import { useRouter } from "next/router";

type QuestionnaireAdvancedProps = {
  onClick: () => void;
  category: EVENT_CATEGORY;
};

export const QuestionnaireAdvanced = ({
  onClick,
  category,
}: QuestionnaireAdvancedProps): React.ReactElement => {
  const router = useRouter();
  const [statusSimulator, setStatusSimulator] = useState<FEEDBACK_RESULT>();
  const [statusQuestion, setStatusQuestion] = useState<FEEDBACK_RESULT>();
  const [statusExplanation, setStatusExplanation] = useState<FEEDBACK_RESULT>();
  const [feedbackText, setFeedbackText] = useState<string>();
  return (
    <>
      <Heading variant="primary" stripe="left">
        Merci pour votre aide ! Pouvez-vous nous en dire plus ?
      </Heading>
      <div>
        <QuestionnaireItem
          useNumberedScale={true}
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
          dataTestId="simulator"
        />
        <QuestionnaireItem
          useNumberedScale={true}
          title="Qu'avez-vous pensé des informations et des instructions fournies ?"
          values={[
            FEEDBACK_RESULT.ONE,
            FEEDBACK_RESULT.TWO,
            FEEDBACK_RESULT.THREE,
            FEEDBACK_RESULT.FOUR,
            FEEDBACK_RESULT.FIVE,
          ]}
          labels={["Pas clair du tout", "", "", "", "Très clair"]}
          onChange={(status) => {
            setStatusQuestion(status);
          }}
          dataTestId="questionClarity"
        />
        <QuestionnaireItem
          useNumberedScale={true}
          title="Que pensez-vous des explications du résultat obtenu ?"
          values={[
            FEEDBACK_RESULT.ONE,
            FEEDBACK_RESULT.TWO,
            FEEDBACK_RESULT.THREE,
            FEEDBACK_RESULT.FOUR,
            FEEDBACK_RESULT.FIVE,
          ]}
          labels={["Pas clair du tout", "", "", "", "Très clair"]}
          onChange={(status) => {
            setStatusExplanation(status);
          }}
          dataTestId="resultClarity"
        />
        <QuestionnaireText
          title="Vous souhaitez nous en dire davantage ?"
          placeholder="ex: la question sur la date de début du contrat n'est pas claire"
          onChange={setFeedbackText}
          dataTestId="more-input"
        />
      </div>
      <StyledButton
        variant="primary"
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
          if (feedbackText) {
            trackFeedbackText(feedbackText, router.asPath, category);
          }
          onClick();
        }}
      >
        Envoyer
      </StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 0 ${theme.spacings.xmedium};
`;
