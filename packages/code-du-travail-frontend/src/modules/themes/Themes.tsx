import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ThemeTile } from "./ThemeTile";
import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { css } from "@styled-system/css";
import { ContainerList } from "../layout/ContainerList";

type Props = {
  themes: Pick<ThemeElasticDocument, "title" | "icon" | "slug" | "children">[];
};

export const Themes = ({ themes }: Props) => (
  <ContainerList title="Thèmes">
    <h1 id="themes" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
      Thèmes
    </h1>

    <p className={fr.cx("fr-text--md")}>
      Découvrez l’intégralité de nos contenus organisés par grands thèmes
    </p>

    <div className={fr.cx("fr-mt-6w")}>
      <ul
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--left"
        )}
      >
        {themes.map((item, index) => (
          <li
            key={`${index}${JSON.stringify(item)}`}
            className={`${fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-4",
              "fr-col-lg-3",
              "fr-mb-3v"
            )} ${li}`}
          >
            <ThemeTile
              iconName={item.icon!!}
              title={item.title}
              link={`/themes/${item.slug}`}
              subThemes={item.children.map((child) => child.label)}
            />
          </li>
        ))}
      </ul>
    </div>
  </ContainerList>
);

const li = css({
  listStyle: "none!",
});
