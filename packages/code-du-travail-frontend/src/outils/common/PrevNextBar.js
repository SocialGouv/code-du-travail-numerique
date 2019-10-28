import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";

function PrevNextBar({
  onPrev,
  incomplete,
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
          <NextButton inverse={incomplete} variant={nextVariant}>
            Suivant
          </NextButton>
        )}
      </Box>
    </>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  incomplete: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  incomplete: false,
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
