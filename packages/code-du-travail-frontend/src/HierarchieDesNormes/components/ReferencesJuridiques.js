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
      <ArticleIcon width={18} />
      {title}
    </ReferenceLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link route="kali" params={{ slug }} passHref>
    <ReferenceLink>
      <ArticleIcon width={18} />
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
    <ArticleIcon width="18" />
    Autre: {title}
  </ReferenceLink>
);

const ReferencesJuridiques = ({ references }) => (
  <ReferencesWrapper>
    <h3>Références Juridiques</h3>
    <ul>
      {references.map(texteConventionnel => (
        <li key={texteConventionnel.id}>
          {(texteConventionnel.type === TYPE_REFERENCE.codeDuTravail && (
            <CodeDuTravailLink
              key={texteConventionnel.num}
              title={texteConventionnel.title}
              slug={texteConventionnel.num}
            />
          )) ||
            (texteConventionnel.type ===
              TYPE_REFERENCE.conventionCollective && (
              <ConventionLink
                key={texteConventionnel.num}
                title={texteConventionnel.title}
                slug={texteConventionnel.num}
              />
            )) ||
            (texteConventionnel.type === TYPE_REFERENCE.journalOfficiel && (
              <OtherLink
                key={texteConventionnel.id}
                title={texteConventionnel.title}
                url={texteConventionnel.url}
              />
            ))}
        </li>
      ))}
    </ul>
  </ReferencesWrapper>
);

ReferencesJuridiques.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      num: PropTypes.string.isRequired,
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
    list-style-type: none;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
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

  svg {
    position: relative;
    top: 1px;
    vertical-align: middle;
    margin-right: ${spacing.base};
  }
`;
