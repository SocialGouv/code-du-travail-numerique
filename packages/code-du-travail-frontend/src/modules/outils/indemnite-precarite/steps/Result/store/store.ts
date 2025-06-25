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
  PublicodesIndemnitePrecariteResult,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";

const initialState: ResultStoreData = {
  result: undefined,
  isCalculating: false,
  calculationError: undefined,
  isAgreementSupported: false,
  resultNotifications: undefined,
  resultReferences: undefined,
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
      const publicodes = state.agreementData.publicodes;

      const isAgreementSupported = !!supportedCcn.find(
        ({ idcc }) => idcc === agreement?.num
      );

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      let errorPublicodes: boolean = false;
      let result: PublicodesIndemnitePrecariteResult | undefined;
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
          situationData["contrat salarié . salaire de référence"] = String(
            salaryInfo.totalGrossSalary
          );
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
          const resultValue = result?.value;
          const amount =
            typeof resultValue === "number"
              ? resultValue
              : (resultValue as any)?.nodeValue || 0;

          state.resultData.result = result
            ? {
                amount: amount,
                isEligible: amount > 0,
                reason:
                  amount === 0 ? "Non éligible selon les critères" : undefined,
                details: {
                  baseAmount: amount,
                  rate: 10, // 10% par défaut pour l'indemnité de précarité
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
