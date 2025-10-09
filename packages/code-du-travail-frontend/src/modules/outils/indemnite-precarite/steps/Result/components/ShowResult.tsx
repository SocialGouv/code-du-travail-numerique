import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Notification } from "@socialgouv/modeles-social";
import { formatCurrency } from "src/modules/outils/common/utils/formatCurrency";

type Props = {
  result?: number;
  notifications?: Notification[];
};

const ShowResult: React.FC<Props> = ({ result, notifications }: Props) => {
  if (!result) return null;

  return (
    <>
      <h3 className={fr.cx("fr-mt-3w", "fr-h3")}>Indemnité de précarité</h3>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis, le montant de votre
        indemnité est estimé à &nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>{formatCurrency(result)}</strong>
      </p>
      {notifications && notifications.length > 0 && (
        <p data-testid="notice-description">
          {notifications.map((notification, index) => (
            <div key={index}>{notification.description}</div>
          ))}
        </p>
      )}
    </>
  );
};

export default ShowResult;
