import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Container, theme } from "@socialgouv/react-ui";

function PrevNextBar({ onPrev, disabled, nextVisible, previousVisible }) {
  return (
    <StyledContainer narrow noPadding>
      {previousVisible && (
        <PreviousButton type="button" onClick={onPrev} variant="secondary">
          Précédent
        </PreviousButton>
      )}
      {nextVisible && (
        <NextButton disabled={disabled} variant="primary">
          Suivant
        </NextButton>
      )}
    </StyledContainer>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  disabled: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  disabled: false,
  nextVisible: true,
  previousVisible: true
};

export { PrevNextBar };

const { spacing } = theme;

const StyledContainer = styled(Container)`
  margin: ${spacing.large} 0;
  display: flex;
  justify-content: ;
`;
const NextButton = styled(Button)`
  margin-left: auto;
`;
const PreviousButton = styled(Button)`
  margin-right: auto;
`;
