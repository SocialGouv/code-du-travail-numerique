import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  Notification,
  PublicodesHeuresRechercheEmploiResult,
} from "@socialgouv/modeles-social";

type Props = {
  isResultValid?: boolean;
  result?: PublicodesHeuresRechercheEmploiResult;
  notifications: any[];
};

const ShowResult: React.FC<Props> = ({
  result,
  notifications,
  isResultValid,
}: Props) => {
  return (
    <>
      <h3 className={fr.cx("fr-h5", "fr-mt-4w")}>
        Nombre d&apos;heures d&apos;absence autorisée pour rechercher un emploi
      </h3>
      {isResultValid ? (
        <>
          <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
            D’après les éléments saisis, durant son préavis, le salarié peut
            s’absenter pour rechercher un emploi pendant&nbsp;:
          </p>
          <p data-testid="resultat">
            <strong className={fr.cx("fr-h2")}>{result?.value}</strong>
          </p>
        </>
      ) : (
        <p>
          D’après les éléments saisis, dans votre situation, la convention
          collective ne prévoit pas d’heures d’absence autorisée pour rechercher
          un emploi.
        </p>
      )}

      {notifications[0] && (
        <>
          {notifications[0].description[0] && (
            <>
              <h3 className={fr.cx("fr-h5", "fr-mt-4w")}>
                Rémunération pendant les heures d&apos;absence autorisée
              </h3>
              <p>{notifications[0].description[0]}</p>
            </>
          )}
          {notifications[0].description[1] && (
            <>
              <h3 className={fr.cx("fr-h5", "fr-mt-4w")}>
                Conditions d&apos;utilisation
              </h3>
              <p>{notifications[0].description[1]}</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ShowResult;
