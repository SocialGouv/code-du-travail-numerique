import {
  computeRequiredSeniority,
  Formula,
  IndemniteLicenciementPublicodes,
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
  AgreementInformation,
  hasNoLegalIndemnity,
  getSupportedCcIndemniteLicenciement,
} from "../../../common";
import { getAgreementReferenceSalary } from "../../../agreements";
import { MainStore } from "../../../store";
import { StoreApi } from "zustand";
import getAgreementSeniority from "../../../agreements/seniority";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { dateOneDayLater } from "../../../common/date";
import { getInfoWarning } from "./service";

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

const isConventionnelBetter = (
  publicodesSituationLegal: PublicodesIndemniteLicenciementResult,
  publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult
) =>
  publicodesSituationLegal.value !== undefined &&
  publicodesSituationLegal.value !== null &&
  publicodesSituationConventionnel.value !== undefined &&
  publicodesSituationConventionnel.value !== null &&
  publicodesSituationConventionnel.value > publicodesSituationLegal.value;

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    SalairesStoreSlice &
    CommonAgreementStoreSlice &
    CommonInformationsStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    init: () => {
      const contratTravailEligibility = !get().contratTravailData.error
        .errorEligibility;
      const isCdd = get().contratTravailData.input.typeContratTravail === "cdd";
      const ancienneteEligibility = !get().ancienneteData.error
        .errorEligibility;
      const informationEligibility = !get().informationsData.error
        .errorEligibility;
      const agreement = get().agreementData.input.agreement;
      const hasSelectedAgreement = get().agreementData.input.route !== "none";
      const isAgreementSupported = !!getSupportedCcIndemniteLicenciement().find(
        (v) =>
          v.fullySupported &&
          v.idcc === get().agreementData.input.agreement?.num
      );

      const infoWarning = getInfoWarning({
        hasSelectedAgreement,
        isAgreementSupported,
        informationEligibility,
        contratTravailEligibility,
        ancienneteEligibility,
        isCdd,
        agreement,
      });
      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.isEligible =
            contratTravailEligibility &&
            ancienneteEligibility &&
            informationEligibility;
          state.resultData.input.infoWarning = infoWarning;
        })
      );
    },
    getEligibilityError: () => {
      const contratTravailEligibility = get().contratTravailData.error
        .errorEligibility;
      const informationEligibility = get().informationsData.error
        .errorEligibility;
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
      const publicodes = get().resultData.publicodes;
      const dateSortie = dateOneDayLater(
        get().ancienneteData.input.dateSortie!
      );
      const requiredSeniority = computeRequiredSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateNotification: get().ancienneteData.input.dateNotification!,
      });
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

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          legalSeniority.value,
          refSalary,
          isLicenciementInaptitude
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
      let agreementInformations: AgreementInformation[];
      let agreementNotifications: Notification[];
      let agreementHasNoLegalIndemnity: boolean;

      if (agreement) {
        const infos = informationToSituation(
          get().informationsData.input.publicodesInformations
        );

        agreementRefSalary = getAgreementReferenceSalary(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement,
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
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement,
          get as StoreApi<MainStore>["getState"]
        );
        publicodesSituationConventionnel = publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues(
            agreement.num,
            agreementSeniority,
            agreementRefSalary,
            legalSeniority,
            requiredSeniority,
            refSalary,
            get().ancienneteData.input.dateNotification!,
            infos
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
          isConventionnelBetter(
            publicodesSituationLegal,
            publicodesSituationConventionnel
          )
        ) {
          isAgreementBetter = true;
        }
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.legalSeniority = legalSeniority.value;
          state.resultData.input.legalFormula = legalFormula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult = publicodesSituationLegal;
          state.resultData.input.publicodesAgreementResult = publicodesSituationConventionnel;
          state.resultData.input.agreementSeniority = agreementSeniority;
          state.resultData.input.agreementReferences = agreementReferences;
          state.resultData.input.agreementFormula = agreementFormula;
          state.resultData.input.isAgreementBetter = isAgreementBetter;
          state.resultData.input.agreementInformations = agreementInformations;
          state.resultData.input.agreementNotifications = agreementNotifications;
          state.resultData.input.agreementHasNoLegalIndemnity = agreementHasNoLegalIndemnity;
        })
      );
    },
  },
});

export default createResultStore;
