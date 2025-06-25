import { StoreApi } from "zustand";
import produce from "immer";
import * as Sentry from "@sentry/nextjs";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { InformationsStoreSlice } from "../../Informations/store";
import { RemunerationStoreSlice } from "../../Remuneration/store";
import {
  References,
  Notification,
  supportedCcn,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";
import { informationToSituation } from "../../../../indemnite-depart/steps/Informations/components/utils";

const initialState: ResultStoreData = {
  isCalculating: false,
};

const createResultStore: StoreSliceWrapperIndemnitePrecarite<
  ResultStoreSlice,
  AgreementStoreSlice & InformationsStoreSlice & RemunerationStoreSlice
> = (set, get) => ({
  resultData: {
    ...initialState,
  },
  resultFunction: {
    calculateResult: () => {
      const state = get();
      const agreement = state.agreementData.input.agreement;
      const publicodes = state.agreementData.publicodes as any; // Type assertion temporaire

      const isAgreementSupported = !!supportedCcn.find(
        ({ idcc }) => idcc === agreement?.num
      );

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      let errorPublicodes: boolean = false;
      let result: any | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;

      // Construire la situation à partir des données du store
      const situationData: Record<string, string> = {};

      // Ajouter les critères du store informations
      if (state.informationsData.input.criteria) {
        Object.entries(state.informationsData.input.criteria).forEach(
          ([key, value]) => {
            if (value !== undefined && value !== null) {
              situationData[key] = String(value);
            }
          }
        );
      }

      // Ajouter les informations de rémunération
      if (state.remunerationData.input.salaryInfo) {
        const salaryInfo = state.remunerationData.input.salaryInfo;
        if (salaryInfo.totalGrossSalary) {
          situationData["contrat salarié . rémunération . brut de base"] =
            String(salaryInfo.totalGrossSalary);
        }
      }

      const situation =
        mapToPublicodesSituationForCalculationIndemnitePrecarite(
          agreement?.num,
          situationData
        );

      try {
        const publicodesCalculation = publicodes.calculate(situation);
        if (publicodesCalculation.type !== "result") {
          throw new Error(
            `Le calcul sur l'écran de résultat retourne un ${publicodesCalculation.type} (detail: ${JSON.stringify(publicodesCalculation)})`
          );
        }
        result = publicodesCalculation.result;
        resultNotifications = publicodesCalculation.notifications;
        resultReferences = [
          {
            article: "Article L.1243-8 du code du travail",
            url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901199",
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
          state.resultData.result = result
            ? {
                amount: result.value || 0,
                isEligible: (result.value || 0) > 0,
                reason:
                  (result.value || 0) === 0
                    ? "Non éligible selon les critères"
                    : undefined,
                details: {
                  baseAmount: 0, // À adapter selon les données publicodes
                  rate: 0, // À adapter selon les données publicodes
                },
              }
            : undefined;
          state.resultData.isAgreementSupported = isAgreementSupported;
          state.resultData.resultNotifications = resultNotifications;
          state.resultData.resultReferences = resultReferences;
          state.resultData.calculationError = errorPublicodes
            ? "Erreur de calcul publicodes"
            : undefined;
        })
      );
    },
    getPublicodesResult: () => {
      // Cette fonction peut être utilisée pour récupérer le résultat publicodes
      // Pour l'instant, elle fait la même chose que calculateResult
      const resultFunction = get().resultFunction;
      resultFunction.calculateResult();
    },
    resetResult: () => {
      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.result = undefined;
          state.resultData.calculationError = undefined;
          state.resultData.isCalculating = false;
        })
      );
    },
    setCalculationError: (error) => {
      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.calculationError = error;
        })
      );
    },
  },
});

export default createResultStore;
