import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui";

import ReponseIcon from "../icons/ReponseIcon";
import ArticleIcon from "../icons/ArticleIcon";
import ModeleCourrierIcon from "../icons/ModeleCourrierIcon";
import DossierIcon from "../icons/DossierIcon";
import OutilIcon from "../icons/OutilsIcon";
import LinkIcon from "../icons/LinkIcon";

const SourceIcon = ({ source = "" }) => {
  switch (source) {
    case "faq":
      return <ResultIcon as={ReponseIcon} />;
    case "fiches_service_public":
    case "fiches_ministere_travail":
      return <ResultIcon as={ReponseIcon} />;

    case "code_du_travail":
      return <ResultIcon as={ArticleIcon} />;
    case "modeles_de_courriers":
      return <ResultIcon as={ModeleCourrierIcon} />;
    case "themes":
      return <ResultIcon as={DossierIcon} />;
    case "outils":
      return <ResultIcon as={OutilIcon} />;
    case "kali":
      return <ResultIcon as={ArticleIcon} />;
    case "external":
      return <ResultIcon as={LinkIcon} />;
    default:
      return null;
  }
};
SourceIcon.propTypes = {
  source: PropTypes.string
};

export { SourceIcon };
const { colors } = theme;
const ResultIcon = styled.svg`
  width: 2rem;
  flex-shrink: 0;
  color: ${colors.darkGrey};
`;
