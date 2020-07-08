import { getRouteBySource, SOURCES } from "@cdt/sources";
import { ArrowLink, FlatList, theme } from "@socialgouv/react-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import TYPE_REFERENCE from "./typeReference";

const sanitizeCdtSlug = (slug) =>
  slug.replace(/[^LRD\d-]+/gi, "").toLowerCase();

const CodeDuTravailLink = ({ title, slug }) => (
  <Link
    href={`/${getRouteBySource(SOURCES.CDT)}/[slug]`}
    as={`/${getRouteBySource(SOURCES.CDT)}/${sanitizeCdtSlug(slug)}`}
    passHref
  >
    <StyledArrowLink arrowPosition="left">{title}</StyledArrowLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href={`/${getRouteBySource(SOURCES.CCN)}/[slug]`}
    as={`/${getRouteBySource(SOURCES.CCN)}/${slug}`}
    passHref
  >
    <StyledArrowLink arrowPosition="left">{`Convention collective: ${title}`}</StyledArrowLink>
  </Link>
);

const OtherLink = ({ title, url }) =>
  url ? (
    <StyledArrowLink
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      arrowPosition="left"
    >
      {title}
    </StyledArrowLink>
  ) : (
    <div>{title}</div>
  );

const getLink = (reference) => {
  switch (reference.type) {
    case TYPE_REFERENCE.codeDuTravail:
      return <CodeDuTravailLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.conventionCollective:
      return <ConventionLink title={reference.title} slug={reference.slug} />;
    default:
      return <OtherLink title={reference.title} url={reference.url} />;
  }
};

const ReferenceList = ({ references }) => {
  return (
    <FlatList>
      {references.map((reference) => (
        <li key={`${reference.id}`}>{getLink(reference)}</li>
      ))}
    </FlatList>
  );
};

export default ReferenceList;

const { spacings } = theme;

const StyledArrowLink = styled(ArrowLink)`
  padding: ${spacings.xsmall} 0;
  font-weight: normal;
`;
