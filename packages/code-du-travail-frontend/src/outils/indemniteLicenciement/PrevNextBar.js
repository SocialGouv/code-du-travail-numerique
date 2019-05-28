import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@cdt/ui";

function PrevNextBar({ onPrev, disabled, nextVisible, previousVisible }) {
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
