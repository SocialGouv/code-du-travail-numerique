import createContext from "zustand/context";
import { StoreApi } from "zustand";
import { SimulatorStore } from "./type";

const { Provider, useStore } = createContext<StoreApi<SimulatorStore>>();

export { Provider as SimulatorStepProvider, useStore as useSimulatorStepStore };
