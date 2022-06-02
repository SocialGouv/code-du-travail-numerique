import { IndemniteLicenciementFormState } from "../form";
import {
  Publicodes,
  PublicodesIndemniteLicenciementResult,
} from "@socialgouv/modeles-social";
import { Step } from "../../Simulator";
import { StepName } from "..";
import { FormApi } from "final-form";

export type IndemniteLicenciementState = {
  title: string;
  steps: {
    salaries: {
      salaryPeriods?: string[];
    };
    result?: {
      result: PublicodesIndemniteLicenciementResult;
    };
  };
  formValues: IndemniteLicenciementFormState;
};

export type PublicodesState = {
  publicodes: Publicodes<PublicodesIndemniteLicenciementResult>;
};

export type StepValidator = {
  stepName: StepName;
  stepValidator: () => void;
};

export type IndemniteLicenciementActions = {
  onFormValuesChange: (values: IndemniteLicenciementFormState) => void;
  onStepChange: (
    oldStep: Step<StepName>,
    newStep: Step<StepName>,
    validators: StepValidator[]
  ) => void;
  onHasSameSalaryChange: (hasSameSalary: boolean) => void;
  onSalariesChange: (value: string, index: number, form: FormApi) => void;
};

export type IndemniteLicenciementStore = IndemniteLicenciementState &
  IndemniteLicenciementActions &
  PublicodesState;
