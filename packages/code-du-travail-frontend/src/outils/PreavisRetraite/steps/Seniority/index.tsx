import React, { useContext } from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";

const StepSeniority = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const {
    moreThanXYears,
    onChangeMoreThanXYears,
    errorMoreThanXYears,
    seniorityInMonths,
    onChangeSeniorityInMonths,
    errorSeniorityInMonths,
  } = usePreavisRetraiteStore(store, (state) => ({
    moreThanXYears: state.seniorityData.input.moreThanXYears,
    onChangeMoreThanXYears: state.seniorityFunction.onChangeMoreThanXYears,
    errorMoreThanXYears: state.seniorityData.error.errorMoreThanXYears,
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
            id: "moreThanXYears-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "moreThanXYears-non",
          },
        ]}
        name="moreThanXYears"
        label="Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour)&nbsp;?"
        selectedOption={moreThanXYears}
        onChangeSelectedOption={onChangeMoreThanXYears}
        error={errorMoreThanXYears}
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
      {moreThanXYears === "non" && (
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
