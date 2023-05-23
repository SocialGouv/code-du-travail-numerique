import {
  Formula,
  getSupportedAgreement,
  Notification,
  PublicodesIndemniteLicenciementResult,
  References,
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import {
  mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues,
  mapToPublicodesSituationForIndemniteLicenciementLegal,
} from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import {
  getAgreementExtraInfoSalary,
  getAgreementReferenceSalary,
} from "../../../agreements";
import { AgreementInformation, hasNoLegalIndemnity } from "../../../common";
import { MainStore } from "../../../store";
import { StoreApi } from "zustand";
import {
  getAgreementRequiredSeniority,
  getAgreementSeniority,
} from "../../../agreements/seniority";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { getInfoWarning } from "./service";
import { IndemniteLicenciementStepName } from "../../..";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoSimulatorEvent,
} from "../../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import getSupportedCcIndemniteLicenciement from "../../../common/usecase/getSupportedCc";

const initialState: ResultStoreData = {
  input: {
    legalFormula: { formula: "", explanations: [] },
    legalSeniority: 0,
    legalReferences: [],
    publicodesLegalResult: { value: "" },
    isAgreementBetter: false,
    isEligible: false,
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

const isAgreementBetterDetection = (
  publicodesSituationLegal: PublicodesIndemniteLicenciementResult,
  publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult
) =>
  publicodesSituationLegal.value !== undefined &&
  publicodesSituationLegal.value !== null &&
  publicodesSituationConventionnel.value !== undefined &&
  publicodesSituationConventionnel.value !== null &&
  publicodesSituationConventionnel.value > publicodesSituationLegal.value;

const isAgreementSameDetection = (
  publicodesSituationLegal: PublicodesIndemniteLicenciementResult,
  publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult
) =>
  publicodesSituationLegal.value !== undefined &&
  publicodesSituationLegal.value !== null &&
  publicodesSituationConventionnel.value !== undefined &&
  publicodesSituationConventionnel.value !== null &&
  publicodesSituationConventionnel.value === publicodesSituationLegal.value;

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    SalairesStoreSlice &
    CommonAgreementStoreSlice &
    CommonInformationsStoreSlice
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
          ? IndemniteLicenciementStepName.Resultat
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
      const refSalary = get().salairesData.input.refSalary;
      const agreement = get().agreementData.input.agreement;
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const longTermDisability =
        get().contratTravailData.input.arretTravail === "oui";
      const publicodes = get().agreementData.publicodes;
      const dateNotification = get().ancienneteData.input.dateNotification!;
      const dateSortie = get().ancienneteData.input.dateSortie!;
      const isAgreementSupported =
        get().agreementData.input.isAgreementSupportedIndemniteLicenciement;

      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const factory = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority = factory.computeSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateSortie,
        absencePeriods: get().ancienneteData.input.absencePeriods,
      });

      const legalRequiredSeniority = factory.computeRequiredSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateNotification,
        dateSortie: get().ancienneteData.input.dateSortie!,
        absencePeriods: get().ancienneteData.input.absencePeriods,
      });

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          legalSeniority.value,
          legalRequiredSeniority.value,
          refSalary,
          isLicenciementInaptitude,
          longTermDisability
        )
      ).result;

      const legalFormula = publicodes.getFormule();
      const legalReferences = publicodes.getReferences();

      let publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult;
      let agreementSeniority: SeniorityResult;
      let agreementRefSalary: number;
      let agreementReferences: References[];
      let agreementFormula: Formula;
      let isAgreementBetter = false;
      let isAgreementEqualToLegal = false;
      let agreementInformations: AgreementInformation[];
      let agreementNotifications: Notification[] = [];
      let notifications: Notification[];
      let agreementHasNoLegalIndemnity: boolean;
      let agreementSalaryExtraInfo: Record<string, string | number> = {};

      if (
        agreement &&
        getSupportedCcIndemniteLicenciement().some(
          (item) => item.idcc === agreement.num && item.fullySupported
        )
      ) {
        const infos = informationToSituation(
          get().informationsData.input.publicodesInformations
        );

        agreementRefSalary = getAgreementReferenceSalary(
          getSupportedAgreement(agreement.num),
          get as StoreApi<MainStore>["getState"]
        );

        agreementSalaryExtraInfo = getAgreementExtraInfoSalary(
          getSupportedAgreement(agreement.num),
          get as StoreApi<MainStore>["getState"]
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

        agreementSeniority = getAgreementSeniority(
          getSupportedAgreement(agreement.num),
          get as StoreApi<MainStore>["getState"]
        );
        const agreementRequiredSeniority = getAgreementRequiredSeniority(
          getSupportedAgreement(agreement.num),
          get as StoreApi<MainStore>["getState"]
        );
        publicodesSituationConventionnel = publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues(
            agreement.num,
            agreementSeniority,
            agreementRefSalary,
            agreementRequiredSeniority.value,
            get().ancienneteData.input.dateNotification!,
            isLicenciementInaptitude,
            longTermDisability,
            { ...infos, ...agreementSalaryExtraInfo }
          ),
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        ).result;

        agreementReferences = publicodes.getReferences(
          "résultat conventionnel"
        );

        agreementFormula = publicodes.getFormule();

        agreementNotifications = publicodes.getNotifications();

        agreementHasNoLegalIndemnity = hasNoLegalIndemnity(agreement.num);

        if (
          agreementHasNoLegalIndemnity ||
          (isAgreementBetterDetection(
            publicodesSituationLegal,
            publicodesSituationConventionnel
          ) &&
            isAgreementSupported)
        ) {
          isAgreementBetter = true;
        }
        if (
          isAgreementSameDetection(
            publicodesSituationLegal,
            publicodesSituationConventionnel
          ) &&
          isAgreementSupported
        ) {
          isAgreementEqualToLegal = true;
        }
      }

      if (isAgreementBetter || isAgreementEqualToLegal) {
        notifications = agreementNotifications?.filter(
          (item) =>
            item.show === "conventionnel" ||
            item.show === "légal et conventionnel"
        );
      } else {
        notifications = agreementNotifications?.filter(
          (item) =>
            item.show === "légal" || item.show === "légal et conventionnel"
        );
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.legalSeniority = legalSeniority.value;
          state.resultData.input.legalFormula = legalFormula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult =
            publicodesSituationLegal;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituationConventionnel;
          state.resultData.input.agreementSeniority = agreementSeniority;
          state.resultData.input.agreementReferences = agreementReferences;
          state.resultData.input.agreementFormula = agreementFormula;
          state.resultData.input.isAgreementBetter = isAgreementBetter;
          state.resultData.input.agreementInformations = agreementInformations;
          state.resultData.input.notifications = notifications;
          state.resultData.input.agreementHasNoLegalIndemnity =
            agreementHasNoLegalIndemnity;
        })
      );
    },
  },
});

export default createResultStore;
