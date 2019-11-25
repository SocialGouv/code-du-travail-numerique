import React from "react";
import { LargeLink } from "@socialgouv/react-ui";
import Link from "next/link";
import TYPE_REFERENCE from "./typeReference";

const CodeDuTravailLink = ({ title, slug }) => (
  <Link href="/code-du-travail/[slug]" as={`/code-du-travail/${slug}`} passHref>
    <LargeLink variant="dark">{title}</LargeLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href="/convention-collective/[slug]"
    as={`/convention-collective/${slug}`}
    passHref
  >
    <LargeLink variant="dark">Convention collective: {title}</LargeLink>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <LargeLink
    variant="dark"
    href={url}
    rel="noopener noreferrer"
    target="_blank"
  >
    Autre: {title}
  </LargeLink>
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
