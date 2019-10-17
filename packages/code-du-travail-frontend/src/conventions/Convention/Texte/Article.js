import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

import Html from "../../../common/Html";

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

const Article = ({ item: { id, etat, surtitre, content } }) => {
  return (
    <>
      <Status>{ETAT_LABEL[etat]}</Status>
      {surtitre && <h5 id={id}>{surtitre}</h5>}
      <ArticleContent>{content}</ArticleContent>
    </>
  );
};

Article.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    surtitre: PropTypes.string,
    etat: PropTypes.oneOf(Object.keys(ETAT_LABEL)),
    content: PropTypes.string.isRequired
  })
};

export default Article;

const { spacing } = theme;

const Status = styled.div`
  margin-bottom: ${spacing.small};
  font-weight: bold;
  font-size: 1em;
  font-style: italic;
`;

const ArticleContent = styled(Html)`
  margin-bottom: ${spacing.small};
`;
