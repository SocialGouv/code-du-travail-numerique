import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "src/modules/common/Link";
import { LoadingSpinner } from "./LoadingSpinner";
import { ModalLink } from "./types";

type Props = {
  actualites: ModalLink[];
  suggestions: ModalLink[];
  isLoading?: boolean;
};

export const HintList = ({ actualites, suggestions, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className={loadingContainer}>
        <LoadingSpinner size={48} />
        <p className={fr.cx("fr-mt-2w")}>Chargement des suggestions...</p>
      </div>
    );
  }

  return (
    <div className={fr.cx("fr-mt-6w")}>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <p className={fr.cx("fr-badge", "fr-badge--info")}>ACTUALITÉ</p>
          <ul>
            {actualites.map((result) => (
              <li key={result.id} className={fr.cx("fr-mt-3w")}>
                <Link
                  className={fr.cx("fr-link", "fr-text--bold")}
                  href={result.slug}
                >
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-6",
            "fr-mt-3w",
            "fr-mt-md-0"
          )}
        >
          <p className={fr.cx("fr-badge", "fr-badge--info")}>SUGGESTIONS</p>
          <ul>
            {suggestions.map((result) => (
              <li key={result.id} className={fr.cx("fr-mt-3w")}>
                <Link
                  className={fr.cx("fr-link", "fr-text--bold")}
                  href={result.slug}
                >
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const loadingContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem",
  minHeight: "300px",
});
