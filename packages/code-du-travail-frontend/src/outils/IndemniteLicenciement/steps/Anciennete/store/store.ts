import { differenceInMonths, format, isAfter } from "date-fns";
import produce from "immer";
import { GetState, SetState } from "zustand";
import { StoreSlice } from "../../../store";
import { deepEqualObject } from "../../../../../lib";
import { parse } from "../../../../common/utils";
import { MOTIFS } from "../components/AbsencePeriods";
import {
  AncienneteStoreData,
  AncienneteStoreError,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [
      {
        motif: MOTIFS[0].label,
        durationInMonth: null,
      },
    ],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<AncienneteStoreSlice> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    onChangeDateEntree: (value) => {
      applyGenericValidation(get, set, "dateEntree", value);
    },
    onChangeDateSortie: (value) => {
      applyGenericValidation(get, set, "dateSortie", value);
    },
    onChangeDateNotification: (value) => {
      applyGenericValidation(get, set, "dateNotification", value);
    },
    onChangeAbsencePeriods: (value) => {
      applyGenericValidation(get, set, "absencePeriods", value);
    },
    onChangeHasAbsenceProlonge: (value) => {
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.input.absencePeriods =
            value === "non"
              ? initialState.input.absencePeriods
              : get().ancienneteData.input.absencePeriods;
        })
      );
    },
    onValidateStepAnciennete: () => {
      const { isValid, errorState } = validateStep(get().ancienneteData.input);
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = true;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const validateStep = (state: AncienneteStoreInput) => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dNotification = parse(state.dateNotification);
  const absencePeriods = state.absencePeriods;
  let errors: AncienneteStoreError = {};

  const totalAbsence =
    absencePeriods
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        if (!item.durationInMonth) {
          return total;
        }
        const v =
          MOTIFS.find((motif) => motif.label === item.motif)?.value ?? 0;
        return total + item.durationInMonth * v;
      }, 0) / 12;

  // Date d'entrée
  if (!state.dateEntree) {
    errors.errorDateEntree = "Veuillez saisir cette date";
  } else {
    errors.errorDateEntree = undefined;
  }

  // Date de sortie
  if (!state.dateSortie) {
    errors.errorDateSortie = "Veuillez saisir cette date";
  } else if (
    state.dateEntree &&
    state.dateSortie &&
    isAfter(dEntree, dSortie)
  ) {
    errors.errorDateSortie = `La date de sortie doit se situer après le <strong> ${format(
      dEntree,
      "dd MMMM yyyy"
    )}</strong>`;
  } else if (
    state.dateEntree &&
    state.dateNotification &&
    differenceInMonths(dNotification, dEntree) - totalAbsence < 8
  ) {
    errors.errorDateSortie =
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté";
  } else {
    errors.errorDateSortie = undefined;
  }

  // Date de notification
  if (!state.dateNotification) {
    errors.errorDateNotification = "Veuillez saisir cette date";
  } else if (
    state.dateNotification &&
    differenceInMonths(new Date(), dNotification) > 18
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer dans les 18 derniers mois";
  } else if (
    state.dateNotification &&
    state.dateSortie &&
    isAfter(dNotification, dSortie)
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer avant la date de sortie";
  } else if (
    state.dateNotification &&
    state.dateEntree &&
    isAfter(dEntree, dNotification)
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer après la date d’entrée";
  } else {
    errors.errorDateNotification = undefined;
  }

  if (state.hasAbsenceProlonge === undefined) {
    errors.errorAbsenceProlonge = "Vous devez répondre à cette question";
  } else {
    errors.errorAbsenceProlonge = undefined;
  }

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorDateSortie: undefined,
      errorDateNotification: undefined,
      errorDateEntree: undefined,
    }),
    errorState: errors,
  };
};

const applyGenericValidation = (
  get: GetState<AncienneteStoreSlice>,
  set: SetState<AncienneteStoreSlice>,
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.ancienneteData.input
    );
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.error = errorState;
        state.ancienneteData.isStepValid = isValid;
      })
    );
  } else {
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.input[paramName] = value;
      })
    );
  }
};

export default createAncienneteStore;
