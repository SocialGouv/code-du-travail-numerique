import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { LoadingSpinner } from "./LoadingSpinner";

interface SearchFeedbackProps {
  isSearching: boolean;
  query: string;
  minSearchLength: number;
}

export const SearchFeedback = ({
  isSearching,
  query,
  minSearchLength,
}: SearchFeedbackProps) => {
  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className={fr.cx("fr-mt-6w")}>
        {isSearching && query.length >= minSearchLength && (
          <div className={loadingContainer}>
            <LoadingSpinner />
            <p className={hintTextStyle}>Nous recherchons les bons résultats</p>
          </div>
        )}

        {!isSearching && query.length < minSearchLength && (
          <p className={hintTextStyle}>
            Tapez {minSearchLength} caractères ou plus pour lancer une recherche
          </p>
        )}
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

const hintTextStyle = css({
  color: "var(--text-mention-grey)",
  fontSize: "0.875rem",
  margin: 0,
  textAlign: "center",
});
