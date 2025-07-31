import React, { useContext, useEffect } from "react";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import DecryptedResult from "./components/DecryptedResult";
import ReferenceJuridiques from "./components/ReferenceJuridiques";
import ShowResult from "./components/ShowResult";
import Situation from "./components/Situation";
import Warning from "./components/Warning";

const ResultStepComponent = () => {
  const store = useContext(PreavisLicenciementContext);
  const {
    result,
    agreement,
    calculateResult,
    publicodesInformations,
    resultNotifications,
    resultReferences,
    errorPublicodes,
    isDisabledWorker,
    isSeriousMisconduct,
    seniority,
    publicodesLegalResult,
    publicodesAgreementResult,
    isAgreementSupported,
    route,
    resultExplanation,
  } = usePreavisLicenciementStore(store, (state) => ({
    result: state.resultData.input.result,
    agreement: state.agreementData.input.agreement,
    calculateResult: state.resultFunction.calculateResult,
    publicodesInformations: state.informationsData.input.publicodesInformations,
    resultNotifications: state.resultData.input.resultNotifications,
    resultReferences: state.resultData.input.resultReferences,
    errorPublicodes: state.resultData.error.errorPublicodes,
    isDisabledWorker: state.statusData.input.disabledWorker,
    isSeriousMisconduct: state.statusData.input.seriousMisconduct,
    seniority: state.statusData.input.seniority,
    publicodesLegalResult: state.resultData.input.publicodesLegalResult,
    publicodesAgreementResult: state.resultData.input.publicodesAgreementResult,
    route: state.agreementData.input.route,
    isAgreementSupported: state.agreementData.input.isAgreementSupported,
    resultExplanation: state.resultData.input.resultExplanation,
  }));

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  if (errorPublicodes) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <div className={fr.cx("fr-alert", "fr-alert--error")}>
          <h3 className={fr.cx("fr-alert__title")}>Erreur de calcul</h3>
          <p>Une erreur est survenue lors du calcul. Veuillez réessayer.</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return <div>Calcul en cours...</div>;
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        notifications={resultNotifications || []}
        result={result}
        idccNumber={agreement?.num}
      />

      <Warning ccn={agreement} resultExplanation={resultExplanation} />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <DecryptedResult
        legalResult={publicodesLegalResult}
        agreementResult={publicodesAgreementResult}
        agreementRoute={route}
        isAgreementSupported={isAgreementSupported}
        resultExplanation={resultExplanation}
      />
      <Situation
        situations={publicodesInformations || []}
        agreement={agreement}
        isDisabledWorker={isDisabledWorker}
        isSeriousMisconduct={isSeriousMisconduct}
        seniority={seniority}
      />
      <ReferenceJuridiques references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
