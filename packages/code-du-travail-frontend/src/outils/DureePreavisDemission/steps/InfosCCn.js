import { StepInfoCCn as StepInfoCCnComponent } from "../../common/InfosCCn";

StepInfoCCnComponent.validate = values => {
  const errors = {};
  if (Object.keys(values).length === 0) {
    errors.ccn = "Veuillez renseigner votre convention collective ?";
  }
  return errors;
};

export const StepInfoCCn = StepInfoCCnComponent;
