import React, { useContext, useEffect } from "react";
import {
  HeuresRechercheEmploiContext,
  useHeuresRechercheEmploiStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import {
  JuridicalReferences,
  Situation,
} from "src/modules/outils/preavis-demission/steps/Result/components";
import ShowResult from "./components/ShowResult";
import Warning from "./components/Warning";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

const ResultStepComponent = () => {
  const store = useContext(HeuresRechercheEmploiContext);
  const {
    result,
    getPublicodesResult,
    errorPublicodes,
    informationsData,
    agreementData,
    resultNotifications,
    resultReferences,
    isRuptureConventionnelle,
    isResultValid,
  } = useHeuresRechercheEmploiStore(store, (state) => ({
    result: state.resultData.input.result,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    errorPublicodes: state.resultData.error.errorPublicodes,
    informationsData: state.informationsData,
    agreementData: state.agreementData,
    resultNotifications: state.resultData.input.resultNotifications,
    resultReferences: state.resultData.input.resultReferences,
    isRuptureConventionnelle: state.resultData.input.isRuptureConventionnelle,
    isResultValid: state.resultData.input.isResultValid,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, [getPublicodesResult]);

  if (errorPublicodes) {
    return (
      <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
        <AccessibleAlert
          title="Attention"
          description="Une erreur est survenue lors du calcul. Veuillez réessayer."
          severity="error"
          autoFocus
        />
      </div>
    );
  }

  if (!result) {
    return <div>Calcul en cours...</div>;
  }

  const situationsForDisplay =
    informationsData.input.publicodesInformations?.map((info) => ({
      label: info.question.rule?.titre || info.question.name,
      value: info.info || "",
      unit: info.question.rule?.unité || "",
    })) || [];

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      {isRuptureConventionnelle ? (
        <p>
          Il n’y a pas d’heures d’absence autorisée pour rechercher un emploi
          dans le cas d’une rupture conventionnelle.
        </p>
      ) : (
        <>
          <ShowResult
            result={result}
            notifications={resultNotifications || []}
            isResultValid={isResultValid}
          />

          <Warning isResultValid={isResultValid} />

          <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
          <Situation
            situations={situationsForDisplay}
            agreement={agreementData.input.agreement}
          />
          <JuridicalReferences references={resultReferences || []} />
        </>
      )}
    </div>
  );
};

export default ResultStepComponent;
