import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import {
  NoIndemnityMessage,
  ShowResult,
  Situation,
  Warning,
} from "./components";
import FormulaInterpreter from "src/modules/outils/common/components/FormulaInterpreter";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import ReferenceJuridiques from "src/modules/outils/preavis-licenciement/steps/Result/components/ReferenceJuridiques";
import { findContractOption } from "../../agreements";
import { CONTRACT_FAMILY } from "../../types";

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
    contractOptionId,
    ineligibility,
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
    contractOptionId: state.typeContratData.input.contractOptionId,
    ineligibility:
      state.typeContratData.ineligibility ??
      state.termeContratData.ineligibility,
  }));

  const contractOption = findContractOption(contractOptionId, agreement);
  // La liste des contrats exclus n'est montrée qu'aux usagers ayant choisi
  // « Autres » à l'étape « Type de contrat » (issue #7142).
  const isExcludedContract = contractOption?.family === CONTRACT_FAMILY.EXCLU;
  const hasNoIndemnity = !!ineligibility;

  useEffect(() => {
    if (!hasNoIndemnity) {
      calculateResult();
    }
  }, [calculateResult, hasNoIndemnity]);

  if (hasNoIndemnity) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <NoIndemnityMessage showExcludedContracts={isExcludedContract} />
      </div>
    );
  }

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
      <Situation
        agreement={agreement}
        contractTypeLabel={contractOption?.label}
        remuneration={totalSalary ?? 0}
      />
      <FormulaInterpreter formula={resultFormula} />
      <ReferenceJuridiques references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
