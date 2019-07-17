import { getIndemnite } from "../indemnite";
import {
  getIndemnite as getIndemniteLegale,
  getSalaireRef as getSalaireRefLegal
} from "../../../indemnite";

const tests = [
  {
    title: "2k, 12mois d'ancienneté",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 1,
      indemnite: 500
    }
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
    }
  },
  {
    title: "2k, 30mois d'ancienneté",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 2 + 6 / 12,
      indemnite: 1250
    }
  },
  {
    title: "2k, 5ans d'ancienneté, 51ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 5,
      indemnite: 2500,
      age: 51
    }
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
    }
  },
  {
    title: "2k, 5ans d'ancienneté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 5,
      indemnite: 2500,
      age: 55
    }
  },
  {
    title: "2k, 41ans d'ancienneté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 41,
      indemnite: 25666.66,
      age: 55
    }
  }
];

describe("getIndemnite", () => {
  tests.forEach(test => {
    it(test.title, () => {
      const salaireRef = getSalaireRefLegal({ ...test.data });
      const { indemnite } = getIndemniteLegale({
        salaireRef,
        ...test.data
      });
      const res = getIndemnite({
        salaireRef,
        indemnite,
        ...test.data
      });
      expect(res.indemniteConventionnelle).toMatchSnapshot();
      expect(res.infoCalculConventionnel).toMatchSnapshot();
    });
  });
});
