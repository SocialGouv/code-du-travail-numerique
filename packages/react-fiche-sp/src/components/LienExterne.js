import React from "react";
import PropTypes from "prop-types";

import { getText } from "../utils";

class LienExterne extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const url = data._.URL;
    const label = getText(data);
    return (
      <a href={url} rel="noopener noreferrer" target="_blank">
        {label}
      </a>
    );
  }
}

export default LienExterne;
