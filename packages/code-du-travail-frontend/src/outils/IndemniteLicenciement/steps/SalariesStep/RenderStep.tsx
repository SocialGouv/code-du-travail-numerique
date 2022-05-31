import React from "react";
import { useIndemniteLicenciementStore } from "../../state";

import SalariesStep from "./Step";
import { useForm } from "react-final-form";

function RenderSalariesStep(): JSX.Element {
  const { salaryPeriods, onHasSameSalaryChange, onSalariesChange } =
    useIndemniteLicenciementStore((state) => ({
      salaryPeriods: state.steps.salaries.salaryPeriods,
      onHasSameSalaryChange: state.onHasSameSalaryChange,
      onSalariesChange: state.onSalariesChange,
    }));
  const form = useForm();
  return (
    <SalariesStep
      salaryPeriods={salaryPeriods}
      onSalariesChange={(value, index) => onSalariesChange(value, index, form)}
      onHasSameSalaryChange={onHasSameSalaryChange}
    />
  );
}

export default RenderSalariesStep;
