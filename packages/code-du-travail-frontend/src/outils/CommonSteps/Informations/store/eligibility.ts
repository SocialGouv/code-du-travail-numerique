import { CommonInformationsStoreInput } from "./types";

export const getErrorEligibility = (state: CommonInformationsStoreInput) => {
  return state.blockingNotification;
};
