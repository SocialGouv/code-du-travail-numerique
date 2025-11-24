import { fr } from "@codegouvfr/react-dsfr";
import Link from "src/modules/common/Link";
import { ModalLink } from "./types";

type Props = {
  actualites: ModalLink[];
  suggestions: ModalLink[];
};

export const HintList = ({ actualites, suggestions }: Props) => {
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

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
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
