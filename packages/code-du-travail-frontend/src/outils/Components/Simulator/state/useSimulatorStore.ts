import create from "zustand";

export type Step = {
  name: string;
  label: string;
  Component: () => JSX.Element;
};

export type SimulatorState = {
  currentStepIndex: number;
};

export type SimulatorActions = {
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
};

const initialState = {
  currentStepIndex: 0,
};

export const useSimulatorStore = create<SimulatorState & SimulatorActions>(
  (set) => ({
    ...initialState,
    nextStep: () =>
      set((state) => ({
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
      })),
    previousStep: () =>
      set((state) => ({
        ...state,
        currentStepIndex: state.currentStepIndex - 1,
      })),
    reset: () => set(() => initialState),
  })
);
