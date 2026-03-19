"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";
import { SearchBar } from "./SearchBar";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import { useSearchTracking } from "./tracking";
import { generateSearchLink } from "./utils";
import { summarize } from "../utils";
import { SearchResult } from "src/api";

const SUGGESTION_COUNT = 5;
const RESULTS_PER_PAGE = 10;

export type SearchPageClientProps = {
  query: string;
  items: {
    documents: SearchResult[];
    themes: SearchResult[];
    articles: SearchResult[];
    class: string;
  };
};

export const SearchPageClient: React.FC<SearchPageClientProps> = ({
  query: initialQuery,
  items,
}) => {
  const searchParams = useSearchParams();
  const {
    emitFullsearchEventOnce,
    emitResultSelectionEvent,
    emitNextPageEvent,
  } = useSearchTracking();

  const searchResultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const { documents, class: klass } = items;

  const urlQuery = searchParams?.get("query");
  const query = urlQuery && urlQuery.length > 0 ? urlQuery : initialQuery;

  const currentPage = Number(searchParams?.get("page") || "1");

  // TODO : fix this event : sent twice with unsync data
  useEffect(() => {
    if (query && klass) {
      emitFullsearchEventOnce(query, klass);
      const timeout = window.setTimeout(() => {
        searchResultsHeadingRef.current?.focus();
      }, 100);

      return () => window.clearTimeout(timeout);
    }
  }, [query, emitFullsearchEventOnce, klass]);

  const suggestionItems = documents.slice(0, SUGGESTION_COUNT);
  const remainingItems = documents.slice(SUGGESTION_COUNT);
  const totalPages = Math.max(
    1,
    Math.ceil(remainingItems.length / RESULTS_PER_PAGE)
  );
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedItems = remainingItems.slice(
    (safePage - 1) * RESULTS_PER_PAGE,
    safePage * RESULTS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > 1) {
      emitNextPageEvent(query);
    }
  }, [currentPage, emitNextPageEvent, query]);

  const getCategoryLabel = (item: SearchResult) =>
    item.source === "code_du_travail"
      ? "Code du travail"
      : item.breadcrumbs && item.breadcrumbs.length > 0
        ? item.breadcrumbs[item.breadcrumbs.length - 1].label
        : item.source;

  const handleResultClick = (item: SearchResult) => () =>
    emitResultSelectionEvent(
      item.source,
      item.slug,
      item.url,
      item.algo,
      item.parentSlug
    );

  return (
    <ContainerWithBreadcrumbs currentPage="Recherche" breadcrumbs={[]}>
      <h1 className={fr.cx("fr-mt-0", "fr-mb-6w")}>Recherche</h1>

      <SearchBar key={query} initialValue={query} showLabel />

      {query && (
        <>
          <h2
            ref={searchResultsHeadingRef}
            className={fr.cx("fr-h3", "fr-mt-6w")}
            lang="fr"
            tabIndex={-1}
            id="search-results-heading"
          >
            {documents.length} Résultat{documents.length > 1 ? "s" : ""}
          </h2>

          {documents.length === 0 ? (
            <div
              className={fr.cx(
                "fr-alert",
                "fr-alert--info",
                "fr-mb-4w",
                "fr-mt-3w"
              )}
            >
              <p lang="fr">
                Nous n&apos;avons pas trouvé de résultat pour votre recherche.
              </p>
            </div>
          ) : (
            <>
              {/* Section "Cela pourrait vous intéresser ?" - top results as vertical cards */}
              {suggestionItems.length > 0 && (
                <section className={fr.cx("fr-mt-3w")}>
                  <h3 className={fr.cx("fr-h3")} lang="fr">
                    Cela pourrait vous intéresser ?
                  </h3>
                  <div
                    className={fr.cx(
                      "fr-grid-row",
                      "fr-grid-row--gutters",
                      "fr-mt-3w"
                    )}
                  >
                    {suggestionItems.map((item) => (
                      <div
                        key={item.cdtnId}
                        className={fr.cx(
                          "fr-col-12",
                          "fr-col-sm-6",
                          "fr-col-md-4"
                        )}
                      >
                        <Card
                          border
                          title={item.title}
                          titleAs="h4"
                          size="small"
                          enlargeLink
                          linkProps={{
                            id: `search-result-${item.cdtnId}`,
                            href: generateSearchLink(
                              item.source,
                              item.slug,
                              item.url,
                              item.parentSlug
                            ),
                            onClick: handleResultClick(item),
                          }}
                          desc={summarize(item.description || "")}
                          start={
                            <p className={fr.cx("fr-tag", "fr-tag--sm")}>
                              {getCategoryLabel(item)}
                            </p>
                          }
                          classes={{
                            start: fr.cx("fr-mb-2w"),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section résultats principaux - horizontal cards */}
              {remainingItems.length > 0 && (
                <section className={fr.cx("fr-mt-6w")}>
                  <h3 className={fr.cx("fr-h3")} lang="fr">
                    {documents.length} résultat
                    {documents.length > 1 ? "s" : ""}
                  </h3>
                  <div
                    className={fr.cx(
                      "fr-grid-row",
                      "fr-grid-row--gutters",
                      "fr-mt-3w"
                    )}
                  >
                    {paginatedItems.map((item) => (
                      <div
                        key={item.cdtnId}
                        className={fr.cx("fr-col-12", "fr-col-md-6")}
                      >
                        <Card
                          border
                          horizontal
                          title={item.title}
                          titleAs="h4"
                          size="medium"
                          enlargeLink
                          linkProps={{
                            id: `search-result-${item.cdtnId}`,
                            href: generateSearchLink(
                              item.source,
                              item.slug,
                              item.url,
                              item.parentSlug
                            ),
                            onClick: handleResultClick(item),
                          }}
                          desc={summarize(item.description || "")}
                          start={
                            <p className={fr.cx("fr-tag", "fr-tag--sm")}>
                              {getCategoryLabel(item)}
                            </p>
                          }
                          classes={{
                            start: fr.cx("fr-mb-2w"),
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className={fr.cx("fr-mt-6w")}>
                      <Pagination
                        count={totalPages}
                        defaultPage={safePage}
                        getPageLinkProps={(pageNumber) => ({
                          href: `/recherche?query=${encodeURIComponent(query)}&page=${pageNumber}`,
                        })}
                        showFirstLast
                      />
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </>
      )}

      <div className={fr.cx("fr-mb-11w")} />
    </ContainerWithBreadcrumbs>
  );
};
