import { push as matopush } from "@socialgouv/matomo-next";
import { StoreSlice } from "../../../../types";
import { IntroductionStoreSlice } from "./types";
import { IndemniteLicenciementStepName } from "../../..";
import { MatomoBaseEvent } from "../../../../../lib";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";

const createIntroductionStore: StoreSlice<IntroductionStoreSlice> = (
  set,
  get,
  { toolName }
) => ({
  introductionFunction: {
    onNextStep: () => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        "outil",
        `view_step_${toolName}`,
        IndemniteLicenciementStepName.Introduction,
      ]);
      return ValidationResponse.Valid;
    },
  },
});

export default createIntroductionStore;
