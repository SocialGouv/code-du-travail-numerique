import { ValidationResponse } from "../../../../Components/SimulatorLayout";

export type IntroductionStoreFn = {
  onNextStep: () => ValidationResponse;
};

export type IntroductionStoreSlice = {
  introductionFunction: IntroductionStoreFn;
};
