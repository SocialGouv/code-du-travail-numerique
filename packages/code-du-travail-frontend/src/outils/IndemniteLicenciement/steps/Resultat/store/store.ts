import {
  Formula,
  FormuleFactory,
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
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: ResultStoreData = {
  input: {
    legalFormula: { formula: "", explanations: [] },
    legalSeniority: 0,
    legalReferences: [],
    publicodesLegalResult: { value: "" },
    isAgreementBetter: false,
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
    CommonAgreementStoreSlice &
    CommonInformationsStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    getPublicodesResult: () => {
      const refSalary = get().salairesData.input.refSalary;
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

      const formulaFactory = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalFormula = formulaFactory.computeFormula({
        seniority: legalSeniority,
        isForInaptitude: isLicenciementInaptitude,
        refSalary,
      });

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          legalSeniority,
          refSalary,
          isLicenciementInaptitude
        )
      ).result;

      const legalReferences = publicodes.getReferences();

      let publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult;
      let agreementSeniority: number;
      let agreementReferences: References[];
      let agreementFormula: Formula;
      let isAgreementBetter = false;

      if (agreement) {
        const factory = new SeniorityFactory().create(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
        );
        const agreementInformations = get().informationsData.input.informations;
        agreementSeniority = factory.computeSeniority({
          dateEntree: get().ancienneteData.input.dateEntree!,
          dateSortie: get().ancienneteData.input.dateSortie!,
          absencePeriods: get().ancienneteData.input.absencePeriods,
        });

        publicodesSituationConventionnel = publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            agreementSeniority,
            agreementRefSalary ?? refSalary,
            agreementInformations
          ),
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        ).result;

        agreementReferences = publicodes.getReferences(
          "indemnité de licenciement . résultat conventionnel"
        );

        const agreementFactoryFormula = new FormuleFactory().create(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
        );

        agreementFormula = agreementFactoryFormula.computeFormula({
          seniority: agreementSeniority,
          refSalary: agreementRefSalary ?? refSalary,
        });

        if (
          publicodesSituationConventionnel.value &&
          publicodesSituationLegal.value &&
          publicodesSituationConventionnel.value >
            publicodesSituationLegal.value
        ) {
          isAgreementBetter = true;
        }
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.legalSeniority = legalSeniority;
          state.resultData.input.legalFormula = legalFormula;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.publicodesLegalResult =
            publicodesSituationLegal;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituationConventionnel;
          state.resultData.input.agreementSeniority = agreementSeniority;
          state.resultData.input.agreementReferences = agreementReferences;
          state.resultData.input.agreementFormula = agreementFormula;
          state.resultData.input.isAgreementBetter = isAgreementBetter;
        })
      );
    },
  },
});

export default createResultStore;
