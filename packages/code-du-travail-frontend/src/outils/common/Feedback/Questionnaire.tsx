import styled from "styled-components";
import { Button, Heading, theme } from "@socialgouv/cdtn-ui";

import { QuestionnaireItem } from "./QuestionnaireItem";
import { EVENT_ACTION, FEEDBACK_RESULT, trackFeedback } from "./tracking";
import { useState } from "react";

type QuestionnaireProps = {
  onClick: () => void;
};

export const Questionnaire = ({ onClick }: QuestionnaireProps): JSX.Element => {
  const [status, setStatus] = useState<FEEDBACK_RESULT>();
  const [displayError, setDisplayError] = useState(false);
  return (
    <>
      <Heading variant="primary" stripe="left">
        Comment s&apos;est passée cette simulation pour vous ?
      </Heading>
      <QuestionnaireItem
        badEventValue={FEEDBACK_RESULT.NOT_GOOD}
        averageEventValue={FEEDBACK_RESULT.AVERAGE}
        goodEventValue={FEEDBACK_RESULT.GOOD}
        badText="Pas bien"
        onChange={(status: FEEDBACK_RESULT) => {
          setStatus(status);
          setDisplayError(false);
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

const StyledButton = styled(Button)`
  margin: 0 ${theme.spacings.xmedium};
`;
