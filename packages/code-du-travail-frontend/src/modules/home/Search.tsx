import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { HomeSearch } from "./Components";
import IllustrationHomePrincipalDesktop from "./picto/IllustrationHomePrincipalDesktop.png";
import IllustrationHomePrincipalMobile from "./picto/IllustrationHomePrincipalMobile.png";

export const Search = () => {
  return (
    <div className={mainContainer}>
      <div className={fr.cx("fr-container", "fr-py-6w")}>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--middle"
          )}
        >
          <div className={fr.cx("fr-col-12", "fr-col-md-7")}>
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
            <HomeSearch />
          </div>
          <div className={`${fr.cx("fr-col-md-5", "fr-col-12")}`}>
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={IllustrationHomePrincipalMobile.src}
                width={378}
                height={257}
                type="image/png"
              />
              <source
                media="(min-width: 769px)"
                srcSet={IllustrationHomePrincipalDesktop.src}
                width={486}
                height={331}
                type="image/png"
              />
              <Image
                src={IllustrationHomePrincipalMobile} // Image par défaut
                alt=""
                priority={true} // Prioriser pour LCP
                width={378}
                height={257}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  bg: "var(--blue-cumulus-925-125)",
});

const displayBlock = css({
  display: "block",
});
