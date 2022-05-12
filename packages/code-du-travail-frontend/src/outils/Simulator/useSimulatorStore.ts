import create from "zustand";

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

const initialState = {
  currentStepIndex: 0,
};

export const useSimulatorStore = create<
  SimulatorState<string> & SimulatorActions
>((set) => ({
  ...initialState,
  nextStep: () =>
    set((state) => ({
      ...state,
      currentStepIndex: state.currentStepIndex + 1,
    })),
  previousStep: () =>
    set((state) => {
      return {
        ...state,
        currentStepIndex: state.currentStepIndex - 1,
      };
    }),
}));
