import { News } from "./type";
import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { listingSegment } from "../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";
import DisplayContent from "../common/DisplayContent";
import { PublishedDate } from "../common/PublishedDate";
import { NEWS_RSS_FEED } from "./rss";
import { NewsImage } from "./component/NewsImage";
import { References } from "../common/References";

type Props = {
  news: News;
};

export const NewsContainer = ({ news }: Props) => (
  <ContainerRichWithBreadcrumbs
    currentPage={news.title}
    breadcrumbSegments={[listingSegment(SOURCES.NEWS)]}
    relatedItems={news.relatedItems}
    title={news.title}
    description={news.meta_description}
    showFeedback={false}
    showShare
    shareRssFeed={NEWS_RSS_FEED}
  >
    <h1 className={fr.cx("fr-mb-6w")}>{news.title}</h1>
    <PublishedDate date={news.date} className={fr.cx("fr-text--lg")} />
    {news.image && <NewsImage image={news.image} />}
    <DisplayContent content={news.content} titleLevel={2} />
    {news.references.length > 0 && (
      <References
        label="Références juridiques"
        links={news.references}
        titleAs="h2"
      />
    )}
  </ContainerRichWithBreadcrumbs>
);
