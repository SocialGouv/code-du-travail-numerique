import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { ShowResult, Situation, Warning } from "./components";

const ResultStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    calculationError,
    isAgreementSupported,
    resultNotifications,
    resultReferences,
    contractType,
    agreement,
    remunerationInput,
    totalSalary,
    calculateResult,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    calculationError: state.resultData.calculationError,
    isAgreementSupported: state.resultData.isAgreementSupported,
    resultNotifications: state.resultData.resultNotifications,
    resultReferences: state.resultData.resultReferences,
    contractType: state.informationsData.input.contractType,
    agreement: state.agreementData.input.agreement,
    remunerationInput: state.remunerationData.input,
    totalSalary: state.resultData.totalSalary,
    calculateResult: state.resultFunction.calculateResult,
  }));

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  if (calculationError) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <div className={fr.cx("fr-alert", "fr-alert--error")}>
          <h3 className={fr.cx("fr-alert__title")}>Erreur de calcul</h3>
          <p>Une erreur est survenue lors du calcul. Veuillez réessayer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        result={result}
        notifications={resultNotifications || []}
        idccNumber={agreement?.num}
        contractType={contractType || ""}
      />

      <Warning
        agreement={agreement}
        isAgreementSupported={isAgreementSupported || false}
      />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <Situation
        agreement={agreement}
        remuneration={totalSalary ?? 0}
        typeRemuneration={remunerationInput.typeRemuneration}
      />

      {resultReferences && resultReferences.length > 0 && (
        <div className={fr.cx("fr-mt-4w")}>
          <h3 className={fr.cx("fr-h5")}>Références juridiques</h3>
          <ul>
            {resultReferences.map((ref, index) => (
              <li key={index}>
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  {ref.article}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultStepComponent;
