import styled from "styled-components";
import { theme, icons, Wrapper } from "@socialgouv/cdtn-ui";
import { Introduction } from "./introduction";
import { useState } from "react";
import { Questionnaire } from "./Questionnaire";
import { QuestionnaireAdvanced } from "./QuestionnaireAdvanced";
import { QuestionnaireEnd } from "./QuestionnaireEnd";

export const Feedback = (): JSX.Element => {
  const [status, setStatus] = useState<
    "questionnaire" | "questionnaireAdvanced" | "questionnaireEnd"
  >();
  const [closed, setClosed] = useState(false);
  return !closed ? (
    <StyledContainer variant="main">
      <StyledCloseIcon
        onClick={() => setClosed(true)}
        data-testid="feedbackCloseButton"
      />
      {!status && (
        <Introduction
          onClick={() => {
            setStatus("questionnaire");
          }}
        />
      )}
      {status === "questionnaire" && (
        <Questionnaire
          onClick={() => {
            setStatus("questionnaireAdvanced");
          }}
        />
      )}
      {status === "questionnaireAdvanced" && (
        <QuestionnaireAdvanced
          onClick={() => {
            setStatus("questionnaireEnd");
          }}
        />
      )}
      {status === "questionnaireEnd" && <QuestionnaireEnd />}
    </StyledContainer>
  ) : (
    <></>
  );
};

const { colors } = theme;

const StyledContainer = styled(Wrapper)`
  border: 2px solid ${colors.secondary};
  border-radius: 6px;
  width: 520px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 42px 0 0 auto;
  padding: 0 0 28px 0 !important;
  position: relative;
`;

const StyledCloseIcon = styled(icons.Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  cursor: pointer;
`;
