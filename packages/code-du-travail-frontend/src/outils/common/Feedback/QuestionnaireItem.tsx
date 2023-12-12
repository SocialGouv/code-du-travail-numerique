import { Button } from "@socialgouv/cdtn-ui";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";
import { FEEDBACK_RESULT } from "./tracking";

type QuestionnaireItemProps = {
  badEventValue: FEEDBACK_RESULT;
  averageEventValue: FEEDBACK_RESULT;
  goodEventValue: FEEDBACK_RESULT;
  badText?: string;
  averageText?: string;
  goodText?: string;
  className?: string;
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
};

export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
}

export const QuestionnaireItem = ({
  badEventValue,
  averageEventValue,
  goodEventValue,
  badText,
  averageText,
  goodText,
  className,
  title,
  displayError,
  onChange,
  dataTestId,
}: QuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();
  return (
    <Div className={className} data-testId={dataTestId}>
      {title && <strong>{title}</strong>}
      <ButtonContainer>
        <StyledButton
          variant={status === Status.BAD ? "light" : "naked"}
          onClick={() => {
            setStatus(Status.BAD);
            onChange(badEventValue);
          }}
          data-testId={`${dataTestId}-bad`}
        >
          <icons.Bad width="32px" />
          {badText ?? "Pas bien"}
        </StyledButton>
        <StyledButton
          variant={status === Status.AVERAGE ? "light" : "naked"}
          onClick={() => {
            setStatus(Status.AVERAGE);
            onChange(averageEventValue);
          }}
          data-testId={`${dataTestId}-average`}
        >
          <icons.Medium width="32px" />
          {averageText ?? "Moyen"}
        </StyledButton>
        <StyledButton
          variant={status === Status.GOOD ? "light" : "naked"}
          onClick={() => {
            setStatus(Status.GOOD);
            onChange(goodEventValue);
          }}
          data-testId={`${dataTestId}-good`}
        >
          <icons.Good width="32px" />
          {goodText ?? "Très bien"}
        </StyledButton>
      </ButtonContainer>
      {displayError && (
        <StyledError>Vous devez choisir une des réponses</StyledError>
      )}
    </Div>
  );
};

const { colors } = theme;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0;
  max-width: 300px;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 60px;
  padding: 0;
  border: 1px solid ${colors.secondary};
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
`;

const StyledError = styled.span`
  color: ${colors.error};
`;

const Div = styled.div`
  padding: 0 ${theme.spacings.xmedium} ${theme.spacings.large};
`;
