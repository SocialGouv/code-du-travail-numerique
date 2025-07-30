import produce from "immer";
import * as Sentry from "@sentry/nextjs";
import { StoreSliceWrapperHeuresRechercheEmploi } from "../../store";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { InformationsStoreSlice } from "../../Informations/store";
import {
  References,
  Notification,
  supportedCcn,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationHeuresRechercheEmploi } from "../../../../common/publicodes/heures-recherche-emploi";
import { informationToSituation } from "../../../../indemnite-depart/steps/Informations/components/utils";

const initialState: ResultStoreData = {
  input: {
    isAgreementSupported: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createResultStore: StoreSliceWrapperHeuresRechercheEmploi<
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
      let result: any | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;
      let isResultValid: boolean = true;

      const infos = informationToSituation(
        state.informationsData.input.publicodesInformations
      );

      const isRupturePeriodeEssai =
        state.informationsData.input.publicodesInformations.some(
          (info) =>
            info.question.name === "Type de rupture du contrat de travail" &&
            info.info === "'Rupture de la période d'essai'"
        );

      const isRuptureConventionnelle =
        state.informationsData.input.publicodesInformations.some(
          (info) =>
            info.question.name === "Type de rupture du contrat de travail" &&
            info.info === "'Rupture conventionnelle'"
        );

      const situation =
        mapToPublicodesSituationForCalculationHeuresRechercheEmploi(
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
        isResultValid =
          publicodesCalculation.result !== undefined &&
          publicodesCalculation.result.value !== "''";
        result = publicodesCalculation.result;
        resultNotifications = publicodesCalculation.notifications;
        resultReferences = publicodesCalculation.references;
      } catch (e) {
        errorPublicodes = true;
        console.error("Error in publicodes calculation:", e);
        Sentry.captureException(e);
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.result = result;
          state.resultData.input.isAgreementSupported = isAgreementSupported;
          state.resultData.input.resultNotifications = resultNotifications;
          state.resultData.input.resultReferences = resultReferences;
          state.resultData.error.errorPublicodes = errorPublicodes;
          state.resultData.input.isRupturePeriodeEssai = isRupturePeriodeEssai;
          state.resultData.input.isRuptureConventionnelle =
            isRuptureConventionnelle;
          state.resultData.input.isResultValid = isResultValid;
        })
      );
    },
  },
});

export default createResultStore;
