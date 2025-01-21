"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { HomeSearch } from "./Components";
import { useRouter } from "next/navigation";
import IllustrationHomePrincipal from "./picto/IllustrationHomePrincipal.svg";

export const Search = () => {
  const router = useRouter();

  const onSearchSubmit = (text: string) => {
    router.push(`/recherche?q=${encodeURIComponent(text)}`);
  };

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
              Bienvenue sur <br />
              <span
                className={`${fr.cx("fr-mt-2w", "fr-mb-0", "fr-h1")} ${displayBlock}`}
              >
                le Code du travail numérique
              </span>
            </h1>
            <h2 className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-6w")}>
              Obtenez les réponses à vos questions sur le droit du travail.
            </h2>
            <HomeSearch onSearchSubmit={onSearchSubmit} />
          </div>
          <div className={`${fr.cx("fr-col-md-5", "fr-col-12")}`}>
            <Image
              priority={false}
              src={IllustrationHomePrincipal}
              alt=""
              width="577"
              height="393"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  background: "var(--blue-cumulus-925-125)",
});

const displayBlock = css({
  display: "inline-block",
});
