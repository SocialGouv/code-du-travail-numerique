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
  const [position, setPosition] = useState(0);
  const [bodyPosition, setBodyPosition] = useState(0);
  return !closed ? (
    <>
      {!status && (
        <IntroContainer variant="main">
          <StyledCloseIcon
            onClick={() => setClosed(true)}
            data-testid="feedbackCloseButton"
          />
          <Introduction
            onClick={() => {
              setStatus("questionnaire");
            }}
          />
        </IntroContainer>
      )}
      {status && (
        <StyledContainer
          variant="main"
          ref={(el) => {
            if (!el) return;

            setPosition(el.getBoundingClientRect().top);
            setBodyPosition(document.body.getBoundingClientRect().top);
          }}
        >
          <StyledCloseIcon
            onClick={() => setClosed(true)}
            data-testid="feedbackCloseButton"
          />
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
                window.scrollTo(0, position - bodyPosition - 220);
              }}
            />
          )}
          {status === "questionnaireEnd" && <QuestionnaireEnd />}
        </StyledContainer>
      )}
    </>
  ) : (
    <></>
  );
};

const { colors } = theme;

const IntroContainer = styled(Wrapper)`
  border: 1px solid ${colors.secondary};
  border-radius: 6px;
  width: 460px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 42px 0 0 auto;
  padding: 0 0 28px 0 !important;
  position: relative;
`;

const StyledContainer = styled(IntroContainer)`
  width: 520px;
`;

const StyledCloseIcon = styled(icons.Close)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  cursor: pointer;
  z-index: 10;
`;
