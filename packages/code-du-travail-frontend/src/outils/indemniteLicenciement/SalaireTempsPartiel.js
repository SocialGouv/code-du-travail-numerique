import React from "react";
import PropTypes from "prop-types";
import { WorkPeriodForm } from "./WorkPeriodForm";
import { WorkPeriods } from "./WorkPeriods";
import { uid as generateUid } from "react-uid";

class SalaireTempsPartiel extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
      isPartiel: PropTypes.bool,
      periods: PropTypes.Array
    })
  };

  static defaultProps = {
    value: {
      isPartiel: true,
      periods: []
    }
  };

  state = {
    currentPeriod: {
      type: "temps-partiel",
      duree: undefined,
      salaire: undefined,
      isValid: false
    }
  };

  selectRef = React.createRef();

  componentDidMount() {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
    this.resetForm();
  }
  editPeriod = data => {
    this.setState({
      currentPeriod: data
    });
  };

  addPeriod = event => {
    event.preventDefault();

    const { periods } = this.props.value;
    const { uid, type, duree, salaire } = this.state.currentPeriod;
    let newPeriod;

    if (uid) {
      const index = periods.findIndex(period => period.uid === uid);
      newPeriod = [
        ...periods.slice(0, index),
        { uid, type, duree, salaire },
        ...periods.slice(index + 1)
      ];
    } else {
      newPeriod = periods.concat({
        uid: uid || generateUid(this.state.currentPeriod),
        type,
        duree,
        salaire
      });
    }

    this.props.onChange({
      ...this.props.value,
      periods: newPeriod
    });
    this.resetForm();
  };

  deletePeriod = period => {
    const { periods } = this.props.value;
    const index = periods.findIndex(item => item.uid === period.uid);

    this.props.onChange({
      ...this.props.value,
      periods: [...periods.slice(0, index), ...periods.slice(index + 1)]
    });
    this.resetForm();
  };
  onInputChange = event => {
    const period = {
      ...this.state.currentPeriod,
      [event.target.name]: event.target.value
    };

    const { duree, salaire } = period;
    const isValid =
      parseFloat(duree) && duree > 0 && parseFloat(salaire) && salaire > 0;

    this.setState({
      currentPeriod: {
        ...period,
        isValid
      }
    });
  };

  resetForm = () => {
    this.setState({
      currentPeriod: {
        uid: undefined,
        type: "temps-partiel",
        duree: "",
        salaire: "",
        isValid: false
      }
    });
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  };

  render() {
    const { periods } = this.props.value;

    return (
      <React.Fragment>
        <WorkPeriodForm
          ref={this.selectRef}
          period={this.state.currentPeriod}
          onSubmit={this.addPeriod}
          onChange={this.onInputChange}
        />
        {periods.length > 0 && (
          <WorkPeriods
            periods={periods}
            onEdit={this.editPeriod}
            onDelete={this.deletePeriod}
          />
        )}
      </React.Fragment>
    );
  }
}

export { SalaireTempsPartiel };
