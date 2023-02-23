import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-types";
import { ArrowLink, FlatList, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import { useUIDSeed } from "react-uid";
import styled from "styled-components";

const InternalLink = ({ title, type, slug }) => (
  <Link href={`/${getRouteBySource(type)}/${slug}`} passHref legacyBehavior>
    <StyledArrowLink arrowPosition="left">{title}</StyledArrowLink>
  </Link>
);

const ExternalLink = ({ title, url }) =>
  url ? (
    <StyledArrowLink
      className="no-after"
      href={url}
      rel="noopener noreferrer nofollow"
      target="_blank"
      aria-label={`${title} (Nouvelle fenêtre)`}
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
          slug={`${reference.slug}`}
          title={`Article ${reference.title} du Code du travail`}
          type={reference.type}
        />
      );
    case SOURCES.CCN:
      return (
        <InternalLink
          slug={reference.slug}
          title={`Convention collective: ${reference.title}`}
          type={reference.type}
        />
      );
    case SOURCES.EXTERNALS:
      return <ExternalLink title={reference.title} url={reference.url} />;
    default:
      return null;
  }
};

const ReferenceList = ({ references }) => {
  const seedId = useUIDSeed();
  return (
    <StyledFlatList>
      {references.flatMap((reference) => {
        if (
          [SOURCES.CCN, SOURCES.CDT, SOURCES.EXTERNALS].includes(reference.type)
        ) {
          return [<li key={seedId(reference)}>{getLink(reference)}</li>];
        }
        return [];
      })}
    </StyledFlatList>
  );
};

export default ReferenceList;

const { spacings } = theme;

const StyledArrowLink = styled(ArrowLink)`
  padding: ${spacings.xsmall} 0;
  font-weight: normal;
`;

const StyledFlatList = styled(FlatList)`
  padding-left: 0;
`;
