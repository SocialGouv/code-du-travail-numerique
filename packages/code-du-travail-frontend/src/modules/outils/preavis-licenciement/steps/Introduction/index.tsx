import React from "react";
import Link from "src/modules/common/Link";

const StepIntroduction = () => (
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
      Retrouvez plus d&apos;informations dans{" "}
      <Link href={`/fiche-service-public/preavis-de-licenciement`}>
        notre fiche sur le préavis de licenciement
      </Link>
      .
    </p>
    <p>
      La saisie des champs est obligatoire sur l&apos;ensemble des étapes sauf
      mention contraire.
    </p>
  </>
);

export default StepIntroduction;
