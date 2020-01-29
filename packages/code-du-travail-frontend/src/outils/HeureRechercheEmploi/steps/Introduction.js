import React from "react";

function StepIntro() {
  return (
    <>
      <p>
        Ce simulateur vous permet de savoir si votre convention collective a
        prévu la possibilité pour le salarié de s’absenter en fin de contrat,
        durant le préavis, pour rechercher un emploi.
      </p>

      <p>
        Le code du travail ne prévoit pas ce droit ( sauf cas particulier). En
        revanche, une majorité de conventions collective fixent pour ces heures
        d’absences: leur nombres et modalités de mise en oeuvre. Autant
        d’informations que vous trouverez sur cet outil.
      </p>

      <p>
        Afin de réaliser cette simulation, vous aurez besoin d’informations
        concernant la situation du salarié concerné, comme sa convention
        collective, sa catégorie, son ancienneté. La plupart de ces informations
        se trouvent sur le contrat de travail ou le bulletin de salaire.
        Prévoyez deux à cinq minutes pour cette simulation.
      </p>
      <p>Cliquez sur suivant pour commencer la simulation</p>
    </>
  );
}

export { StepIntro };
