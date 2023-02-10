import Link from "next/link";
import React from "react";

const StepIntro = (): JSX.Element => (
  <>
    <p>
      Ce simulateur permet de calculer le nombre d’heures d’absence autorisée
      pendant la période de préavis (de licenciement, de démission ou de rupture
      de la période d’essai), pour rechercher un emploi, si la convention
      collective le prévoit.
    </p>
    <p>
      Des informations disponibles sur le bulletin de salaire pourraient être
      utiles pour réaliser cette simulation.
    </p>
    <p>
      Vous pouvez trouver plus d’informations sur les heures d’absence autorisée
      pour rechercher un emploi pendant le préavis sur{" "}
      <Link
        href={`/contribution/le-salarie-peut-il-sabsenter-pour-rechercher-un-emploi-pendant-son-preavis`}
      >
        cette fiche
      </Link>
      .
    </p>
  </>
);

export { StepIntro };
