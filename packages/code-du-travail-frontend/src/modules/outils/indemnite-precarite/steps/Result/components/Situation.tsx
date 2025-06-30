import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { RemunerationStoreInput } from "../../Remuneration/store/types";

type Props = {
  typeRemuneration: RemunerationStoreInput["typeRemuneration"];
  remuneration: number;
  agreement?: Agreement;
};

const Situation: React.FC<Props> = ({
  remuneration,
  agreement,
  typeRemuneration,
}) => {
  const formatCurrency = (value: string, unit: string) => {
    if (unit === "€" && !isNaN(Number(value))) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(Number(value));
    }
    return value + (unit ? ` ${unit}` : "");
  };

  return (
    <>
      <h3 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h3>
      <ul>
        {agreement && (
          <li data-testid="situation-convention-collective">
            Convention collective :{" "}
            <strong>
              ${agreement.shortTitle || agreement.title} (IDCC ${agreement.num})
            </strong>
          </li>
        )}
        <li data-testid="remuneration-input">
          {typeRemuneration === "total"
            ? "Total des salaires"
            : "Somme des salaires"}{" "}
          : <strong>{formatCurrency(remuneration.toString(), "€")}</strong>
        </li>
      </ul>
    </>
  );
};

export default Situation;
