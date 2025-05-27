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
      <RadioContainer>
        <RadioCard isSelected={status === Status.BAD}>
          <RadioInput
            type="radio"
            name={dataTestId || "feedback"}
            id={`${dataTestId}-bad`}
            checked={status === Status.BAD}
            onChange={() => {
              setStatus(Status.BAD);
              onChange(badEventValue!);
            }}
            data-testId={`${dataTestId}-bad`}
          />
          <RadioLabel htmlFor={`${dataTestId}-bad`}>
            <RadioContent>
              <icons.Bad width="32px" />
              <RadioText>{badText ?? "Pas bien"}</RadioText>
            </RadioContent>
          </RadioLabel>
        </RadioCard>

        <RadioCard isSelected={status === Status.AVERAGE}>
          <RadioInput
            type="radio"
            name={dataTestId || "feedback"}
            id={`${dataTestId}-average`}
            checked={status === Status.AVERAGE}
            onChange={() => {
              setStatus(Status.AVERAGE);
              onChange(averageEventValue!);
            }}
            data-testId={`${dataTestId}-average`}
          />
          <RadioLabel htmlFor={`${dataTestId}-average`}>
            <RadioContent>
              <icons.Medium width="32px" />
              <RadioText>{averageText ?? "Moyen"}</RadioText>
            </RadioContent>
          </RadioLabel>
        </RadioCard>

        <RadioCard isSelected={status === Status.GOOD}>
          <RadioInput
            type="radio"
            name={dataTestId || "feedback"}
            id={`${dataTestId}-good`}
            checked={status === Status.GOOD}
            onChange={() => {
              setStatus(Status.GOOD);
              onChange(goodEventValue!);
            }}
            data-testId={`${dataTestId}-good`}
          />
          <RadioLabel htmlFor={`${dataTestId}-good`}>
            <RadioContent>
              <icons.Good width="32px" />
              <RadioText>{goodText ?? "Très bien"}</RadioText>
            </RadioContent>
          </RadioLabel>
        </RadioCard>
      </RadioContainer>
      {displayError && (
        <StyledError>Vous devez choisir une des réponses</StyledError>
      )}
    </Div>
  );
};

const { colors } = theme;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const RadioCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid
    ${(props) => (props.isSelected ? colors.primary : colors.border)};
  border-radius: 4px;
  padding: 1rem;
  width: 120px;
  height: 120px;
  position: relative;
  background-color: ${(props) =>
    props.isSelected ? colors.primaryBgLight : "transparent"};

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    padding: 0.5rem;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  margin: 0;
`;

const RadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const RadioContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    margin-top: 0.5rem;
    gap: 0.25rem;
  }
`;

const RadioText = styled.span`
  font-size: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.875rem;
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
