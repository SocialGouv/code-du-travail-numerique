import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Notification } from "@socialgouv/modeles-social";

type Props = {
  result?: number;
  notifications?: Notification[];
};

const ShowResult: React.FC<Props> = ({ result, notifications }: Props) => {
  if (!result) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>Indemnité de précarité</h2>
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
