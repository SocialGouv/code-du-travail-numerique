import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { ArrowLink, FlatList, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const sanitizeCdtSlug = (slug) =>
  slug.replace(/[^LRD\d-]+/gi, "").toLowerCase();

const InternalLink = ({ title, slug }) => (
  <Link
    href={`/${getRouteBySource(SOURCES.CDT)}/[slug]`}
    as={`/${getRouteBySource(SOURCES.CDT)}/${slug}`}
    passHref
  >
    <StyledArrowLink rel="nofollow" arrowPosition="left">
      {title}
    </StyledArrowLink>
  </Link>
);

const ExternalLink = ({ title, url }) =>
  url ? (
    <StyledArrowLink
      href={url}
      rel="noopener noreferrer nofollow"
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
    case SOURCES.CDT:
      return (
        <InternalLink
          title={reference.title}
          slug={sanitizeCdtSlug(reference.id)}
        />
      );
    case SOURCES.CCN:
      return (
        <InternalLink
          title={`Convention collective: ${reference.title}`}
          slug={reference.id}
        />
      );
    case SOURCES.EXTERNAL:
      return <ExternalLink title={reference.title} url={reference.url} />;
    default:
      return null;
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
