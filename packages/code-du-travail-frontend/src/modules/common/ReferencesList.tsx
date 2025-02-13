import React from "react";
import { ServicePublicReference } from "@socialgouv/cdtn-types";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "./Link";

export const ReferenceList = ({
  references,
}: {
  references: ServicePublicReference[];
}) => {
  const formattedRefs = references
    .map((ref) => {
      switch (ref.type) {
        case SOURCES.CDT:
          return (
            <a
              key={ref.slug + ref.title}
              href={`/${getRouteBySource(SOURCES.CDT)}/${ref.slug}`}
            >{`Article ${ref.title} du Code du travail`}</a>
          );
        case SOURCES.CCN:
          return (
            <a
              key={ref.slug + ref.title}
              href={`/${getRouteBySource(SOURCES.CCN)}/${ref.slug}`}
            >{`Convention collective: ${ref.title}`}</a>
          );
        case SOURCES.EXTERNALS:
          return (
            <Link
              key={ref.url + ref.title}
              href={ref.url}
              target="_blank"
              rel="noreferer noopener"
            >{`Convention collective: ${ref.title}`}</Link>
          );
      }
    })
    .filter((item) => item !== null);
  return (
    <ul>
      {formattedRefs.map((item) => {
        return (
          <li key={item.key}>
            <p className={fr.cx("fr-mb-0")}>{item}</p>
          </li>
        );
      })}
    </ul>
  );
};
