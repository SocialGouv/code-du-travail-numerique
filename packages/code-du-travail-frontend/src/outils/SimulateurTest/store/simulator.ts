import Engine from "publicodes";
import create, { GetState, SetState } from "zustand";

import { rules } from "../mock/rules";

const engine = new Engine(rules);

type State = {
  carrotPrice: string;
  mushroomPrice: string;
  publiResult: any;
};

engine.setSituation();

export const useSimulatorStore = create(
  (set: SetState<State>, get: GetState<State>) => ({
    calculateSituation: () => {
      const situation = engine.setSituation({
        "prix . carottes": get().carrotPrice,
        "prix . champignons": get().mushroomPrice,
      });
      const result = situation.evaluate("dépenses primeur");
      set((state) => ({ ...state, publiResult: result }));
    },
    carrotPrice: "2€/kg",
    mushroomPrice: "5€/kg",
    onSetCarrotPrice: (price: string) =>
      set((state) => ({ ...state, carrotPrice: price })),
    onSetMushRoomPrice: (price: string) =>
      set((state) => ({ ...state, mushroomPrice: price })),
    publiResult: {},
  })
);
