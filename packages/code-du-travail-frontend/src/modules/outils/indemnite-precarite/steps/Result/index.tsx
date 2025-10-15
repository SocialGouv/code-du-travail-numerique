import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { ShowResult, Situation, Warning } from "./components";
import FormulaInterpreter from "src/modules/outils/common/components/FormulaInterpreter";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import ReferenceJuridiques from "src/modules/outils/preavis-licenciement/steps/Result/components/ReferenceJuridiques";

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
      <AccessibleAlert
        title="Attention"
        description="Une erreur est survenue lors du calcul. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste."
        severity="error"
        className={["fr-mb-2w"]}
      />
    );
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult result={result} notifications={resultNotifications} />

      <Warning
        agreement={agreement}
        isAgreementSupported={isAgreementSupported || false}
      />

      <h3 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h3>
      <Situation agreement={agreement} remuneration={totalSalary ?? 0} />
      <FormulaInterpreter formula={resultFormula} />
      <ReferenceJuridiques references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
