import React from "react";
import PropTypes from "prop-types";
import Calipso from "./Calipso";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

const ETAT_LABEL = {
  MODIFIE: "Modifie",
  DENONCE: "Dénonce",
  VIGUEUR_ETEN: "En vigueur étendu",
  VIGUEUR: "En vigueur",
  PERIME: "Périmé",
  ABROGE: "Abrogé",
  VIGUEUR_NON_ETEN: "En vigueur non étendu",
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
      <ArticleContent dangerouslySetInnerHTML={{ __html: bloc_textuel }} />
    </div>
  );
};

Article.propTypes = {
  etat: PropTypes.oneOf(Object.keys(ETAT_LABEL)).isRequired,
  bloc_textuel: PropTypes.string.isRequired,
  calipsos: PropTypes.array
};

const ArticleMeta = styled.div`
  margin-top: -${theme.spacing.small};
  margin-bottom: ${theme.spacing.small};
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
`;

const ArticleContent = styled.div`
  margin-bottom: ${theme.spacing.small};
`;

export default Article;
