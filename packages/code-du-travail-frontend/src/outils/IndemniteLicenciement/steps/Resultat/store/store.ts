import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import {
  IndemniteLicenciementSeniority,
  mapToPublicodesSituationForIndemniteLicenciementLegal,
} from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { convertToSeniority, generateExplanation } from "../../../common";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";

const initialState: ResultStoreData = {
  input: {
    publicodesResult: null,
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice & ContratTravailStoreSlice & SalairesStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    getPublicodesResult: () => {
      const refSalary = get().salairesData.input.refSalary;
      const agreementRefSAlary = get().salairesData.input.agreementRefSAlary;
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

      const { result } = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          seniority,
          refSalary,
          isLicenciementInaptitude
        )
      );

      const ancienneteLegal = publicodes.execute(
        "contrat salarié . indemnité de licenciement . ancienneté en année"
      ).value as number;

      const infoCalcul = generateExplanation({
        anciennete: ancienneteLegal,
        inaptitude: isLicenciementInaptitude,
        salaireRef: refSalary,
      });

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.publicodesResult = result;
          state.resultData.input.infoCalcul = infoCalcul;
        })
      );
    },
  },
});

export default createResultStore;
