"use client";

import { fr } from "@codegouvfr/react-dsfr";
import React, { useState } from "react";
import { ContainerList } from "../layout/ContainerList";
import { css } from "@styled-system/css";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { summarize } from "../utils";
import Select from "@codegouvfr/react-dsfr/Select";

type ContributionItem = {
  title: string;
  description: string;
  slug: string;
  source: string;
};

type ContributionsData = {
  [theme: string]: ContributionItem[];
};

type Props = {
  contribs: ContributionsData;
};

export const ContributionsList = ({ contribs }: Props) => {
  const [selectedTheme, setTheme] = useState<string>("");
  const themes = Object.keys(contribs);
  const documents =
    selectedTheme === ""
      ? contribs
      : { [selectedTheme]: contribs[selectedTheme] };

  return (
    <ContainerList title="Vos fiches pratiques" segments={[]}>
      <h1 id="contributions" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Vos fiches pratiques
      </h1>

      <p className={fr.cx("fr-text--md")}>
        Obtenez une réponse personnalisée selon votre convention collective
      </p>

      <Select
        className={`${fr.cx("fr-mt-6w")} ${list}`}
        label="Sélectionnez un thème"
        nativeSelectProps={{
          onChange: (event) => setTheme(event.target.value),
          value: selectedTheme,
        }}
      >
        <option value="">Tous les thèmes</option>
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </Select>

      {Object.keys(documents).map((theme) => {
        return (
          <React.Fragment key={theme}>
            <h2 className={fr.cx("fr-mt-6w", "fr-h3")}>{theme}</h2>
            <ul
              className={`${fr.cx(
                "fr-grid-row",
                "fr-grid-row--gutters",
                "fr-grid-row--left"
              )}`}
            >
              {documents[theme].map((item) => (
                <li
                  key={item.slug}
                  className={`${fr.cx(
                    "fr-col-12",
                    "fr-col-sm-12",
                    "fr-col-md-6",
                    "fr-col-lg-6"
                  )} ${li}`}
                >
                  <Card
                    border
                    desc={summarize(item.description)}
                    horizontal
                    linkProps={{
                      href: `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${item.slug}`,
                    }}
                    size="medium"
                    title={item.title}
                    titleAs="h3"
                    enlargeLink
                    classes={{
                      // Hack: start div is render and take some place
                      start: fr.cx("fr-hidden"),
                    }}
                  />
                </li>
              ))}
            </ul>
          </React.Fragment>
        );
      })}
    </ContainerList>
  );
};

const li = css({
  listStyle: "none!",
});

const list = css({
  maxWidth: "500px",
});
