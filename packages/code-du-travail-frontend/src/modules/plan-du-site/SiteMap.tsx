import { fr } from "@codegouvfr/react-dsfr";
import { Document } from "./queries";
import React from "react";
import Link from "../common/Link";
import { getRouteBySource, SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { Container } from "../layout/Container";

type Props = {
  themes: Document[];
  tools: Document[];
  modeles: Document[];
  contributions: Document[];
  agreements: Document[];
  informations: Document[];
};

type SectionProps = {
  title: string;
  url?: string;
  detail?: {
    source: SourceKeys;
    docs: Document[];
  };
  headingLevel?: number;
};

const SiteMapSection = ({
  title,
  url,
  detail,
  headingLevel = 3,
}: SectionProps) => (
  <div className={fr.cx("fr-mb-4w")}>
    {url ? (
      <div
        role="heading"
        aria-level={headingLevel}
        className={fr.cx("fr-text--lead", "fr-text--bold")}
      >
        <Link href={url}>{title}</Link>
      </div>
    ) : (
      <div
        role="heading"
        aria-level={headingLevel}
        className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-3w")}
      >
        {title}
      </div>
    )}

    {detail && (
      <ul className={fr.cx("fr-mt-3w")}>
        {detail.docs.map(({ root, children }) => (
          <li key={root.slug}>
            <Link href={`/${getRouteBySource(detail.source)}/${root.slug}`}>
              {root.title}
            </Link>
            {children && (
              <ul>
                {children.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/${getRouteBySource(detail.source)}/${doc.slug}`}
                    >
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export const SiteMap = ({
  tools,
  modeles,
  contributions,
  agreements,
  informations,
  themes,
}: Props) => (
  <Container>
    <h1 id="plan-du-site" className={fr.cx("fr-mt-0", "fr-mb-3w")}>
      Plan du site
    </h1>
    <SiteMapSection title={"Page d'accueil"} url={"/"} headingLevel={2} />
    <SiteMapSection
      title={"Boîte à outils"}
      url={"/outils"}
      detail={{
        source: SOURCES.TOOLS,
        docs: tools,
      }}
    />
    <SiteMapSection
      title={"Modèles de documents"}
      url={"/modeles-de-courriers"}
      detail={{
        source: SOURCES.LETTERS,
        docs: modeles,
      }}
    />
    <SiteMapSection
      title={"Contenus éditoriaux"}
      detail={{
        source: SOURCES.EDITORIAL_CONTENT,
        docs: informations,
      }}
    />
    <SiteMapSection
      title={"Vos fiches pratiques"}
      url={"/contribution"}
      detail={{
        source: SOURCES.CONTRIBUTIONS,
        docs: contributions,
      }}
    />
    <SiteMapSection
      title={"Votre convention collective"}
      url={"/convention-collective"}
      detail={{
        source: SOURCES.CCN,
        docs: agreements,
      }}
    />
    <SiteMapSection
      title={"Thèmes"}
      url={"/themes"}
      detail={{
        source: SOURCES.THEMES,
        docs: themes,
      }}
    />
  </Container>
);
