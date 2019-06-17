import { getIndemnite, getSalaireRef } from "../0044_indemnite";
import {
  getIndemnite as getIndemniteLegale,
  getSalaireRef as getSalaireRefLegal
} from "../../../indemnite";

const echelon123 = [
  {
    title: "2k, 12mois d'ancienneté",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'ancienneté, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      hasOpe: true,
      isEco: true,
      indemnite: 500
    },
    expected: 2000
  },
  {
    title: "2k, 30mois d'ancienneté",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 2 + 6 / 12,
      indemnite: 1250
    },
    expected: 1500
  },
  {
    title: "2k, 5ans d'ancienneté, 51ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 5,
      indemnite: 2500,
      age: 51
    },
    expected: 5000
  },
  {
    title: "2k, 5ans d'ancienneté, 51ans, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 5,
      indemnite: 2500,
      age: 51,
      hasOpe: true,
      isEco: true
    },
    expected: 7000
  },
  {
    title: "2k, 5ans d'ancienneté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 5,
      indemnite: 2500,
      age: 55
    },
    expected: 7000
  },
  {
    title: "2k, 41ans d'ancienneté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 41,
      indemnite: 25666.66,
      age: 55
    },
    expected: 28000
  }
];

const echelon4 = [
  {
    title: "2k, 12mois d'ancienneté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500,
      groupe: "IV"
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'ancienneté, groupe IV, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500,
      hasOpe: true,
      isEco: true,
      groupe: "IV"
    },
    expected: 2000
  },
  {
    title: "2k, 2ans d'ancienneté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 2,
      indemnite: 1000,
      groupe: "IV"
    },
    expected: 1200
  },
  {
    title: "2k, 10ans d'ancienneté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      groupe: "IV"
    },
    expected: 8000
  },
  {
    title: "2k, 20ans d'ancienneté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      indemnite: 11666.66,
      groupe: "IV"
    },
    expected: 20000
  },
  {
    title: "2k, 10ans d'ancienneté, 51ans, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      age: 51,
      groupe: "IV"
    },
    expected: 10000
  },
  {
    title: "2k, 10ans, 51ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      age: 51,
      groupe: "IV",
      hasOpe: true,
      isEco: true
    },
    expected: 12000
  },
  {
    title: "2k, 20ans d'ancienneté, 51ans, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      age: 51,
      indemnite: 11666.66,
      groupe: "IV"
    },
    expected: 22000
  },
  {
    title: "2k, 20ans d'ancienneté, 51ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      age: 51,
      indemnite: 11666.66,
      groupe: "IV",
      hasOpe: true,
      isEco: true
    },
    expected: 24000
  },
  {
    title: "2k, 33ans d'ancienneté, 55ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 33,
      age: 55,
      indemnite: 20333.33,
      groupe: "IV",
      hasOpe: true,
      isEco: true
    },
    expected: 36000
  }
];

const echelon5 = [
  {
    title: "2k, 12mois d'ancienneté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500,
      groupe: "V"
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'ancienneté, groupe V, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500,
      hasOpe: true,
      isEco: true,
      groupe: "V"
    },
    expected: 2000
  },
  {
    title: "2k, 2ans d'ancienneté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 2,
      indemnite: 1000,
      groupe: "V"
    },
    expected: 1600
  },
  {
    title: "2k, 10ans d'ancienneté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      groupe: "V"
    },
    expected: 12000
  },
  {
    title: "2k, 20ans d'ancienneté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      indemnite: 11666.66,
      groupe: "V"
    },
    expected: 32000
  },
  {
    title: "2k, 10ans d'ancienneté, 51ans, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      age: 51,
      groupe: "V"
    },
    expected: 14000
  },
  {
    title: "2k, 10ans, 51ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 10,
      indemnite: 5000,
      age: 51,
      groupe: "V",
      hasOpe: true,
      isEco: true
    },
    expected: 16000
  },
  {
    title: "2k, 20ans d'ancienneté, 51ans, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      age: 51,
      indemnite: 11666.66,
      groupe: "V"
    },
    expected: 34000
  },
  {
    title: "2k, 20ans d'ancienneté, 51ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 20,
      age: 51,
      indemnite: 11666.66,
      groupe: "V",
      hasOpe: true,
      isEco: true
    },
    expected: 36000
  },
  {
    title: "2k, 23ans d'ancienneté, 55ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 23,
      age: 55,
      indemnite: 13666.66,
      groupe: "V"
    },
    expected: 40000
  }
];

describe("getIndemnite", () => {
  echelon123.concat(echelon4, echelon5).forEach(test => {
    it(`${test.title} should return ${test.expected}`, () => {
      const salaireRefLegal = getSalaireRefLegal({ ...test.data });
      const salaireRef = getSalaireRef({ salaireRefLegal, ...test.data });
      const { indemnite } = getIndemniteLegale({
        salaireRef: salaireRefLegal,
        ...test.data
      });
      const res = getIndemnite({ salaireRef, indemnite, ...test.data });
      expect(res.indemniteConventionnelle).toEqual(test.expected);
    });
  });
  it("should return 500 when anciennete > 12 && < 24", () => {
    const salaireRefLegal = getSalaireRefLegal({ ...echelon123[0].data });
    const salaireRef = getSalaireRef({
      salaireRefLegal,
      ...echelon123[0].data
    });
    const { indemnite } = getIndemniteLegale({
      salaireRef: salaireRefLegal,
      ...echelon123[0].data
    });
    const res = getIndemnite({
      salaireRef,
      indemnite,
      ...echelon123[0].data,
      anciennete: 15 / 12
    });

    expect(res.indemniteConventionnelle).toEqual(500);
  });
});
