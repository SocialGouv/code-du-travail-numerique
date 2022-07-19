import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
  References,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import {
  mapToPublicodesSituationForIndemniteLicenciementConventionnel,
  mapToPublicodesSituationForIndemniteLicenciementLegal,
} from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { computeLegalFormula } from "../../../common";

const initialState: ResultStoreData = {
  input: {
    legalFormula: "",
    legalSeniority: 0,
    legalReferences: [],
    publicodesLegalResult: { value: "" },
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
      const agreementRefSalary = get().salairesData.input.agreementRefSalary;
      const agreement = get().agreementData.input.agreement;
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const publicodes = get().resultData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const factory = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority = factory.computeSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateSortie: get().ancienneteData.input.dateSortie!,
        absencePeriods: get().ancienneteData.input.absencePeriods,
      });
      const legalFormula = computeLegalFormula(
        legalSeniority,
        isLicenciementInaptitude
      );

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          legalSeniority,
          refSalary,
          isLicenciementInaptitude
        )
      );

      const legalReferences = publicodes.getReferences();

      let publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult;
      let agreementSeniority: number;
      let agreementReferences: References[];

      if (agreement) {
        const factory = new SeniorityFactory().create(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
        );
        agreementSeniority = factory.computeSeniority({
          dateEntree: get().ancienneteData.input.dateEntree!,
          dateSortie: get().ancienneteData.input.dateSortie!,
          absencePeriods: get().ancienneteData.input.absencePeriods,
        });

        publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            agreementSeniority,
            agreementRefSalary ?? refSalary,
            agreementParameters
          )
        );

        agreementReferences = publicodes.getReferences(
          "indemnité de licenciement . résultat conventionnel"
        );

        publicodesSituationConventionnel = publicodes.execute(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.legalSeniority = legalSeniority;
          state.resultData.input.legalFormula = legalFormula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult =
            publicodesSituationLegal.result;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituationConventionnel;
          state.resultData.input.agreementSeniority = agreementSeniority;
          state.resultData.input.agreementReferences = agreementReferences;
        })
      );
    },
  },
});

export default createResultStore;
