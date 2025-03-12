import React, { useContext, useEffect, useMemo } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
import { getMotifExampleMessage } from "src/modules/outils/indemnite-depart/agreements";
import { AbsencePeriods } from "src/modules/outils/indemnite-depart/steps/Anciennete";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";

const StepAnciennete = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    init,
    onChangeAbsencePeriods,
    motifs,
    absencePeriods,
    onChangeHasAbsenceProlonge,
    hasAbsenceProlonge,
    dateEntree,
    onChangeDateEntree,
    dateSortie,
    onChangeDateSortie,
    onChangeDateNotification,
    errorDateSortie,
    errorAbsenceProlonge,
    errorDateEntree,
    errorAbsencePeriods,
    informationData,
  } = useIndemniteDepartStore(store, (state) => ({
    init: state.ancienneteFunction.init,
    onChangeAbsencePeriods: state.ancienneteFunction.onChangeAbsencePeriods,
    motifs: state.ancienneteData.input.motifs,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    onChangeHasAbsenceProlonge:
      state.ancienneteFunction.onChangeHasAbsenceProlonge,
    hasAbsenceProlonge: state.ancienneteData.input.hasAbsenceProlonge,
    dateEntree: state.ancienneteData.input.dateEntree,
    onChangeDateEntree: state.ancienneteFunction.onChangeDateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    onChangeDateSortie: state.ancienneteFunction.onChangeDateSortie,
    onChangeDateNotification: state.ancienneteFunction.onChangeDateNotification,
    errorDateSortie: state.ancienneteData.error.errorDateSortie,
    errorAbsenceProlonge: state.ancienneteData.error.errorAbsenceProlonge,
    errorDateEntree: state.ancienneteData.error.errorDateEntree,
    errorAbsencePeriods: state.ancienneteData.error.errorAbsencePeriods,
    agreement: state.agreementData.input.agreement,
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
  }));

  const messageMotifExample = useMemo(
    () => getMotifExampleMessage(informationData, true),
    [informationData]
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
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
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasAbsenceProlonge-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasAbsenceProlonge-non",
          },
        ]}
        name="hasAbsenceProlonge"
        label="Y a-t-il eu des absences de plus d’un mois durant le contrat de travail&nbsp;?"
        selectedOption={hasAbsenceProlonge}
        onChangeSelectedOption={onChangeHasAbsenceProlonge}
        error={errorAbsenceProlonge}
      />
      {hasAbsenceProlonge === "oui" && (
        <AbsencePeriods
          onChange={onChangeAbsencePeriods}
          motifs={motifs}
          absences={absencePeriods}
          error={errorAbsencePeriods}
          informationData={informationData}
          messageMotifExample={messageMotifExample}
        />
      )}
    </>
  );
};

export default StepAnciennete;
