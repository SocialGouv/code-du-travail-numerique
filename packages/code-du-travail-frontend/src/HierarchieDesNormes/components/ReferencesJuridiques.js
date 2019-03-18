import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui";

import { Link } from "../../../routes";
import ArticleIcon from "../../icons/ArticleIcon";
import TYPE_TEXTE from "../typeTexte";

const { box, colors, spacing } = theme;

const CodeDuTravailLink = ({ title, slug }) => (
  <Link route="code-du-travail" params={{ slug }}>
    <ReferenceWrapper>
      <ArticleIcon width={18} />
      {title}
    </ReferenceWrapper>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link route="kali" params={{ slug }}>
    <ReferenceWrapper>
      <ArticleIcon width={18} />
      Convention collective: {title}
    </ReferenceWrapper>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <ReferenceWrapper
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    className={"external-link__after"}
  >
    <ArticleIcon width="18" />
    Autre: {title}
  </ReferenceWrapper>
);

const TextesConventionnels = ({ data }) => (
  <ReferencesWrapper>
    <h3>Références Juridiques</h3>
    {data.map(
      texteConventionnel =>
        (texteConventionnel.type === TYPE_TEXTE.codeDuTravail && (
          <CodeDuTravailLink
            key={texteConventionnel.num}
            title={texteConventionnel.title}
            slug={texteConventionnel.num}
          />
        )) ||
        (texteConventionnel.type === TYPE_TEXTE.conventionCollective && (
          <ConventionLink
            key={texteConventionnel.num}
            title={texteConventionnel.title}
            slug={texteConventionnel.num}
          />
        )) ||
        (texteConventionnel.type === TYPE_TEXTE.journalOfficiel && (
          <OtherLink
            key={texteConventionnel.id}
            title={texteConventionnel.title}
            url={texteConventionnel.url}
          />
        ))
    )}
  </ReferencesWrapper>
);

TextesConventionnels.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_TEXTE)).isRequired,
      num: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default TextesConventionnels;

const ReferencesWrapper = styled.div`
  margin-top: ${spacing.large};
  padding: ${spacing.base};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
`;

const ReferenceWrapper = styled.a`
  display: block;
  margin-top: ${spacing.base};
  padding: ${spacing.base};
  background-color: ${colors.elementBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  cursor: pointer;

  svg {
    position: relative;
    top: 1px;
    vertical-align: middle;
    margin-right: ${spacing.base};
  }
`;
