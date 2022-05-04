import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type Props = {
  onPrev: () => void;
  hasError: boolean;
  nextVisible: boolean;
  printVisible: boolean;
  previousVisible: boolean;
  onPrint: () => void;
};

export const PrevNextBar: FunctionComponent<Partial<Props>> = ({
  onPrev,
  hasError = false,
  nextVisible = true,
  printVisible,
  previousVisible = true,
  onPrint,
}) => {
  return (
    <>
      <StyledDiv>
        {previousVisible && (
          <StyledButton small type="button" onClick={onPrev} variant="flat">
            Précédent
          </StyledButton>
        )}
        {nextVisible && !previousVisible && (
          <StyledButtonReverse disabled={hasError} variant="primary">
            Commencer
            <ArrowIcon />
          </StyledButtonReverse>
        )}
        {nextVisible && previousVisible && (
          <StyledButton disabled={hasError} variant="primary">
            Suivant
            <ArrowIcon />
          </StyledButton>
        )}
        {printVisible && onPrint && (
          <StyledButton type="button" onClick={onPrint}>
            Imprimer le résultat
          </StyledButton>
        )}
      </StyledDiv>
    </>
  );
};

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
