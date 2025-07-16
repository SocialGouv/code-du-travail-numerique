import { ResultStoreSlice } from "./types";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";
import { StatusStoreSlice } from "../../Status/store";
import { AgreementStoreSlice } from "../../Agreement/store";
import { InformationsStoreSlice } from "../../Informations/store";
import { mapToPublicodesSituationForCalculationPreavisLicenciement } from "src/modules/outils/common/publicodes";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import * as Sentry from "@sentry/nextjs";

const initialState = {
  input: {
    result: undefined,
    calculatedData: undefined,
    resultNotifications: [],
    resultReferences: [],
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
      try {
        const statusData = get().statusData.input;
        const agreementData = get().agreementData.input;
        const informationsData = get().informationsData.input;
        const publicodes = get().agreementData.publicodes;

        if (!statusData.seniority || !publicodes) {
          throw new Error("Données manquantes pour le calcul");
        }

        // Créer la situation publicodes
        const informationSituation = informationToSituation(
          informationsData.publicodesInformations
        );
        const situation =
          mapToPublicodesSituationForCalculationPreavisLicenciement(
            statusData.seniority.value,
            agreementData.agreement?.num,
            informationSituation
          );

        // Calculer le résultat avec publicodes
        const publicodesResult = publicodes.calculate(situation);

        let result;
        let resultNotifications = [];
        let resultReferences = [];

        if (publicodesResult.type === "success") {
          const duration = publicodesResult.result.value || "Aucun préavis";

          result = {
            duration: duration,
            agreementSituation: agreementData.agreement
              ? {
                  duration: duration,
                  source: agreementData.agreement.shortTitle,
                }
              : undefined,
            legalSituation: {
              duration: duration,
              source: "Code du travail",
            },
            note: publicodesResult.result.note || undefined,
          };

          // Récupérer les notifications et références
          resultNotifications = publicodesResult.notifications || [];
          resultReferences = publicodesResult.references || [];
        } else {
          // Gestion des erreurs de calcul
          result = {
            duration: "Aucun préavis",
            note: "Erreur lors du calcul du préavis",
          };
        }

        set((state) => ({
          ...state,
          resultData: {
            ...state.resultData,
            input: {
              ...state.resultData.input,
              result,
              calculatedData: result,
              resultNotifications,
              resultReferences,
            },
            error: {},
          },
        }));
      } catch (error) {
        console.error("Erreur lors du calcul du préavis:", error);
        Sentry.captureException(error);

        set((state) => ({
          ...state,
          resultData: {
            ...state.resultData,
            error: {
              ...state.resultData.error,
              errorPublicodes:
                "Une erreur est survenue lors du calcul du préavis. Veuillez vérifier vos données et réessayer.",
            },
          },
        }));
      }
    },
    resetStep: () => {
      set((state) => ({
        ...state,
        resultData: {
          ...state.resultData,
          input: {
            result: undefined,
            calculatedData: undefined,
            resultNotifications: [],
            resultReferences: [],
          },
          error: {},
          hasBeenSubmit: false,
          isStepValid: true,
        },
      }));
    },
  },
});

export { createResultStore };
