import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { ShowResult, Situation, Warning } from "./components";
import FormulaInterpreter from "src/modules/outils/common/components/FormulaInterpreter";
import Link from "src/modules/common/Link";

const ResultStepComponent = () => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    calculationError,
    isAgreementSupported,
    resultNotifications,
    resultReferences,
    agreement,
    totalSalary,
    calculateResult,
    resultFormula,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    calculationError: state.resultData.calculationError,
    isAgreementSupported: state.resultData.isAgreementSupported,
    resultNotifications: state.resultData.resultNotifications,
    resultReferences: state.resultData.resultReferences,
    resultFormula: state.resultData.resultFormula,
    agreement: state.agreementData.input.agreement,
    totalSalary: state.resultData.totalSalary,
    calculateResult: state.resultFunction.calculateResult,
  }));

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  if (calculationError) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-3w")}>
        <div className={fr.cx("fr-alert", "fr-alert--error")}>
          <h3 className={fr.cx("fr-alert__title")}>Erreur de calcul</h3>
          <p>Une erreur est survenue lors du calcul. Veuillez réessayer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult result={result} notifications={resultNotifications} />

      <Warning
        agreement={agreement}
        isAgreementSupported={isAgreementSupported || false}
      />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <Situation agreement={agreement} remuneration={totalSalary ?? 0} />
      <FormulaInterpreter formula={resultFormula} />

      {resultReferences && resultReferences.length > 0 && (
        <div className={fr.cx("fr-mt-4w")}>
          <h3 className={fr.cx("fr-h5")}>Références juridiques</h3>
          <ul>
            {resultReferences.map((ref, index) => (
              <li key={index}>
                <Link
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ref.url}
                >
                  {ref.article}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultStepComponent;
