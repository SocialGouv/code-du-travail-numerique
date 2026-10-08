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
import { fromDocumentBreadcrumbs } from "../layout/breadcrumb";
import { injectContributionPromos } from "./contributions/injectContributionPromos";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { css } from "@styled-system/css";
import { ThemeTile } from "../contributions/explore-themes/ExploreThemes";
import { ThemeIcon } from "../common/ThemeIcon";
import { getRecommendedItemKey, RecommendedItem } from "./types";

const RecommendedItemTile = ({ item }: { item: RecommendedItem }) => {
  switch (item.type) {
    case "theme":
      return <ThemeTile theme={item.theme} titleAs="h3" />;
    case "document":
      return (
        <Tile
          orientation="horizontal"
          small
          noIcon
          enlargeLinkOrButton
          titleAs="h3"
          pictogram={
            item.iconName ? <ThemeIcon name={item.iconName} /> : undefined
          }
          title={item.title}
          desc={item.desc}
          linkProps={{ href: item.url }}
          classes={{ desc: tileDesc }}
        />
      );
  }
};

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
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

        {recommendedLinks.length > 0 && (
          <div className={`${fr.cx("fr-mt-5w")} ${hideOnPrint}`}>
            <h2 className={fr.cx("fr-h5")}>Liens recommandés</h2>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
              {recommendedLinks.map((item) => (
                <div
                  key={getRecommendedItemKey(item)}
                  className={fr.cx("fr-col-12", "fr-col-md-6")}
                >
                  <RecommendedItemTile item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ContainerRichWithBreadcrumbs>
  );
}

// Mêmes réglages que les cartes « Explorez nos thématiques » des contributions.
const tileDesc = css({
  fontSize: "1rem",
  lineHeight: "1.5625rem",
});

const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
});
