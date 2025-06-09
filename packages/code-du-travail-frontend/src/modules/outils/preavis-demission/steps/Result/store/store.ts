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

      const isAgreementSupported = !!supportedCcn.find(
        ({ idcc }) => idcc === agreement?.num
      );

      if (!publicodes) {
        console.warn("Publicodes is not defined");
        return;
      }

      let errorPublicodes: boolean = false;
      let result: PublicodesPreavisDemissionResult | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;

      const situation = mapToPublicodesSituationForCalculationPreavisDemission(
        agreement?.num
      );

      try {
        const publicodesCalculation = publicodes.setSituation(situation);
        result = publicodesCalculation.result;
        resultNotifications = publicodes.getNotifications();
        resultReferences = publicodes.getReferences();
      } catch (e) {
        errorPublicodes = true;

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
