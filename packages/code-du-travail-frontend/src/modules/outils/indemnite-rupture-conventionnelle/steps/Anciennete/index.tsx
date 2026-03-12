import { fr } from "@codegouvfr/react-dsfr";
import React, { useContext, useEffect } from "react";
import { TextQuestion } from "src/modules/outils/common/components";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { AncienneteDisplay } from "../../../indemnite-depart/steps";

const StepAnciennete = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    init,
    dateEntree,
    onChangeDateEntree,
    dateSortie,
    onChangeDateSortie,
    onChangeDateNotification,
    errorDateSortie,
    errorDateEntree,
    ancienneteEstimee,
  } = useIndemniteDepartStore(store, (state) => ({
    init: state.ancienneteFunction.init,
    dateEntree: state.ancienneteData.input.dateEntree,
    onChangeDateEntree: state.ancienneteFunction.onChangeDateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    onChangeDateSortie: state.ancienneteFunction.onChangeDateSortie,
    onChangeDateNotification: state.ancienneteFunction.onChangeDateNotification,
    errorDateSortie: state.ancienneteData.error.errorDateSortie,
    errorDateEntree: state.ancienneteData.error.errorDateEntree,
    agreement: state.agreementData.input.agreement,
    ancienneteEstimee: state.ancienneteData.input.ancienneteEstimee,
  }));

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
          label="Quelle est la date de fin du contrat de travail&nbsp;?"
          inputType="date"
          value={dateSortie}
          onChange={(value) => {
            onChangeDateNotification(value);
            onChangeDateSortie(value);
          }}
          error={errorDateSortie}
          id="dateSortie"
          dataTestId={"date-sortie"}
          subLabel="La date de rupture du contrat est indiquée dans la convention de rupture. Dans tous les cas, elle ne peut intervenir avant la fin du délai laissé à l’administration pour valider la rupture conventionnelle."
        />
        <AncienneteDisplay anciennete={ancienneteEstimee} />
      </div>
    </>
  );
};

export default StepAnciennete;
