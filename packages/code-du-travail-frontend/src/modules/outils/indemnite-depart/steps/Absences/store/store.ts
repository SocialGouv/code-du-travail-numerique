import { produce } from "immer";
import { StoreApi } from "zustand";
import { StoreSlice } from "../../../types";
import { SalairesStoreSlice } from "../../Salaires/store";
import * as Sentry from "@sentry/nextjs";
import {
  AbsenceStoreData,
  AbsenceStoreInput,
  AbsenceStoreSlice,
} from "./types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import {
  Absence,
  getSupportedAgreement,
  PublicodesSimulator,
  SeniorityFactory,
  SupportedCc,
} from "@socialgouv/modeles-social";
import { informationToSituation } from "../../Informations/components/utils";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { CommonSituationStoreSlice } from "../../../situationStore";
import { AncienneteStoreSlice } from "../../Anciennete";

const initialState: AbsenceStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
    motifs: [],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<
  AbsenceStoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
    CommonInformationsStoreSlice &
    CommonSituationStoreSlice
> = (set, get, { type }) => ({
  absenceData: { ...initialState },
  absenceFunction: {
    init: () => {
      const selectedAgreementIdcc = get().agreementData.input.agreement?.num;
      const idcc = selectedAgreementIdcc
        ? getSupportedAgreement(selectedAgreementIdcc)
        : SupportedCc.default;
      const motifs = new SeniorityFactory()
        .create(idcc ?? SupportedCc.default)
        .getMotifs();
      set(
        produce((state: AbsenceStoreSlice & CommonInformationsStoreSlice) => {
          state.absenceData.input.absencePeriods = cleanAbsence(
            get().absenceData.input.absencePeriods,
            get(),
            idcc ?? undefined
          );
          state.absenceData.input.motifs = motifs;
        })
      );
      return type;
    },
    onChangeArretTravail: (value) => {
      applyGenericValidation(get, set, "arretTravail", value);
      applyGenericValidation(get, set, "dateArretTravail", undefined);
    },
    onChangeDateArretTravail: (value) => {
      applyGenericValidation(get, set, "dateArretTravail", value);
    },
    onChangeAbsencePeriods: (value) => {
      const absence = cleanAbsence(value, get());
      applyGenericValidation(get, set, "absencePeriods", absence);
      get().ancienneteFunction.updateAncienneteEstimee();
    },
    onChangeHasAbsenceProlonge: (value) => {
      if (value === "non") {
        set(
          produce((state: AbsenceStoreSlice) => {
            state.absenceData.input.absencePeriods =
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
          produce((state: AbsenceStoreSlice) => {
            state.absenceData.input.absencePeriods =
              get().absenceData.input.absencePeriods;
            state.absenceData.input.motifs = motifs;
          })
        );
      }
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
    },
    onNextStep: () => {
      const { isValid, errorState } = validateStep(
        get().absenceData.input,
        get().ancienneteData.input,
        get().informationsData.input
      );
      let errorEligibility;

      if (isValid) {
        try {
          const publicodes = get().agreementData.publicodes;
          const infos = informationToSituation(
            get().informationsData.input.publicodesInformations
          );

          const { dateEntree, dateNotification, dateSortie } =
            get().ancienneteData.input;
          const { arretTravail, absencePeriods } = get().absenceData.input;
          const situation = {
            ...get().situationData.situation,
            ...infos,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              dateEntree,
            "contrat salarié . indemnité de licenciement . date de notification":
              dateNotification,
            "contrat salarié . indemnité de licenciement . date de sortie":
              dateSortie,
            "contrat salarié . indemnité de licenciement . arrêt de travail":
              arretTravail,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              get().informationsData.input.licenciementInaptitude,
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
          set(
            produce((state: AbsenceStoreSlice) => {
              state.absenceData.error.errorPublicodes =
                "Une erreur liée au moteur de calcul nous empêche de continuer la simulation. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste.";
            })
          );
          return ValidationResponse.NotValid;
        }
      }

      set(
        produce((state: AbsenceStoreSlice) => {
          state.absenceData.hasBeenSubmit = !isValid;
          state.absenceData.isStepValid = isValid;
          state.absenceData.error = errorState;
          state.absenceData.error.errorEligibility = errorEligibility;
          state.absenceData.error.errorPublicodes = undefined;
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
    AbsenceStoreSlice &
      AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
      CommonInformationsStoreSlice
  >["getState"],
  set: StoreApi<
    AbsenceStoreSlice &
      AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
      CommonInformationsStoreSlice
  >["setState"],
  paramName: keyof AbsenceStoreInput,
  value: any
) => {
  if (get().absenceData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.absenceData.input[paramName as string] = value;
    });

    const { isValid, errorState } = validateStep(
      nextState.absenceData.input,
      get().ancienneteData.input,
      get().informationsData.input
    );
    set(
      produce((state: AbsenceStoreSlice) => {
        state.absenceData.error = errorState;
        state.absenceData.isStepValid = isValid;
        state.absenceData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: AbsenceStoreSlice) => {
        state.absenceData.input[paramName as string] = value;
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
