import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import {
  ShowResult,
  CalculationDetails,
  AgreementInfo,
  Situation,
  Warning,
  LegalInfo,
  LegalReferences,
} from "./components";

const ResultStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    result,
    isCalculating,
    calculationError,
    isAgreementSupported,
    resultNotifications,
    resultReferences,
    contractType,
    agreement,
    remunerationInput,
    criteria,
    calculateResult,
  } = useIndemnitePrecariteStore(store, (state) => ({
    result: state.resultData.result,
    isCalculating: state.resultData.isCalculating,
    calculationError: state.resultData.calculationError,
    isAgreementSupported: state.resultData.isAgreementSupported,
    resultNotifications: state.resultData.resultNotifications,
    resultReferences: state.resultData.resultReferences,
    contractType: state.informationsData.input.contractType,
    agreement: state.agreementData.input.agreement,
    remunerationInput: state.remunerationData.input,
    criteria: state.informationsData.input.criteria,
    calculateResult: state.resultFunction.calculateResult,
  }));

  // Calculer le résultat automatiquement au chargement du composant
  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  const getTotalSalary = () => {
    if (
      remunerationInput.typeRemuneration === "total" &&
      remunerationInput.salaire
    ) {
      return remunerationInput.salaire;
    } else if (
      remunerationInput.typeRemuneration === "mensuel" &&
      remunerationInput.salaires
    ) {
      return remunerationInput.salaires.reduce((sum, entry) => {
        return sum + (entry.salaire || 0);
      }, 0);
    }
    return 0;
  };

  if (isCalculating) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <h3>Résultat</h3>
        <p>Calcul en cours...</p>
      </div>
    );
  }

  if (calculationError) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <h3>Résultat</h3>
        <div className={fr.cx("fr-alert", "fr-alert--error", "fr-mb-3w")}>
          <p>Une erreur est survenue lors du calcul : {calculationError}</p>
          <button
            className={fr.cx("fr-btn", "fr-btn--secondary")}
            onClick={calculateResult}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <h3>Résultat</h3>
        <p>Aucun résultat disponible.</p>
      </div>
    );
  }

  const totalSalary = getTotalSalary();

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        isEligible={result.isEligible}
        amount={result.amount}
        reason={result.reason}
        contractType={contractType || ""}
        notifications={resultNotifications}
      />

      {result.isEligible && (
        <>
          <Warning
            agreement={agreement}
            isAgreementSupported={isAgreementSupported || false}
          />

          <CalculationDetails
            details={result.details}
            amount={result.amount}
            totalSalary={totalSalary}
          />

          <AgreementInfo
            agreement={agreement}
            isAgreementSupported={isAgreementSupported || false}
          />

          {/* Notifications publicodes */}
          {resultNotifications && resultNotifications.length > 0 && (
            <div className={fr.cx("fr-card", "fr-mb-3w")}>
              <div className={fr.cx("fr-card__body")}>
                <h3 className={fr.cx("fr-card__title")}>
                  Informations complémentaires
                </h3>
                {resultNotifications.map((notification, index) => (
                  <div
                    key={index}
                    className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-2w")}
                  >
                    <p>{notification.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <LegalInfo />

      <Situation
        contractType={contractType || ""}
        agreement={agreement}
        remunerationInput={{
          typeRemuneration: remunerationInput.typeRemuneration || "",
          salaire: remunerationInput.salaire,
          salaires: remunerationInput.salaires,
        }}
        criteria={criteria}
        totalSalary={totalSalary}
      />

      <LegalReferences references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
