import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  Notification,
  PublicodesHeuresRechercheEmploiResult,
} from "@socialgouv/modeles-social";

type Props = {
  result?: PublicodesHeuresRechercheEmploiResult;
  notifications: Notification[];
};

const ShowResult: React.FC<Props> = ({ result, notifications }: Props) => {
  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>
        Nombre d&apos;heures d&apos;absence autorisée pour rechercher un emploi
      </h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        D’après les éléments saisis, durant son préavis, le salarié peut
        s’absenter pour rechercher un emploi pendant&nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>{result?.value}</strong>
      </p>

      {notifications[0] && (
        <>
          <h2 className={fr.cx("fr-h5", "fr-mt-4w")}>
            Rémunération pendant les heures d&apos;absence autorisée
          </h2>
          <p>{notifications[0].description}</p>
        </>
      )}
      {notifications[1] && (
        <>
          <h2 className={fr.cx("fr-h5", "fr-mt-4w")}>
            Conditions d&apos;utilisation
          </h2>
          <p>{notifications[1].description}</p>
        </>
      )}
    </>
  );
};

export default ShowResult;
