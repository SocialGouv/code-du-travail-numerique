import styled from "styled-components";
import { Button, Heading } from "@socialgouv/cdtn-ui";

import { QuestionnaireItem } from "./QuestionnaireItem";
import { useState } from "react";

type QuestionnaireProps = {
  onClick: () => void;
};

export const Questionnaire = ({ onClick }: QuestionnaireProps): JSX.Element => {
  const [dirty, setDirty] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  return (
    <>
      <Heading variant="primary" stripe="left">
        Comment s&apos;est passée cette simulation pour vous ?
      </Heading>
      <StyledQuestionnaireItem
        badText="Pas bien"
        isDirty={(isDirty) => {
          setDirty(isDirty);
          setDisplayError(!isDirty);
        }}
        displayError={displayError}
      />
      <StyledButton
        onClick={() => {
          if (!dirty) {
            setDisplayError(true);
          } else {
            onClick();
          }
        }}
        variant="primary"
      >
        Envoyer
      </StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 12px auto 24px 24px;
`;

const StyledQuestionnaireItem = styled(QuestionnaireItem)`
  padding: 24px;
`;
