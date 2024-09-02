import { fr } from "@codegouvfr/react-dsfr";
import { StatsDisplay } from "./StatsDisplay";

type StatsProps = {
  nbDocuments: number;
  nbVisits: number;
  nbSearches: number;
  nbPageViews: number;
};

export const Stats = (props: StatsProps) => (
  <div className={fr.cx("fr-grid-row")}>
    <div className={fr.cx("fr-my-4w", "fr-col-12")}>
      <h1 className={fr.cx("fr-mt-0")}>Statistiques d&apos;utilisation</h1>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <StatsDisplay title="Contenus référencés" metric={props.nbDocuments} />
        <StatsDisplay title="Visites" metric={props.nbVisits} />
        <StatsDisplay title="Recherches" metric={props.nbSearches} />
        <StatsDisplay title="Consultations" metric={props.nbPageViews} />
      </div>
      <p className={fr.cx("fr-mt-4v")}>
        Statistiques d’utilisation depuis le 01/01/2020
      </p>
    </div>
  </div>
);
