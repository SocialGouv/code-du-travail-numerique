import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import {
  calculateIndemnitePrecarite,
  getCalculationMessages,
} from "../../common/utils";

const StepResultat = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    contractType,
    agreement,
    salaryInfo,
    criteria,
    calculateResult,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    contractType: state.informationsData.input.contractType,
    agreement: state.agreementData.input.agreement,
    salaryInfo: state.remunerationData.input.salaryInfo,
    criteria: state.informationsData.input.criteria,
    calculateResult: state.resultFunction.calculateResult,
  }));

  // Calculer le résultat en temps réel avec les nouvelles fonctions
  const calculationResult = React.useMemo(() => {
    const storeData = {
      contractType,
      conventionCollective: agreement,
      criteria,
      salaryInfo,
    };
    return calculateIndemnitePrecarite(storeData);
  }, [contractType, agreement, criteria, salaryInfo]);

  // Obtenir les messages
  const messages = React.useMemo(() => {
    const storeData = {
      contractType,
      conventionCollective: agreement,
      criteria,
      salaryInfo,
    };
    return getCalculationMessages(storeData);
  }, [contractType, agreement, criteria, salaryInfo]);

  if (!result) {
    return (
      <div>
        <h3>Résultat</h3>
        <p>Calcul en cours...</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      <h3>Résultat de votre simulation</h3>

      {result?.isEligible ? (
        <div>
          {/* Résultat principal */}
          <div
            style={{
              padding: "2rem",
              backgroundColor: "#d4edda",
              border: "1px solid #c3e6cb",
              borderRadius: "8px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0", color: "#155724" }}>
              ✅ Vous avez droit à une indemnité de précarité
            </h4>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#155724" }}
            >
              {formatCurrency(result?.amount || 0)}
            </div>
            <p style={{ margin: "1rem 0 0 0", color: "#155724" }}>
              Montant estimé de votre{" "}
              {contractType === "CTT"
                ? "indemnité de fin de mission"
                : "indemnité de précarité"}
            </p>
          </div>

          {/* Détails du calcul */}
          {result?.details && (
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <h4 style={{ margin: "0 0 1rem 0" }}>Détail du calcul</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "0.5rem 1rem",
                }}
              >
                <span>Rémunération brute de base :</span>
                <span>
                  <strong>
                    {formatCurrency(salaryInfo?.monthlySalary || 0)}
                  </strong>
                </span>

                {salaryInfo?.variablePart && salaryInfo.variablePart > 0 && (
                  <>
                    <span>Primes et partie variable :</span>
                    <span>
                      <strong>{formatCurrency(salaryInfo.variablePart)}</strong>
                    </span>
                  </>
                )}

                {salaryInfo?.benefits && salaryInfo.benefits > 0 && (
                  <>
                    <span>Avantages en nature :</span>
                    <span>
                      <strong>{formatCurrency(salaryInfo.benefits)}</strong>
                    </span>
                  </>
                )}

                <hr style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }} />

                <span>Base de calcul :</span>
                <span>
                  <strong>
                    {formatCurrency(result?.details?.baseAmount || 0)}
                  </strong>
                </span>

                <span>Taux appliqué :</span>
                <span>
                  <strong>
                    {((result?.details?.rate || 0) * 100).toFixed(1)}%
                  </strong>
                </span>

                <hr style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }} />

                <span style={{ fontSize: "1.1rem" }}>
                  <strong>Indemnité calculée :</strong>
                </span>
                <span style={{ fontSize: "1.1rem", color: "#0066cc" }}>
                  <strong>{formatCurrency(result?.amount || 0)}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Informations sur la convention collective */}
          {agreement && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem 0" }}>
                Convention collective appliquée
              </h4>
              <p style={{ margin: 0 }}>
                <strong>{agreement?.title}</strong> (IDCC {agreement?.num})
              </p>
              {result?.details?.conventionalAmount && (
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
                  Cette convention collective prévoit des dispositions
                  particulières pour le calcul de l&apos;indemnité.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Cas d'inéligibilité */}
          <div
            style={{
              padding: "2rem",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "8px",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0", color: "#721c24" }}>
              ❌ Vous n&apos;avez pas droit à une indemnité de précarité
            </h4>
            <p style={{ margin: 0, color: "#721c24" }}>
              {result?.reason ||
                "Selon votre situation, vous n'êtes pas éligible à cette indemnité."}
            </p>
          </div>
        </div>
      )}

      {/* Informations légales */}
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h4 style={{ margin: "0 0 1rem 0" }}>⚖️ Informations légales</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
          <li>
            Cette simulation est donnée à titre indicatif et ne constitue pas un
            conseil juridique
          </li>
          <li>
            Le montant réel peut varier selon les spécificités de votre contrat
            et votre convention collective
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

      {/* Récapitulatif de la situation */}
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
        }}
      >
        <h4 style={{ margin: "0 0 1rem 0" }}>
          📋 Récapitulatif de votre situation
        </h4>
        <div style={{ fontSize: "0.9rem" }}>
          <p>
            <strong>Type de contrat :</strong>{" "}
            {contractType === "CDD"
              ? "Contrat à durée déterminée"
              : "Contrat de travail temporaire (intérim)"}
          </p>

          {criteria?.cddType && (
            <p>
              <strong>Type de CDD :</strong> {criteria.cddType}
            </p>
          )}

          {agreement ? (
            <p>
              <strong>Convention collective :</strong> {agreement?.title} (IDCC{" "}
              {agreement?.num})
            </p>
          ) : (
            <p>
              <strong>Convention collective :</strong> Aucune sélectionnée
              (dispositions légales appliquées)
            </p>
          )}

          <p>
            <strong>Rémunération brute mensuelle :</strong>{" "}
            {formatCurrency(
              (salaryInfo?.monthlySalary || 0) +
                (salaryInfo?.variablePart || 0) +
                (salaryInfo?.benefits || 0)
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            marginRight: "1rem",
          }}
        >
          🖨️ Imprimer le résultat
        </button>

        <button
          onClick={() => {
            // Utiliser le store du context au lieu de getState
            const storeData = {
              contractType,
              conventionCollective: agreement,
              criteria,
              salaryInfo,
            };
            // Reset functionality would need to be implemented in the store
            console.log("Reset functionality not implemented yet");
          }}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🔄 Nouvelle simulation
        </button>
      </div>
    </div>
  );
};

export default StepResultat;
