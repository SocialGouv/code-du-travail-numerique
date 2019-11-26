import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";
import printResult from "./printResult";

function PrevNextBar({
  onPrev,
  hasError,
  nextVisible,
  printVisible,
  previousVisible
}) {
  return (
    <>
      <Box>
        {previousVisible && (
          <PreviousButton type="button" onClick={onPrev} variant="secondary">
            Précédent
          </PreviousButton>
        )}
        {nextVisible && (
          <NextButton disabled={hasError} variant="primary">
            Suivant
          </NextButton>
        )}
        {printVisible && (
          <Button onClick={printResult}>Imprimer le résultat</Button>
        )}
      </Box>
    </>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  hasError: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  hasError: false,
  nextVisible: true,
  previousVisible: true
};

export { PrevNextBar };

const { spacings } = theme;

const Box = styled.div`
  display: flex;
  margin: ${spacings.large} 0;
`;
const NextButton = styled(Button)`
  margin-left: auto;
`;
const PreviousButton = styled(Button)`
  margin-right: auto;
`;
