import Link from "next/link";
import React from "react";

const StepIntro = (): JSX.Element => (
  <>
    <p>
      Ce simulateur permet de calculer la durée du préavis accordée au salarié
      en cas de licenciement.
    </p>

    <p>
      Des informations disponibles sur le bulletin de salaire pourraient être
      utiles pour réaliser cette simulation.
    </p>
    <p>
      Vous pouvez trouver plus d’informations sur le préavis de licenciement sur{" "}
      <Link href={`/fiche-service-public/preavis-de-licenciement`}>
        <a>cette fiche</a>
      </Link>
      .
    </p>
  </>
);

export { StepIntro };
