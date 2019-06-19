import React from "react";
import PropTypes from "prop-types";

import { getText } from "../utils";

export class LienExterneCommente extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  render() {
    const { data } = this.props;
    const commentaire = data.$.find(child => child.name === "Commentaire");
    const lienExterne = data.$.find(child => child.name === "LienExterne");
    return (
      <>
        {getText(commentaire)}
        <p>
          <LienExterne data={lienExterne} />
        </p>
      </>
    );
  }
}

export class LienExterne extends React.PureComponent {
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
