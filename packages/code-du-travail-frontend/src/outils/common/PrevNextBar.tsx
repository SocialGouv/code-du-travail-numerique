import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

import printResult from "./printResult";

type Props = {
  onPrev: () => void;
  hasError: boolean;
  nextVisible: boolean;
  printVisible: () => void;
  previousVisible: boolean;
  onNext: () => void;
};

export const PrevNextBar: FunctionComponent<Props> = ({
  onPrev,
  hasError = false,
  nextVisible = true,
  printVisible,
  previousVisible = true,
  onNext,
}) => {
  return (
    <>
      <StyledDiv>
        {printVisible && (
          <StyledButton type="button" onClick={printResult}>
            Imprimer le résultat
          </StyledButton>
        )}
        {nextVisible && !previousVisible && (
          <StyledButton disabled={hasError} variant="primary">
            Commencer
            <ArrowIcon />
          </StyledButton>
        )}
        {nextVisible && previousVisible && (
          <StyledButton disabled={hasError} variant="primary" onClick={onNext}>
            Suivant
            <ArrowIcon />
          </StyledButton>
        )}
        {previousVisible && (
          <StyledButton small type="button" onClick={onPrev} variant="flat">
            Précédent
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
  flex-direction: row-reverse;
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

const ArrowIcon = styled(icons.DirectionRight)`
  width: 3rem;
  margin-left: ${spacings.small};
`;
