import Link from "next/link";
import React from "react";

const StepIntro = (): JSX.Element => (
  <>
    <p>
      Le préavis est une période accordée au salarié entre la notification du
      licenciement et son départ effectif de l’entreprise (fin du contrat).
    </p>

    <p>
      Afin de réaliser cette simulation, vous aurez besoin d’informations
      concernant la situation de l’employé concerné, comme sa convention
      collective, sa catégorie ou son coefficient. La plupart de ces
      informations se trouvent sur le bulletin de salaire ou le contrat de
      travail.
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
