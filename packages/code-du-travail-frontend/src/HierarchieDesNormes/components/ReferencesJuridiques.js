import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui";

import { Link } from "../../../routes";
import ArticleIcon from "../../icons/ArticleIcon";
import TYPE_REFERENCE from "../typeReference";

const { box, colors, spacing } = theme;

const CodeDuTravailLink = ({ title, slug }) => (
  <Link route="code-du-travail" params={{ slug }} passHref>
    <ReferenceLink>
      <Icon width={18} />
      {title}
    </ReferenceLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link route="kali" params={{ slug }} passHref>
    <ReferenceLink>
      <Icon width={18} />
      Convention collective: {title}
    </ReferenceLink>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <ReferenceLink
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    className={"external-link__after"}
  >
    <Icon width="18" />
    Autre: {title}
  </ReferenceLink>
);

const ReferencesJuridiques = ({ references }) => {
  const getLink = texteConventionnel => {
    switch (texteConventionnel.type) {
      case TYPE_REFERENCE.codeDuTravail:
        return (
          <CodeDuTravailLink
            key={texteConventionnel.id}
            title={texteConventionnel.title}
            slug={texteConventionnel.id}
          />
        );
      case TYPE_REFERENCE.conventionCollective:
        return (
          <ConventionLink
            key={texteConventionnel.id}
            title={texteConventionnel.title}
            slug={texteConventionnel.slug}
          />
        );
      case TYPE_REFERENCE.journalOfficiel:
        return (
          <OtherLink
            key={texteConventionnel.id}
            title={texteConventionnel.title}
            url={texteConventionnel.url}
          />
        );
    }
  };

  return (
    <ReferencesWrapper>
      <h3>Références Juridiques</h3>
      <ul>
        {references.map(texteConventionnel => (
          <li key={texteConventionnel.id}>{getLink(texteConventionnel)}</li>
        ))}
      </ul>
    </ReferencesWrapper>
  );
};

ReferencesJuridiques.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default ReferencesJuridiques;

const ReferencesWrapper = styled.div`
  margin-top: ${spacing.large};
  padding: ${spacing.base};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

const ReferenceLink = styled.a`
  display: block;
  margin-top: ${spacing.base};
  padding: ${spacing.base};
  background-color: ${colors.elementBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  cursor: pointer;
`;

const Icon = styled(ArticleIcon)`
  position: relative;
  top: 1px;
  vertical-align: middle;
  margin-right: ${spacing.base};
`;
