import { News } from "./type";
import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import DisplayContent from "../common/DisplayContent";
import { formatDateAsFrenchText } from "../utils";

type Props = {
  news: News;
};

export const NewsContainer = ({ news }: Props) => (
  <ContainerRichWithBreadcrumbs
    currentPage={news.title}
    breadcrumbs={[
      {
        label: "Actualités",
        position: 1,
        slug: "/actualite",
      },
    ]}
    relatedItems={news.relatedItems}
    title={news.title}
    description={news.meta_description}
    showFeedback={false}
  >
    <h1 className={fr.cx("fr-mb-6w")}>{news.title}</h1>
    <p className={fr.cx("fr-text--lg")}>{formatDateAsFrenchText(news.date)}</p>
    <DisplayContent content={news.content} titleLevel={3} />
  </ContainerRichWithBreadcrumbs>
);
