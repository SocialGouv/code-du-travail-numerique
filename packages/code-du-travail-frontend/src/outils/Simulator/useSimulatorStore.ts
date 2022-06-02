import create from "zustand";
import { SimulatorState, SimulatorStore } from "./type";

const initialState: SimulatorState = {
  currentStepIndex: 0,
};

export const createSimulatorStore = () =>
  create<SimulatorStore>((set) => ({
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
