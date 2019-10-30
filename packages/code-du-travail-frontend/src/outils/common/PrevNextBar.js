import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";

function PrevNextBar({
  onPrev,
  complete,
  hasError,
  nextVisible,
  restartVisible,
  previousVisible
}) {
  const nextVariant = hasError ? "danger" : "primary";

  return (
    <>
      <Box>
        {previousVisible && (
          <PreviousButton type="button" onClick={onPrev} variant="secondary">
            Précédent
          </PreviousButton>
        )}
        {nextVisible && (
          <NextButton outlined={!complete} variant={nextVariant}>
            Suivant
          </NextButton>
        )}
        {restartVisible && <Button>Recommencer une simulation</Button>}
      </Box>
    </>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  complete: PropTypes.bool,
  hasError: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  complete: true,
  hasError: false,
  nextVisible: true,
  previousVisible: true
};

export { PrevNextBar };

const { spacing } = theme;

const Box = styled.div`
  display: flex;
  margin: ${spacing.large} 0;
`;
const NextButton = styled(Button)`
  margin-left: auto;
`;
const PreviousButton = styled(Button)`
  margin-right: auto;
`;
