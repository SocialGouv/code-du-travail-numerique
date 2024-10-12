"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import { HomeSearch } from "./HomeSearch";
import { useRouter } from "next/navigation";

export const HomeSectionSearch = () => {
  const router = useRouter();

  const onSearchSubmit = (text: string) => {
    router.push(`/recherche?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className={mainContainer}>
      <div className={fr.cx("fr-container", "fr-mb-8w", "fr-py-6w")}>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--top"
          )}
        >
          <div className={fr.cx("fr-col-12", "fr-col-lg-7")}>
            <h1 className={fr.cx("fr-h4")}>
              Bienvenue sur
              <br />
              <span className={fr.cx("fr-h1")}>
                le Code du travail numérique
              </span>
            </h1>
            <h2 className={fr.cx("fr-h4")}>
              Obtenez les réponses à vos questions sur le droit du travail.
            </h2>
            <HomeSearch onSearchSubmit={onSearchSubmit} />
          </div>
          <Image
            src="/static/assets/img/illustration-home-principal.svg"
            alt="Illustration graphique du site montrant des personnes travaillant"
            width="450"
            height="450"
            className={`${fr.cx("fr-col-5", "fr-hidden", "fr-unhidden-lg")}`}
          />
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
});
