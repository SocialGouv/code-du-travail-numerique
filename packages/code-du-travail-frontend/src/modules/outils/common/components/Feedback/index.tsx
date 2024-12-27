import styled from "styled-components";
import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import { Introduction } from "./introduction";
import { useState } from "react";
import { Questionnaire } from "./Questionnaire";
import { QuestionnaireAdvanced } from "./QuestionnaireAdvanced";
import { QuestionnaireEnd } from "./QuestionnaireEnd";
import { EVENT_CATEGORY } from "./tracking";

type Props = {
  category: EVENT_CATEGORY;
};

export const Feedback = ({ category }: Props): JSX.Element => {
  const [status, setStatus] = useState<
    "questionnaire" | "questionnaireAdvanced" | "questionnaireEnd"
  >();
  const [closed, setClosed] = useState(false);
  const [position, setPosition] = useState(0);
  const [bodyPosition, setBodyPosition] = useState(0);
  const closeButton = (
    <CloseButton
      variant="naked"
      small
      narrow
      title="fermer la modale"
      onClick={() => setClosed(true)}
    >
      <icons.Close
        onClick={() => setClosed(true)}
        data-testid="feedbackCloseButton"
        title="Fermer la modale"
      />
    </CloseButton>
  );
  return !closed ? (
    <Div>
      {!status && (
        <IntroContainer variant="main">
          {closeButton}
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
          {closeButton}
          {status === "questionnaire" && (
            <Questionnaire
              onClick={() => {
                setStatus("questionnaireAdvanced");
              }}
              category={category}
            />
          )}
          {status === "questionnaireAdvanced" && (
            <QuestionnaireAdvanced
              onClick={() => {
                setStatus("questionnaireEnd");
                window.scrollTo(0, position - bodyPosition - 220);
              }}
              category={category}
            />
          )}
          {status === "questionnaireEnd" && <QuestionnaireEnd />}
        </StyledContainer>
      )}
    </Div>
  ) : (
    <></>
  );
};

const { colors, box } = theme;

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IntroContainer = styled.div`
  border: 1px solid ${colors.secondary};
  border-radius: ${box.borderRadius};
  background-color: ${theme.colors.white};
  min-width: 460px;
  max-width: 100%;
  padding: 0;
  position: relative;
`;

const StyledContainer = styled(IntroContainer)`
  width: 520px;
  padding: ${theme.spacings.xmedium} 0;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  color: ${({ theme }) => theme.secondary};
`;
