import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { LoadingSpinner } from "./LoadingSpinner";
import { MinSearchLengthHint } from "./MinSearchLengthHint";

interface SearchFeedbackProps {
  isSearching: boolean;
  query: string;
  minSearchLength: number;
  hasSearched: boolean;
  resultsCount: number;
}

export const SearchFeedback = ({
  isSearching,
  query,
  minSearchLength,
  hasSearched = false,
  resultsCount = 0,
}: SearchFeedbackProps) => {
  return (
    <>
      <div className={fr.cx("fr-mt-6w")} aria-live="polite">
        {isSearching && query.length >= minSearchLength && (
          <div className={loadingContainer}>
            <LoadingSpinner />
            <p className={hintTextStyle}>Nous recherchons les bons résultats</p>
          </div>
        )}

        {hasSearched &&
          !isSearching &&
          resultsCount === 0 &&
          query.length >= minSearchLength && (
            <div className={loadingContainer}>
              <p className={hintTextStyle}>
                Précisez votre saisie, aucun résultat disponible.
              </p>
            </div>
          )}

        <MinSearchLengthHint
          isVisible={!isSearching && query.length < minSearchLength}
          minSearchLength={minSearchLength}
          variant="desktop"
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
