import { News } from "./type";
import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { listingSegment } from "../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";
import DisplayContent from "../common/DisplayContent";
import { formatDateAsFrenchText } from "../utils";

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
  >
    <h1 className={fr.cx("fr-mb-6w")}>{news.title}</h1>
    <p className={fr.cx("fr-text--lg")}>{formatDateAsFrenchText(news.date)}</p>
    <DisplayContent content={news.content} titleLevel={2} />
  </ContainerRichWithBreadcrumbs>
);
