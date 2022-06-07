import { deepEqualObject } from "../../../lib";
import { StoreSlice } from ".";
import { differenceInMonths, format, isAfter } from "date-fns";
import { parse } from "../../common/utils";
import { Absence, MOTIFS } from "../components/AbsencePeriods";

type AncienneteStoreData = {
  dateEntree?: string;
  dateSortie?: string;
  dateNotification?: string;
  errorDateSortie?: string;
  errorDateNotification?: string;
  absencePeriods: Absence[];
  hasBeenSubmitStepAnciennete: boolean;
  isStepAncienneteValid: boolean;
  hasAbsenceProlonge?: "oui" | "non";
  errorAbsenceProlonge?: string;
  errorDateEntree?: string;
};

type AncienneteStoreFn = {
  onChangeDateEntree: (value: string) => void;
  onChangeDateSortie: (value: string) => void;
  onChangeDateNotification: (value: string) => void;
  onChangeAbsencePeriods: (value: typeof initialState.absencePeriods) => void;
  onValidateStepAnciennete: () => boolean;
  onChangeHasAbsenceProlonge: (
    value: typeof initialState.hasAbsenceProlonge
  ) => void;
};

export type AncienneteStoreSlice = AncienneteStoreData & AncienneteStoreFn;

const initialState: AncienneteStoreData = {
  hasBeenSubmitStepAnciennete: false,
  isStepAncienneteValid: true,
  absencePeriods: [
    {
      motif: MOTIFS[0].label,
      durationInMonth: null,
    },
  ],
};

export const createAncienneteStore: StoreSlice<AncienneteStoreSlice> = (
  set,
  get
) => ({
  ...initialState,
  onChangeDateEntree: (value) => {
    if (get().hasBeenSubmitStepAnciennete) {
      const { isValid, newState } = validateStep({
        ...get(),
        dateEntree: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepAncienneteValid: isValid,
        dateEntree: value,
      }));
    } else {
      set(() => ({ dateEntree: value }));
    }
  },
  onChangeDateSortie: (value) => {
    if (get().hasBeenSubmitStepAnciennete) {
      const { isValid, newState } = validateStep({
        ...get(),
        dateSortie: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepAncienneteValid: isValid,
        dateSortie: value,
      }));
    } else {
      set(() => ({ dateSortie: value }));
    }
  },
  onChangeDateNotification: (value) => {
    if (get().hasBeenSubmitStepAnciennete) {
      const { isValid, newState } = validateStep({
        ...get(),
        dateNotification: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepAncienneteValid: isValid,
        dateNotification: value,
      }));
    } else {
      set(() => ({ dateNotification: value }));
    }
  },
  onChangeAbsencePeriods: (value) => {
    set(() => ({ absencePeriods: value }));
  },
  onChangeHasAbsenceProlonge: (
    value: typeof initialState.hasAbsenceProlonge
  ) => {
    if (get().hasBeenSubmitStepAnciennete) {
      const { isValid, newState } = validateStep({
        ...get(),
        hasAbsenceProlonge: value,
        absencePeriods:
          value === "non" ? initialState.absencePeriods : get().absencePeriods,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepAncienneteValid: isValid,
        hasAbsenceProlonge: value,
        absencePeriods:
          value === "non" ? initialState.absencePeriods : get().absencePeriods,
      }));
    } else {
      set(() => ({
        hasAbsenceProlonge: value,
        absencePeriods:
          value === "non" ? initialState.absencePeriods : get().absencePeriods,
      }));
    }
  },
  onValidateStepAnciennete: () => {
    const { isValid, newState } = validateStep(get());
    set((state) => ({
      ...state,
      ...newState,
      hasBeenSubmitStepAnciennete: true,
      isStepAncienneteValid: isValid,
    }));
    return isValid;
  },
});

const validateStep = (state: AncienneteStoreData) => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dNotification = parse(state.dateNotification);
  const absencePeriods = state.absencePeriods;
  let errors: Partial<AncienneteStoreData> = {};

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
    newState: errors,
  };
};
