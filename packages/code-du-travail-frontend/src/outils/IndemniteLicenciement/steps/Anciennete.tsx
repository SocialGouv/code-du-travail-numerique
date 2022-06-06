import React from "react";

import { SectionTitle } from "../../common/stepStyles";
import { AbsencePeriods, RadioQuestion, TextQuestion } from "../components";
import { useIndemniteLicenciementStore } from "../store";

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
  } = useIndemniteLicenciementStore((state) => ({
    ...state,
  }));
  return (
    <>
      <SectionTitle>Dates d’entrée et de sortie de l’entreprise</SectionTitle>
      <TextQuestion
        label="Quelle est la date d’entrée dans l’entreprise&nbsp;?"
        inputType="date"
        placeholder=" jj/mm/aaaa"
        value={dateEntree}
        onChange={onChangeDateEntree}
        error={undefined}
      />
      <TextQuestion
        label="Quelle est la date de notification du licenciement&nbsp;?"
        inputType="date"
        placeholder=" jj/mm/aaaa"
        value={dateNotification}
        onChange={onChangeDateNotification}
        error={errorDateNotification}
      />
      <TextQuestion
        label="Quelle est la date de sortie de l’entreprise&nbsp;?"
        inputType="date"
        placeholder=" jj/mm/aaaa"
        value={dateSortie}
        onChange={onChangeDateSortie}
        error={errorDateSortie}
      />
      <SectionTitle>Période d’absence prolongée</SectionTitle>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
          },
          {
            label: "Non",
            value: "non",
          },
        ]}
        label="Y a-t-il eu des absences de plus d’un mois durant le contrat de travail&nbsp;?"
        selectedOption={hasAbsenceProlonge}
        onChangeSelectedOption={onChangeHasAbsenceProlonge}
        error={errorAbsenceProlonge}
      />
      {hasAbsenceProlonge === "oui" && (
        <AbsencePeriods
          onChange={onChangeAbsencePeriods}
          absences={absencePeriods}
        />
      )}
    </>
  );
};

export default StepAnciennete;
