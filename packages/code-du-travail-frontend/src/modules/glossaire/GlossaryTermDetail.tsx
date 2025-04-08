import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import React from "react";
import { Container } from "../layout/Container";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import { List } from "../common/List";

type GlossaryTermDetailProps = {
  term: string;
  definition: string;
  references?: string[];
};

export const GlossaryTermDetail = ({
  term,
  definition,
  references = [],
}: GlossaryTermDetailProps) => {
  return (
    <ContainerWithBreadcrumbs
      currentPage={term}
      breacrumbs={[
        {
          label: "Glossaire",
          slug: `/${getRouteBySource(SOURCES.GLOSSARY)}`,
          position: 1,
        },
      ]}
    >
      <Container>
        <h1 id="glossary-term">{term}</h1>
        <div>
          <h2 className={fr.cx("fr-h4")}>Définition</h2>
          <p>{definition}</p>
        </div>

        {references && references.length > 0 && (
          <div>
            <h2 className={fr.cx("fr-h4")}>Sources</h2>
            <List
              items={references.map((url) => {
                return (
                  <Link
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url}
                  </Link>
                );
              })}
            />
          </div>
        )}
        <div>
          <Link
            href={`/${getRouteBySource(SOURCES.GLOSSARY)}`}
            className={fr.cx("fr-link")}
          >
            <span className={`${fr.cx("ri-arrow-left-line")}`} />
            Glossaire
          </Link>
        </div>
      </Container>
    </ContainerWithBreadcrumbs>
  );
};
