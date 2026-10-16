import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { NewsSummary } from "./type";
import { NewsItem } from "./component/NewsItem";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import { css } from "@styled-system/css";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import Link from "../common/Link";
import { NEWS_RSS_FEED } from "./rss";

type Props = {
  news: NewsSummary[];
  currentPage: number;
  totalPages: number;
};

export function NewsList({ news, totalPages, currentPage }: Props) {
  return (
    <ContainerWithBreadcrumbs currentPage={"Actualités"}>
      <h1 id="actualites" className={fr.cx("fr-mt-0", "fr-mb-2w")}>
        Actualités
      </h1>
      <p className={fr.cx("fr-mb-6w")}>
        <Link
          className={rssLink}
          title={`S'abonner au flux RSS : ${NEWS_RSS_FEED.title}`}
          href={NEWS_RSS_FEED.href}
          // Route XML, pas une page : rien à précharger.
          prefetch={false}
        >
          <span
            className={`${fr.cx("fr-icon-rss-fill")} ${rssIcon}`}
            aria-hidden="true"
          />
          Flux RSS
        </Link>
      </p>
      {news.length > 0 ? (
        <>
          {news.map((item, index) => {
            return (
              <NewsItem key={item.slug} {...item} imagePriority={index === 0} />
            );
          })}
          <div className={`${fr.cx("fr-mb-12w")} ${layoutCenter}`}>
            <Pagination
              count={totalPages}
              defaultPage={currentPage}
              getPageLinkProps={(pageNumber) => ({
                href: `/actualite?page=${pageNumber}`,
              })}
            />
          </div>
        </>
      ) : (
        <div>Aucune actualité publiée pour le moment.</div>
      )}
    </ContainerWithBreadcrumbs>
  );
}

const rssLink = css({
  display: "inline-flex",
  alignItems: "center",
  color: "var(--text-title-grey)",
  backgroundImage: "none",
  _hover: { textDecoration: "underline" },
});

const rssIcon = css({
  color: "var(--artwork-minor-blue-cumulus)",
});

const layoutCenter = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
});
