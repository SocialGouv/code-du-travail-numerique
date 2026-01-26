import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItem } from "../documents";
import { FicheMT } from "./queries";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { ContentParser } from "./ContentParser";
import { ElasticFicheTravailEmploiSection } from "@socialgouv/cdtn-types";
import { SourceData } from "../layout/SourceData";
import Html from "../common/Html";
import "../../../public/static/fiches-mt.css";

const shouldInsertResumeHeading = (html: string): boolean => {
  const match = html.match(/<h([2-6])\b/i);
  if (!match) return false;
  return Number(match[1]) > 2;
};

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  sections: Pick<
    ElasticFicheTravailEmploiSection,
    "title" | "anchor" | "html"
  >[];
  highlight:
    | Pick<ElasticFicheTravailEmploiSection, "title" | "anchor" | "html">
    | undefined;
} & Pick<
  FicheMT,
  "intro" | "title" | "date" | "metaDescription" | "url" | "breadcrumbs"
>;

export function FicheMinistereTravail({
  metaDescription,
  date,
  relatedItems,
  url,
  title,
  intro,
  sections,
  highlight,
  breadcrumbs,
}: Props) {
  return (
    <ContainerRichWithBreadcrumbs
      currentPage={title}
      breadcrumbs={breadcrumbs}
      relatedItems={relatedItems}
      title={title}
      description={metaDescription}
    >
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>

      <SourceData
        source={{ url, name: "Fiche Ministère du travail" }}
        updatedAt={date}
      />

      <div className={fr.cx("fr-mb-5w")}>
        {highlight && shouldInsertResumeHeading(highlight.html) && (
          <h2 className={fr.cx("fr-sr-only")}>Résumé</h2>
        )}
        <Html>{intro}</Html>
        {highlight && <ContentParser>{highlight.html}</ContentParser>}

        <div className={fr.cx("fr-accordions-group")}>
          <AccordionWithAnchor
            items={sections.map((section) => ({
              title: section.title,
              content: <ContentParser>{section.html}</ContentParser>,
            }))}
          />
        </div>
      </div>
    </ContainerRichWithBreadcrumbs>
  );
}
