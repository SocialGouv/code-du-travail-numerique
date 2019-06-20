import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "../indemnite";
import { getIndemnite, getSalaireRef } from "../../../indemnite";
import { OUVRIER, TAM, CADRE } from "../Categorie";

const initialData = {
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
  hasTempsPartiel: false,
  anciennete: 1,
  indemnite: 500,
  categorie: OUVRIER,
  age: "55"
};
const tests = [
  {
    title: "2k, 12mois d'ancienneté, 55ans, ouvrier",
    data: {
      ...initialData
    },
    result: 500
  },
  {
    title: "2k, 24mois d'ancienneté, 55ans, ouvrier",
    data: {
      ...initialData,
      anciennete: 2
    },
    result: 400
  },
  {
    title: "2k, 24mois d'ancienneté, 61ans, ouvrier, retraite possible",
    data: {
      ...initialData,
      anciennete: 2,
      age: 61,
      hasRetirementAge: true
    },
    result: 320
  },
  {
    title: "2k, 36mois d'ancienneté, 55ans, ouvrier",
    data: {
      ...initialData,
      anciennete: 3
    },
    result: 1200
  },
  {
    title: "2k, 24mois d'ancienneté, 55ans, TAM",
    data: {
      ...initialData,
      anciennete: 2,
      categorie: TAM
    },
    result: 400
  },
  {
    title: "2k, 36mois d'ancienneté, 55ans, TAM",
    data: {
      ...initialData,
      anciennete: 3,
      categorie: TAM
    },
    result: 1800
  },
  {
    title: "2k, 24mois d'ancienneté, 55ans, cadre",
    data: {
      ...initialData,
      anciennete: 2,
      categorie: CADRE
    },
    result: 500
  },
  {
    title: "2k, 36mois d'ancienneté, 55ans, cadre",
    data: {
      ...initialData,
      anciennete: 3,
      tamDuration: 12,
      cadreDuration: 24,
      categorie: "cadre"
    },
    result: 2200
  },
  {
    title: "2k, 36mois d'ancienneté, 61ans, cadre, retraite possible",
    data: {
      ...initialData,
      anciennete: 3,
      age: 61,
      hasRetirementAge: true,
      tamDuration: 12,
      cadreDuration: 24,
      categorie: CADRE
    },
    result: 1760
  },
  {
    title: "2k, 6ans d'ancienneté, 61ans, cadre, retraite possible",
    data: {
      ...initialData,
      anciennete: 6,
      age: 61,
      hasRetirementAge: true,
      tamDuration: 12,
      cadreDuration: 60,
      categorie: CADRE
    },
    result: 3680
  },
  {
    title: "2k, 10ans d'ancienneté, 61ans, cadre, retraite possible",
    data: {
      ...initialData,
      anciennete: 10,
      age: 61,
      hasRetirementAge: true,
      tamDuration: 0,
      cadreDuration: 120,
      categorie: CADRE
    },
    result: 8000
  }
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    it(title, () => {
      const salaireRef = getSalaireRef({ ...data });
      const { indemnite } = getIndemnite({
        salaireRef,
        ...data
      });
      const salaireRefConventionnel = getSalaireRefConventionnel({ ...data });

      const res = getIndemniteConventionnelle({
        salaireRef: salaireRefConventionnel,
        indemnite,
        ...data
      });
      expect(res.indemniteConventionnelle).toBe(result);
      expect(res.formula).toMatchSnapshot();
    });
  });
});
