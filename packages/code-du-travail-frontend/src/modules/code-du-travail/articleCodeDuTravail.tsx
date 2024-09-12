import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Html from "../common/Html";
import { ContainerRich } from "../layout/ContainerRich";
import { RelatedItem } from "../../api/modules/related-items/type";

type Props = {
  metaDescription: string;
  date: string;
  html: string;
  notaHtml?: string;
  relatedItems: RelatedItem[];
  url: string;
  suptitle: string;
  title: string;
};

function ArticleCodeDuTravail({
  metaDescription,
  date,
  html,
  relatedItems,
  url,
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
        Source:{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Code du travail
        </a>{" "}
        - Mise à jour le: {date}
      </p>

      <div className="fr-mb-5w">
        <Html>{html}</Html>
      </div>
      {notaHtml && (
        <div className="fr-highlight fr-mb-5w">
          <p>NOTA</p>
          <Html>{notaHtml}</Html>
        </div>
      )}
    </ContainerRich>
  );
}

export default ArticleCodeDuTravail;
