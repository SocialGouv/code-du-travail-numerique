import { getWarningVariant } from "../steps/Result";
import { CONTRACT_FAMILY, ContractOption, TYPE_CDD } from "../types";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";

const agreement = { num: 1486 } as Agreement;

const contractOption = (typeCdd: string): ContractOption => ({
  id: "test",
  label: "test",
  family: CONTRACT_FAMILY.CDD,
  typeCdd,
});

describe("getWarningVariant", () => {
  it("sans convention collective, renvoie la variante « sans-cc »", () => {
    expect(
      getWarningVariant({
        chosenResult: "LEGAL",
        contractOption: contractOption(TYPE_CDD.AUTRES),
      })
    ).toEqual("sans-cc");
  });

  it("avec une CC dont le taux n'a pas été retenu, renvoie « cc-sans-dispositions »", () => {
    expect(
      getWarningVariant({
        agreement,
        chosenResult: "LEGAL",
        contractOption: contractOption(TYPE_CDD.AUTRES),
      })
    ).toEqual("cc-sans-dispositions");
  });

  it("avec un taux conventionnel retenu, renvoie « cc-avec-dispositions »", () => {
    expect(
      getWarningVariant({
        agreement,
        chosenResult: "AGREEMENT",
        contractOption: contractOption(
          TYPE_CDD.USAGE_INTERVENTION_EVENEMENTIEL
        ),
      })
    ).toEqual("cc-avec-dispositions");
  });

  it("pour le CDD d'usage des enquêteurs vacataires, renvoie « cc-1486-enqueteurs »", () => {
    expect(
      getWarningVariant({
        agreement,
        chosenResult: "AGREEMENT",
        contractOption: contractOption(TYPE_CDD.USAGE_ENQUETEURS_VACATAIRES),
      })
    ).toEqual("cc-1486-enqueteurs");
  });

  it("le CDD d'usage des enquêteurs reste « cc-sans-dispositions » si le taux conventionnel n'a pas été retenu", () => {
    expect(
      getWarningVariant({
        agreement,
        chosenResult: "LEGAL",
        contractOption: contractOption(TYPE_CDD.USAGE_ENQUETEURS_VACATAIRES),
      })
    ).toEqual("cc-sans-dispositions");
  });
});
