import React, { useContext } from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";

const StepSeniority = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const {
    moreThanTwoYears,
    onChangeMoreThanTwoYears,
    errorMoreThanTwoYears,
    seniorityInMonths,
    onChangeSeniorityInMonths,
    errorSeniorityInMonths,
  } = usePreavisRetraiteStore(store, (state) => ({
    moreThanTwoYears: state.seniorityData.input.moreThanTwoYears,
    onChangeMoreThanTwoYears: state.seniorityFunction.onChangeMoreThanTwoYears,
    errorMoreThanTwoYears: state.seniorityData.error.errorMoreThanTwoYears,
    seniorityInMonths: state.seniorityData.input.seniorityInMonths,
    onChangeSeniorityInMonths:
      state.seniorityFunction.onChangeSeniorityInMonths,
    errorSeniorityInMonths: state.seniorityData.error.errorSeniorityInMonths,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "moreThanTwoYears-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "moreThanTwoYears-non",
          },
        ]}
        name="moreThanTwoYears"
        label="Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)&nbsp;?"
        selectedOption={moreThanTwoYears}
        onChangeSelectedOption={onChangeMoreThanTwoYears}
        error={errorMoreThanTwoYears}
        showRequired
        autoFocus
        tooltip={{
          content: (
            <p>
              L&apos;ancienneté du salarié est habituellement mentionnée sur le{" "}
              <b>bulletin de salaire</b>.
            </p>
          ),
        }}
      />
      {moreThanTwoYears === "non" && (
        <TextQuestion
          label="Quelle est l'ancienneté du salarié dans l'entreprise en mois&nbsp;?"
          value={seniorityInMonths}
          onChange={onChangeSeniorityInMonths}
          error={errorSeniorityInMonths}
          id="seniorityInMonths"
          showRequired
          dataTestId={"seniority-months"}
        />
      )}
    </>
  );
};

export default StepSeniority;
