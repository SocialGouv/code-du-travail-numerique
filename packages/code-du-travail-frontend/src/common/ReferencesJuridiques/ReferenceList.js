import React from "react";
import styled from "styled-components";
import { ArrowLink, FlatList, theme } from "@socialgouv/react-ui";
import Link from "next/link";
import TYPE_REFERENCE from "./typeReference";

const CodeDuTravailLink = ({ title, slug }) => (
  <Link href="/code-du-travail/[slug]" as={`/code-du-travail/${slug}`} passHref>
    <StyledArrowLink arrowPosition="left">{title}</StyledArrowLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href="/convention-collective/[slug]"
    as={`/convention-collective/${slug}`}
    passHref
  >
    <StyledArrowLink arrowPosition="left">{`Convention collective: ${title}`}</StyledArrowLink>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <StyledArrowLink
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    arrowPosition="left"
  >{`Autre: ${title}`}</StyledArrowLink>
);

const getLink = reference => {
  switch (reference.type) {
    case TYPE_REFERENCE.codeDuTravail:
      return <CodeDuTravailLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.conventionCollective:
      return <ConventionLink title={reference.title} slug={reference.slug} />;
    case TYPE_REFERENCE.journalOfficiel:
      return <OtherLink title={reference.title} url={reference.url} />;
  }
};

const ReferenceList = ({ references }) => {
  return (
    <FlatList>
      {references.map(reference => (
        <li key={reference.id}>{getLink(reference)}</li>
      ))}
    </FlatList>
  );
};

export default ReferenceList;

const { spacings } = theme;

const StyledArrowLink = styled(ArrowLink)`
  padding: ${spacings.base} 0;
`;
