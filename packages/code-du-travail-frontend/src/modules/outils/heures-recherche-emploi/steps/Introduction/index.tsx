import React from "react";
import Link from "src/modules/common/Link";

const StepIntro = () => (
  <>
    <p>
      Ce simulateur permet de calculer le nombre d&apos;heures d&apos;absence
      autorisée pendant la période de préavis (de licenciement, de démission ou
      de rupture de la période d&apos;essai), pour rechercher un emploi, si la
      convention collective le prévoit.
    </p>
    <p>
      Des informations disponibles sur le bulletin de salaire pourraient être
      utiles pour réaliser cette simulation.
    </p>
    <p>
      Retrouvez plus d&apos;informations dans{" "}
      <Link
        href={`/contribution/le-salarie-peut-il-sabsenter-pour-rechercher-un-emploi-pendant-son-preavis`}
      >
        notre fiche sur les heures d&apos;absence autorisées pour rechercher un
        emploi
      </Link>{" "}
      pendant le préavis.
    </p>
    <p>
      La saisie des champs est obligatoire sur l&apos;ensemble des étapes sauf
      mention contraire.
    </p>
  </>
);

export default StepIntro;
