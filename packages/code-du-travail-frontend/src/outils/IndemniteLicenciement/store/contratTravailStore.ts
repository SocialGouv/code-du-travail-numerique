import create from "zustand";
import { combine } from "zustand/middleware";
import { detectUndefinedOrFalseValuesOfObject } from "../utils";

type ContratTravailData = {
  typeContratTravail: "cdi" | "cdd" | undefined;
  licenciementFauteGrave: "oui" | "non" | undefined;
  licenciementInaptitude: "oui" | "non" | undefined;
  errorTypeContratTravail: string | undefined;
  errorLicenciementFauteGrave: string | undefined;
  errorLicenciementInaptitude: string | undefined;
  errorCdd: boolean;
  errorFauteGrave: boolean;
  hasError: boolean;
};

const initialState: ContratTravailData = {
  typeContratTravail: undefined,
  licenciementFauteGrave: undefined,
  licenciementInaptitude: undefined,
  errorTypeContratTravail: undefined,
  errorLicenciementFauteGrave: undefined,
  errorLicenciementInaptitude: undefined,
  errorCdd: false,
  errorFauteGrave: false,
  hasError: false,
};

export const useContratTravailStore = create(
  combine(initialState, (set, get) => ({
    onChangeTypeContratTravail: (
      value: typeof initialState.typeContratTravail
    ) => set(() => ({ typeContratTravail: value })),
    onChangeLicenciementFauteGrave: (
      value: typeof initialState.licenciementFauteGrave
    ) => set(() => ({ licenciementFauteGrave: value })),
    onChangeLicenciementInaptitude: (
      value: typeof initialState.licenciementInaptitude
    ) => set(() => ({ licenciementInaptitude: value })),
    onValidateStep: () => {
      const newState = {
        errorCdd: get().typeContratTravail === "cdd" ? true : false,
        errorFauteGrave: get().licenciementFauteGrave === "oui" ? true : false,
        errorLicenciementInaptitude: !get().licenciementInaptitude
          ? "Vous devez répondre à cette question"
          : undefined,
        errorLicenciementFauteGrave: !get().licenciementFauteGrave
          ? "Vous devez répondre à cette question"
          : undefined,
        errorTypeContratTravail: !get().typeContratTravail
          ? "Vous devez répondre à cette question"
          : undefined,
      };
      set((state) => ({
        ...state,
        ...newState,
        hasError: detectUndefinedOrFalseValuesOfObject(newState),
      }));
    },
  }))
);
