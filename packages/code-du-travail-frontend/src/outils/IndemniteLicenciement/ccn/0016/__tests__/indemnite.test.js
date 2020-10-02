import { getIndemnite, getSalaireRef } from "../../../indemnite";
import { CADRE, OUVRIER, TAM } from "../Categorie";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel,
} from "../indemnite";

const initialValues = {
  age: "55",
  anciennete: 1,
  categorie: OUVRIER,
  hasTempsPartiel: false,
  indemnite: 500,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
};
const tests = [
  {
    data: {
      ...initialValues,
    },
    result: 0,
    title: "2k, 12mois d'ancienneté, 55ans, ouvrier",
  },
  {
    data: {
      ...initialValues,
      anciennete: 2,
    },
    result: 400,
    title: "2k, 24mois d'ancienneté, 55ans, ouvrier",
  },
  {
    data: {
      ...initialValues,
      age: 61,
      anciennete: 2,
      hasRetirementAge: true,
    },
    result: 320,
    title: "2k, 24mois d'ancienneté, 61ans, ouvrier, retraite possible",
  },
  {
    data: {
      ...initialValues,
      anciennete: 3,
    },
    result: 1200,
    title: "2k, 36mois d'ancienneté, 55ans, ouvrier",
  },
  {
    data: {
      ...initialValues,
      anciennete: 2,
      categorie: TAM,
    },
    result: 400,
    title: "2k, 24mois d'ancienneté, 55ans, TAM",
  },
  {
    data: {
      ...initialValues,
      anciennete: 3,
      categorie: TAM,
    },
    result: 1800,
    title: "2k, 36mois d'ancienneté, 55ans, TAM",
  },
  {
    data: {
      ...initialValues,
      anciennete: 2,
      categorie: CADRE,
    },
    result: 500,
    title: "2k, 24mois d'ancienneté, 55ans, cadre",
  },
  {
    data: {
      ...initialValues,
      anciennete: 3,
      cadreDuration: 24,
      categorie: "cadre",
      tamDuration: 12,
    },
    result: 2200,
    title: "2k, 36mois d'ancienneté, 55ans, cadre",
  },
  {
    data: {
      ...initialValues,
      age: 61,
      anciennete: 3,
      cadreDuration: 24,
      categorie: CADRE,
      hasRetirementAge: true,
      tamDuration: 12,
    },
    result: 1760,
    title: "2k, 36mois d'ancienneté, 61ans, cadre, retraite possible",
  },
  {
    data: {
      ...initialValues,
      age: 61,
      anciennete: 6,
      cadreDuration: 60,
      categorie: CADRE,
      hasRetirementAge: true,
      tamDuration: 12,
    },
    result: 3680,
    title: "2k, 6ans d'ancienneté, 61ans, cadre, retraite possible",
  },
  {
    data: {
      ...initialValues,
      age: 61,
      anciennete: 10,
      cadreDuration: 120,
      categorie: CADRE,
      hasRetirementAge: true,
      tamDuration: 0,
    },
    result: 8000,
    title: "2k, 10ans d'ancienneté, 61ans, cadre, retraite possible",
  },
  {
    data: {
      ...initialValues,
      age: 64,
      anciennete: 10.3,
      cadreDuration: 120,
      categorie: CADRE,
      hasRetirementAge: true,
      tamDuration: 5,
    },
    result: 5650,
    title: "2k, 10ans d'ancienneté, 61ans, cadre, retraite possible",
  },
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    //eslint-disable-next-line jest/valid-title
    it(title, () => {
      const salaireRef = getSalaireRef({ ...data });
      const { indemnite } = getIndemnite({
        salaireRef,
        ...data,
      });
      const salaireRefConventionnel = getSalaireRefConventionnel({ ...data });

      const res = getIndemniteConventionnelle({
        indemnite,
        salaireRef: salaireRefConventionnel,
        ...data,
      });
      expect(res.indemniteConventionnelle).toBe(result);
      expect(res.infoCalculConventionnel).toMatchSnapshot();
    });
  });
  it("should return an error for anciennete < 2", () => {
    const salaireRef = getSalaireRef({ ...initialValues });
    const { indemnite } = getIndemnite({
      salaireRef,
      ...initialValues,
    });
    const salaireRefConventionnel = getSalaireRefConventionnel({
      ...initialValues,
    });

    const res = getIndemniteConventionnelle({
      indemnite,
      salaireRef: salaireRefConventionnel,
      ...initialValues,
    });

    expect(res.error).toMatchInlineSnapshot(
      `"Aucune indemnité de licenciement n’est prévue en deçà de 2 ans d’ancienneté."`
    );
  });
});
