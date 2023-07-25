import styled from "styled-components";
import { Button, Heading } from "@socialgouv/cdtn-ui";

import { QuestionnaireItem, Status } from "./QuestionnaireItem";
import { trackFeedback, EVENT_ACTION, FEEDBACK_RESULT } from "./tracking";
import { useState } from "react";

type QuestionnaireProps = {
  onClick: () => void;
};

export const Questionnaire = ({ onClick }: QuestionnaireProps): JSX.Element => {
  const [status, setStatus] = useState<FEEDBACK_RESULT>();
  const [displayError, setDisplayError] = useState(false);
  return (
    <>
      <StyledHeading variant="primary" stripe="left">
        Comment s&apos;est passée cette simulation pour vous ?
      </StyledHeading>
      <StyledQuestionnaireItem
        badEventValue={FEEDBACK_RESULT.NOT_GOOD}
        averageEventValue={FEEDBACK_RESULT.AVERAGE}
        goodEventValue={FEEDBACK_RESULT.GOOD}
        badText="Pas bien"
        onChange={(status: FEEDBACK_RESULT) => {
          setDisplayError(false);
          setStatus(status);
        }}
        displayError={displayError}
      />
      <StyledButton
        onClick={() => {
          if (!status) {
            setDisplayError(true);
          } else {
            trackFeedback(EVENT_ACTION.GLOBAL, status);
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

const StyledHeading = styled(Heading)`
  margin-left: 0 !important;
`;

const StyledButton = styled(Button)`
  margin: 12px auto 24px 24px;
`;

const StyledQuestionnaireItem = styled(QuestionnaireItem)`
  padding: 24px;
`;
