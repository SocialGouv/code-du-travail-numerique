import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@cdt/ui";

function PrevNextBar({ currentStepIndex, disabled, onPrev, stepsLength }) {
  const previousVisible = currentStepIndex > 0;
  const nextVisible = currentStepIndex < stepsLength - 1;
  return (
    <ButtonBar>
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
    </ButtonBar>
  );
}
PrevNextBar.propTypes = {
  currentStepIndex: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onPrev: PropTypes.func.isRequired,
  stepsLength: PropTypes.number.isRequired
};
PrevNextBar.defaultProps = {
  disabled: false
};

export { PrevNextBar };

const { spacing } = theme;

const ButtonBar = styled.div`
  margin: ${spacing.larger} 0;
  display: flex;
  justify-content: space-between;
`;
const NextButton = styled(Button)`
  margin-left: auto;
`;
const PreviousButton = styled(Button)`
  margin-right: auto;
`;
