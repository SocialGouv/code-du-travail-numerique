import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

const Warning: React.FC = () => (
  <div
    className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}
    data-testid="warning-alert"
  >
    <h4 className={fr.cx("fr-alert__title")} data-testid="warning-title">
      Attention, il peut exister un autre montant applicable à votre situation.
    </h4>
    <p>
      Une convention de branche ou un accord d&apos;entreprise peut prévoir un
      taux différent de celui fixé par le Code du travail. Ce taux ne peut pas
      être inférieur à 6&nbsp;%.
    </p>
    <p>Le taux applicable est, dans l&apos;ordre suivant&nbsp;:</p>
    <ul>
      <li>
        celui prévu par l&apos;accord d&apos;entreprise, même s&apos;il est
        moins favorable que celui de la convention de branche ou du Code du
        travail&nbsp;;
      </li>
      <li>
        en l&apos;absence d&apos;accord d&apos;entreprise, celui prévu par la
        convention de branche&nbsp;;
      </li>
      <li>
        en l&apos;absence de convention de branche, celui prévu par le Code du
        travail.
      </li>
    </ul>
    <p>
      À noter&nbsp;: le contrat de travail peut prévoir un taux plus favorable
      pour le salarié. Dans ce cas, c&apos;est ce taux qui s&apos;applique.
    </p>
  </div>
);

export default Warning;
