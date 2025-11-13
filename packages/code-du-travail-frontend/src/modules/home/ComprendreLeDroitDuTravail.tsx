"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { HomeButton } from "./Components";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { CardWithArrow } from "./Components/CardWithArrow";
import { css } from "@styled-system/css";

const hierarchyItems = [
  {
    title: "Les textes internationaux",
    iconSrc: "/static/assets/icons/droit-du-travail/texte-internationaux.svg",
  },
  {
    title: "Les textes européens",
    iconSrc: "/static/assets/icons/droit-du-travail/texte-europeens.svg",
  },
  {
    title: "La Constitution française",
    iconSrc: "/static/assets/icons/droit-du-travail/constitution-francaise.svg",
  },
  {
    title: "Lois, ordonnances et décrets (Code du travail)",
    iconSrc: "/static/assets/icons/droit-du-travail/lois.svg",
  },
  {
    title: "Les conventions et accords collectifs",
    iconSrc:
      "/static/assets/icons/droit-du-travail/conventions-collectives.svg",
  },
  {
    title: "Les usages et les engagements unilatéraux",
    iconSrc: "/static/assets/icons/droit-du-travail/usage-unilateraux.svg",
  },
  {
    title: "Le règlement intérieur de l'entreprise",
    iconSrc:
      "/static/assets/icons/droit-du-travail/reglement-interieur-entreprise.svg",
  },
  {
    title: "Le contrat de travail",
    iconSrc: "/static/assets/icons/droit-du-travail/contrat-travail.svg",
  },
];

export const ComprendreLeDroitDuTravail = () => {
  const { emitHomeClickButtonEvent } = useHomeTracking();
  return (
    <div
      id="home-comprendre-le-droit-du-travail"
      className={fr.cx("fr-container", "fr-my-8w")}
    >
      <h2>Comprendre le droit du travail</h2>
      <div className={fr.cx("fr-grid-row", "fr-grid-row-md--gutters")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <p className={fr.cx("fr-text--lg", "fr-text--bold")}>
            Le droit du travail est l&apos;ensemble des règles juridiques
            applicables aux relations entre employeurs privés et salariés, à
            l&apos;occasion du travail.
          </p>
          <p className={fr.cx("fr-text--lg")}>
            Le droit du travail organise les relations professionnelles de
            travail entre l&apos;employeur et le salarié individuellement et la
            collectivité des salariés.
          </p>
        </div>
        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <p className={fr.cx("fr-text--lg")}>
            Il encadre de nombreux domaines tels que le contrat de travail, la
            rémunération, la durée du travail, les congés, la discipline, le
            licenciement, l&apos;emploi, la formation, la sécurité et la santé
            au travail, la négociation collective, la grève et la représentation
            du personnel.
          </p>
          <p className={fr.cx("fr-text--lg")}>
            Le droit du travail est un droit en constante évolution car il
            comprend des enjeux sociaux, économiques et politiques forts.
          </p>
        </div>
      </div>

      <h3 className={fr.cx("fr-mb-3w")}>La hiérarchie des textes</h3>

      <p className={fr.cx("fr-text--lg", "fr-mb-4w")}>
        Le principe général en droit du travail est le suivant&nbsp;:
        lorsqu&apos;il existe plusieurs textes sur un même sujet, c&apos;est le
        texte le plus favorable au salarié qui s&apos;applique. Ce principe
        continue à s&apos;appliquer en droit du travail mais il connaît quelques
        exceptions.
      </p>

      <ul
        className={`${fr.cx("fr-grid-row", "fr-grid-row--gutters")} ${ulStyle}`}
      >
        {hierarchyItems.map((item, index) => (
          <li
            key={index}
            className={fr.cx(
              "fr-col-12",
              "fr-col-md-6",
              "fr-col-lg-4",
              "fr-col-xl-3"
            )}
          >
            <CardWithArrow title={item.title} iconSrc={item.iconSrc} />
          </li>
        ))}
      </ul>
      <HomeButton
        buttonLink="/droit-du-travail"
        buttonText="Comprendre le droit du travail"
        onButtonClick={() => {
          emitHomeClickButtonEvent(
            MatomoHomeEvent.CLICK_COMPRENDRE_DROIT_DU_TRAVAIL
          );
        }}
      />
    </div>
  );
};

const ulStyle = css({
  listStyle: "none!",
  padding: "0",
  margin: "0",
});
