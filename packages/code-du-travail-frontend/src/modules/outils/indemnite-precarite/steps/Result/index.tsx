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
import { getIndemnitePrecariteIneligibilityReferences } from "@socialgouv/modeles-social";
import { findContractOption } from "../../agreements";
import { CONTRACT_FAMILY, ContractOption, TYPE_CDD } from "../../types";
import type { WarningVariant } from "./components/Warning";
import type { ChosenResult } from "@socialgouv/modeles-social";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import { mapToPublicodesSituationForEligibilityIndemnitePrecarite } from "../../../common/publicodes/indemnite-precarite";
import { useResultTracking } from "../../events/useResultTracking";

/**
 * Rédaction du bloc d'avertissement à afficher. Elle dépend du taux
 * réellement appliqué (`chosenResult`) et non du simple numéro de convention
 * collective : une CC listée mais parcourue avec un CDD générique relève bien
 * des dispositions du Code du travail.
 */
export const getWarningVariant = ({
  agreement,
  chosenResult,
  contractOption,
}: {
  agreement?: Agreement;
  chosenResult?: ChosenResult;
  contractOption?: ContractOption;
}): WarningVariant => {
  if (!agreement) return "sans-cc";
  if (chosenResult !== "AGREEMENT") return "cc-sans-dispositions";
  if (contractOption?.typeCdd === TYPE_CDD.USAGE_ENQUETEURS_VACATAIRES) {
    return "cc-1486-enqueteurs";
  }
  return "cc-avec-dispositions";
};

const ResultStepComponent = () => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    calculationError,
    resultNotifications,
    resultReferences,
    agreement,
    totalSalary,
    calculateResult,
    resultFormula,
    contractOptionId,
    finALaDatePrevue,
    ineligibility,
    chosenResult,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    calculationError: state.resultData.calculationError,
    resultNotifications: state.resultData.resultNotifications,
    resultReferences: state.resultData.resultReferences,
    resultFormula: state.resultData.resultFormula,
    agreement: state.agreementData.input.agreement,
    totalSalary: state.resultData.totalSalary,
    calculateResult: state.resultFunction.calculateResult,
    contractOptionId: state.typeContratData.input.contractOptionId,
    finALaDatePrevue: state.termeContratData.input.finALaDatePrevue,
    ineligibility:
      state.typeContratData.ineligibility ??
      state.termeContratData.ineligibility,
    chosenResult: state.resultData.chosenResult,
  }));

  const contractOption = findContractOption(contractOptionId, agreement);
  const family = contractOption?.family ?? CONTRACT_FAMILY.CDD;
  // La liste des contrats exclus n'est montrée qu'aux usagers ayant choisi
  // « Autres » à l'étape « Type de contrat » (issue #7142).
  const isExcludedContract = family === CONTRACT_FAMILY.EXCLU;
  const hasNoIndemnity = !!ineligibility;

  useEffect(() => {
    if (!hasNoIndemnity) {
      calculateResult();
    }
  }, [calculateResult, hasNoIndemnity]);

  // Déclaré après l'effet de calcul : l'issue lue est celle qui sera rendue.
  useResultTracking(() => {
    if (hasNoIndemnity) return "ineligible";
    return store.getState().resultData.calculationError ? "error" : "eligible";
  });

  if (hasNoIndemnity) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <NoIndemnityMessage
          message={ineligibility}
          family={family}
          references={getIndemnitePrecariteIneligibilityReferences(
            mapToPublicodesSituationForEligibilityIndemnitePrecarite({
              family,
              typeCdd: contractOption?.typeCdd ?? "Autres",
            })
          )}
          showExcludedContracts={isExcludedContract}
        />
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
      <ShowResult
        result={result}
        notifications={resultNotifications}
        family={family}
      />

      <Warning
        variant={getWarningVariant({
          agreement,
          chosenResult,
          contractOption,
        })}
        family={family}
      />

      <h3 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h3>
      <Situation
        agreement={agreement}
        contractTypeLabel={contractOption?.label}
        finALaDatePrevue={finALaDatePrevue}
        remuneration={totalSalary ?? 0}
      />
      <FormulaInterpreter formula={resultFormula} />
      <ReferenceJuridiques references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
