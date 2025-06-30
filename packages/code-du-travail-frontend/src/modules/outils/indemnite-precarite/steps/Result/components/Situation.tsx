import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Agreement = {
  title: string;
  num: number;
};

type RemunerationInput = {
  typeRemuneration: string;
  salaire?: number;
  salaires?: Array<{ salaire?: number | null }>;
};

type Criteria = {
  cddType?: string;
};

type Props = {
  contractType: string;
  agreement?: Agreement;
  remunerationInput: RemunerationInput;
  criteria?: Criteria;
  totalSalary: number;
};

const Situation: React.FC<Props> = ({
  contractType,
  agreement,
  remunerationInput,
  criteria,
  totalSalary,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={fr.cx("fr-card", "fr-mb-3w")}>
      <div className={fr.cx("fr-card__body")}>
        <h3 className={fr.cx("fr-card__title")}>
          📋 Récapitulatif de votre situation
        </h3>
        <h4 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h4>
        <ul>
          <li data-testid="situation-contract-type">
            <strong>Type de contrat :</strong>{" "}
            {contractType === "CDD"
              ? "Contrat à durée déterminée"
              : "Contrat de travail temporaire (intérim)"}
          </li>

          {criteria?.cddType && (
            <li data-testid="situation-cdd-type">
              <strong>Type de CDD :</strong> {criteria.cddType}
            </li>
          )}

          <li data-testid="situation-convention-collective">
            <strong>Convention collective :</strong>{" "}
            {agreement
              ? `${agreement.title} (IDCC ${agreement.num})`
              : "Aucune sélectionnée (dispositions légales appliquées)"}
          </li>

          <li data-testid="situation-remuneration-type">
            <strong>Type de rémunération :</strong>{" "}
            {remunerationInput.typeRemuneration === "total"
              ? "Montant total"
              : "Salaires mensuels"}
          </li>

          <li data-testid="situation-total-salary">
            <strong>Rémunération brute de référence :</strong>{" "}
            {formatCurrency(totalSalary)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Situation;
