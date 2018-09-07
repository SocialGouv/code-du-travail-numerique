import React from "react";
import PropTypes from "prop-types";

const BreadCrumbs = ({ entries }) => (
  <nav className="breadcrumb" aria-label="breadcrumb">
    <ol className="breadcrumb">
      {entries.map((entry, i) => (
        <li key={i} className="breadcrumb-item">
          {entry}
        </li>
      ))}
    </ol>
  </nav>
);

BreadCrumbs.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.element)
};

BreadCrumbs.defaultProps = {
  entries: [
    <a key="accueil" href="/">
      Accueil
    </a>
  ]
};

export default BreadCrumbs;
