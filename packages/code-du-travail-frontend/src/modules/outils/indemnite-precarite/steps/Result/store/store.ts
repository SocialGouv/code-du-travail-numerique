import { produce } from "immer";
import * as Sentry from "@sentry/nextjs";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { TypeContratStoreSlice } from "../../TypeContrat/store";
import { TermeContratStoreSlice } from "../../TermeContrat/store";
import { RemunerationStoreSlice } from "../../Remuneration/store";
import {
  References,
  Notification,
  PublicodesIndemnitePrecariteResult,
  Formula,
  ChosenResult,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";
import { findContractOption } from "../../../agreements";
import { CONTRACT_FAMILY } from "../../../types";

const initialState: ResultStoreData = {
  result: undefined,
  calculationError: undefined,
  resultNotifications: undefined,
  resultReferences: undefined,
  resultFormula: undefined,
  chosenResult: undefined,
};

const createResultStore: StoreSliceWrapperIndemnitePrecarite<
  ResultStoreSlice,
  AgreementStoreSlice &
    TypeContratStoreSlice &
    TermeContratStoreSlice &
    RemunerationStoreSlice
> = (set, get) => ({
  resultData: {
    ...initialState,
  },
  resultFunction: {
    calculateResult: () => {
      const state = get();
      const agreement = state.agreementData.input.agreement;
      const publicodes = state.agreementData.publicodes;

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      let errorPublicodes: boolean = false;
      let result: PublicodesIndemnitePrecariteResult | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;
      let resultFormula: Formula | undefined;
      let chosenResult: ChosenResult | undefined;

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

      const contractOption = findContractOption(
        state.typeContratData.input.contractOptionId,
        agreement
      );
      const termeInput = state.termeContratData.input;

      const situation =
        mapToPublicodesSituationForCalculationIndemnitePrecarite(
          totalSalary,
          {
            family: contractOption?.family ?? CONTRACT_FAMILY.CDD,
            typeCdd: contractOption?.typeCdd ?? "Autres",
            finALaDatePrevue: termeInput.finALaDatePrevue,
            issueContrat: termeInput.issueContrat,
          },
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
        chosenResult = publicodesCalculation.detail?.chosenResult;
      } catch (e) {
        errorPublicodes = true;
        console.error("Error in publicodes calculation:", e);
        Sentry.captureException(e, {
          extra: {
            situation: situation,
          },
        });
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
          state.resultData.resultNotifications = resultNotifications;
          state.resultData.resultReferences = resultReferences;
          state.resultData.resultFormula = resultFormula;
          state.resultData.chosenResult = chosenResult;
          state.resultData.calculationError = errorPublicodes
            ? "Erreur de calcul publicodes"
            : undefined;
        })
      );
    },
  },
});

export default createResultStore;
