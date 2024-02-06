import produce from "immer";
import { StoreSlice } from "../types";

type CommonSituationStoreData = {
  situation: Record<string, string>;
};

type CommonSituationStoreFn = {
  onSituationChange: (key: string, value: string) => void;
};

export type CommonSituationStoreSlice = {
  situationData: CommonSituationStoreData;
  situationFunction: CommonSituationStoreFn;
};

const initialState: CommonSituationStoreData = {
  situation: {},
};

export const createCommonSituationStore: StoreSlice<
  CommonSituationStoreSlice
> = (set) => ({
  situationData: {
    ...initialState,
  },
  situationFunction: {
    onSituationChange(key, value) {
      set(
        produce((state: CommonSituationStoreSlice) => {
          state.situationData.situation[key] = value;
        })
      );
    },
  },
});
