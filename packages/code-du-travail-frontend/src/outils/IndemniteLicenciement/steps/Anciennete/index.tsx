import React from "react";

import { SectionTitle } from "../../../common/stepStyles";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { AbsencePeriods } from "./components";
import { useIndemniteLicenciementStore } from "../../store";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";

const StepAnciennete = () => {
  const {
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
  } = useIndemniteLicenciementStore((state) => ({
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
  }));
  return (
    <>
      <SectionTitle>Dates d’entrée et de sortie de l’entreprise</SectionTitle>
      <TextQuestion
        label="Quelle est la date d’entrée dans l’entreprise&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateEntree}
        onChange={onChangeDateEntree}
        error={errorDateEntree}
        id="dateEntree"
        showRequired
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
      />
      <TextQuestion
        label="Quelle est la date de sortie de l’entreprise&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateSortie}
        onChange={onChangeDateSortie}
        error={errorDateSortie}
        id="dateSortie"
        showRequired
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
          error={errorAbsencePeriods?.absences}
        />
      )}
    </>
  );
};

export default StepAnciennete;
