import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResult } from "./types";
import { SearchResultCard } from "./SearchResultCard";
import { useRef, useEffect } from "react";

interface Props {
  results: SearchResult[];
  onResultClick?: () => void;
}

export const SearchResults = ({ results, onResultClick }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstLink = containerRef.current?.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (results.length === 0) {
    return null;
  }

  return (
    <div className={fr.cx("fr-mt-3w")} ref={containerRef}>
      <div className={`${titleDivStyle} ${fr.cx("fr-p-1w")}`}>
        <h2 className={fr.cx("fr-h3")}>Cela pourrait vous intéresser ?</h2>
      </div>
      <ul
        className={`${resultListStyle} ${fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-3w")}`}
      >
        {results.map((result) => (
          <li
            key={result.id}
            className={fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-6",
              "fr-col-lg-3"
            )}
          >
            <SearchResultCard result={result} onClick={onResultClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const titleDivStyle = css({
  backgroundColor: "var(--background-alt-blue-cumulus)",
});

const resultListStyle = css({
  listStyle: "none",
  padding: 0,
  margin: 0,
});
