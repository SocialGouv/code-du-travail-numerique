import {
  getIndemnite as getIndemniteLegale,
  getSalaireRef as getSalaireRefLegal,
} from "../../../indemnite";
import { getIndemnite, getSalaireRef } from "../indemnite";

const echelon123 = [
  {
    data: {
      anciennete: 1,
      hasTempsPartiel: false,
      indemnite: 500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 500,
    title: "2k, 12mois d'ancienneté",
  },
  {
    data: {
      anciennete: 1,
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 500,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k, 12mois d'ancienneté, OPE + licenciement eco",
  },
  {
    data: {
      anciennete: 2 + 6 / 12,
      hasTempsPartiel: false,
      indemnite: 1250,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 1500,
    title: "2k, 30mois d'ancienneté",
  },
  {
    data: {
      age: 51,
      anciennete: 5,
      hasTempsPartiel: false,
      indemnite: 2500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 5000,
    title: "2k, 5ans d'ancienneté, 51ans",
  },
  {
    data: {
      age: 51,
      anciennete: 5,
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 2500,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 7000,
    title: "2k, 5ans d'ancienneté, 51ans, licenciement eco, OPE",
  },
  {
    data: {
      age: 55,
      anciennete: 5,
      hasTempsPartiel: false,
      indemnite: 2500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 7000,
    title: "2k, 5ans d'ancienneté, 55ans",
  },
  {
    data: {
      age: 55,
      anciennete: 41,
      hasTempsPartiel: false,
      indemnite: 25666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 28000,
    title: "2k, 41ans d'ancienneté, 55ans",
  },
];

const echelon4 = [
  {
    data: {
      anciennete: 1,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 500,
    title: "2k, 12mois d'ancienneté, groupe IV",
  },
  {
    data: {
      anciennete: 1,
      groupe: "IV",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 500,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k, 12mois d'ancienneté, groupe IV, OPE + licenciement eco",
  },
  {
    data: {
      anciennete: 2,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 1000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 1200,
    title: "2k, 2ans d'ancienneté, groupe IV",
  },
  {
    data: {
      anciennete: 10,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 5000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 8000,
    title: "2k, 10ans d'ancienneté, groupe IV",
  },
  {
    data: {
      anciennete: 20,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 11666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 20000,
    title: "2k, 20ans d'ancienneté, groupe IV",
  },
  {
    data: {
      age: 51,
      anciennete: 10,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 5000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 10000,
    title: "2k, 10ans d'ancienneté, 51ans, groupe IV",
  },
  {
    data: {
      age: 51,
      anciennete: 10,
      groupe: "IV",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 5000,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 12000,
    title: "2k, 10ans, 51ans, groupe IV, licenciement eco, OPE",
  },
  {
    data: {
      age: 51,
      anciennete: 20,
      groupe: "IV",
      hasTempsPartiel: false,
      indemnite: 11666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 22000,
    title: "2k, 20ans d'ancienneté, 51ans, groupe IV",
  },
  {
    data: {
      age: 51,
      anciennete: 20,
      groupe: "IV",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 11666.66,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 24000,
    title: "2k, 20ans d'ancienneté, 51ans, groupe IV, licenciement eco, OPE",
  },
  {
    data: {
      age: 55,
      anciennete: 33,
      groupe: "IV",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 20333.33,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 36000,
    title: "2k, 33ans d'ancienneté, 55ans, groupe IV, licenciement eco, OPE",
  },
];

const echelon5 = [
  {
    data: {
      anciennete: 1,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 500,
    title: "2k, 12mois d'ancienneté, groupe V",
  },
  {
    data: {
      anciennete: 1,
      groupe: "V",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 500,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k, 12mois d'ancienneté, groupe V, OPE + licenciement eco",
  },
  {
    data: {
      anciennete: 2,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 1000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 1600,
    title: "2k, 2ans d'ancienneté, groupe V",
  },
  {
    data: {
      anciennete: 10,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 5000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 12000,
    title: "2k, 10ans d'ancienneté, groupe V",
  },
  {
    data: {
      anciennete: 20,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 11666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 32000,
    title: "2k, 20ans d'ancienneté, groupe V",
  },
  {
    data: {
      age: 51,
      anciennete: 10,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 5000,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 14000,
    title: "2k, 10ans d'ancienneté, 51ans, groupe V",
  },
  {
    data: {
      age: 51,
      anciennete: 10,
      groupe: "V",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 5000,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 16000,
    title: "2k, 10ans, 51ans, groupe V, licenciement eco, OPE",
  },
  {
    data: {
      age: 51,
      anciennete: 20,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 11666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 34000,
    title: "2k, 20ans d'ancienneté, 51ans, groupe V",
  },
  {
    data: {
      age: 51,
      anciennete: 20,
      groupe: "V",
      hasOpe: true,
      hasTempsPartiel: false,
      indemnite: 11666.66,
      isEco: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 36000,
    title: "2k, 20ans d'ancienneté, 51ans, groupe V, licenciement eco, OPE",
  },
  {
    data: {
      age: 55,
      anciennete: 23,
      groupe: "V",
      hasTempsPartiel: false,
      indemnite: 13666.66,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 40000,
    title: "2k, 23ans d'ancienneté, 55ans, groupe V, licenciement eco, OPE",
  },
];

describe("getIndemnite", () => {
  echelon123.concat(echelon4, echelon5).forEach((test) => {
    it(`${test.title} should return ${test.expected}`, () => {
      const salaireRefLegal = getSalaireRefLegal({ ...test.data });
      const salaireRef = getSalaireRef({ salaireRefLegal, ...test.data });
      const { indemnite } = getIndemniteLegale({
        salaireRef: salaireRefLegal,
        ...test.data,
      });
      const res = getIndemnite({ indemnite, salaireRef, ...test.data });
      expect(res.indemniteConventionnelle).toEqual(test.expected);
      expect(res.infoCalculConventionnel).toMatchSnapshot();
    });
  });
  it("should return 500 when anciennete > 12 && < 24", () => {
    const salaireRefLegal = getSalaireRefLegal({ ...echelon123[0].data });
    const salaireRef = getSalaireRef({
      salaireRefLegal,
      ...echelon123[0].data,
    });
    const { indemnite } = getIndemniteLegale({
      salaireRef: salaireRefLegal,
      ...echelon123[0].data,
    });
    const res = getIndemnite({
      indemnite,
      salaireRef,
      ...echelon123[0].data,
      anciennete: 15 / 12,
    });

    expect(res.indemniteConventionnelle).toEqual(500);
  });
});
