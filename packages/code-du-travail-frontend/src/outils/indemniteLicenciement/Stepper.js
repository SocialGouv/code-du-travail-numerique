import React from "react";
import PropTypes from "prop-types";

class Stepper extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {
    step: 0
  };

  render() {
    return this.props.render({
      step: this.state.step,
      restart: () => this.setState({ step: 0 }),
      onPrevious: () =>
        this.setState(curState => ({
          step: Math.max(0, curState.step - 1)
        })),
      onComplete: () =>
        this.setState(curState => ({
          step: curState.step + 1,
          animate: true
        }))
    });
  }
}

export { Stepper };
