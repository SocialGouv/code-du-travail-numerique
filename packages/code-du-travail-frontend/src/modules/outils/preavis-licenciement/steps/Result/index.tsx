import React, { useContext, useEffect } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";
import ShowResult from "./components/ShowResult";
import Warning from "./components/Warning";
import Situation from "./components/Situation";
import ErrorPublicodes from "src/modules/outils/indemnite-depart/steps/Resultat/components/ErrorPublicodes";
import { PubliReferences } from "src/modules/outils/common/components";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";

// Fonction pour transformer les PublicodesInformation en SituationItem
const transformPublicodesToSituations = (
  publicodesInformations: PublicodesInformation[]
) => {
  return publicodesInformations.map((info) => ({
    label: info.question.rule.titre || info.question.name || "Question",
    value: info.info || "Non renseigné",
    unit: info.question.rule.unité || undefined,
  }));
};

const StepResult = (): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);
  const {
    calculateResult,
    result,
    resultNotifications,
    resultReferences,
    agreement,
    statusData,
    publicodesInformations,
    errorPublicodes,
  } = usePreavisLicenciementStore(store, (state) => ({
    calculateResult: state.resultFunction.calculateResult,
    result: state.resultData.input.result,
    resultNotifications: state.resultData.input.resultNotifications,
    resultReferences: state.resultData.input.resultReferences,
    agreement: state.agreementData.input.agreement,
    statusData: state.statusData.input,
    publicodesInformations: state.informationsData.input.publicodesInformations,
    errorPublicodes: state.resultData.error.errorPublicodes,
  }));

  useEffect(() => {
    calculateResult();
  }, []);

  if (errorPublicodes) {
    return <ErrorPublicodes title={"Préavis de licenciement"} />;
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        duration={result?.duration || "Aucun préavis"}
        agreementSituation={result?.agreementSituation}
        legalSituation={result?.legalSituation}
        idcc={agreement?.num}
        note={result?.note}
      />

      <Warning />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <Situation
        situations={transformPublicodesToSituations(
          publicodesInformations || []
        )}
        agreement={agreement}
      />

      <PubliReferences
        references={resultReferences ?? []}
        classNameTitle={fr.cx("fr-h5", "fr-mb-0")}
      />
    </div>
  );
};

export default StepResult;
