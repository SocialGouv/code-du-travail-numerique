import { fr } from "@codegouvfr/react-dsfr";
import { StatsDisplay } from "./StatsDisplay";
import { Resume } from "./Resume";
import { css } from "@styled-system/css";

type StatsProps = {
  nbDocuments: number;
  nbVisits: number;
  nbSearches: number;
  nbPageViews: number;
};

export const Stats = (props: StatsProps) => (
  <div className={fr.cx("fr-grid-row", "fr-mt-8w", "fr-mb-8w")}>
    <div className={fr.cx("fr-my-4w", "fr-col-12")}>
      <h1 className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Statistiques d&apos;utilisation
      </h1>
      <ul className={`${fr.cx("fr-grid-row", "fr-grid-row--gutters")} ${ul}`}>
        <li className={fr.cx("fr-col-12", "fr-col-lg-3")}>
          <StatsDisplay
            title="Contenus référencés"
            metric={props.nbDocuments}
          />
        </li>
        <li className={fr.cx("fr-col-12", "fr-col-lg-3")}>
          <StatsDisplay title="Visites" metric={props.nbVisits} />
        </li>
        <li className={fr.cx("fr-col-12", "fr-col-lg-3")}>
          <StatsDisplay title="Recherches" metric={props.nbSearches} />
        </li>
        <li className={fr.cx("fr-col-12", "fr-col-lg-3")}>
          <StatsDisplay title="Consultations" metric={props.nbPageViews} />
        </li>
      </ul>
      <p className={fr.cx("fr-mt-6w")}>
        Statistiques d’utilisation depuis le 01/01/2020
      </p>
      <h2 className={fr.cx("fr-mt-6w", "fr-h3")}>Bilans annuels</h2>
      <div className={fr.cx("fr-mt-6w", "fr-grid-row", "fr-grid-row--gutters")}>
        <div className={fr.cx("fr-col-12", "fr-col-lg-3")}>
          <Resume fileName={"cdtn_bilan_2024.pdf"} year={2024} fileSizeMb={1} />
        </div>
      </div>
    </div>
  </div>
);

const ul = css({
  listStyle: "none!",
});
