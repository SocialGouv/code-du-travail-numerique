import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui";
import { Link } from "../../../routes";
import ArticleIcon from "../../icons/ArticleIcon";

const { box, colors, spacing } = theme;

export const CodeDuTravailLink = ({ title, slug }) => (
  <Link route="code-du-travail" params={{ slug }} passHref>
    <ReferenceLink>
      <Icon width={18} />
      {title}
    </ReferenceLink>
  </Link>
);

export const ConventionLink = ({ title, slug }) => (
  <Link route="kali" params={{ slug }} passHref>
    <ReferenceLink>
      <Icon width={18} />
      Convention collective: {title}
    </ReferenceLink>
  </Link>
);

export const OtherLink = ({ title, url }) => (
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
