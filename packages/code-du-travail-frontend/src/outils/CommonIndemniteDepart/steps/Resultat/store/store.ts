import {
  Formula,
  Notification,
  PublicodesIndemniteLicenciementResult,
  PublicodesSimulator,
  References,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import { mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues } from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { isParentalNoticeHiddenForAgreement } from "../../../agreements/ui-customizations/messages";
import {
  AgreementInformation,
  hasNoBetterAllowance,
  hasNoLegalIndemnity,
} from "../../../common";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { getInfoWarning } from "./service";
import { IndemniteDepartStepName } from "../../..";
import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
} from "../../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import getSupportedCcIndemniteLicenciement from "../../../common/usecase/getSupportedCc";
import * as Sentry from "@sentry/nextjs";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";
import type { PublicodesData } from "@socialgouv/modeles-social/bin";

const initialState: ResultStoreData = {
  input: {
    legalFormula: { formula: "", explanations: [] },
    legalReferences: [],
    publicodesLegalResult: { value: "" },
    isAgreementBetter: false,
    isEligible: false,
    isParentalNoticeHidden: false,
  },
  error: {
    errorPublicodes: false,
  },
  hasBeenSubmit: true,
  isStepValid: true,
};

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    SalairesStoreSlice &
    CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
    CommonInformationsStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  resultData: {
    ...initialState,
  },
  resultFunction: {
    init: () => {
      const contratTravailEligibility =
        !get().contratTravailData.error.errorEligibility;
      const isCdd = get().contratTravailData.input.typeContratTravail === "cdd";
      const ancienneteEligibility =
        !get().ancienneteData.error.errorEligibility;
      const informationEligibility =
        !get().informationsData.error.errorEligibility;
      const agreement = get().agreementData.input.agreement;
      const hasSelectedAgreement =
        get().agreementData.input.route !== "not-selected";
      const isAgreementSupported =
        get().agreementData.input.isAgreementSupportedIndemniteLicenciement;

      const infoWarning = getInfoWarning({
        hasSelectedAgreement,
        isAgreementSupported,
        informationEligibility,
        contratTravailEligibility,
        ancienneteEligibility,
        isCdd,
        agreement,
      });
      const isEligible =
        contratTravailEligibility &&
        ancienneteEligibility &&
        informationEligibility;

      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        MatomoActionEvent.INDEMNITE_LICENCIEMENT,
        isEligible
          ? IndemniteDepartStepName.Resultat
          : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
      ]);

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.isEligible = isEligible;
          state.resultData.input.infoWarning = infoWarning;
        })
      );
    },
    getEligibilityError: () => {
      const contratTravailEligibility =
        get().contratTravailData.error.errorEligibility;
      const informationEligibility =
        get().informationsData.error.errorEligibility;
      const ancienneteEligibility = get().ancienneteData.error.errorEligibility;
      return (
        contratTravailEligibility ||
        informationEligibility ||
        ancienneteEligibility
      );
    },
    getPublicodesResult: () => {
      const agreement = get().agreementData.input.agreement;
      const publicodes = get().agreementData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      let errorPublicodes;
      const absencePeriods = get().ancienneteData.input.absencePeriods;

      const legalFormula = publicodes.getFormule();
      const legalReferences = publicodes.getReferences();

      let publicodesSituation: PublicodesData<PublicodesIndemniteLicenciementResult>;
      let agreementReferences: References[];
      let agreementFormula: Formula;
      let isAgreementBetter = false;
      let isAgreementEqualToLegal = false;
      let agreementInformations: AgreementInformation[];
      let agreementNotifications: Notification[] = [];
      let notifications: Notification[];
      let agreementHasNoLegalIndemnity: boolean;
      let agreementHasNoBetterAllowance: boolean;
      let isParentalNoticeHidden = false;

      if (
        agreement &&
        getSupportedCcIndemniteLicenciement().some(
          (item) => item.idcc === agreement.num && item.fullySupported
        )
      ) {
        const infos = informationToSituation(
          get().informationsData.input.publicodesInformations
        );

        agreementInformations = get()
          .informationsData.input.publicodesInformations.map(
            (v) =>
              v.question.rule.titre &&
              v.info && {
                label: v.question.rule.titre,
                value: v.info,
                unit: v.question.rule.unité,
              }
          )
          .filter((v) => v !== "") as AgreementInformation[];

        try {
          const situation = {
            ...mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues(
              agreement.num,
              get().salairesData.input.salaryPeriods,
              get().ancienneteData.input.dateNotification!,
              get().ancienneteData.input.dateEntree!,
              get().ancienneteData.input.dateSortie!,
              get().contratTravailData.input.licenciementInaptitude === "oui",
              get().contratTravailData.input.arretTravail === "oui",
              { ...infos }
            ),
            absencePeriods:
              absencePeriods && absencePeriods.length
                ? JSON.stringify(absencePeriods)
                : undefined,
            ...get().situationData.situation,
          };
          publicodesSituation = publicodes.calculateResult(situation);
          isAgreementBetter = publicodesSituation.detail.chosenResult === "AGREEMENT";
          isAgreementEqualToLegal = publicodesSituation.detail.chosenResult === "SAME";
        } catch (e) {
          errorPublicodes = true;
          Sentry.captureException(e);
          console.error(e);
        }

        agreementReferences = publicodes.getReferences(
          "résultat conventionnel"
        );

        agreementFormula = publicodes.getFormule();

        agreementNotifications = publicodes.getNotifications();

        agreementHasNoLegalIndemnity = hasNoLegalIndemnity(
          agreement.num,
          agreementInformations
        );

        agreementHasNoBetterAllowance = hasNoBetterAllowance(agreement.num);

        isParentalNoticeHidden = isParentalNoticeHiddenForAgreement(
          isAgreementBetter,
          agreement.num
        );
      }

      if (isAgreementBetter) {
        notifications = agreementNotifications?.filter(
          (item) =>
            item.show === "conventionnel" ||
            item.show === "légal et conventionnel" ||
            item.show === "default"
        );
      } else if (isAgreementEqualToLegal) {
        notifications = agreementNotifications?.filter(
          (item) =>
            item.show === "légal et conventionnel" || item.show === "default"
        );
      } else {
        notifications = agreementNotifications?.filter(
          (item) =>
            item.show === "légal" || item.show === "légal et conventionnel"
        );
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.error.errorPublicodes = errorPublicodes;
          state.resultData.input.legalFormula = legalFormula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult =
            publicodesSituation?.detail.legalResult;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituation?.detail.agreementResult;
          state.resultData.input.agreementReferences = agreementReferences;
          state.resultData.input.agreementFormula = agreementFormula;
          state.resultData.input.isAgreementBetter = isAgreementBetter;
          state.resultData.input.agreementInformations = agreementInformations;
          state.resultData.input.notifications = notifications;
          state.resultData.input.agreementHasNoLegalIndemnity =
            agreementHasNoLegalIndemnity;
          state.resultData.input.agreementHasNoBetterAllowance =
            agreementHasNoBetterAllowance;
          state.resultData.input.isParentalNoticeHidden =
            isParentalNoticeHidden;
        })
      );
    },
  },
});

export default createResultStore;
