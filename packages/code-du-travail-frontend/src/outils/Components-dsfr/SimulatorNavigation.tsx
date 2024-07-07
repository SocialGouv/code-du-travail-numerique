import React from "react";
import styled from "styled-components";
import Button from "@codegouvfr/react-dsfr/Button";

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
        <Button
          onClick={onPrevious}
          data-testid="precedent"
          iconId="fr-icon-checkbox-circle-line"
          iconPosition="right"
        >
          Précédent
        </Button>
      )}
      {showNext && !onPrevious && (
        <Button
          onClick={onStart}
          data-testid="commencer"
          iconId="fr-icon-checkbox-circle-line"
          iconPosition="right"
        >
          Commencer
        </Button>
      )}
      {showNext && onPrevious && (
        <Button
          aria-disabled={hasError}
          disabled={hasError}
          onClick={onNext}
          data-testid="commencer"
          iconId="fr-icon-checkbox-circle-line"
          iconPosition="right"
        >
          Commencer
        </Button>
      )}
      {onPrint && (
        <Button
          aria-disabled={hasError}
          disabled={hasError}
          onClick={onPrint}
          data-testid="imprimer"
          iconId="fr-icon-checkbox-circle-line"
          iconPosition="right"
        >
          Imprimer le résultat
        </Button>
      )}
    </StyledDiv>
  );
};

export default SimulatorNavigation;

const StyledDiv = styled.div`
  grid-area: d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 0 0 0;
  @media print {
    display: none;
  }
`;
