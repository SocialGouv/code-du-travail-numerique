import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

const LegalInfo: React.FC = () => {
  return (
    <div className={fr.cx("fr-alert", "fr-alert--warning", "fr-mb-3w")}>
      <h3 className={fr.cx("fr-alert__title")}>⚖️ Informations légales</h3>
      <ul>
        <li>
          Cette simulation est donnée à titre indicatif et ne constitue pas un
          conseil juridique
        </li>
        <li>
          Le montant réel peut varier selon les spécificités de votre contrat et
          votre convention collective
        </li>
        <li>
          L&apos;indemnité de précarité est soumise aux cotisations sociales
          mais exonérée d&apos;impôt sur le revenu dans certaines limites
        </li>
        <li>
          En cas de litige, consultez un professionnel du droit du travail
        </li>
      </ul>
    </div>
  );
};

export default LegalInfo;
