import {
  Formula,
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../store";

const getAgreementFormula = (
  idcc: SupportedCcIndemniteLicenciement,
  agreementSeniority: number,
  agreementRefSalary: number,
  get: GetState<MainStore>
): Formula => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC2264 === idcc: {
      const agreementFactoryFormula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC2264
      );
      let seniorityNonCadre;
      const seniorityInfo =
        get().informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps"
        )?.info;
      if (seniorityInfo) {
        seniorityNonCadre = parseFloat(seniorityInfo);
      }
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority,
        refSalary: agreementRefSalary,
        category: get()
          .informationsData.input.publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle"
          )
          ?.info?.slice(1, -1) as any,
        seniorityNonCadre,
      });
    }
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc: {
      const agreementFactoryFormula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC413
      );
      let seniorityNonCadre;
      const seniorityInfo =
        get().informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps"
        )?.info;
      if (seniorityInfo) {
        seniorityNonCadre = parseFloat(seniorityInfo);
      }
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority,
        refSalary: agreementRefSalary,
        category: get()
          .informationsData.input.publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle"
          )
          ?.info?.slice(1, -1) as any,
        seniorityNonCadre,
      });
    }
    case SupportedCcIndemniteLicenciement.IDCC1597 === idcc: {
      const agreementFactoryFormula = new FormuleFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1597
      );
      let hasMoreThan55Years = false;
      const year = get()
        .informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.rule.nom ===
            "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age"
        )
        ?.info?.slice(1, -1);
      if (year && parseInt(year) > 55) {
        hasMoreThan55Years = true;
      } else {
        const moreThan55YearsQuestion = get()
          .informationsData.input.publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age plus de 55 ans"
          )
          ?.info?.slice(1, -1);
        if (moreThan55YearsQuestion && moreThan55YearsQuestion === "Oui") {
          hasMoreThan55Years = true;
        }
      }
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority,
        refSalary: agreementRefSalary,
        hasMoreThan55Years,
      });
    }
    default: {
      const agreementFactoryFormula = new FormuleFactory().create(idcc);
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority,
        refSalary: agreementRefSalary,
      });
    }
  }
};

export default getAgreementFormula;
