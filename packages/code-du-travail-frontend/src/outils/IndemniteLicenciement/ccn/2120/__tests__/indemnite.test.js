import { getIndemnite, getSalaireRef } from "../../../indemnite";
import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel,
} from "../indemnite";
import {
  CADRE,
  DISCIPLINAIRE,
  ECONOMIQUE,
  NE_SAIT_PAS,
  NON_CADRE,
  NON_DISCIPLINAIRE,
} from "../Step";

const initialValues = {
  age: "55",
  anciennete: 0.91,
  branche: "2120",
  categorie: NE_SAIT_PAS,
  dateEntree: "2018-10-01",
  dateSortie: "2019-09-01",
  hasTempsPartiel: false,
  motif: NON_DISCIPLINAIRE,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
};

const tests = [
  {
    data: {
      ...initialValues,
    },
    result: 0,
    title: "2k, 12mois d'ancienneté",
  },
  {
    data: {
      ...initialValues,
      anciennete: 10.667,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      motif: DISCIPLINAIRE,
    },
    result: 0,
    title: "2k, 10ans et 8mois d'ancienneté, motif disciplinaire",
  },
  {
    data: {
      ...initialValues,
      anciennete: 10.667,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
    },
    result: 7753.84,
    title: "2k, 10ans et 8mois d'ancienneté, motif non disciplinaire",
  },
  {
    data: {
      ...initialValues,
      anciennete: 10.667,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      motif: ECONOMIQUE,
    },
    result: 9692.3,
    title: "2k, 10ans et 8mois d'ancienneté, motif economique",
  },
  {
    data: {
      ...initialValues,
      anciennete: 19.667,
      dateEntree: "2000-01-01",
      dateSortie: "2019-09-01",
    },
    result: 16233.42,
    title: "2k, 19ans et 8mois d'ancienneté",
  },
  {
    data: {
      ...initialValues,
      anciennete: 19.667,
      dateEntree: "2000-01-01",
      dateSortie: "2019-09-01",
      motif: ECONOMIQUE,
    },
    result: 19846.15,
    title: "2k, 19ans et 8mois d'ancienneté, motif economique",
  },
  {
    data: {
      ...initialValues,
      anciennete: 20.667,
      categorie: CADRE,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
    },
    result: 17888.59,
    title: "2k, 20ans et 8mois d'ancienneté, cadre, embauche avant le 2000",
  },
  {
    data: {
      ...initialValues,
      anciennete: 20.667,
      categorie: CADRE,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
      motif: ECONOMIQUE,
    },
    result: 21692.3,
    title:
      "2k, 20ans et 8mois d'ancienneté, motif economique, embauche avant le 2000",
  },
  {
    data: {
      ...initialValues,
      anciennete: 20.667,
      categorie: NON_CADRE,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
    },
    result: 17888.59,
    title: "2k, 20ans et 8mois d'ancienneté, non cadre, embauche avant le 2000",
  },
  {
    data: {
      ...initialValues,
      anciennete: 20.667,
      categorie: NE_SAIT_PAS,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
    },
    result: 17888.59,
    title:
      "2k, 20ans et 8mois d'ancienneté, ne-sait-pas, embauche avant le 2000",
  },
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    it(title, () => {
      const salaireRef = getSalaireRefConventionnel({
        ...data,
      });
      const res = getIndemniteConventionnelle({
        ...data,
        salaireRef,
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
      `"La convention collective prévoit une indemnité conventionnelle de licenciement à partir d'un an d'ancienneté"`
    );
  });
  it("should return an error for motif disciplinaire", () => {
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
      anciennete: 10.667,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      motif: DISCIPLINAIRE,
    });

    expect(res.error).toMatchInlineSnapshot(
      `"La convention collective prévoit le droit à l’indemnité légale en cas de licenciement pour motif disciplinaire, sauf pour faute grave ou lourde"`
    );
  });
});
