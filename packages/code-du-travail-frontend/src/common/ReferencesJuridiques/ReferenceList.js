import React from "react";
import styled from "styled-components";
import { Tile, theme } from "@socialgouv/react-ui";
import Link from "next/link";
import TYPE_REFERENCE from "./typeReference";

const CodeDuTravailLink = ({ title, slug }) => (
  <Link href="/code-du-travail/[slug]" as={`/code-du-travail/${slug}`} passHref>
    <Tile wide title={title} />
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href="/convention-collective/[slug]"
    as={`/convention-collective/${slug}`}
    passHref
  >
    <Tile wide title={`Convention collective: ${title}`} />
  </Link>
);

const OtherLink = ({ title, url }) => (
  <Tile
    wide
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    title={`Autre: ${title}`}
  />
);

const getLink = reference => {
  switch (reference.type) {
    case TYPE_REFERENCE.codeDuTravail:
      return <CodeDuTravailLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.conventionCollective:
      return <ConventionLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.journalOfficiel:
      return <OtherLink title={reference.title} url={reference.url} />;
  }
};

const ReferenceList = ({ references }) => {
  return (
    <StyledList>
      {references.map(reference => (
        <StyledListItem key={reference.id}>{getLink(reference)}</StyledListItem>
      ))}
    </StyledList>
  );
};

export default ReferenceList;

const { spacings } = theme;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  margin-top: ${spacings.base};
  padding: 0;
`;
