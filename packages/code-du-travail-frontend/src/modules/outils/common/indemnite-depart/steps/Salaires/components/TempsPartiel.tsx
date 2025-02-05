import { Alert } from "@codegouvfr/react-dsfr/Alert";
import React from "react";
import { IndemniteDepartType } from "src/outils/types";

type Props = {
  type: IndemniteDepartType;
};

const TempsPartiel = ({ type }: Props): JSX.Element => {
  return (
    <Alert
      title="À noter"
      severity="info"
      description={
        <>
          <p>
            Le calcul de l’indemnité de{" "}
            {type === IndemniteDepartType.LICENCIEMENT
              ? "licenciement"
              : "rupture conventionnelle"}{" "}
            dans le cas d’une alternance de temps plein et de temps partiel est
            actuellement en cours de développement.
          </p>
          <p>
            Les périodes à temps partiel ne sont actuellement pas prises en
            compte dans le calcul.
          </p>
          <p>Cela pourrait conduire à un résultat différent de l’indemnité.</p>
        </>
      }
    />
  );
};

export default TempsPartiel;
