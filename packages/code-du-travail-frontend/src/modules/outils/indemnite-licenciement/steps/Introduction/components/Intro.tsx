import React from "react";
import { AccessibleAlert } from "../../../../common/components/AccessibleAlert";
import { fr } from "@codegouvfr/react-dsfr";

const Intro = () => {
  return (
    <>
      <p>
        Ce simulateur permet d’estimer le montant de l’indemnité de licenciement
        uniquement dans le cas d’une rupture d’un{" "}
        <strong>CDI à temps plein</strong>.
      </p>
      <p>
        Vous aurez besoin d’informations telles que les dates d’entrée et de
        sortie de l’entreprise, la date de notification du licenciement et le
        montant des derniers salaires.
      </p>
      <AccessibleAlert
        description={
          <>
            <p>
              L&apos;indemnité de rupture conventionnelle concerne uniquement
              les salariés en contrat à durée indéterminée (CDI).
            </p>
            <p>
              À noter&nbsp;: ce simulateur ne prend pas en compte les contrats
              ayant alterné entre temps plein et temps partiel.
            </p>
          </>
        }
        severity={"warning"}
      />
      <p className={fr.cx("fr-mt-3w")}>
        La saisie des champs est obligatoire sur l&apos;ensemble des étapes sauf
        mention contraire.
      </p>
    </>
  );
};

export default Intro;
