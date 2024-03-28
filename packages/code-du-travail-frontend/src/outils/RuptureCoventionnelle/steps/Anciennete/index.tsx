import React, { useContext, useEffect } from "react";

import { SectionTitle } from "../../../common/stepStyles";
import { RadioQuestion, TextQuestion } from "../../../Components";
import {
  AbsencePeriods,
  SectionTitleWithTooltip,
} from "../../../CommonIndemniteDepart/steps/Anciennete/components";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
// Do not optimize the following import
import { getMessageMotifExample } from "../../../CommonIndemniteDepart/agreements/ui-customizations/messages";

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

  useEffect(() => {
    init();
  }, [init]);

  const messageMotifsExample = React.useMemo(
    () => getMessageMotifExample(informationData),
    [informationData]
  );

  return (
    <>
      <SectionTitle hasSmallMarginTop>
        Dates de début et de fin de contrat
      </SectionTitle>
      <TextQuestion
        label="Quelle est la date de début du contrat de travail&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateEntree}
        onChange={onChangeDateEntree}
        error={errorDateEntree}
        id="dateEntree"
        showRequired
        dataTestId={"date-entree"}
        autoFocus
      />
      <TextQuestion
        label="Quelle est la date de fin du contrat&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateSortie}
        onChange={(value) => {
          onChangeDateNotification(value);
          onChangeDateSortie(value);
        }}
        error={errorDateSortie}
        id="dateSortie"
        showRequired
        dataTestId={"date-sortie"}
      />
      <SectionTitleWithTooltip
        name="Période d’absence prolongée"
        tooltip={{
          content: (
            <p>
              Pour rendre la saisie de l&apos;outil plus simple, les absences de
              moins d&apos;un mois ne sont pas comptabilisées. Or, ces absences
              peuvent impacter l&apos;ancienneté et donner ainsi lieu à un
              montant d&apos;indemnité inférieur à celui calculé par notre
              simulateur.
            </p>
          ),
        }}
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
        showRequired
      />
      {hasAbsenceProlonge === "oui" && (
        <AbsencePeriods
          onChange={onChangeAbsencePeriods}
          motifs={motifs}
          absences={absencePeriods}
          error={errorAbsencePeriods}
          informationData={informationData}
          messageMotifExample={messageMotifsExample}
        />
      )}
    </>
  );
};

export default StepAnciennete;
