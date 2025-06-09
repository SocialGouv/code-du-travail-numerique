import React, { useContext, useEffect } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";

const ResultStepComponent = (): JSX.Element => {
  const store = useContext(PreavisDemissionContext);
  const {
    result,
    isAgreementSupported,
    agreement,
    seniority,
    getPublicodesResult,
  } = usePreavisDemissionStore(store, (state) => ({
    result: state.resultData.input.result,
    isAgreementSupported: state.resultData.input.isAgreementSupported,
    agreement: state.agreementData.input.agreement,
    seniority: state.informationsData.input.seniority,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, [getPublicodesResult]);

  if (!result) {
    return <div>Calcul en cours...</div>;
  }

  const formatSeniority = (seniorityInMonths: string) => {
    const months = parseInt(seniorityInMonths);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} mois`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "an" : "ans"}`;
    } else {
      return `${years} ${years === 1 ? "an" : "ans"} et ${remainingMonths} mois`;
    }
  };

  return (
    <div>
      <h2>Durée du préavis de démission</h2>

      {/* Récapitulatif des informations saisies */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          borderRadius: "4px",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Récapitulatif de votre situation</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <strong>Convention collective :</strong>{" "}
            {agreement
              ? `${agreement.shortTitle} (IDCC ${agreement.num})`
              : "Code du travail"}
          </li>
          <li>
            <strong>Ancienneté :</strong>{" "}
            {seniority ? formatSeniority(seniority) : "Non renseignée"}
          </li>
        </ul>
      </div>

      {result.value != null && result.value > 0 ? (
        <div>
          <p>
            À partir des éléments que vous avez saisis, la durée du préavis de
            démission est estimée à :{" "}
            <strong>
              {result.value} {result.unit?.toString() || ""}
            </strong>
          </p>

          {/* {result.note && (
            <div
              style={{
                backgroundColor: "#fff3cd",
                padding: "1rem",
                borderRadius: "4px",
                marginTop: "1rem",
              }}
            >
              <p>
                <strong>Note :</strong>
              </p>
              <p>{result.note}</p>
            </div>
          )} */}
        </div>
      ) : (
        <div>
          <p>
            À partir des éléments que vous avez saisis :{" "}
            <strong>il n&apos;y a pas de préavis à effectuer</strong>
          </p>
        </div>
      )}

      {!isAgreementSupported && agreement && (
        <div>
          <h3>Attention il peut exister une autre durée de préavis</h3>
          <p>
            L&apos;existence ou la durée du préavis de démission peut être
            prévue par un accord d&apos;entreprise ou à défaut, par un usage
            dans l&apos;entreprise.
          </p>
        </div>
      )}

      <div>
        <h3>Informations importantes</h3>
        <p>
          Le préavis débute le jour où le salarié remet sa lettre de démission
          en main propre ou à la date de première présentation de la lettre
          recommandée, peu importe le jour de son retrait par l&apos;employeur.
        </p>
        <p>
          L&apos;employeur et le salarié peuvent fixer d&apos;un commun accord
          une date de départ anticipée, libérant ainsi le salarié de
          l&apos;exécution de la totalité ou d&apos;une partie du préavis.
        </p>
      </div>
    </div>
  );
};

export default ResultStepComponent;
