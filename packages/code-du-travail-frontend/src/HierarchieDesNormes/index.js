import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";
// import { theme } from "@cdt/ui";
import ReferencesJuridiques from "./components/ReferencesJuridiques";
import TYPE_TEXTE from "./typeTexte";
// const { box, colors, fonts, spacing } = theme;

function HierarchieDesNormes({ data }) {
  return <ReferencesJuridiques data={data} />;
}

HierarchieDesNormes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_TEXTE)).isRequired,
      num: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default HierarchieDesNormes;
