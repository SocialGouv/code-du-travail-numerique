import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export type NavigationProps = {
  hasError?: boolean;
  showNext: boolean;
  onPrevious?: () => void;
  onPrint?: () => void;
};

const Index = ({
  hasError = false,
  showNext = false,
  onPrint,
  onPrevious,
}: NavigationProps): JSX.Element => {
  return (
    <>
      <StyledDiv>
        {onPrevious && (
          <StyledButton small type="button" onClick={onPrevious} variant="flat">
            Précédent
          </StyledButton>
        )}
        {showNext && !onPrevious && (
          <StyledButtonReverse disabled={hasError} variant="primary">
            Commencer
            <ArrowIcon />
          </StyledButtonReverse>
        )}
        {showNext && onPrevious && (
          <StyledButton disabled={hasError} variant="primary">
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
    </>
  );
};

export default Index;

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
