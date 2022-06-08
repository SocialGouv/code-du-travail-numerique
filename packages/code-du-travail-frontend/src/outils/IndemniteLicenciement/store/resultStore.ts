import { StoreSlice } from ".";
import {
  getIndemniteExplications,
  getSalaireRef,
  getSeniority,
} from "../utils";
import { mapToPublicodesSituationForIndemniteLicenciement } from "../../publicodes";
import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
} from "@socialgouv/modeles-social";
import { AncienneteStoreSlice } from "./ancienneteStore";
import { ContratTravailStoreSlice } from "./contratTravailStore";
import { SalairesStoreSlice } from "./salairesStore";
import { InfoCalcul } from "../utils/getIndemniteExplications";

type ResultStoreData = {
  publicodesResult: PublicodesIndemniteLicenciementResult | null;
  publicodes?: IndemniteLicenciementPublicodes;
  seniority: number;
  salaireRef: number;
  infoCalcul?: InfoCalcul;
};

type ResultStoreFn = {
  getPublicodesResult: () => void;
};

export type ResultStoreSlice = ResultStoreData & ResultStoreFn;

const initialState: ResultStoreData = {
  publicodesResult: null,
  salaireRef: 0,
  seniority: 0,
};

export const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice & ContratTravailStoreSlice & SalairesStoreSlice
> = (set, get, publicodesRules) => ({
  ...initialState,
  publicodes: new IndemniteLicenciementPublicodes(publicodesRules ?? ""),
  getPublicodesResult: () => {
    const publicodes = get().publicodes!;

    const seniority = getSeniority({
      dateSortie: get().dateSortie!,
      dateEntree: get().dateEntree!,
      absencePeriods: get().absencePeriods!,
    });
    const salaireRef = getSalaireRef({
      hasSameSalaire: get().inputSalaires.hasSameSalaire === "oui",
      primes: get().inputSalaires.primes,
      salaire: parseFloat(get().inputSalaires.salaireBrut!),
      salaires: get().inputSalaires.salaryPeriods,
    });

    const { result } = publicodes.setSituation(
      mapToPublicodesSituationForIndemniteLicenciement(
        undefined, //TODO: on mettra la CC ici
        seniority,
        salaireRef,
        get().inputContratTravail.licenciementInaptitude === "oui"
      )
    );

    const infoCalcul = getIndemniteExplications({
      anciennete: seniority,
      inaptitude: get().inputContratTravail.licenciementInaptitude === "oui",
      salaireRef,
    });

    set((state) => ({
      ...state,
      publicodesResult: result,
      salaireRef,
      seniority,
      infoCalcul,
    }));
  },
});
