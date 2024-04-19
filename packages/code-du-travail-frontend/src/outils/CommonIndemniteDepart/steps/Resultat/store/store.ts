import {
  Formula,
  Notification,
  PublicodesDataWithFormula,
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
import { AgreementInformation, hasNoBetterAllowance } from "../../../common";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { getInfoWarning } from "./service";
import getSupportedCc from "../../../common/usecase/getSupportedCc";
import * as Sentry from "@sentry/nextjs";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";
import { eventEmitter } from "../../../events/emitter";
import { EventType } from "../../../events/events";

const initialState: ResultStoreData = {
  input: {
    formula: { formula: "", explanations: [] },
    legalReferences: [],
    result: { value: "" },
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

      eventEmitter.dispatch(EventType.SEND_RESULT_EVENT, isEligible);

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

      let errorPublicodes: boolean;
      const absencePeriods = get().ancienneteData.input.absencePeriods;

      const legalReferences = publicodes.getReferences();
      let publicodesSituation: PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult>;

      let agreementReferences: References[];
      let formula: Formula;
      let isAgreementBetter = false;
      let isAgreementEqualToLegal = false;
      let agreementInformations: AgreementInformation[];
      let agreementNotifications: Notification[] = [];
      let notifications: Notification[];
      let agreementHasNoLegalIndemnity: boolean;
      let agreementHasNoBetterAllowance: boolean;
      let isParentalNoticeHidden = false;

      const infos = informationToSituation(
        get().informationsData.input.publicodesInformations
      );

      try {
        const situation = {
          ...mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues(
            agreement?.num,
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
        publicodesSituation = publicodes.calculate(situation);
        isAgreementBetter =
          publicodesSituation.detail?.chosenResult === "AGREEMENT";
        isAgreementEqualToLegal =
          publicodesSituation.detail?.chosenResult === "SAME";
        agreementHasNoLegalIndemnity =
          publicodesSituation.detail?.chosenResult === "HAS_NO_LEGAL";
        if (publicodesSituation.formula) {
          formula = publicodesSituation.formula;
        }
      } catch (e) {
        errorPublicodes = true;
        Sentry.captureException(e);
        console.error(e);
      }

      if (
        agreement &&
        getSupportedCc().some(
          (item) => item.idcc === agreement.num && item.fullySupported
        )
      ) {
        agreementReferences = publicodes.getReferences(
          "résultat conventionnel"
        );

        agreementNotifications = publicodes.getNotifications();

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
          state.resultData.input.result = publicodesSituation.result!;
          state.resultData.input.formula = formula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult = publicodesSituation
            .detail?.legalResult ?? { value: 0 };
          state.resultData.input.publicodesAgreementResult =
            publicodesSituation.detail?.agreementResult;
          state.resultData.input.agreementReferences = agreementReferences;
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
