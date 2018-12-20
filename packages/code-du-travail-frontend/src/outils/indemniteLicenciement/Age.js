import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { InputSmall } from "./stepStyles";
import { PrevNextStepper } from "./PrevNextStepper";

class Age extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: 0,
    nextDisabled: true
  };

  state = {
    nextDisabled: this.props.value === ""
  };

  componentWillReceiveProps(props) {
    this.setState({ nextDisabled: props.value === "0" || props.value === "" });
  }

  render() {
    const { onChange, value, onPrevious, onNext, nextDisabled } = this.props;

    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>Quel est votre age ?</h2>
            <InputSmall
              type="number"
              onFocus={e => {
                if (e.target.value === "0") {
                  e.target.value = "";
                }
              }}
              onChange={e => onChange(parseFloat(e.target.value) || 0)}
              value={value}
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
