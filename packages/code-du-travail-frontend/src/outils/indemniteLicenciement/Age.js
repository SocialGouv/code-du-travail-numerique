import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Wrapper } from "@cdt/ui";

import { Input, Label } from "./stepStyles";
import { PrevNextStepper } from "./PrevNextStepper";

class Age extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
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
        <Section>
          <Container>
            <Wrapper variant="light">
              <h2>Quel est votre age ?</h2>
              <Label>
                <Input
                  name="age"
                  size={5}
                  type="number"
                  onFocus={e => {
                    if (e.target.value === "0") {
                      e.target.value = "";
                    }
                  }}
                  onChange={e => onChange(parseFloat(e.target.value) || 0)}
                  value={value}
                />
              </Label>
            </Wrapper>
          </Container>
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
