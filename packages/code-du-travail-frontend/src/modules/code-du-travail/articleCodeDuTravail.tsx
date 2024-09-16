import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Html from "../common/Html";
import { ContainerRich } from "../layout/ContainerRich";
import { Feedback } from "../layout/feedback";

type Props = {
  metaDescription: string;
  date: string;
  html: string;
  notaHtml?: string;
  relatedItems?: any[];
  source: any;
  suptitle: string;
  title: string;
};

function ArticleCodeDuTravail({
  metaDescription,
  date,
  html,
  relatedItems = [],
  source,
  suptitle,
  title,
  notaHtml,
}: Props) {
  return (
    <ContainerRich
      relatedItems={relatedItems}
      title={title}
      description={metaDescription}
    >
      <Tag className={fr.cx("fr-mb-6w")}>{suptitle}</Tag>
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>

      <p>
        Source&nbsp;:{" "}
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {source.name}
        </a>{" "}
        - Mise à jour le&nbsp;: {date}
      </p>

      <div className={fr.cx("fr-mb-5w")}>
        <Html>{html}</Html>
      </div>
      {notaHtml && (
        <div className={fr.cx("fr-highlight", "fr-mb-5w")}>
          <p>NOTA</p>
          <Html>{notaHtml}</Html>
        </div>
      )}
      <Feedback />
    </ContainerRich>
  );
}

export default ArticleCodeDuTravail;
