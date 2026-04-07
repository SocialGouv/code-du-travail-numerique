import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { NewsSummary } from "./type";
import { NewsItem } from "./component/NewsItem";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import { css } from "@styled-system/css";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";

type Props = {
  news: NewsSummary[];
  currentPage: number;
  totalPages: number;
};

export function NewsList({ news, totalPages, currentPage }: Props) {
  return (
    <ContainerWithBreadcrumbs currentPage={"Actualités"} breadcrumbs={[]}>
      <h1 id="actualites" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Actualités
      </h1>
      {news.length > 0 ? (
        <>
          {news.map((item) => {
            return <NewsItem key={item.slug} {...item} />;
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

const layoutCenter = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
});
