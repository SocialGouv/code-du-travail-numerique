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
  Formula,
} from "@socialgouv/modeles-social";
import {
  mapToPublicodesSituationForCalculationIndemnitePrecarite,
  mapAgreementSpecificParametersToPublicodes,
} from "../../../../common/publicodes/indemnite-precarite";

const initialState: ResultStoreData = {
  result: undefined,
  calculationError: undefined,
  isAgreementSupported: false,
  resultNotifications: undefined,
  resultReferences: undefined,
  resultFormula: undefined,
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
      let resultFormula: Formula | undefined;

      const remunerationInput = state.remunerationData.input;
      let totalSalary = 0;

      if (
        remunerationInput.typeRemuneration === "total" &&
        remunerationInput.salaire
      ) {
        totalSalary = remunerationInput.salaire;
      } else if (
        remunerationInput.typeRemuneration === "mensuel" &&
        remunerationInput.salaires
      ) {
        totalSalary = remunerationInput.salaires.reduce((sum, entry) => {
          return sum + (entry.salaire || 0);
        }, 0);
      }

      const conventionSpecificParams =
        mapAgreementSpecificParametersToPublicodes(
          state.informationsData.input,
          agreement?.num
        );

      const additionalFields = {
        "contrat salarié . type de cdd": `'${state.informationsData.input.criteria?.cddType ?? "Autres"}'`,
        ...conventionSpecificParams,
      };

      const situation =
        mapToPublicodesSituationForCalculationIndemnitePrecarite(
          totalSalary,
          additionalFields,
          agreement?.num
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
        resultReferences = publicodesCalculation.references;
        resultFormula = publicodesCalculation.formula;
      } catch (e) {
        errorPublicodes = true;
        console.error("Error in publicodes calculation:", e);
        console.error(`La situation est ${JSON.stringify(situation)}`);
        Sentry.captureException(e);
      }

      set(
        produce((state: ResultStoreSlice) => {
          const resultValue = result?.value;
          const amount =
            typeof resultValue === "number"
              ? resultValue
              : (resultValue as any)?.nodeValue || 0;

          state.resultData.result = amount;
          state.resultData.totalSalary = totalSalary;
          state.resultData.isAgreementSupported = isAgreementSupported;
          state.resultData.resultNotifications = resultNotifications;
          state.resultData.resultReferences = resultReferences;
          state.resultData.resultFormula = resultFormula;
          state.resultData.calculationError = errorPublicodes
            ? "Erreur de calcul publicodes"
            : undefined;
        })
      );
    },
  },
});

export default createResultStore;
