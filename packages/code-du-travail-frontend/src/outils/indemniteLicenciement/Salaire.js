import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { PrevNextStepper } from "./PrevNextStepper";
import { Input } from "./stepStyles";

const times = num => Array.from({ length: num }, (_, i) => i);

class Salaire extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };

  static defaultProps = {
    nextDisabled: false
  };

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      salaires: props.value
    };
  }

  onSalaireClick = i => e => {
    const value = parseFloat(e.target.value);
    if (value === 0) {
      this.updateSalaireValue(i, "");
    }
  };

  onSalaireBlur = i => e => {
    // update below fields values when empty
    const value = parseFloat(e.target.value);
    if (!value) {
      this.updateSalaireValue(i, 0);
      return;
    }
    const curSalaires = [...this.state.salaires];
    let j = i + 1;
    while (j < curSalaires.length) {
      if (parseFloat(curSalaires[j]) > 0) {
        break;
      }
      curSalaires[j] = value;
      j++;
    }
    this.setState(
      {
        salaires: curSalaires
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.salaires);
        }
      }
    );
  };
  updateSalaireValue = (index, value, cb) => {
    this.setState(curState => {
      const curSalaires = [...curState.salaires];
      curSalaires[index] = value;
      return {
        salaires: curSalaires
      };
    }, cb);
  };
  updateSalaire = i => e => {
    // update a single row
    const value = parseFloat(e.target.value) || 0;
    this.updateSalaireValue(i, value, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.salaires);
      }
    });
  };
  render() {
    const { onPrevious, onNext, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <h2>Derniers mois de salaire</h2>
          <table width="100%" style={{ fontSize: "1.2em" }}>
            <thead>
              <tr>
                <td
                  width={140}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Mois
                </td>
                <td
                  width={200}
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Salaire brut mensuel
                </td>
              </tr>
            </thead>
            <tbody>
              {times(this.props.value.length).map(i => (
                <tr key={i} style={{ background: i < 3 ? "#ddd" : "" }}>
                  <td>{i === 0 ? "Dernier salaire" : `Salaire N-${i}`}</td>
                  <td style={{ textAlign: "center" }}>
                    <Input
                      size="6"
                      onBlur={this.onSalaireBlur(i)}
                      onClick={this.onSalaireClick(i)}
                      value={this.state.salaires[i]}
                      onChange={this.updateSalaire(i)}
                      type="number"
                    />
                  </td>
                  {i === 0 && (
                    <td
                      valign="middle"
                      style={{ textAlign: "center", background: "#ddd" }}
                      rowSpan={3}
                    >
                      trois derniers
                      <br />
                      mois de salaire
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Container>
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onNext}
            nextDisabled={nextDisabled}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export { Salaire };
