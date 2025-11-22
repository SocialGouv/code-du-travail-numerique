import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

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
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={spinnerSvg}
            >
              <path
                d="M27.546 8.45406L25.4245 10.5754C23.5245 8.67525 20.8995 7.5 18 7.5C12.201 7.5 7.5 12.201 7.5 18C7.5 23.799 12.201 28.5 18 28.5C23.799 28.5 28.5 23.799 28.5 18H31.5C31.5 25.4559 25.4559 31.5 18 31.5C10.5442 31.5 4.5 25.4559 4.5 18C4.5 10.5442 10.5442 4.5 18 4.5C21.728 4.5 25.103 6.01104 27.546 8.45406Z"
                fill="#666666"
              />
            </svg>
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

const spinnerSvg = css({
  animationName: "spin",
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  "@media (prefers-reduced-motion: no-preference)": {
    animationName: "spin",
  },
});

const hintTextStyle = css({
  color: "var(--text-mention-grey)",
  fontSize: "0.875rem",
  margin: 0,
  textAlign: "center",
});
