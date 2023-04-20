import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export type NavigationProps = {
  hasError: boolean;
  showNext: boolean;
  onPrevious?: () => void;
  onPrint?: () => void;
  onNext: () => void;
  onStart: () => void;
};

const SimulatorNavigation = ({
  hasError = false,
  showNext = false,
  onPrint,
  onPrevious,
  onNext,
  onStart,
}: NavigationProps): JSX.Element => {
  return (
    <StyledDiv>
      {onPrevious && (
        <StyledButton small type="button" onClick={onPrevious} variant="flat">
          Précédent
        </StyledButton>
      )}
      {showNext && !onPrevious && (
        <StyledButtonReverse
          variant="primary"
          onClick={onStart}
          data-testid="commencer"
        >
          Commencer
          <ArrowIcon />
        </StyledButtonReverse>
      )}
      {showNext && onPrevious && (
        <StyledButton
          aria-disabled={hasError}
          disabled={hasError}
          type="button"
          variant="primary"
          onClick={onNext}
        >
          Suivant
          <ArrowIcon />
        </StyledButton>
      )}
      {onPrint && (
        <StyledButton type="button" onClick={onPrint}>
          Imprimer le résultat
        </StyledButton>
      )}
    </StyledDiv>
  );
};

export default SimulatorNavigation;

const { breakpoints, spacings } = theme;

const StyledButton = styled(Button)`
  & + & {
    @media (max-width: ${breakpoints.tablet}) {
      margin-top: ${spacings.base};
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 0 ${spacings.large} 0;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: column;
    align-items: stretch;
  }
  @media print {
    display: none;
  }
`;

const StyledButtonReverse = styled(StyledButton)`
  margin-left: auto;
`;

const ArrowIcon = styled(icons.DirectionRight)`
  width: 3rem;
  margin-left: ${spacings.small};
`;
