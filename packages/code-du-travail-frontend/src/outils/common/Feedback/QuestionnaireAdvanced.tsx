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
              category,
            );
          }
          if (statusExplanation) {
            trackFeedback(
              EVENT_ACTION.RESULT_CLARITY,
              statusExplanation,
              category,
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
