import React from "react";
import PropTypes from "prop-types";
import { Button } from "@cdt/ui";

class PrevNextStepper extends React.Component {
  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    nextDisabled: PropTypes.bool
  };

  render() {
    const { onPrev, onNext, nextDisabled } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          fontSize: "1rem"
        }}
      >
        {onPrev && (
          <Button primary onClick={onPrev}>
            précédent
          </Button>
        )}
        <div style={{ flex: "1 0 auto" }} />
        {onNext && (
          <Button
            disabled={nextDisabled}
            primary
            onClick={e => !nextDisabled && onNext(e)}
          >
            suivant
          </Button>
        )}
      </div>
    );
  }
}

export { PrevNextStepper };
