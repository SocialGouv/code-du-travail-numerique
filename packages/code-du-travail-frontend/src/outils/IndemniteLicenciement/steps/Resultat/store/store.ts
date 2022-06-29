import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../store";
import { mapToPublicodesSituationForIndemniteLicenciement } from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { generateExplanation } from "../../../common";
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
      const seniority = get().ancienneteData.input.seniority;
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const publicodes = get().resultData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const { result } = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciement(
          1516, //TODO: à modifier
          seniority,
          refSalary,
          agreementRefSAlary,
          isLicenciementInaptitude
        )
      );

      const infoCalcul = generateExplanation({
        anciennete: seniority,
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
