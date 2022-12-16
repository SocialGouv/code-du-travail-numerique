import create from "zustand";
import { SimulatorState, SimulatorStore } from "./type";

const initialState: SimulatorState = {
  currentStepIndex: 0,
  previousStepIndex: [],
};

export const createSimulatorStore = () =>
  create<SimulatorStore>((set) => ({
    ...initialState,
    nextStep: (stepIndex?: number) =>
      set((state) => ({
        ...state,
        previousStepIndex: [...state.previousStepIndex, state.currentStepIndex],
        currentStepIndex: stepIndex ?? state.currentStepIndex + 1,
      })),
    previousStep: () =>
      set((state) => {
        const lastIndex = state.previousStepIndex.pop();
        return {
          ...state,
          currentStepIndex: lastIndex,
        };
      }),
  }));
