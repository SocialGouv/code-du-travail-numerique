import React from "react";
import PropTypes from "prop-types";

import { Input } from "./stepStyles";

const times = num => Array.from({ length: num }, (_, i) => i);

class SalaireTempsPlein extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.shape({
      isPartiel: PropTypes.bool,
      periods: PropTypes.array,
      derniersMois: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
  };
  state = {
    salaires: this.props.value.derniersMois
  };

  onSalaireClick = i => e => {
    const value = parseFloat(e.target.value);
    if (value === 0) {
      this.updateSalaireValue(i, "");
    }
  };

  onSalaireBlur = startIndex => event => {
    // update below fields values when empty
    const value = parseFloat(event.target.value);
    if (!value) {
      this.updateSalaireValue(startIndex, 0);
      return;
    }

    const { salaires } = this.state;
    let endIndex = salaires
      .slice(startIndex + 1)
      .findIndex(item => parseFloat(item) > 0);
    endIndex = endIndex === -1 ? salaires.length : endIndex + startIndex + 1;

    this.setState(
      {
        salaires: salaires.map(
          (item, i) => (i > startIndex && i < endIndex ? value : item)
        )
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange({
            ...this.props.value,
            derniersMois: this.state.salaires
          });
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
      this.props.onChange({
        ...this.props.value,
        derniersMois: this.state.salaires
      });
    });
  };
  render() {
    return (
      <React.Fragment>
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
            {times(this.props.value.derniersMois.length).map(i => (
              <tr key={i} style={{ background: i < 3 ? "#ddd" : "" }}>
                <td>{i === 0 ? "Dernier salaire" : `Salaire m-${i}`}</td>
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
      </React.Fragment>
    );
  }
}

export { SalaireTempsPlein };
