import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { formatCurrency } from "src/modules/outils/common/utils/formatCurrency";
import { FinALaDatePrevue } from "../../../types";

type Props = {
  remuneration: number;
  agreement?: Agreement;
  contractTypeLabel?: string;
  finALaDatePrevue?: FinALaDatePrevue;
};

const TERME_LABELS: Record<FinALaDatePrevue, string> = {
  oui: "Le contrat a pris fin à la date initialement prévue",
  non: "Le contrat a été rompu de manière anticipée",
};

const Situation: React.FC<Props> = ({
  remuneration,
  agreement,
  contractTypeLabel,
  finALaDatePrevue,
}) => {
  return (
    <>
      <h4 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h4>
      <ul>
        {agreement && (
          <li data-testid="situation-convention-collective">
            Convention collective :{" "}
            <strong>
              {agreement.shortTitle || agreement.title} (IDCC {agreement.num})
            </strong>
          </li>
        )}
        {contractTypeLabel && (
          <li data-testid="situation-type-contrat">
            Type de contrat&nbsp;: <strong>{contractTypeLabel}</strong>
          </li>
        )}
        {finALaDatePrevue && (
          <li data-testid="situation-terme-contrat">
            Terme du contrat&nbsp;:{" "}
            <strong>{TERME_LABELS[finALaDatePrevue]}</strong>
          </li>
        )}
        <li data-testid="remuneration-input">
          Montant total des salaires renseignés&nbsp;:&nbsp;
          <strong>{formatCurrency(remuneration)}</strong>
        </li>
      </ul>
    </>
  );
};

export default Situation;
