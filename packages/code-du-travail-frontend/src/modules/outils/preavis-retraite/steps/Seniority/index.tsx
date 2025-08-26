import React, { useContext } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { getSeniorityMessageQuestion } from "../../agreements/seniority/messages";

const StepSeniority = () => {
  const store = useContext(PreavisRetraiteContext);

  const {
    moreThanXYears,
    onChangeMoreThanXYears,
    errorMoreThanXYears,
    seniorityInMonths,
    onChangeSeniorityInMonths,
    errorSeniorityInMonths,
    agreement,
  } = usePreavisRetraiteStore(store, (state) => ({
    moreThanXYears: state.seniorityData.input.moreThanXYears,
    onChangeMoreThanXYears: state.seniorityFunction.onChangeMoreThanXYears,
    errorMoreThanXYears: state.seniorityData.error.errorMoreThanXYears,
    seniorityInMonths: state.seniorityData.input.seniorityInMonths,
    onChangeSeniorityInMonths:
      state.seniorityFunction.onChangeSeniorityInMonths,
    errorSeniorityInMonths: state.seniorityData.error.errorSeniorityInMonths,
    agreement: state.agreementData.input.agreement,
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
        label={getSeniorityMessageQuestion(agreement?.num)}
        selectedOption={moreThanXYears}
        onChangeSelectedOption={onChangeMoreThanXYears}
        error={errorMoreThanXYears}
        autoFocus
        subLabel="L'ancienneté du salarié est habituellement mentionnée sur le bulletin de salaire."
      />
      {moreThanXYears === "non" && (
        <TextQuestion
          label="Quelle est l'ancienneté du salarié dans l'entreprise en mois&nbsp;?"
          value={seniorityInMonths}
          onChange={onChangeSeniorityInMonths}
          error={errorSeniorityInMonths}
          id="seniorityInMonths"
          dataTestId={"seniority-months"}
          inputType="number"
        />
      )}
    </>
  );
};

export default StepSeniority;
