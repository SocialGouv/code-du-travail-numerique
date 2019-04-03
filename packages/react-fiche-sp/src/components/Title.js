import React from "react";
import PropTypes from "prop-types";

class Title extends React.PureComponent {
  static propTypes = {
    level: PropTypes.number
  };
  render() {
    const { level, children } = this.props;
    switch (level) {
      case 0:
        return <h2>{children}</h2>;
      case 1:
        return <h3>{children}</h3>;
      case 2:
        return <h4>{children}</h4>;
      case 3:
        return <h5>{children}</h5>;
      default:
        return <h6>{children}</h6>;
    }
  }
}

export default Title;
