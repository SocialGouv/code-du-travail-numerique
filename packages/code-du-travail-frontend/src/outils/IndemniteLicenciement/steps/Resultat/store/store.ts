import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import {
  IndemniteLicenciementSeniority,
  mapToPublicodesSituationForIndemniteLicenciementConventionnel,
  mapToPublicodesSituationForIndemniteLicenciementLegal,
} from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { convertToSeniority, generateExplanation } from "../../../common";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonAgreementStoreSlice } from "../../Agreement/store";

const initialState: ResultStoreData = {
  input: {
    publicodesLegalResult: null,
    publicodesAgreementResult: null,
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    SalairesStoreSlice &
    CommonAgreementStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    getPublicodesResult: () => {
      const refSalary = get().salairesData.input.refSalary;
      const agreementParameters = get().salairesData.input.agreementParameters;
      const agreement = get().agreementData.input.agreement;
      const seniority: IndemniteLicenciementSeniority = convertToSeniority(
        get().ancienneteData.input.dateEntree!,
        get().ancienneteData.input.dateSortie!,
        get().ancienneteData.input.absencePeriods
      );
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const publicodes = get().resultData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          seniority,
          refSalary,
          isLicenciementInaptitude
        )
      );

      const ancienneteLegal = publicodes.execute(
        "contrat salarié . indemnité de licenciement . ancienneté en année"
      ).value as number;

      let publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult;
      let ancienneteConventionnel: number;

      if (agreement) {
        publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            seniority,
            agreementParameters
          )
        );

        publicodesSituationConventionnel = publicodes.execute(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        ancienneteConventionnel = publicodes.execute(
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année"
        ).value as number;
      }

      const infoCalcul = generateExplanation({
        anciennete: ancienneteLegal,
        inaptitude: isLicenciementInaptitude,
        salaireRef: refSalary,
      });

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.publicodesLegalResult =
            publicodesSituationLegal.result;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituationConventionnel ?? null;
          state.resultData.input.infoCalcul = infoCalcul;
        })
      );
    },
  },
});

export default createResultStore;
