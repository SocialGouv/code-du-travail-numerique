import Link from "next/link";
import React from "react";

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
      Vous pouvez trouver plus d&apos;informations sur les heures d&apos;absence
      autorisée pour rechercher un emploi pendant le préavis sur{" "}
      <Link
        href={`/contribution/le-salarie-peut-il-sabsenter-pour-rechercher-un-emploi-pendant-son-preavis`}
      >
        cette fiche
      </Link>
      .
    </p>
    <p>
      La saisie des champs est obligatoire sur l&apos;ensemble des étapes sauf
      mention contraire.
    </p>
  </>
);

export default StepIntro;
