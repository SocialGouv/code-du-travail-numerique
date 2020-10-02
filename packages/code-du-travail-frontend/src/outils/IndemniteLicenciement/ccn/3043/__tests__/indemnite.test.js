import {
  getIndemnite as getIndemniteLegale,
  getSalaireRef as getSalaireRefLegal,
} from "../../../indemnite";
import { getIndemnite } from "../indemnite";

const tests = [
  {
    data: {
      anciennete: 1,
      hasTempsPartiel: false,
      indemnite: 500,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
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
    title: "2k, 12mois d'ancienneté, OPE + licenciement eco",
  },
  {
    data: {
      anciennete: 2 + 6 / 12,
      hasTempsPartiel: false,
      indemnite: 1250,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
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
    title: "2k, 41ans d'ancienneté, 55ans",
  },
];

describe("getIndemnite", () => {
  tests.forEach((test) => {
    //eslint-disable-next-line jest/valid-title
    it(test.title, () => {
      const salaireRef = getSalaireRefLegal({ ...test.data });
      const { indemnite } = getIndemniteLegale({
        salaireRef,
        ...test.data,
      });
      const res = getIndemnite({
        indemnite,
        salaireRef,
        ...test.data,
      });
      expect(res.indemniteConventionnelle).toMatchSnapshot();
      expect(res.infoCalculConventionnel).toMatchSnapshot();
    });
  });
});
