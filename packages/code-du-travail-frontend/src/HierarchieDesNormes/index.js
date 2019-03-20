import React from "react";
import PropTypes from "prop-types";
import ReferencesJuridiques from "./components/ReferencesJuridiques";
import TYPE_REFERENCE from "./typeReference";

function HierarchieDesNormes({ references }) {
  return <ReferencesJuridiques references={references} />;
}

HierarchieDesNormes.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default HierarchieDesNormes;
