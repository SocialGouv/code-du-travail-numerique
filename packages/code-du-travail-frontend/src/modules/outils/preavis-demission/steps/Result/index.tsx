import React, { useContext, useEffect } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import {
  ShowResult,
  Situation,
  Warning,
  JuridicalReferences,
} from "./components";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

const ResultStepComponent = () => {
  const store = useContext(PreavisDemissionContext);
  const {
    result,
    agreement,
    getPublicodesResult,
    publicodesInformations,
    resultNotifications,
    resultReferences,
    errorPublicodes,
  } = usePreavisDemissionStore(store, (state) => ({
    result: state.resultData.input.result,
    agreement: state.agreementData.input.agreement,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    publicodesInformations: state.informationsData.input.publicodesInformations,
    resultNotifications: state.resultData.input.resultNotifications,
    resultReferences: state.resultData.input.resultReferences,
    errorPublicodes: state.resultData.error.errorPublicodes,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, [getPublicodesResult]);

  if (errorPublicodes) {
    return (
      <AccessibleAlert
        title="Attention"
        description="Une erreur est survenue lors du calcul. Veuillez réessayer."
        severity="error"
        className={["fr-mb-2w"]}
      />
    );
  }

  if (!result) {
    return <div>Calcul en cours...</div>;
  }

  const situationsForDisplay =
    publicodesInformations?.map((info) => ({
      label: info.question.rule.titre || info.question.name,
      value: info.info || "",
      unit: info.question.rule.unité || "",
    })) || [];

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        result={result}
        notifications={resultNotifications || []}
        idccNumber={agreement?.num}
      />

      <Warning />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <Situation situations={situationsForDisplay} agreement={agreement} />

      <JuridicalReferences references={resultReferences || []} />
    </div>
  );
};

export default ResultStepComponent;
