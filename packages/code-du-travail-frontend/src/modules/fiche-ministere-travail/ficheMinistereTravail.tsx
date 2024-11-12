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
      breacrumbs={breadcrumbs}
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
