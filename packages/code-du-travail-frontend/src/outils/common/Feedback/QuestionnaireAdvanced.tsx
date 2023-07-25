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

type QuestionnaireAdvancedProps = {
  onClick: () => void;
};

export const QuestionnaireAdvanced = ({
  onClick,
}: QuestionnaireAdvancedProps): JSX.Element => {
  const [statusSimulator, setStatusSimulator] = useState<FEEDBACK_RESULT>();
  const [displayErrorSimulator, setDisplayErrorSimulator] = useState(false);
  const [statusQuestion, setStatusQuestion] = useState<FEEDBACK_RESULT>();
  const [displayErrorQuestion, setDisplayErrorQuestion] = useState(false);
  const [statusExplanation, setStatusExplanation] = useState<FEEDBACK_RESULT>();
  const [displayErrorExplanation, setDisplayErrorExplanation] = useState(false);
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
            setDisplayErrorSimulator(false);
          }}
          displayError={displayErrorSimulator}
        ></StyledQuestionnaireItem>
        <StyledQuestionnaireItem
          badEventValue={FEEDBACK_RESULT.NOT_AT_ALL}
          averageEventValue={FEEDBACK_RESULT.AVERAGE}
          goodEventValue={FEEDBACK_RESULT.YES}
          title="Les questions étaient-elles claires et compréhensible ?"
          badText="Pas du tout"
          goodText="Oui"
          onChange={(status) => {
            setStatusQuestion(status);
            setDisplayErrorQuestion(false);
          }}
          displayError={displayErrorQuestion}
        ></StyledQuestionnaireItem>
        <StyledQuestionnaireItem
          badEventValue={FEEDBACK_RESULT.NOT_AT_ALL}
          averageEventValue={FEEDBACK_RESULT.AVERAGE}
          goodEventValue={FEEDBACK_RESULT.YES}
          title="Les explications du résultat obtenu étaient-elles claires et compréhensible ?"
          badText="Pas du tout"
          goodText="Oui"
          onChange={(status) => {
            setStatusExplanation(status);
            setDisplayErrorExplanation(false);
          }}
          displayError={displayErrorExplanation}
        ></StyledQuestionnaireItem>
        <QuestionnaireText
          title="Vous souhaitez nous en dire davantage ?"
          placeholder="ex: la question sur la date de début du contrat n'est pas claire"
          onChange={setFeedbackText}
        ></QuestionnaireText>
      </FormContainer>
      <StyledButton
        variant="primary"
        onClick={() => {
          if (!statusSimulator) {
            setDisplayErrorSimulator(true);
          } else if (!statusQuestion) {
            setDisplayErrorQuestion(true);
          } else if (!statusExplanation) {
            setDisplayErrorExplanation(true);
          } else {
            trackFeedback(EVENT_ACTION.EASINESS, statusSimulator);
            trackFeedback(EVENT_ACTION.QUESTION_CLARITY, statusQuestion);
            trackFeedback(EVENT_ACTION.RESULT_CLARITY, statusExplanation);
            if (feedbackText) {
              trackFeedbackText(feedbackText);
            }
            onClick();
          }
        }}
      >
        Envoyer
      </StyledButton>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-left: 0 !important;
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
