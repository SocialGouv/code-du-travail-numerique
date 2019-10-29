import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";

function PrevNextBar({
  onPrev,
  complete,
  hasError,
  nextVisible,
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
      </Box>
    </>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  complete: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  complete: true,
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
