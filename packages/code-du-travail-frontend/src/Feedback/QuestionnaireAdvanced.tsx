import { Button, Heading } from "@socialgouv/cdtn-ui";
import { QuestionnaireItem } from "./QuestionnaireItem";
import { QuestionnaireText } from "./QuestionnaireText";
import styled from "styled-components";
import { useState } from "react";

type QuestionnaireAdvancedProps = {
  onClick: () => void;
};

export const QuestionnaireAdvanced = ({
  onClick,
}: QuestionnaireAdvancedProps): JSX.Element => {
  const [dirtySimulator, setDirtySimulator] = useState(false);
  const [displayErrorSimulator, setDisplayErrorSimulator] = useState(false);
  const [dirtyQuestion, setDirtyQuestion] = useState(false);
  const [displayErrorQuestion, setDisplayErrorQuestion] = useState(false);
  const [dirtyExplanation, setDirtyExplanation] = useState(false);
  const [displayErrorExplanation, setDisplayErrorExplanation] = useState(false);
  return (
    <>
      <Heading variant="primary" stripe="left">
        Merci pour votre aide ! Pouvez-vous nous en dire plus ?
      </Heading>
      <FormContainer>
        <StyledQuestionnaireItem
          title="Le simulateur était-il facile à utiliser ?"
          badText="Pas du tout"
          goodText="Facile"
          isDirty={(isDirty) => {
            setDirtySimulator(isDirty);
            setDisplayErrorSimulator(!isDirty);
          }}
          displayError={displayErrorSimulator}
        ></StyledQuestionnaireItem>
        <StyledQuestionnaireItem
          title="Les questions étaient-elles claires et compréhensible ?"
          badText="Pas du tout"
          goodText="Oui"
          isDirty={(isDirty) => {
            setDirtyQuestion(isDirty);
            setDisplayErrorQuestion(!isDirty);
          }}
          displayError={displayErrorQuestion}
        ></StyledQuestionnaireItem>
        <StyledQuestionnaireItem
          title="Les explications du résultat obtenu étaient-elles claires et compréhensible ?"
          badText="Pas du tout"
          goodText="Oui"
          isDirty={(isDirty) => {
            setDirtyExplanation(isDirty);
            setDisplayErrorExplanation(!isDirty);
          }}
          displayError={displayErrorExplanation}
        ></StyledQuestionnaireItem>
        <QuestionnaireText
          title="Vous souhaitez nous en dire davantage ?"
          placeholder="ex: la question sur la date de début du contrat n'est pas claire"
        ></QuestionnaireText>
      </FormContainer>
      <StyledButton
        variant="primary"
        onClick={() => {
          if (!dirtySimulator) {
            setDisplayErrorSimulator(true);
          } else if (!dirtyQuestion) {
            setDisplayErrorQuestion(true);
          } else if (!dirtyExplanation) {
            setDisplayErrorExplanation(true);
          } else {
            onClick();
          }
        }}
      >
        Envoyer
      </StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 12px auto 24px 24px;
`;

const FormContainer = styled.div`
  padding: 0 24px;
`;

const StyledQuestionnaireItem = styled(QuestionnaireItem)`
  margin: 24px 0;
`;
