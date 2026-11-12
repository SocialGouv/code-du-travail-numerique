import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { ElasticFicheServicePublic } from "./queries";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { ContentMeta } from "../common/ContentMeta";
import { ArticleJsonLd } from "../seo/jsonld";
import "../../../public/static/fiches-mt.css";
import { FicheServicePublic } from "./builder";
import { ReferenceList } from "../common/ReferencesList";
import { FicheSPData } from "./builder/type";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { fromDocumentBreadcrumbs } from "../layout/breadcrumb";
import { injectContributionPromos } from "./contributions/injectContributionPromos";
import { RecommendedLinks } from "./RecommendedLinks";
import { RecommendedItem } from "./types";

type Props = {
  raw: { children: FicheSPData[] };
  recommendedLinks?: RecommendedItem[];
} & Pick<
  ElasticFicheServicePublic,
  | "title"
  | "date"
  | "metaDescription"
  | "url"
  | "breadcrumbs"
  | "referencedTexts"
  | "slug"
>;

export function FicheServicePublicContainer({
  metaDescription,
  date,
  url,
  title,
  raw,
  breadcrumbs,
  referencedTexts,
  slug,
  recommendedLinks = [],
}: Props) {
  return (
    <ContainerRichWithBreadcrumbs
      currentPage={title}
      breadcrumbSegments={fromDocumentBreadcrumbs(breadcrumbs)}
      relatedItems={[]}
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
        <FicheServicePublic
          data={injectContributionPromos(raw.children, slug)}
        />

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

        <RecommendedLinks items={recommendedLinks} ficheSlug={slug} />
      </div>
    </ContainerRichWithBreadcrumbs>
  );
}
