import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Html from "../common/Html";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { Share } from "../common/Share";
import { RelatedItems } from "../common/RelatedItems";

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
    <div
      className={fr.cx(
        "fr-grid-row",
        "fr-my-4w",
        "fr-my-md-12w"
      )}
    >
      <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
        <Tag className={fr.cx("fr-mb-6w")}>{suptitle}</Tag>
        <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>

        <p>
          Source:{" "}
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.name}
          </a>{" "}
          - Mise à jour le: {date}
        </p>

        <Html>{html}</Html>
        {notaHtml && (
          <div className="fr-highlight fr-my-2w">
            <p>
              <strong>NOTA</strong>
            </p>
            <Html>{notaHtml}</Html>
          </div>
        )}
      </div>
      {/*<Feedback url={router.asPath} />*/}

      {relatedItems.length > 0 && (
        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-3")}
        >
          <RelatedItems items={relatedItems} />
          <Share title={title} metaDescription={metaDescription} />
        </div>
      )}
    </div>
  );
}

export default ArticleCodeDuTravail;
