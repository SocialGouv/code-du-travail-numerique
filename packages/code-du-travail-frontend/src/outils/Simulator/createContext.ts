import { createContext } from "react";
import { StoreApi, useStore } from "zustand";
import { SimulatorStore } from "./type";

const SimulatorContext = createContext<StoreApi<SimulatorStore>>(
  {} as StoreApi<SimulatorStore>
);

const { Provider } = SimulatorContext;

export {
  Provider as SimulatorStepProvider,
  useStore as useSimulatorStepStore,
  SimulatorContext,
};
