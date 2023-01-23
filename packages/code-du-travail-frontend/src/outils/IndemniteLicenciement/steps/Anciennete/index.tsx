import React, { useEffect } from "react";

import { SectionTitle } from "../../../common/stepStyles";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { AbsencePeriods } from "./components";
import { useIndemniteLicenciementStore } from "../../store";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
import Html from "../../../../common/Html";

const StepAnciennete = () => {
  const {
    init,
    onChangeAbsencePeriods,
    absencePeriods,
    onChangeHasAbsenceProlonge,
    hasAbsenceProlonge,
    dateEntree,
    onChangeDateEntree,
    dateSortie,
    onChangeDateSortie,
    dateNotification,
    onChangeDateNotification,
    errorDateNotification,
    errorDateSortie,
    errorAbsenceProlonge,
    errorDateEntree,
    errorAbsencePeriods,
    agreement,
    informationData,
  } = useIndemniteLicenciementStore((state) => ({
    init: state.ancienneteFunction.init,
    onChangeAbsencePeriods: state.ancienneteFunction.onChangeAbsencePeriods,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    onChangeHasAbsenceProlonge:
      state.ancienneteFunction.onChangeHasAbsenceProlonge,
    hasAbsenceProlonge: state.ancienneteData.input.hasAbsenceProlonge,
    dateEntree: state.ancienneteData.input.dateEntree,
    onChangeDateEntree: state.ancienneteFunction.onChangeDateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    onChangeDateSortie: state.ancienneteFunction.onChangeDateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    onChangeDateNotification: state.ancienneteFunction.onChangeDateNotification,
    errorDateNotification: state.ancienneteData.error.errorDateNotification,
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

  return (
    <>
      <SectionTitle hasSmallMarginTop>
        Dates d’entrée et de sortie de l’entreprise
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
      />
      <TextQuestion
        label="Quelle est la date de notification du licenciement&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateNotification}
        onChange={onChangeDateNotification}
        error={errorDateNotification}
        id="dateNotification"
        showRequired
        dataTestId={"date-notification"}
      />
      <TextQuestion
        label="Quelle est la date de fin du contrat de travail&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateSortie}
        onChange={onChangeDateSortie}
        error={errorDateSortie}
        id="dateSortie"
        showRequired
        dataTestId={"date-sortie"}
        tooltip={{
          content: (
            <Html>
              En cas de dispense de préavis à l&apos;initiative de
              l&apos;employeur, ou si le licenciement intervient à la suite d’un
              avis d’inaptitude non professionnelle, indiquer la date de fin du
              préavis «&nbsp;théorique&nbsp;» non effectué.
            </Html>
          ),
        }}
      />
      <SectionTitle>Période d’absence prolongée</SectionTitle>
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
          idcc={
            agreement
              ? (`IDCC${agreement.num}` as SupportedCcIndemniteLicenciement)
              : undefined
          }
          onChange={onChangeAbsencePeriods}
          absences={absencePeriods}
          error={errorAbsencePeriods}
          informationData={informationData}
        />
      )}
    </>
  );
};

export default StepAnciennete;
