import React, { useContext, useEffect } from "react";
import {
  HeuresRechercheEmploiContext,
  useHeuresRechercheEmploiStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { ShowResult } from "./components/ShowResult";
import { Situation } from "./components/Situation";
import { DisclaimerBox } from "./components/DisclaimerBox";
import { NoResult } from "./components/NoResult";

const ResultStepComponent = () => {
  const store = useContext(HeuresRechercheEmploiContext);
  const {
    result,
    getPublicodesResult,
    errorPublicodes,
    informationsData,
    agreementData,
  } = useHeuresRechercheEmploiStore(store, (state) => ({
    result: state.resultData.input.result,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    errorPublicodes: state.resultData.error.errorPublicodes,
    informationsData: state.informationsData,
    agreementData: state.agreementData,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, [getPublicodesResult]);

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

  // Détermine si nous avons un résultat valide
  const hasValidResult =
    result && result.nodeValue !== null && result.nodeValue !== undefined;

  // Récupère l'instance publicodes
  const publicodes = informationsData.publicodes || agreementData.publicodes;

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <Situation />

      {hasValidResult ? (
        <ShowResult
          result={result}
          publicodes={publicodes}
          ruleValue="contrat_travail_licenciement_heures_recherche_emploi"
        />
      ) : (
        <NoResult />
      )}

      <DisclaimerBox />
    </div>
  );
};

export default ResultStepComponent;
