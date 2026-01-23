import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResultCard } from "./SearchResultCard";
import { useRef } from "react";
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
    <section ref={containerRef}>
      <div
        className={`${contextType === "modal" ? titleDivStyle : ""} ${fr.cx(
          "fr-p-1w"
        )}`}
      >
        {contextType === "home" ? (
          <h3
            id={`search-results-heading-${contextType}`}
            className={fr.cx("fr-h3", "fr-m-0")}
            ref={titleRef}
            tabIndex={-1}
          >
            Cela pourrait vous intéresser ?
          </h3>
        ) : (
          <h2
            id={`search-results-heading-${contextType}`}
            className={fr.cx("fr-h3", "fr-m-0")}
            ref={titleRef}
            tabIndex={-1}
          >
            Cela pourrait vous intéresser ?
          </h2>
        )}
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
