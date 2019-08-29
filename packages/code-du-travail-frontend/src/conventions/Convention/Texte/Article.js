import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

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

const Article = ({ id, etat, surtitre, content }) => {
  return (
    <>
      <Status>{ETAT_LABEL[etat]}</Status>
      {surtitre && <h5 id={id}>{surtitre}</h5>}
      <ArticleContent dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

Article.propTypes = {
  id: PropTypes.string.isRequired,
  surtitre: PropTypes.string,
  etat: PropTypes.oneOf(Object.keys(ETAT_LABEL)),
  content: PropTypes.string.isRequired
};

export default Article;

const { spacing } = theme;

const Status = styled.div`
  margin-bottom: ${spacing.small};
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
`;

const ArticleContent = styled.div`
  margin-bottom: ${spacing.small};
`;
