import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Html from "../common/Html";
import { ContainerRich } from "../layout/ContainerRich";
import { RelatedItem } from "../documents";
import { ContentParser } from "./ContentParser";

type Props = {
  metaDescription: string;
  date: string;
  html: string;
  notaHtml?: string;
  relatedItems: { items: RelatedItem[]; title: string }[];
  url: string;
  title: string;
};

export function ArticleCodeDuTravail({
  metaDescription,
  date,
  html,
  relatedItems,
  url,
  title,
  notaHtml,
}: Props) {
  return (
    <ContainerRich
      relatedItems={relatedItems}
      title={title}
      description={metaDescription}
    >
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>

      <p>
        Source&nbsp;:{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Code du travail
        </a>{" "}
        - Mis à jour le&nbsp;: {date}
      </p>

      <div className={fr.cx("fr-mb-5w")}>
        <ContentParser>{html}</ContentParser>
      </div>
      {notaHtml && (
        <div className={fr.cx("fr-highlight", "fr-mb-5w")}>
          <p>NOTA</p>
          <Html>{notaHtml}</Html>
        </div>
      )}
    </ContainerRich>
  );
}
