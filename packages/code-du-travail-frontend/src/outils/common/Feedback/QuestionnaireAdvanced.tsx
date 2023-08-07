import { Button, Heading } from "@socialgouv/cdtn-ui";
import { QuestionnaireItem } from "./QuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import styled from "styled-components";
import { useState } from "react";
import {
  trackFeedback,
  trackFeedbackText,
  FEEDBACK_RESULT,
  EVENT_ACTION,
} from "./tracking";
import { useRouter } from "next/router";

type QuestionnaireAdvancedProps = {
  onClick: () => void;
};

export const QuestionnaireAdvanced = ({
  onClick,
}: QuestionnaireAdvancedProps): React.ReactElement => {
  const router = useRouter();
  const [statusSimulator, setStatusSimulator] = useState<FEEDBACK_RESULT>();
  const [statusQuestion, setStatusQuestion] = useState<FEEDBACK_RESULT>();
  const [statusExplanation, setStatusExplanation] = useState<FEEDBACK_RESULT>();
  const [feedbackText, setFeedbackText] = useState<string>();
  return (
    <>
      <StyledHeading variant="primary" stripe="left">
        Merci pour votre aide ! Pouvez-vous nous en dire plus ?
      </StyledHeading>
      <FormContainer>
        <StyledQuestionnaireItem
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
        <StyledQuestionnaireItem
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
        <StyledQuestionnaireItem
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
      </FormContainer>
      <StyledButton
        variant="primary"
        onClick={() => {
          if (statusSimulator) {
            trackFeedback(EVENT_ACTION.EASINESS, statusSimulator);
          }
          if (statusQuestion) {
            trackFeedback(EVENT_ACTION.QUESTION_CLARITY, statusQuestion);
          }
          if (statusExplanation) {
            trackFeedback(EVENT_ACTION.RESULT_CLARITY, statusExplanation);
          }
          if (feedbackText) {
            trackFeedbackText(feedbackText, router.asPath);
          }
          onClick();
        }}
      >
        Envoyer
      </StyledButton>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-left: 0;
  margin-bottom: 0;
  padding-top: 6px;
`;

const StyledButton = styled(Button)`
  margin: 12px auto 24px 24px;
`;

const FormContainer = styled.div`
  padding: 0 24px;
`;

const StyledQuestionnaireItem = styled(QuestionnaireItem)`
  margin: 24px 0;
`;