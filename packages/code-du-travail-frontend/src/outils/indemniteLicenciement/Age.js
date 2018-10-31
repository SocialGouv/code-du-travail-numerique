import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { inputStyle } from "./index";
import { PrevNextStepper } from "./PrevNextStepper";

class Age extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: "",
    nextDisabled: true
  };

  state = {
    nextDisabled: this.props.value === ""
  };

  componentWillReceiveProps(props) {
    this.setState({ nextDisabled: props.value === "" });
  }

  render() {
    const { onChange, value, onPrevious, onNext, nextDisabled } = this.props;

    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>Quel est votre age ?</h2>
            <input
              type="number"
              onChange={e => onChange(e.target.value)}
              value={value}
              style={{ width: 180, ...inputStyle }}
            />
          </React.Fragment>
        </Section>
        <Container>
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onNext}
            nextDisabled={nextDisabled || this.state.nextDisabled}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export { Age };
