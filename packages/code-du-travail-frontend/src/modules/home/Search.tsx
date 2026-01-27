import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { HomeSearchV2 } from "./Components";

export const Search = () => {
  return (
    <div className={mainContainer}>
      <div className={fr.cx("fr-container", "fr-py-6w")}>
        <div className={searchV2Container}>
          <div className={fr.cx("fr-col-12")}>
            <h1 className={fr.cx("fr-mb-2w", "fr-text--lead", "fr-text--bold")}>
              Bienvenue sur{" "}
              <span
                className={`${fr.cx("fr-mt-2w", "fr-mb-0", "fr-h1")} ${displayBlock}`}
              >
                le Code du travail numérique
              </span>
            </h1>
            <h2 className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-6w")}>
              Obtenez les réponses à vos questions sur le droit du travail.
            </h2>
            <HomeSearchV2 />
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  bg: "var(--blue-cumulus-925-125)",
  position: "relative",
});

const displayBlock = css({
  display: "block",
});

const searchV2Container = css({
  position: "relative",
  zIndex: 1,
});
