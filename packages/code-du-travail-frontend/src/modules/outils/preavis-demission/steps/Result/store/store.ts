import produce from "immer";
import * as Sentry from "@sentry/nextjs";
import { StoreSliceWrapperPreavisDemission } from "../../store";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { InformationsStoreSlice } from "../../Informations/store";
import {
  PublicodesPreavisDemissionResult,
  References,
  Notification,
  supportedCcn,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationPreavisDemission } from "../../../../common/publicodes/preavis-demission";

const initialState: ResultStoreData = {
  input: {
    isAgreementSupported: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createResultStore: StoreSliceWrapperPreavisDemission<
  ResultStoreSlice,
  AgreementStoreSlice & InformationsStoreSlice
> = (set, get) => ({
  resultData: { ...initialState },
  resultFunction: {
    getPublicodesResult: () => {
      const state = get();
      const agreement = state.agreementData.input.agreement;
      const publicodes = state.agreementData.publicodes;
      const seniority = state.informationsData.input.seniority;

      const isAgreementSupported = !!supportedCcn.find(
        ({ idcc }) => idcc === agreement?.num
      );

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      if (!seniority) {
        console.warn("Seniority is not defined");
        set(
          produce((state: ResultStoreSlice) => {
            state.resultData.error.errorPublicodes = true;
          })
        );
        return;
      }

      let errorPublicodes: boolean = false;
      let result: PublicodesPreavisDemissionResult | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;

      // Utilisation de la fonction utilitaire pour créer la situation
      const situation = mapToPublicodesSituationForCalculationPreavisDemission(
        seniority,
        agreement?.num
      );

      try {
        const publicodesCalculation = publicodes.setSituation(situation);
        result = publicodesCalculation.result;
        resultNotifications = publicodes.getNotifications();
        resultReferences = publicodes.getReferences();
      } catch (e) {
        errorPublicodes = true;
        console.error(`La situation est ${JSON.stringify(situation)}`);
        console.error(`L'erreur remontée est : ${JSON.stringify(e)}`);
        Sentry.captureException(e);
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.result = result;
          state.resultData.input.isAgreementSupported = isAgreementSupported;
          state.resultData.input.resultNotifications = resultNotifications;
          state.resultData.input.resultReferences = resultReferences;
          state.resultData.error.errorPublicodes = errorPublicodes;
        })
      );
    },
  },
});

export default createResultStore;
