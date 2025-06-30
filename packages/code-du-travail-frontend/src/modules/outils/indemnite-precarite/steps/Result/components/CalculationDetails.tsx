import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  details?: {
    baseAmount?: number;
    rate?: number;
  };
  amount?: number;
  totalSalary: number;
};

const CalculationDetails: React.FC<Props> = ({
  details,
  amount,
  totalSalary,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (!details) return null;

  return (
    <>
      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <div className={fr.cx("fr-card", "fr-mb-3w")}>
        <div className={fr.cx("fr-card__body")}>
          <h3 className={fr.cx("fr-card__title")}>Calcul de l'indemnité</h3>
          <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
            <div className={fr.cx("fr-col-12")}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "0.5rem 1rem",
                }}
              >
                <span>Rémunération brute de référence :</span>
                <span>
                  <strong>{formatCurrency(totalSalary)}</strong>
                </span>

                <hr style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }} />

                <span>Base de calcul :</span>
                <span>
                  <strong>{formatCurrency(details.baseAmount || 0)}</strong>
                </span>

                <span>Taux appliqué :</span>
                <span>
                  <strong>{((details.rate || 0.1) * 100).toFixed(1)}%</strong>
                </span>

                <hr style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }} />

                <span style={{ fontSize: "1.1rem" }}>
                  <strong>Indemnité calculée :</strong>
                </span>
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--blue-france-sun-113-625)",
                  }}
                >
                  <strong>{formatCurrency(amount || 0)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationDetails;
