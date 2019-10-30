import React from "react";
import Link from "next/link";

function StepIntro() {
  return (
    <>
      <p>
        Le préavis est une période accordée au salarié entre la notification du
        licenciement et son départ effectif de l’entreprise (fin du contrat).
      </p>

      <p>
        Afin de réaliser cette simulation, vous aurez besoin d'informations
        concernant la situation de l'employé concerné, comme sa convention
        collective, sa catégorie ou son coefficient. La plupart de ces
        informations se trouvent sur le bulletin de salaire ou le contrat de
        travail. Prévoyez deux à cinq minutes pour cette simulation.
      </p>

      <p>
        Vous pouvez trouver plus d'informations sur le préavis de licenciement
        sur{" "}
        <Link
          href="/fiche-service-public/[slug]"
          as={`/fiche-service-public/preavis-de-licenciement`}
        >
          <a>cette fiche</a>
        </Link>
        .
      </p>
      <p>Cliquez sur suivant pour commencer la simulation</p>
    </>
  );
}

export { StepIntro };
