import {
  Formula,
  Notification,
  PublicodesIndemniteLicenciementResult,
  PublicodesSimulator,
  References,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues } from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete";
import { ContratTravailStoreSlice } from "../../ContratTravail";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { isParentalNoticeHiddenForAgreement } from "../../../agreements/messages";
import { AgreementInformation, hasNoBetterAllowance } from "../../../common";
import { getInfoWarning } from "./service";
import getSupportedCc from "../../../common/usecase/getSupportedCc";
import * as Sentry from "@sentry/nextjs";
import { eventEmitter } from "../../../events/emitter";
import { EventType } from "../../../events/events";
import { PublicodesResult } from "@socialgouv/modeles-social";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { CommonSituationStoreSlice } from "../../../situationStore";
import { StoreSlice } from "../../../types";
import { informationToSituation } from "src/modules/outils/common/indemnite-depart/steps/Informations/components/utils";

const initialState: ResultStoreData = {
  input: {
    formula: { formula: "", explanations: [] },
    legalReferences: [],
    result: { value: undefined },
    publicodesLegalResult: { value: undefined },
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
      return { isEligible };
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
      let publicodesSituation:
        | PublicodesResult<PublicodesIndemniteLicenciementResult>
        | undefined = undefined;

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

      try {
        const result = publicodes.calculate(situation);
        if (result.type !== "result") {
          throw new Error(
            `Le calcul sur l'écran de résultat retourne un ${result.type} (detail: ${JSON.stringify(result)})`
          );
        }
        publicodesSituation = result;
        isAgreementBetter =
          publicodesSituation.detail.chosenResult === "AGREEMENT" ||
          publicodesSituation.detail.chosenResult === "HAS_NO_LEGAL";
        isAgreementEqualToLegal =
          publicodesSituation.detail.chosenResult === "SAME";
        agreementHasNoLegalIndemnity =
          publicodesSituation.detail.chosenResult === "HAS_NO_LEGAL";
        if (publicodesSituation.formula) {
          formula = publicodesSituation.formula;
        }
      } catch (e) {
        errorPublicodes = true;
        console.error(`La situation est ${JSON.stringify(situation)}`);
        console.error(
          `Les informations de l'ancienneté sont ${JSON.stringify(get().ancienneteData.input)}`
        );
        console.error(
          `Les informations liées aux salaires sont ${JSON.stringify(get().salairesData.input)}`
        );
        console.error(
          `Les informations liées au contrat de travail sont ${JSON.stringify(get().contratTravailData.input)}`
        );
        console.error(
          `Les informations issues de publicodes sont ${JSON.stringify(infos)}`
        );
        console.error(`L'erreur remontée est : ${JSON.stringify(e)}`);
        Sentry.captureException(e);
      }

      if (
        agreement &&
        getSupportedCc().some(
          (item) => item.idcc === agreement.num && item.fullySupported
        )
      ) {
        agreementReferences = publicodesSituation?.references ?? [];

        agreementNotifications = publicodesSituation?.notifications ?? [];

        agreementInformations = get()
          .informationsData.input.publicodesInformations.map((v) => {
            if (v.question.rule.titre && v.info) {
              return {
                label: v.question.rule.titre,
                value: v.info,
                unit: v.question.rule.unité,
              };
            }
          })
          .filter((v) => v !== undefined) as AgreementInformation[];

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
          state.resultData.input.result = publicodesSituation?.result ?? {
            value: undefined,
          };
          state.resultData.input.formula = formula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult = publicodesSituation
            ?.detail?.legalResult ?? {
            value: 0,
          };
          state.resultData.input.publicodesAgreementResult =
            publicodesSituation?.detail?.agreementResult;
          state.resultData.input.agreementExplanation =
            publicodesSituation?.detail?.agreementExplanation;
          state.resultData.input.resultExplanation =
            publicodesSituation?.explanation;
          publicodesSituation?.detail?.agreementResult;
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
