"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { fr } from "@codegouvfr/react-dsfr";
import { SearchBar } from "./SearchBar";
import { SearchCard } from "./Card";
import { MasonryGrid } from "./MasonryGrid";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import { useSearchTracking } from "./tracking";
import { generateSearchLink } from "./utils";
import { SearchResult } from "src/api";
import { Feedback } from "../layout/feedback";

export type SearchPageClientProps = {
  query: string;
  items: {
    topDocuments: SearchResult[];
    documents: SearchResult[];
    size: number;
    class: string;
  };
};

export const SearchPageClient: React.FC<SearchPageClientProps> = ({
  query: initialQuery,
  items,
}) => {
  const searchParams = useSearchParams();
  const { emitFullsearchEventOnce, emitResultSelectionEvent } =
    useSearchTracking();

  // Ref for focusing search results heading
  const searchResultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const { topDocuments, documents, class: klass, size } = items;

  const urlQuery = searchParams?.get("query");
  const query = urlQuery && urlQuery.length > 0 ? urlQuery : initialQuery;

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

  return (
    <ContainerWithBreadcrumbs currentPage="Recherche" breadcrumbs={[]}>
      <h1 className={fr.cx("fr-mt-0", "fr-mb-3w")}>Recherche</h1>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-5w")}>
        <div className={fr.cx("fr-col-md-9", "fr-col-12")}>
          <SearchBar key={query} initialValue={query} />
        </div>
      </div>
      {size === 0 ? (
        <div
          className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-6w")}
        >
          <div className={fr.cx("fr-col-md-9", "fr-col-12")}>
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
          </div>
        </div>
      ) : (
        <>
          <div
            className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-0")}
          >
            <div className={fr.cx("fr-col-md-9", "fr-col-12")}>
              <h2
                ref={searchResultsHeadingRef}
                className={fr.cx("fr-h3")}
                tabIndex={-1}
                id="search-results-heading"
                lang="fr"
              >
                Résultat{size > 1 ? "s" : ""}
                <span className={fr.cx("fr-sr-only")}>
                  {" "}
                  de recherche pour &quot;
                  {query}&quot;
                </span>
              </h2>
              <MasonryGrid id="content">
                {topDocuments.map((item) => (
                  <SearchCard
                    key={item.cdtnId}
                    id={`search-result-${item.cdtnId}`}
                    title={item.title}
                    description={item.description || ""}
                    source={item.source}
                    link={generateSearchLink(
                      item.source,
                      item.slug,
                      item.url,
                      item.parentSlug
                    )}
                    onClick={() =>
                      emitResultSelectionEvent(
                        item.source,
                        item.slug,
                        item.url,
                        item.algo,
                        item.parentSlug
                      )
                    }
                  />
                ))}
              </MasonryGrid>
            </div>
            <div className={fr.cx("fr-col-md-3", "fr-col-12")}>
              <Feedback question="Ces résultats sont-ils pertinents pour votre recherche ?" />
            </div>
          </div>
          {documents.length > 0 && (
            <div
              className={fr.cx(
                "fr-grid-row",
                "fr-grid-row--gutters",
                "fr-mb-6w"
              )}
            >
              <div className={fr.cx("fr-col-md-9", "fr-col-12")}>
                <h2 className={fr.cx("fr-h3", "fr-mt-3w")} lang="fr">
                  Pour aller plus loin
                </h2>
                <div
                  id="results"
                  className={fr.cx(
                    "fr-grid-row",
                    "fr-grid-row--gutters",
                    "fr-mt-3w"
                  )}
                >
                  {documents.map((item) => {
                    return (
                      <div
                        key={item.cdtnId}
                        className={fr.cx("fr-col-md-6", "fr-col-12")}
                      >
                        <SearchCard
                          id={`search-result-${item.cdtnId}`}
                          title={item.title}
                          description={item.description || ""}
                          source={item.source}
                          link={generateSearchLink(
                            item.source,
                            item.slug,
                            item.url,
                            item.parentSlug
                          )}
                          onClick={() =>
                            emitResultSelectionEvent(
                              item.source,
                              item.slug,
                              item.url,
                              item.algo,
                              item.parentSlug
                            )
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className={fr.cx("fr-mb-11w")} />
    </ContainerWithBreadcrumbs>
  );
};
