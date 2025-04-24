"use client";

import { fr } from "@codegouvfr/react-dsfr";
import React, { useState } from "react";
import { ContainerList } from "../layout/ContainerList";
import { css } from "@styled-system/css";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { summarize } from "../utils";
import { ModelDescriptionByRootTheme } from "./queries";
import Select from "@codegouvfr/react-dsfr/Select";

type Props = {
  modeles: ModelDescriptionByRootTheme;
};

export const LetterModels = ({ modeles }: Props) => {
  const [selectedTheme, setTheme] = useState<string>("");

  return (
    <ContainerList title="Modèles de documents" segments={[]}>
      <h1 id="modeles" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Modèles de documents
      </h1>

      <p className={fr.cx("fr-text--md")}>
        Téléchargez et personnalisez les modèles de documents et de lettres pour
        vos démarches en lien avec le droit du travail
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
        {modeles.map(({ theme }) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </Select>

      {modeles
        .filter(
          (theme) => selectedTheme === "" || theme.theme === selectedTheme
        )
        .map(({ theme, modeles }) => {
          return (
            <>
              <h2 className={fr.cx("fr-mt-6w", "fr-h3")}>{theme}</h2>
              <ul
                className={`${fr.cx(
                  "fr-grid-row",
                  "fr-grid-row--gutters",
                  "fr-grid-row--left"
                )}`}
              >
                {modeles.map((model) => (
                  <li
                    key={model.slug}
                    className={`${fr.cx(
                      "fr-col-12",
                      "fr-col-sm-12",
                      "fr-col-md-6",
                      "fr-col-lg-6"
                    )} ${li}`}
                  >
                    <Card
                      border
                      desc={summarize(model.description)}
                      horizontal
                      linkProps={{
                        href: `/${getRouteBySource(SOURCES.LETTERS)}/${model.slug}`,
                      }}
                      size="medium"
                      title={model.title}
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
            </>
          );
        })}
    </ContainerList>
  );
};

const li = css({
  listStyle: "none!",
});

const list = css({
  maxWidth: 500,
});
