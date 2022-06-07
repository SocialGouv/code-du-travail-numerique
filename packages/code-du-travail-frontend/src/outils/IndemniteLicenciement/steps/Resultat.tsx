import React from "react";

import { SectionTitle } from "../../common/stepStyles";
import { AbsencePeriods, RadioQuestion, TextQuestion } from "../components";
import { useIndemniteLicenciementStore } from "../store";

const StepResult = () => {
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
  } = useIndemniteLicenciementStore((state) => ({
    ...state,
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
      />
      <TextQuestion
        label="Quelle est la date de notification du licenciement&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
        value={dateNotification}
        onChange={onChangeDateNotification}
        error={errorDateNotification}
      />
      <TextQuestion
        label="Quelle est la date de sortie de l’entreprise&nbsp;?"
        inputType="date"
        placeholder="jj/mm/aaaa"
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

export default StepResult;

// // import { IndemniteLegale } from "../components/IndemniteLegale";
// // import { getIndemniteExplications, getSalaireRef } from "../indemnite";
// // import { useForm } from "react-final-form";
// // import { useIndemniteLicenciementStore } from "../state";

// const StepIndemnite = (): JSX.Element => {
//   // const result = useIndemniteLicenciementStore((state) => state.steps.result);
//   // if (!result) {
//   //   throw Error("Try to show result without computed result data");
//   // }

//   // const form = useForm();
//   // const {
//   //   hasSameSalaire = false,
//   //   salaires = [],
//   //   primes = [],
//   //   salaire,
//   //   anciennete,
//   //   inaptitude,
//   // } = form.getState().values;
//   // const salaireRef = getSalaireRef({
//   //   hasSameSalaire,
//   //   primes,
//   //   salaire,
//   //   salaires,
//   // });
//   // const infoCalcul = getIndemniteExplications({
//   //   anciennete,
//   //   inaptitude,
//   //   salaireRef,
//   // });

//   return (
//     // <IndemniteLegale
//     //   result={
//     //     result.result.value
//     //       ? (Number(result.result.value) + 0.004).toLocaleString("fr-FR", {
//     //           minimumFractionDigits: 2,
//     //           maximumFractionDigits: 2,
//     //         })
//     //       : "0"
//     //   }
//     //   unit={result.result.unit?.denominators[0] ?? "€"}
//     //   infoCalcul={infoCalcul}
//     // />
//     <></>
//   );
// };

// export default StepIndemnite;
