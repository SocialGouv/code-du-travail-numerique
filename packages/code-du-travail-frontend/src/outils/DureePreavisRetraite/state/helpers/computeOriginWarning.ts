import { Origin, PreavisRetraiteStore } from "../index";

const computeOriginWarning = (
  state: PreavisRetraiteStore,
  type: Origin
): PreavisRetraiteStore => ({
  ...state,
  steps: {
    ...state.steps,
    origin: {
      showWarning: type === "mise",
    },
  },
});

export default computeOriginWarning;
