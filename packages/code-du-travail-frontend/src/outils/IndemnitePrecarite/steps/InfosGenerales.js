import { primePrecariteData as data } from "@socialgouv/modeles-social";
import React from "react";
import { Field } from "react-final-form";

import { SelectQuestion } from "../../common/SelectQuestion";
import {
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  getSituationsFor,
} from "../../common/situations.utils";
import { CONTRACT_TYPE, TypeContrat } from "../components/TypeContrat";
import { StepCDD } from "./CDD";
import { StepCTT } from "./CTT";
import {
  criteriaOrder,
  hasConventionalProvision,
  questions,
  validateSituation,
} from "./situation";

const excludeContracts = [
  "CDD saisonnier",
  "CDD conclu avec un jeune (mineur ou majeur) pendant ses vacances scolaires ou universitaires",
  "CCD dans le cadre d’un congé de mobilité",
  "Contrat unique d’insertion (CUI) ou Parcours emploi compétences (PEC)",
  "Contrat de professionnalisation ou Contrat d’apprentissage",
  "Contrat pour lequel l’employeur s’est engagé à assurer un complément de formation professionnelle au salarié",
];

function StepInfosGenerales({ form }) {
  const { values } = form.getState();
  const idcc = values.ccn?.selected ? values.ccn.selected.num : "0";
  const initialSituations = getSituationsFor(data, { idcc });
  const pastQuestions = getPastQuestions(
    initialSituations,
    criteriaOrder,
    values.criteria
  );

  const situations = filterSituations(initialSituations, values.criteria);
  const nextQuestionKey = getNextQuestionKey(
    situations,
    criteriaOrder,
    values.criteria
  );
  let nextQuestionOptions = getOptions(situations, nextQuestionKey);

  function concatenateCddType(additionnalTypes) {
    return additionnalTypes
      .filter(([a]) => !excludeContracts.find((label) => a === label))
      .concat(excludeContracts.map((a) => [a, a]));
  }

  // update cddType list
  if (nextQuestionKey === "cddType") {
    nextQuestionOptions = concatenateCddType(nextQuestionOptions);
  }

  // update cddType in pastQuestions
  const cddTypeTuple = pastQuestions.find(
    ([questionKey]) => questionKey === "cddType"
  );
  if (cddTypeTuple) {
    cddTypeTuple[1] = concatenateCddType(cddTypeTuple[1]);
  }

  return (
    <>
      <TypeContrat
        name="contractType"
        onChange={() => {
          if (values) {
            form.change("criteria", {});
            Object.keys(values).forEach((key) => {
              if (
                [
                  "cttFormation",
                  "propositionCDIFindeContrat",
                  "propositionCDIFinContrat",
                  "refusSouplesse",
                  "ruptureContratFauteGrave",
                  "cttFormation",
                  "finContratPeriodeDessai",
                  "interruptionFauteGrave",
                  "refusCDIFindeContrat",
                  "refusRenouvellementAuto",
                ].indexOf(key) !== -1
              ) {
                form.change(key, undefined);
              }
            });
          }
        }}
      />
      <Field name="contractType">
        {({ input }) => {
          switch (input.value) {
            case CONTRACT_TYPE.CDD:
              if (
                values.ccn?.selected &&
                hasConventionalProvision(data, values.ccn.selected.num)
              ) {
                return (
                  <>
                    {pastQuestions.map(([key, answers]) => (
                      <SelectQuestion
                        key={key}
                        name={`criteria.${key}`}
                        options={answers}
                        label={questions[key]}
                        onChange={() => {
                          form.batch(() => {
                            // list keys that no longer exist
                            const resetFormProps = Object.keys(values.criteria)
                              .filter(
                                (k) => !pastQuestions.find(([key]) => k === key)
                              )
                              .concat(
                                // list keys that need to be reseted
                                pastQuestions
                                  .slice(
                                    pastQuestions.findIndex(
                                      ([k]) => k === key
                                    ) + 1
                                  )
                                  .map(([key]) => key)
                              );
                            resetFormProps.forEach((key) =>
                              form.change(`criteria.${key}`, undefined)
                            );
                          });
                        }}
                      />
                    ))}
                    {nextQuestionKey && nextQuestionOptions && (
                      <SelectQuestion
                        name={`criteria.${nextQuestionKey}`}
                        label={questions[nextQuestionKey]}
                        options={nextQuestionOptions}
                      />
                    )}
                    {values.criteria &&
                      values.criteria.cddType === "Autres" && <StepCDD />}
                  </>
                );
              }
              return (
                <>
                  <SelectQuestion
                    name="criteria.cddType"
                    options={excludeContracts.concat("Autres")}
                    label={questions.cddType}
                  />
                  {values.criteria && values.criteria.cddType === "Autres" && (
                    <StepCDD />
                  )}
                </>
              );
            case CONTRACT_TYPE.CTT:
              return (
                <>
                  <StepCTT />
                </>
              );
            default:
              return null;
          }
        }}
      </Field>
    </>
  );
}

function validate(values) {
  const idcc = values.ccn ? values.ccn.num : "0";
  const initialSituations = getSituationsFor(data, { idcc });

  const errors = {
    ...StepCDD.validate(values),
    ...StepCTT.validate(values),
  };
  // We need to performs these check before situation check
  // since situation Check can overwrite generals checks
  if (
    values?.ccn?.selected?.num === 3127 &&
    values?.criteria?.cddType ===
      "CDD dit de « mission ponctuelle ou occasionnelle »" &&
    values?.criteria?.hasEquivalentCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasEquivalentCdiRenewal:
        "Selon votre convention collective, lorsque le contrat de mission ponctuelle est transformé en CDI pour un poste et une durée équivalents, le salarié n’a pas le droit à une prime d'intervention.",
    };
  }
  if (
    values?.ccn?.selected?.num === 1486 &&
    values?.criteria?.cddType ===
      "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès" &&
    values?.criteria?.hasCdiProposal === "oui"
  ) {
    errors.criteria = {
      hasCdiProposal:
        "Selon votre convention collective, le salarié en contrat d'intervention qui, à l'issue de son contrat, a reçu une proposition d'un CDI, n’a pas le droit à une prime d'intervention.",
    };
  }
  if (
    values?.ccn?.selected?.num === 2511 &&
    values?.criteria?.cddType ===
      "CDD d'usage appelé contrat «d'intervention»" &&
    values?.criteria?.hasCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasCdiRenewal:
        "Selon votre convention collective, lorsque le contrat d'intervention est transformé en CDI, le salarié n’a pas le droit à une prime d'intervention.",
    };
  }
  if (
    values?.ccn?.selected?.num === 1516 &&
    values?.criteria?.cddType === "CDD d'usage" &&
    values?.criteria?.hasCdiRenewal === "oui"
  ) {
    errors.criteria = {
      hasCdiRenewal: `Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n’a pas le droit à une indemnité dite "d'usage".`,
    };
  }
  if (values.criteria && excludeContracts.includes(values.criteria.cddType)) {
    errors.criteria = {
      cddType:
        "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.",
    };
  }
  return {
    ...errors,
    ...validateSituation(initialSituations, values.criteria, errors),
  };
}

export { StepInfosGenerales };
StepInfosGenerales.validate = validate;
