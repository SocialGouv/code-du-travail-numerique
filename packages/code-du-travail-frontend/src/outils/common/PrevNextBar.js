import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import printResult from "./printResult";

function PrevNextBar({
  onPrev,
  hasError,
  nextVisible,
  printVisible,
  previousVisible,
}) {
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
          <StyledButton disabled={hasError} variant="primary">
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
}

PrevNextBar.propTypes = {
  hasError: PropTypes.bool,
  nextVisible: PropTypes.bool,
  onPrev: PropTypes.func,
  previousVisible: PropTypes.bool,
};
PrevNextBar.defaultProps = {
  hasError: false,
  nextVisible: true,
  onPrev: () => {},
  previousVisible: true,
};

export { PrevNextBar };

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
