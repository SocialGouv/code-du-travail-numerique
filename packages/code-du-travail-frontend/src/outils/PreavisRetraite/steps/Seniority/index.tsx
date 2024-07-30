import React, { useContext } from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { getSeniorityMessageQuestion } from "../../agreements/seniority/messages";

const StepSeniority = (): JSX.Element => {
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
          inputType="number"
        />
      )}
    </>
  );
};

export default StepSeniority;
