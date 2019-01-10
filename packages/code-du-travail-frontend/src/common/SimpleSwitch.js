import React from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";

class SimpleSwitch extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool
  };
  static defaultProps = {
    checked: false
  };

  render() {
    const { id, label, onChange, checked } = this.props;
    return (
      <label htmlFor={id}>
        <div
          style={{
            display: "inline-block",
            marginRight: 10,
            lineHeight: "20px",
            verticalAlign: "top",
            fontSize: "1.2em"
          }}
        >
          {label}
        </div>
        <Switch
          width={42}
          height={20}
          onChange={onChange}
          checked={checked}
          id={id}
        />
      </label>
    );
  }
}

export { SimpleSwitch };
