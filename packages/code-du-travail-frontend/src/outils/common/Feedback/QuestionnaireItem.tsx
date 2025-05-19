import { Button } from "@socialgouv/cdtn-ui";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";
import { FEEDBACK_RESULT } from "./tracking";

type QuestionnaireItemProps = {
  useNumberedScale?: boolean;
  badEventValue?: FEEDBACK_RESULT;
  averageEventValue?: FEEDBACK_RESULT;
  goodEventValue?: FEEDBACK_RESULT;
  badText?: string;
  averageText?: string;
  goodText?: string;
  className?: string;
  title?: string;
  displayError?: boolean;
  onChange: (status: FEEDBACK_RESULT) => void;
  dataTestId?: string;
  // For numbered scale (1-5)
  values?: [
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
    FEEDBACK_RESULT,
  ];
  labels?: [string, string, string, string, string];
};

export enum Status {
  BAD = "bad",
  AVERAGE = "average",
  GOOD = "good",
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

export const QuestionnaireItem = ({
  useNumberedScale = false,
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
  values,
  labels,
}: QuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<Status>();

  // Render numbered scale buttons (1-5)
  if (useNumberedScale && values && labels) {
    return (
      <Div className={className} data-testId={dataTestId}>
        {title && <strong>{title}</strong>}
        <ScaleDescription>
          Sur une échelle de 1 à 5, 1 n&apos;est pas clair du tout et 5 est très
          clair.
        </ScaleDescription>
        <MobileLabel>(1: Pas clair du tout → 5: Très clair)</MobileLabel>
        <ScaleContainer>
          <LeftLabel>{labels[0]}</LeftLabel>
          <NumberedButtonContainer style={{ justifyContent: "center" }}>
            {[
              Status.ONE,
              Status.TWO,
              Status.THREE,
              Status.FOUR,
              Status.FIVE,
            ].map((buttonStatus, index) => (
              <NumberedButton
                key={buttonStatus}
                variant={status === buttonStatus ? "primary" : "secondary"}
                onClick={() => {
                  setStatus(buttonStatus);
                  onChange(values[index]);
                }}
                data-testId={`${dataTestId}-${buttonStatus}`}
              >
                {index + 1}
              </NumberedButton>
            ))}
          </NumberedButtonContainer>
          <RightLabel>{labels[4]}</RightLabel>
        </ScaleContainer>
        {displayError && (
          <StyledError>Vous devez choisir une des réponses</StyledError>
        )}
      </Div>
    );
  }

  // Original 3-button smiley version
  return (
    <Div className={className} data-testId={dataTestId}>
      {title && <strong>{title}</strong>}
      <ButtonContainer>
        <StyledButton
          variant={status === Status.BAD ? "light" : "naked"}
          onClick={() => {
            setStatus(Status.BAD);
            onChange(badEventValue!);
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
            onChange(averageEventValue!);
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
            onChange(goodEventValue!);
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

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const ScaleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
  max-width: 600px;
`;

const LeftLabel = styled.div`
  font-size: 14px;
  color: ${colors.secondary};
  margin-right: 20px;
  text-align: right;
  width: 130px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightLabel = styled.div`
  font-size: 14px;
  color: ${colors.secondary};
  margin-left: 20px;
  text-align: left;
  width: 130px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NumberedButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0;
  justify-content: space-between;
  width: 340px;

  @media (max-width: 480px) {
    width: 100%;
  }
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

  @media (max-width: 480px) {
    width: 70px;
    height: 55px;
    font-size: 11px;
  }
`;

const NumberedButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  padding: 0;
  margin: 0 5px;
  border: 1px solid ${colors.secondary};
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 16px;
    margin: 0 2px;
    padding: 0;
  }
`;

const ScaleDescription = styled.p`
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: ${colors.secondary};
  text-align: center;
`;

const MobileLabel = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
    text-align: center;
    color: ${colors.secondary};
  }
`;

const LabelText = styled.span`
  font-size: 14px;
  color: ${colors.secondary};
`;

const StyledError = styled.span`
  color: ${colors.error};
`;

const Div = styled.div`
  padding: 0 ${theme.spacings.xmedium} ${theme.spacings.large};
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 0 ${theme.spacings.small} ${theme.spacings.medium};
  }
`;
