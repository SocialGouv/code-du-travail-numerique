import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResult } from "./types";
import { SearchResultCard } from "./SearchResultCard";

interface SearchResultsPreviewProps {
  results: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
}

export const SearchResultsPreview = ({
  results,
  onResultClick,
}: SearchResultsPreviewProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className={previewContainer}>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {results.map((result) => (
          <div
            key={result.id}
            className={fr.cx("fr-col-12", "fr-col-sm-6", "fr-col-lg-3")}
          >
            <SearchResultCard
              result={result}
              onClick={() => onResultClick?.(result)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const previewContainer = css({
  marginTop: "2rem",
  width: "100%",
});
