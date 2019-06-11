import React from "react";
import PropTypes from "prop-types";
import Calipso from "./Calipso";
import styled from "styled-components";

const ETAT_LABEL = {
  MODIFIE: "Modifie",
  DENONCE: "Dénonce",
  VIGUEUR_ETEN: "Article étendu",
  VIGUEUR: "",
  PERIME: "Périmé",
  ABROGE: "Abrogé",
  VIGUEUR_NON_ETEN: "Article non étendu",
  REMPLACE: "Remplace"
};

const Article = ({ etat, calipsos, bloc_textuel }) => {
  return (
    <div>
      <ArticleMeta>{ETAT_LABEL[etat]}</ArticleMeta>
      {calipsos &&
        calipsos
          .split(",")
          .map((calipso, idx) => <Calipso calipso={calipso} key={idx} />)}
      <div dangerouslySetInnerHTML={{ __html: bloc_textuel }} />
    </div>
  );
};

Article.propTypes = {
  etat: PropTypes.oneOf(Object.keys(ETAT_LABEL)).isRequired,
  bloc_textuel: PropTypes.string.isRequired,
  calipsos: PropTypes.array
};

const ArticleMeta = styled.div`
  margin-top: -10px;
  margin-bottom: 10px;
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
`;

export default Article;
