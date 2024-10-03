import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Html from "../common/Html";
import { ContainerRich } from "../layout/ContainerRich";
import { Feedback } from "../layout/feedback";
import { RelatedItem } from "../documents";
import { FicheMT } from "./queries";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
} & Pick<
  FicheMT,
  | "intro"
  | "title"
  | "date"
  | "metaDescription"
  | "url"
  | "sections"
  | "highlight"
  | "breadcrumbs"
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

      <p>
        Source&nbsp;:{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Fiche Ministère du travail
        </a>{" "}
        - Mise à jour le&nbsp;: {date}
      </p>

      <div className={fr.cx("fr-mb-5w")}>
        <Html>{intro}</Html>
        {highlight && (
          <div className={fr.cx("fr-highlight", "fr-p-2w", "fr-m-0")}>
            <Html>{highlight.html}</Html>
          </div>
        )}

        <div className={fr.cx("fr-accordions-group")}>
          <AccordionWithAnchor
            items={sections.map((section) => ({
              title: section.title,
              content: <Html>{section.html}</Html>,
            }))}
          />
        </div>
      </div>
    </ContainerRichWithBreadcrumbs>
  );
}
