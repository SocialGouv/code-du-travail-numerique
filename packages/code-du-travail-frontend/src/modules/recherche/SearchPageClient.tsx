"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { SearchBar } from "./SearchBar";
import { SearchCard } from "./Card";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

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

  const getSearchParam = useCallback(
    (param: string) => searchParams?.get(param),
    [searchParams]
  );

  useEffect(() => {
    const q = getSearchParam("q");
    if (q) {
      setQuery(q);
    }
  }, [getSearchParam]);

  const { documents, themes, articles } = items;

  const codeArticles = articles.filter(
    (item) => item.source === SOURCES.CDT && item.slug
  );

  const allResults = [
    ...documents,
    ...articles.filter((item) => item.source !== SOURCES.CDT),
  ];

  const [visibleItems, setVisibleItems] = React.useState(8);
  const hasMoreResults = visibleItems < allResults.length;

  const loadMoreResults = () => {
    setVisibleItems((prev) => prev + 8);
  };

  const relatedThemes = themes.slice(0, 6);

  return (
    <div className="fr-container fr-mb-4w">
      <Breadcrumb
        segments={[
          {
            label: "Accueil",
            linkProps: {
              href: "/",
            },
          },
        ]}
        currentPageLabel="Recherche"
        className="fr-mb-2w"
      />

      <h1 className="fr-h2 fr-mb-4w">Rechercher</h1>

      <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
        <div className="fr-col-12 fr-col-md-4">
          <SearchBar initialValue={query} />
        </div>
      </div>

      {query && (
        <>
          <h2 className="fr-h4 fr-mb-4w">
            Résultats de recherche pour &quot;{query}&quot;
          </h2>

          {allResults.length === 0 ? (
            <div className="fr-alert fr-alert--info fr-mb-4w">
              <p>
                Nous n&apos;avons pas trouvé de résultat pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="fr-grid-row fr-grid-row--gutters">
              {allResults.slice(0, visibleItems).map((item, index) => {
                const category =
                  item.source === "code_du_travail"
                    ? "Code du travail"
                    : item.breadcrumbs?.length > 0
                      ? item.breadcrumbs[item.breadcrumbs.length - 1].label
                      : item.source;

                return (
                  <SearchCard
                    key={`${item.source}-${item.slug || index}`}
                    title={item.title}
                    description={item.description || ""}
                    category={category}
                    link={`/${getRouteBySource(item.source)}/${item.slug}`}
                  />
                );
              })}
            </div>
          )}

          {hasMoreResults && (
            <div className="fr-mt-4w fr-mb-8w fr-text--center">
              <Button onClick={loadMoreResults} priority="secondary">
                Plus de résultats
              </Button>
            </div>
          )}

          {codeArticles.length > 0 && (
            <section className="fr-mt-8w">
              <h2 className="fr-h3 fr-mb-4w">Articles du code du travail</h2>
              <div className="fr-grid-row fr-grid-row--gutters">
                {codeArticles.map((article, index) => (
                  <SearchCard
                    key={`${article.source}-${article.slug || index}`}
                    title={article.slug}
                    description={article.description || ""}
                    link={`/code-du-travail/${article.slug}`}
                  />
                ))}
              </div>
            </section>
          )}

          {relatedThemes.length > 0 && (
            <section className="fr-mt-8w">
              <h2 className="fr-h3 fr-mb-4w">
                Les thèmes suivants peuvent vous intéresser
              </h2>
              <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                {relatedThemes.map((theme, index) => (
                  <Button
                    key={index}
                    linkProps={{
                      href: `/themes/${theme.slug}`,
                    }}
                    priority="secondary"
                    className="fr-mr-2w fr-mb-2w"
                  >
                    {theme.title}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
