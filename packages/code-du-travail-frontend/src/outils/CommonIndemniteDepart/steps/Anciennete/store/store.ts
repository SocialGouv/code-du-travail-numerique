import produce from "immer";
import { StoreApi } from "zustand";
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { StoreSlice } from "../../../../types";
import { SalairesStoreSlice } from "../../Salaires/store";
import * as Sentry from "@sentry/nextjs";
import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import {
  Absence,
  getSupportedAgreement,
  PublicodesSimulator,
  SeniorityFactory,
  SupportedCc,
} from "@socialgouv/modeles-social";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { customSeniorityValidator } from "../../../agreements/seniority";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
    motifs: [],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<
  AncienneteStoreSlice,
  SalairesStoreSlice &
    CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    init: () => {
      const selectedAgreementIdcc = get().agreementData.input.agreement?.num;
      const idcc = selectedAgreementIdcc
        ? getSupportedAgreement(selectedAgreementIdcc)
        : SupportedCc.default;
      const motifs = new SeniorityFactory()
        .create(idcc ?? SupportedCc.default)
        .getMotifs();
      set(
        produce(
          (state: AncienneteStoreSlice & CommonInformationsStoreSlice) => {
            state.ancienneteData.input.absencePeriods = cleanAbsence(
              get().ancienneteData.input.absencePeriods,
              get(),
              idcc ?? undefined
            );
            state.ancienneteData.input.motifs = motifs;
          }
        )
      );
      applyGenericValidation(
        get,
        set,
        "dateEntree",
        get().ancienneteData.input.dateEntree
      );
    },
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
      const absence = cleanAbsence(value, get());
      applyGenericValidation(get, set, "absencePeriods", absence);
    },
    onChangeHasAbsenceProlonge: (value) => {
      if (value === "non") {
        set(
          produce((state: AncienneteStoreSlice) => {
            state.ancienneteData.input.absencePeriods =
              initialState.input.absencePeriods;
          })
        );
      } else {
        const selectedAgreementIdcc = get().agreementData.input.agreement?.num;
        const idcc = selectedAgreementIdcc
          ? getSupportedAgreement(selectedAgreementIdcc)
          : SupportedCc.default;
        const motifs = new SeniorityFactory()
          .create(idcc ?? SupportedCc.default)
          .getMotifs();

        set(
          produce((state: AncienneteStoreSlice) => {
            state.ancienneteData.input.absencePeriods =
              get().ancienneteData.input.absencePeriods;
            state.ancienneteData.input.motifs = motifs;
          })
        );
      }
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
    },
    onNextStep: () => {
      const { isValid, errorState } = customSeniorityValidator(
        get().ancienneteData.input,
        get().contratTravailData.input,
        get().informationsData.input,
        get().agreementData.input.agreement
      );
      let errorEligibility;

      if (isValid) {
        try {
          const publicodes = get().agreementData.publicodes;
          const infos = informationToSituation(
            get().informationsData.input.publicodesInformations
          );
          const { licenciementInaptitude, arretTravail } =
            get().contratTravailData.input;
          const { dateEntree, dateNotification, dateSortie, absencePeriods } =
            get().ancienneteData.input;
          const situation = {
            ...get().situationData.situation,
            ...infos,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              dateEntree,
            "contrat salarié . indemnité de licenciement . date de notification":
              dateNotification,
            "contrat salarié . indemnité de licenciement . date de sortie":
              dateSortie,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              licenciementInaptitude,
            "contrat salarié . indemnité de licenciement . arrêt de travail":
              arretTravail,
            absencePeriods:
              absencePeriods && absencePeriods.length
                ? JSON.stringify(absencePeriods)
                : undefined,
          };
          const result = publicodes.calculate(situation);
          if (result.type === "ineligibility") {
            errorEligibility = result.ineligibility;
          }
        } catch (e) {
          console.error(e);
          Sentry.captureException(e);
        }
      }

      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = !isValid;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
          state.ancienneteData.error.errorEligibility = errorEligibility;
        })
      );
      return errorEligibility
        ? ValidationResponse.NotEligible
        : isValid
        ? ValidationResponse.Valid
        : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
      CommonInformationsStoreSlice &
      ContratTravailStoreSlice
  >["getState"],
  set: StoreApi<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
      CommonInformationsStoreSlice &
      ContratTravailStoreSlice
  >["setState"],
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName as string] = value;
    });

    const { isValid, errorState } = customSeniorityValidator(
      nextState.ancienneteData.input,
      nextState.contratTravailData.input,
      get().informationsData.input,
      get().agreementData.input.agreement
    );
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.error = errorState;
        state.ancienneteData.isStepValid = isValid;
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  }
};

const cleanAbsence = (
  absencePeriods: Absence[],
  data: CommonInformationsStoreSlice,
  idcc: SupportedCc | undefined = undefined
): Absence[] => {
  if (idcc) {
    // clean absence
    const motifs = new SeniorityFactory().create(idcc).getMotifs();
    absencePeriods = absencePeriods.filter((absence) =>
      motifs.some((motif) => motif.key === absence.motif.key)
    );
  }
  return absencePeriods.map((absence) => {
    const dateRequired = absence.motif.startAt
      ? absence.motif.startAt(
          informationToSituation(
            data.informationsData.input.publicodesInformations
          )
        )
      : false;
    return {
      ...absence,
      startedAt: dateRequired ? absence.startedAt : undefined,
    };
  });
};

export default createAncienneteStore;
