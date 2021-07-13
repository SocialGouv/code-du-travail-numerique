import PropTypes from "prop-types";
import React from "react";

import { getText } from "../utils.js";

export class LienExterneCommente extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    const commentaire = data.children.find(
      (child) => child.name === "Commentaire"
    );
    const lienExterne = data.children.find(
      (child) => child.name === "LienExterne"
    );
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
    data: PropTypes.object.isRequired,
  };
  render() {
    const { data } = this.props;
    const url = data.attributes.URL;
    const label = getText(data);
    return (
      <a
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${label} (nouvelle fenêtre)`}
      >
        {label}
      </a>
    );
  }
}
