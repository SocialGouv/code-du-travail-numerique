import React from "react";
import { Tile } from "@socialgouv/react-ui";
import Link from "next/link";
import TYPE_REFERENCE from "./typeReference";

const CodeDuTravailLink = ({ title, slug }) => (
  <Link href="/code-du-travail/[slug]" as={`/code-du-travail/${slug}`} passHref>
    <Tile variant="dark">{title}</Tile>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href="/convention-collective/[slug]"
    as={`/convention-collective/${slug}`}
    passHref
  >
    <Tile variant="dark">Convention collective: {title}</Tile>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <Tile variant="dark" href={url} rel="noopener noreferrer" target="_blank">
    Autre: {title}
  </Tile>
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
    <ul>
      {references.map(reference => (
        <li key={reference.id}>{getLink(reference)}</li>
      ))}
    </ul>
  );
};

export default ReferenceList;
