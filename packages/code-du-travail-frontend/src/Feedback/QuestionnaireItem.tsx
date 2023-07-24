import { Button } from "@socialgouv/cdtn-ui";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";

type QuestionnaireItemProps = {
  badText?: string;
  mediumText?: string;
  goodText?: string;
  className?: string;
  title?: string;
  isDirty?: (isDirty: boolean) => void;
  displayError?: boolean;
};

export const QuestionnaireItem = ({
  badText,
  mediumText,
  goodText,
  className,
  title,
  isDirty = () => {},
  displayError = false,
}: QuestionnaireItemProps): JSX.Element => {
  const [status, setStatus] = useState<"bad" | "medium" | "good">();
  return (
    <div className={className}>
      {title && <b>{title}</b>}
      <ButtonContainer>
        <StyledButton
          variant={status === "bad" ? "light" : "naked"}
          onClick={() => {
            setStatus("bad");
            isDirty(true);
          }}
        >
          <icons.Bad width="32px" />
          {badText ?? "Pas bien"}
        </StyledButton>
        <StyledButton
          variant={status === "medium" ? "light" : "naked"}
          onClick={() => {
            setStatus("medium");
            isDirty(true);
          }}
        >
          <icons.Medium width="32px" />
          {mediumText ?? "Moyen"}
        </StyledButton>
        <StyledButton
          variant={status === "good" ? "light" : "naked"}
          onClick={() => {
            setStatus("good");
            isDirty(true);
          }}
        >
          <icons.Good width="32px" />
          {goodText ?? "Très bien"}
        </StyledButton>
      </ButtonContainer>
      {displayError && (
        <StyledError>Vous devez choisir une des réponses</StyledError>
      )}
    </div>
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
