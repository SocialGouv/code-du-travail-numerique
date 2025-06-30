import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  isEligible: boolean;
  amount?: number;
  reason?: string;
  contractType: string;
  notifications?: Array<{ description: string }>;
};

const ShowResult: React.FC<Props> = ({
  isEligible,
  amount,
  reason,
  contractType,
  notifications = [],
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>Résultat de votre simulation</h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis
        {isEligible && amount && amount > 0
          ? ", le montant de votre indemnité est estimé à"
          : ""}
        &nbsp;:
      </p>

      {isEligible ? (
        <>
          <div className={fr.cx("fr-alert", "fr-alert--success", "fr-mb-3w")}>
            <h3 className={fr.cx("fr-alert__title")}>
              ✅ Vous avez droit à une indemnité de précarité
            </h3>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}
              data-testid="resultat"
            >
              <strong className={fr.cx("fr-h2")}>
                {formatCurrency(amount || 0)}
              </strong>
            </div>
            <p>
              Montant estimé de votre{" "}
              {contractType === "CTT"
                ? "indemnité de fin de mission"
                : "indemnité de précarité"}
            </p>
          </div>

          {notifications.length > 0 && (
            <div data-testid="notice-description">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-2w")}
                >
                  <p>{notification.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={fr.cx("fr-alert", "fr-alert--error", "fr-mb-3w")}>
          <h3 className={fr.cx("fr-alert__title")}>
            ❌ Vous n'avez pas droit à une indemnité de précarité
          </h3>
          <p data-testid="resultat">
            <strong>
              {reason ||
                "Selon votre situation, vous n'êtes pas éligible à cette indemnité."}
            </strong>
          </p>
        </div>
      )}
    </>
  );
};

export default ShowResult;
