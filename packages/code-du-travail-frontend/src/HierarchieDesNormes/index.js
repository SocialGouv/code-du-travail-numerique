import React from "react";
import PropTypes from "prop-types";
import ReferencesJuridiques from "./components/ReferencesJuridiques";
import typeReference from "./typeReference";

function HierarchieDesNormes({ references }) {
  return <ReferencesJuridiques references={references} />;
}

HierarchieDesNormes.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(typeReference)).isRequired,
      num: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default HierarchieDesNormes;
