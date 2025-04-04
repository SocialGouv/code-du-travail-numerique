export type Step<T extends string> = {
  name: T;
  label: string;
  Component: () => JSX.Element;
  options?: {
    isForm?: boolean;
    annotation?: JSX.Element;
    hasNoMarginBottom?: boolean;
    validate?: (data) => any;
  };
};

export enum ValidationResponse {
  NotValid = "not_valid",
  NotEligible = "not_eligible",
  Valid = "valid",
}

export type StepChange<T extends string> = {
  onNextStep?: () => ValidationResponse;
  onPrevStep?: () => void;
  stepName: T;
  isStepValid?: boolean;
};
