import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResultCard } from "./SearchResultCard";
import { useRef, useEffect } from "react";
import { SearchResult } from "src/api/modules/search/service/presearch";
import { useSearchTracking } from "../tracking";

interface Props {
  results: SearchResult[];
  onResultClick?: () => void;
  contextType: "home" | "modal";
  titleRef?: React.RefObject<HTMLHeadingElement | null>;
}

export const SearchResults = ({
  results,
  onResultClick,
  contextType,
  titleRef,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { emitSelectPresearchResultEvent } = useSearchTracking();

  useEffect(() => {
    // Focus is now managed by the parent component via titleRef
    // Remove auto-focus on first link
  }, []);

  if (results.length === 0) {
    return null;
  }

  const handleResultClick = (result: SearchResult) => {
    emitSelectPresearchResultEvent(result);
    if (onResultClick) {
      onResultClick();
    }
  };

  return (
    <section
      className={fr.cx("fr-mt-3w")}
      ref={containerRef}
      aria-labelledby={`search-results-heading-${contextType}`}
    >
      <div className={`${titleDivStyle} ${fr.cx("fr-p-1w")}`}>
        <h2
          id={`search-results-heading-${contextType}`}
          className={fr.cx("fr-h3")}
          ref={titleRef}
          tabIndex={-1}
        >
          Cela pourrait vous intéresser ?
        </h2>
      </div>

      <ul
        className={`${resultListStyle} ${fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-3w")}`}
        role="list"
      >
        {results.map((result, index) => (
          <li
            key={result.cdtnId || `modal-result-${index}-${contextType}`}
            className={fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-6",
              "fr-col-lg-3"
            )}
          >
            <SearchResultCard
              result={result}
              onClick={() => handleResultClick(result)}
              headingLevel={"h3"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

const titleDivStyle = css({
  backgroundColor: "var(--background-alt-blue-cumulus)",
});

const resultListStyle = css({
  listStyle: "none!",
  padding: 0,
  margin: 0,
});
