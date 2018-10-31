import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";
import { coefficient } from "./0044_coefficient";
import { PrevNextStepper } from "../PrevNextStepper";

const groupeLabelByCoeff = coefficient.reduce(
  (state, { coefficient, groupe, label }) => {
    if (!state.has(coefficient)) {
      state.set(coefficient, { groupe, labels: [label] });
    } else {
      state.get(coefficient).labels.push(label);
    }
    return state;
  },
  new Map()
);
const options = [...groupeLabelByCoeff].map(([coefficient, { groupe }]) => {
  return (
    <option key={`${groupe}-${coefficient}`} value={coefficient}>
      {coefficient}
    </option>
  );
});

class EchelonChimie extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
      coefficient: PropTypes.string,
      groupe: PropTypes.string
    }),
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: {},
    nextDisabled: true
  };
  state = {
    nextDisabled: !(this.props.value && this.props.value.coefficient)
  };

  onSelectCoefficient = event => {
    const coefficient = event.target.value;
    const { groupe } = groupeLabelByCoeff.get(coefficient);

    this.props.onChange({
      groupe,
      coefficient
    });
    this.setState({ nextDisabled: false });
  };

  render() {
    const { onPrevious, onNext, nextDisabled, value } = this.props;
    let labels = [];
    if (groupeLabelByCoeff.has(this.props.value.coefficient)) {
      labels = groupeLabelByCoeff.get(this.props.value.coefficient).labels;
    }
    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>
              Pouvez nous indiquer votre échelon dans la convention collective ?
            </h2>
            <select
              onChange={this.onSelectCoefficient}
              onBlur={this.onSelectCoefficient}
              name="echelon"
              value={value.coefficient}
            >
              <option disabled selected>
                Veuillez sélectionnez votre branche
              </option>
              {options}
            </select>
            {labels.map((label, i) => (
              <li key={i}>{label}</li>
            ))}
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

export { EchelonChimie };
