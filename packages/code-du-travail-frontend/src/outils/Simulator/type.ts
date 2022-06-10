export type Step<Name extends string> = {
  name: Name;
  label: string;
  Component: () => JSX.Element;
  options?: {
    isForm?: boolean;
    annotation?: JSX.Element;
    hasNoMarginBottom?: boolean;
  };
};

export type SimulatorState<StepName extends string> = {
  currentStepIndex: number;
};

export type SimulatorActions = {
  nextStep: () => void;
  previousStep: () => void;
};

export type SimulatorStore = SimulatorState<string> & SimulatorActions;
