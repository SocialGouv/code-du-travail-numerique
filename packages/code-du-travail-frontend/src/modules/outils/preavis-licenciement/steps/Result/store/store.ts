import produce from "immer";
import * as Sentry from "@sentry/nextjs";
import { ResultStoreSlice } from "./types";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";
import { StatusStoreSlice } from "../../Status/store";
import { AgreementStoreSlice } from "../../Agreement/store";
import { InformationsStoreSlice } from "../../Informations/store";
import { mapToPublicodesSituationForCalculationPreavisLicenciement } from "src/modules/outils/common/publicodes";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  PublicodesPreavisLicenciementResult,
  References,
  Notification,
  supportedCcn,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";

const initialState = {
  input: {
    result: undefined,
    calculatedData: undefined,
    resultNotifications: [],
    resultReferences: [],
    isAgreementSupported: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
  publicodes: {},
};

const createResultStore: StoreSliceWrapperPreavisLicenciement<
  ResultStoreSlice,
  StatusStoreSlice & AgreementStoreSlice & InformationsStoreSlice
> = (set, get) => ({
  resultData: { ...initialState },
  resultFunction: {
    calculateResult: () => {
      const state = get();
      const statusData = state.statusData.input;
      const agreementData = state.agreementData.input;
      const informationsData = state.informationsData.input;
      const publicodes = state.agreementData.publicodes;
      const agreement = agreementData.agreement;
      const isHandicappedWorker = !!statusData.disabledWorker;

      const isAgreementSupported = !!supportedCcn.find(
        ({ idcc }) => idcc === agreement?.num
      );

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      let errorPublicodes: boolean = false;
      let result: PublicodesPreavisLicenciementResult | undefined;
      let legalResult: PublicodesPreavisLicenciementResult | undefined;
      let agreementResult: PublicodesPreavisLicenciementResult | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;
      let resultExplanation: ExplanationMainResult | undefined;

      const infos = informationToSituation(
        informationsData.publicodesInformations
      );

      const situation =
        mapToPublicodesSituationForCalculationPreavisLicenciement(
          statusData.seniority || "'Moins de 6 mois'",
          isHandicappedWorker,
          agreement?.num,
          infos
        );

      try {
        const publicodesCalculation = publicodes.calculate(situation);
        if (publicodesCalculation.type !== "result") {
          throw new Error(
            `Le calcul sur l'écran de résultat retourne un ${publicodesCalculation.type} (detail: ${JSON.stringify(publicodesCalculation)})`
          );
        }
        result = publicodesCalculation.result;
        legalResult = publicodesCalculation.detail?.legalResult;
        agreementResult = publicodesCalculation.detail?.agreementResult;
        resultNotifications = publicodesCalculation.notifications;
        resultExplanation = publicodesCalculation.explanation;
        resultReferences = [
          {
            article: "Article L.1234-1 du code du travail",
            url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901112",
          },
          ...publicodesCalculation.references,
        ];
      } catch (e) {
        errorPublicodes = true;
        console.error("Error in publicodes calculation:", e);
        Sentry.captureException(e);
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.publicodesLegalResult = legalResult;
          state.resultData.input.publicodesAgreementResult = agreementResult;
          state.resultData.input.result = result;
          state.resultData.input.isAgreementSupported = isAgreementSupported;
          state.resultData.input.resultNotifications = resultNotifications;
          state.resultData.input.resultReferences = resultReferences;
          state.resultData.input.resultExplanation = resultExplanation;
          state.resultData.error.errorPublicodes = errorPublicodes
            ? "Erreur lors du calcul du préavis"
            : undefined;
        })
      );
    },
  },
});

export { createResultStore };
