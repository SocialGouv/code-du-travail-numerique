import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItem } from "../documents";
import { ElasticFicheServicePublic } from "./queries";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { ContentMeta } from "../common/ContentMeta";
import { ArticleJsonLd } from "../seo/jsonld";
import "../../../public/static/fiches-mt.css";
import { FicheServicePublic } from "./builder";
import { ReferenceList } from "../common/ReferencesList";
import { FicheSPData } from "./builder/type";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  raw: { children: FicheSPData[] };
} & Pick<
  ElasticFicheServicePublic,
  | "title"
  | "date"
  | "metaDescription"
  | "url"
  | "breadcrumbs"
  | "referencedTexts"
>;

export function FicheServicePublicContainer({
  metaDescription,
  date,
  relatedItems,
  url,
  title,
  raw,
  breadcrumbs,
  referencedTexts,
}: Props) {
  return (
    <ContainerRichWithBreadcrumbs
      currentPage={title}
      breadcrumbs={breadcrumbs}
      relatedItems={relatedItems}
      title={title}
      description={metaDescription}
    >
      <h1 className={fr.cx("fr-mb-0")}>{title}</h1>

      <ContentMeta
        date={date}
        source={{ url, name: "Fiche service-public.gouv.fr" }}
        breadcrumbs={breadcrumbs}
      />
      <ArticleJsonLd
        title={title}
        datePublished={date}
        breadcrumbs={breadcrumbs}
      />

      <div className={fr.cx("fr-mb-5w")}>
        <FicheServicePublic data={raw.children} />

        {referencedTexts?.length > 0 && (
          <AccordionWithAnchor
            items={[
              {
                title: "Références juridiques concernées",
                content: <ReferenceList references={referencedTexts} />,
              },
            ]}
            titleAs={"h2"}
          />
        )}
      </div>
    </ContainerRichWithBreadcrumbs>
  );
}
