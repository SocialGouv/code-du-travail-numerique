import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { LoadingSpinner } from "./LoadingSpinner";
import { MinSearchLengthHint } from "./MinSearchLengthHint";

interface SearchFeedbackProps {
  id?: string;
  isSearching: boolean;
  query: string;
  minSearchLength: number;
  hasSearched: boolean;
  resultsCount: number;
  noResultMessageRef?: React.RefObject<HTMLParagraphElement | null>;
  noResultParagraphId?: string;
}

export const SearchFeedback = ({
  id,
  isSearching,
  query,
  minSearchLength,
  hasSearched = false,
  resultsCount = 0,
  noResultMessageRef,
  noResultParagraphId,
}: SearchFeedbackProps) => {
  let feedbackMessage = "";

  if (isSearching && query.length >= minSearchLength) {
    feedbackMessage = "Nous recherchons les bons résultats";
  } else if (
    hasSearched &&
    !isSearching &&
    resultsCount === 0 &&
    query.length >= minSearchLength
  ) {
    feedbackMessage = "Précisez votre saisie, aucun résultat disponible.";
  } else if (
    !isSearching &&
    query.length < minSearchLength &&
    query.length > 0
  ) {
    feedbackMessage = `Tapez ${minSearchLength} caractères ou plus pour lancer une recherche`;
  }

  return (
    <>
      <div id={id} className={fr.cx("fr-mt-6w")}>
        {isSearching && query.length >= minSearchLength && (
          <div className={loadingContainer}>
            <LoadingSpinner />
            <p id={noResultParagraphId} className={hintTextStyle}>
              {feedbackMessage}
            </p>
          </div>
        )}

        {hasSearched &&
          !isSearching &&
          resultsCount === 0 &&
          query.length >= minSearchLength && (
            <div className={loadingContainer}>
              <p
                id={noResultParagraphId}
                className={hintTextStyle}
                ref={noResultMessageRef}
                tabIndex={-1}
              >
                {feedbackMessage}
              </p>
            </div>
          )}

        <MinSearchLengthHint
          isVisible={!isSearching && query.length < minSearchLength}
          minSearchLength={minSearchLength}
          variant="desktop"
          paragraphId={`${id}-min-search-hint`}
        />
      </div>
    </>
  );
};

const loadingContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
});

export const hintTextStyle = css({
  color: "var(--text-mention-grey)",
  marginBottom: "0!",
  textAlign: "center",
});
