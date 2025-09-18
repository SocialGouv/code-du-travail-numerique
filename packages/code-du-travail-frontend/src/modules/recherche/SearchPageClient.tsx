"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";
import { SearchBar } from "./SearchBar";
import { SearchCard } from "./Card";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import { useSearchTracking } from "./tracking";
import { generateSearchLink } from "./utils";
import { SEARCH_VISIBLE_ITEMS } from "./constants";

type SearchPageClientProps = {
  query: string;
  items: {
    documents: any[];
    themes: any[];
    articles: any[];
  };
};

export const SearchPageClient: React.FC<SearchPageClientProps> = ({
  query: initialQuery,
  items,
}) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const { emitSearchEvent, emitResultSelectionEvent, emitNextPageEvent } =
    useSearchTracking();

  // Ref for focusing search results heading
  const searchResultsHeadingRef = useRef<HTMLHeadingElement>(null);

  const getSearchParam = useCallback(
    (param: string) => searchParams?.get(param),
    [searchParams]
  );

  useEffect(() => {
    const query = getSearchParam("query");
    if (query) {
      setQuery(query);
    }
  }, [getSearchParam]);

  useEffect(() => {
    if (query) {
      emitSearchEvent(query);
      // Focus the search results heading when a search is performed
      setTimeout(() => {
        searchResultsHeadingRef.current?.focus();
      }, 100);
    }
  }, [query, emitSearchEvent]);

  const { documents, themes, articles } = items;

  const codeArticles = articles.filter(
    (item) => item.source === SOURCES.CDT && item.slug
  );

  const [visibleItems, setVisibleItems] = React.useState(8);
  const hasMoreResults = visibleItems < documents.length;

  const loadMoreResults = () => {
    emitNextPageEvent(query);
    const previousVisibleItems = visibleItems;
    setVisibleItems((prev) =>
      Math.min(documents.length, prev + SEARCH_VISIBLE_ITEMS)
    );
    // Focus on the first newly displayed result's link
    setTimeout(() => {
      const newItem =
        documents.length > previousVisibleItems
          ? documents[previousVisibleItems]
          : undefined;
      if (newItem) {
        const newItemLink = document.getElementById(
          `search-result-${newItem.cdtnId}`
        );
        if (newItemLink) {
          // Add tabindex to make it focusable and focus it
          newItemLink.tabIndex = -1;
          newItemLink.focus();
        }
      }
    }, 150); // Increased timeout to ensure DOM is updated
  };

  return (
    <ContainerWithBreadcrumbs currentPage="Recherche" breadcrumbs={[]}>
      <h1 className={fr.cx("fr-mt-0", "fr-mb-6w")}>Rechercher</h1>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-6w")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
          <SearchBar initialValue={query} />
        </div>
      </div>

      {query && (
        <>
          <h2
            ref={searchResultsHeadingRef}
            className={fr.cx("fr-h4")}
            lang="fr"
            tabIndex={-1}
            id="search-results-heading"
          >
            {documents.length} résultat{documents.length > 1 ? "s" : ""} de
            recherche pour &quot;{query}&quot;
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
            <div
              id="content"
              className={fr.cx(
                "fr-grid-row",
                "fr-grid-row--gutters",
                "fr-mt-3w"
              )}
            >
              {documents.slice(0, visibleItems).map((item) => {
                return (
                  <SearchCard
                    key={item.cdtnId}
                    id={`search-result-${item.cdtnId}`}
                    title={item.title}
                    description={item.description || ""}
                    category={
                      item.source === "code_du_travail"
                        ? "Code du travail"
                        : item.breadcrumbs?.length > 0
                          ? item.breadcrumbs[item.breadcrumbs.length - 1].label
                          : item.source
                    }
                    link={generateSearchLink(item.source, item.slug, item.url)}
                    onClick={() =>
                      emitResultSelectionEvent(
                        item.source,
                        item.slug,
                        item.url,
                        item.algo
                      )
                    }
                  />
                );
              })}
            </div>
          )}

          {hasMoreResults && (
            <div
              className={fr.cx(
                "fr-mt-3w",
                "fr-grid-row",
                "fr-grid-row--center"
              )}
            >
              <div lang="fr">
                <Button onClick={loadMoreResults} priority="secondary">
                  Plus de résultats
                </Button>
              </div>
            </div>
          )}

          {codeArticles.length > 0 && (
            <section className={fr.cx("fr-mt-6w")}>
              <h2 className={fr.cx("fr-h3")} lang="fr">
                Articles du code du travail
              </h2>
              <div
                className={fr.cx(
                  "fr-grid-row",
                  "fr-grid-row--gutters",
                  "fr-mt-3w"
                )}
              >
                {codeArticles.map((article) => {
                  return (
                    <SearchCard
                      key={`${article.source}-${article.slug}`}
                      title={article.slug}
                      description={article.description || ""}
                      link={generateSearchLink(article.source, article.slug)}
                      onClick={() =>
                        emitResultSelectionEvent(
                          article.source,
                          article.slug,
                          undefined,
                          article.algo
                        )
                      }
                      hiddenHeader
                    />
                  );
                })}
              </div>
            </section>
          )}

          {themes.length > 0 && (
            <section className={fr.cx("fr-mt-6w")}>
              <h2 className={fr.cx("fr-h3")} lang="fr">
                Les thèmes suivants peuvent vous intéresser
              </h2>
              <ul
                className={fr.cx(
                  "fr-grid-row",
                  "fr-grid-row--gutters",
                  "fr-grid-row--center",
                  "fr-mt-3w",
                  "fr-raw-list"
                )}
              >
                {themes.map((theme, index) => (
                  <li key={index} className={fr.cx("fr-mr-2w", "fr-mb-2w")}>
                    <Button
                      linkProps={{
                        href: generateSearchLink(theme.source, theme.slug),
                        onClick: () =>
                          emitResultSelectionEvent(
                            theme.source,
                            theme.slug,
                            undefined,
                            theme.algo
                          ),
                      }}
                      priority="secondary"
                    >
                      {theme.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <div className={fr.cx("fr-mb-11w")} />
    </ContainerWithBreadcrumbs>
  );
};
