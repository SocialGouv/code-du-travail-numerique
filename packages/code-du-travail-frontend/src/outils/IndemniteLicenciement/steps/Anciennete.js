import { differenceInMonths, format, isAfter } from "date-fns";
import React from "react";

import { ErrorComputedField } from "../../common/ErrorField";
import { SectionTitle } from "../../common/stepStyles";
import { TextQuestion } from "../../common/TextQuestion";
import { parse } from "../../common/utils/";
import { isDate } from "../../common/validators";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { AbsencePeriods, MOTIFS } from "../components/AbsencePeriods";
import { useForm } from "react-final-form";

function validate({
  dateEntree,
  dateSortie,
  dateNotification,
  absencePeriods = [],
}) {
  const errors = {};
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);
  const dNotification = parse(dateNotification);

  if (dateEntree && dateSortie && isAfter(dEntree, dSortie)) {
    errors.dateSortie = (
      <>
        La date de sortie doit se situer après le
        <strong> {format(dEntree, "dd MMMM yyyy")}</strong>
      </>
    );
  }

  const totalAbsence =
    (absencePeriods || [])
      .filter((period) => Boolean(period.duration))
      .reduce((total, item) => {
        const motif = MOTIFS.find((motif) => motif.label === item.type);
        return total + item.duration * motif.value;
      }, 0) / 12;

  if (
    dateEntree &&
    dNotification &&
    differenceInMonths(dNotification, dEntree) - totalAbsence < 8
  ) {
    errors.anciennete =
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté";
  }

  if (dNotification && differenceInMonths(new Date(), dNotification) > 18) {
    errors.dateNotification =
      "La date de notification doit se situer dans les 18 derniers mois";
  }
  if (dateNotification && dateSortie && isAfter(dNotification, dSortie)) {
    errors.dateNotification =
      "La date de notification doit se situer avant la date de sortie";
  }
  if (dateNotification && dateEntree && isAfter(dEntree, dNotification)) {
    errors.dateNotification =
      "La date de notification doit se situer après la date d’entrée";
  }
  return errors;
}

const StepAnciennete = () => {
  const form = useForm();
  return (
    <>
      <SectionTitle>Dates d’entrée et de sortie de l’entreprise</SectionTitle>
      <TextQuestion
        name="dateEntree"
        label="Quelle est la date d’entrée dans l’entreprise&nbsp;?"
        inputType="date"
        validate={isDate}
        placeholder=" jj/mm/yyyy" // placeholder for safari desktop which does not support input type date
      />
      <TextQuestion
        name="dateNotification"
        label="Quelle est la date de notification du licenciement&nbsp;?"
        inputType="date"
        validate={isDate}
        validateOnChange
        placeholder=" jj/mm/yyyy" // placeholder for safari desktop which does not support input type date
      />
      <TextQuestion
        name="dateSortie"
        label="Quelle est la date de sortie de l’entreprise&nbsp;?"
        inputType="date"
        validate={isDate}
        validateOnChange
        placeholder=" jj/mm/yyyy" // placeholder for safari desktop which does not support input type date
      />
      <ErrorComputedField name="anciennete" />
      <SectionTitle>Période d’absence prolongée</SectionTitle>
      <YesNoQuestion
        name="hasAbsenceProlonge"
        label="Y a-t-il eu des absences de plus d’un mois durant le contrat de travail&nbsp;?"
        onChange={(hasAbsenceProlonge) => {
          hasAbsenceProlonge
            ? form.change("absencePeriods", [
                {
                  duration: null,
                  type: "Absence pour maladie non professionnelle",
                },
              ])
            : form.change("absencePeriods", []);
        }}
      />
      <AbsencePeriods name="absencePeriods" />
    </>
  );
};

StepAnciennete.validate = validate;

export default StepAnciennete;
