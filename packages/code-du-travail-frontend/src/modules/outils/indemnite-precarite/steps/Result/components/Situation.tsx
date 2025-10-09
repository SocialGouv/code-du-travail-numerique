import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { formatCurrency } from "src/modules/outils/common/utils/formatCurrency";

type Props = {
  remuneration: number;
  agreement?: Agreement;
};

const Situation: React.FC<Props> = ({ remuneration, agreement }) => {
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
        <li data-testid="remuneration-input">
          Montant total des salaires renseignés&nbsp;:&nbsp;
          <strong>{formatCurrency(remuneration)}</strong>
        </li>
      </ul>
    </>
  );
};

export default Situation;
