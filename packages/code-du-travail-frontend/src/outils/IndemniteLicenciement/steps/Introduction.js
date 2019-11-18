import React from "react";
import Link from "next/link";

const StepIntro = () => (
  <>
    <p>
      Ce simulateur est un outil qui permet d’estimer le montant de l’indemnité
      minimale de licenciement d’un salarié.
    </p>
    <p>
      Vous pourrez simuler simplement le montant de l’indemnité légale définie
      par le Code du travail et le montant de l’indemnité conventionnelle de
      licenciement si la branche d’activité prévoit un montant supérieur au Code
      du travail.
    </p>
    <p>
      Cette simulation nécessite entre 5 et 10 minutes. Afin de pouvoir remplir
      les renseignements demandés, munissez-vous des informations relatives au
      licenciement (dates d’entrée et de sortie de l’entreprise, courrier de
      licenciement, derniers bulletins de salaire, etc.).
    </p>
    <p>
      Pour en savoir plus sur l’indemnité de licenciement et son mode de calcul,
      consultez{" "}
      <Link
        href="/fiche-service-public/[slug]"
        as={`/fiche-service-public/indemnite-de-licenciement`}
      >
        <a>cet article</a>
      </Link>
      .
    </p>
    <p>Pour commencer la simulation cliquez sur &quot;Suivant&quot;.</p>
  </>
);

export { StepIntro };
