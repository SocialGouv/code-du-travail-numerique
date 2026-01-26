import { css } from "@styled-system/css";
import { SearchResultCard } from "./SearchResultCard";
import { SearchResult } from "src/api";

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
    <ul className={previewContainer}>
      {results.map((result) => (
        <li key={result.cdtnId} className={resultItem}>
          <SearchResultCard
            result={result}
            onClick={() => onResultClick?.(result)}
          />
        </li>
      ))}
    </ul>
  );
};

const previewContainer = css({
  marginTop: "2rem",
  width: "100%",
  listStyle: "none",
  padding: 0,
  display: "grid",
  gridTemplateColumns: {
    base: "1fr",
    sm: "repeat(2, 1fr)",
    lg: "repeat(4, 1fr)",
  },
  gap: "1rem",
});

const resultItem = css({
  display: "flex",
});
