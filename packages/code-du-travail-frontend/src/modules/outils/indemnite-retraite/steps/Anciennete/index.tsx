import { fr } from "@codegouvfr/react-dsfr";
import { useContext, useEffect } from "react";
import { TextQuestion } from "src/modules/outils/common/components";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { AncienneteDisplay } from "../../../indemnite-depart/steps";
import { IndemniteDepartType } from "../../../indemnite-depart/types";
import {
  getRetraiteOriginLabel,
  getRuptureLabel,
} from "../../../indemnite-depart/utils/question";

const StepAnciennete = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    init,
    dateEntree,
    onChangeDateEntree,
    dateSortie,
    onChangeDateSortie,
    dateNotification,
    onChangeDateNotification,
    errorDateNotification,
    errorDateSortie,
    errorDateEntree,
    ancienneteEstimee,
    errorPublicodes,
    originRetraite,
  } = useIndemniteDepartStore(store, (state) => ({
    init: state.ancienneteFunction.init,
    dateEntree: state.ancienneteData.input.dateEntree,
    onChangeDateEntree: state.ancienneteFunction.onChangeDateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    onChangeDateSortie: state.ancienneteFunction.onChangeDateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    onChangeDateNotification: state.ancienneteFunction.onChangeDateNotification,
    errorDateNotification: state.ancienneteData.error.errorDateNotification,
    errorDateSortie: state.ancienneteData.error.errorDateSortie,
    errorDateEntree: state.ancienneteData.error.errorDateEntree,
    ancienneteEstimee: state.ancienneteData.input.ancienneteEstimee,
    errorPublicodes: state.ancienneteData.error.errorPublicodes,
    originRetraite: state.informationsData.input.originRetraite,
  }));

  const ruptureLabel = getRuptureLabel(
    IndemniteDepartType.RETRAITE,
    originRetraite
  );
  const originLabel = getRetraiteOriginLabel(originRetraite);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <div className={fr.cx("fr-mt-2w")}>
        <h3>Dates de début et de fin de contrat</h3>
        <TextQuestion
          label="Quelle est la date de début du contrat de travail&nbsp;?"
          inputType="date"
          value={dateEntree}
          onChange={onChangeDateEntree}
          error={errorDateEntree}
          id="dateEntree"
          dataTestId={"date-entree"}
        />
        <TextQuestion
          label={`Quelle est la date de notification ${ruptureLabel}&nbsp;?`}
          inputType="date"
          value={dateNotification}
          onChange={onChangeDateNotification}
          error={errorDateNotification}
          id="dateNotification"
          dataTestId={"date-notification"}
        />
        <TextQuestion
          label={`Quelle est la date de fin du préavis de ${originLabel} (date de fin du contrat)&nbsp;?`}
          inputType="date"
          value={dateSortie}
          onChange={onChangeDateSortie}
          error={errorDateSortie}
          id="dateSortie"
          dataTestId={"date-sortie"}
          subLabel="En cas de dispense de préavis à l'initiative de l'employeur, indiquer la date de fin du préavis « théorique » non effectué."
        />
        <AncienneteDisplay anciennete={ancienneteEstimee} />
      </div>
      {errorPublicodes && (
        <AccessibleAlert
          title="Attention"
          description={errorPublicodes}
          severity="error"
          className={["fr-mt-2w"]}
        />
      )}
    </>
  );
};

export default StepAnciennete;
