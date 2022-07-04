import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../store";
import { mapToPublicodesSituationForIndemniteLicenciement } from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import {
  computeReferenceSalary,
  computeSeniority,
  generateExplanation,
} from "../../../common";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";

const initialState: ResultStoreData = {
  input: {
    publicodesResult: null,
    salaireRef: 0,
    seniority: 0,
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
      const ancienneteInput = get().ancienneteData.input;
      const salaireInput = get().salairesData.input;
      const contratInput = get().contratTravailData.input;
      const publicodes = get().resultData.publicodes;

      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const seniority = computeSeniority({
        dateSortie: ancienneteInput.dateSortie!,
        dateEntree: ancienneteInput.dateEntree!,
        absencePeriods: ancienneteInput.absencePeriods!,
      });

      const salaireRef = computeReferenceSalary({
        salaires: salaireInput.salaryPeriods,
      });

      const { result } = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciement(
          undefined, //TODO: on mettra la CC ici
          seniority,
          salaireRef,
          contratInput.licenciementInaptitude === "oui"
        )
      );

      const infoCalcul = generateExplanation({
        anciennete: seniority,
        inaptitude: contratInput.licenciementInaptitude === "oui",
        salaireRef,
      });

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.publicodesResult = result;
          state.resultData.input.salaireRef = salaireRef;
          state.resultData.input.seniority = seniority;
          state.resultData.input.infoCalcul = infoCalcul;
        })
      );
    },
  },
});

export default createResultStore;
