import {
  getIndemnite as getIndemniteConventionnelle,
  getSalaireRef as getSalaireRefConventionnel
} from "../indemnite";
import { getIndemnite, getSalaireRef } from "../../../indemnite";
import {
  CADRE,
  NON_CADRE,
  NE_SAIT_PAS,
  DISCIPLINAIRE,
  NON_DISCIPLINAIRE,
  ECONOMIQUE
} from "../Step";

const initialData = {
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
  hasTempsPartiel: false,
  categorie: NE_SAIT_PAS,
  motif: NON_DISCIPLINAIRE,
  dateEntree: "2018-10-01",
  dateSortie: "2019-09-01",
  anciennete: 0.91,
  branche: "2120",
  age: "55"
};

const tests = [
  {
    title: "2k, 12mois d’ancienneté",
    data: {
      ...initialData
    },
    result: 0
  },
  {
    title: "2k, 10ans et 8mois d’ancienneté, motif disciplinaire",
    data: {
      ...initialData,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      motif: DISCIPLINAIRE,
      anciennete: 10.667
    },
    result: 0
  },
  {
    title: "2k, 10ans et 8mois d’ancienneté, motif disciplinaire",
    data: {
      ...initialData,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      anciennete: 10.667
    },
    result: 7753.84
  },
  {
    title: "2k, 10ans et 8mois d’ancienneté, motif economique",
    data: {
      ...initialData,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      anciennete: 10.667,
      motif: ECONOMIQUE
    },
    result: 9692.3
  },
  {
    title: "2k, 19ans et 8mois d’ancienneté",
    data: {
      ...initialData,
      dateEntree: "2000-01-01",
      dateSortie: "2019-09-01",
      anciennete: 19.667
    },
    result: 16233.42
  },
  {
    title: "2k, 19ans et 8mois d’ancienneté, motif economique",
    data: {
      ...initialData,
      dateEntree: "2000-01-01",
      dateSortie: "2019-09-01",
      anciennete: 19.667,
      motif: ECONOMIQUE
    },
    result: 19846.15
  },
  {
    title: "2k, 20ans et 8mois d’ancienneté, cadre, embauche avant le 2000",
    data: {
      ...initialData,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
      anciennete: 20.667,
      categorie: CADRE
    },
    result: 17888.59
  },
  {
    title:
      "2k, 20ans et 8mois d’ancienneté, motif economique, embauche avant le 2000",
    data: {
      ...initialData,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
      anciennete: 20.667,
      motif: ECONOMIQUE,
      categorie: CADRE
    },
    result: 21692.3
  },
  {
    title: "2k, 20ans et 8mois d’ancienneté, non cadre, embauche avant le 2000",
    data: {
      ...initialData,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
      anciennete: 20.667,
      categorie: NON_CADRE
    },
    result: 17888.59
  },
  {
    title:
      "2k, 20ans et 8mois d’ancienneté, ne-sait-pas, embauche avant le 2000",
    data: {
      ...initialData,
      dateEntree: "1999-01-01",
      dateSortie: "2019-09-01",
      anciennete: 20.667,
      categorie: NE_SAIT_PAS
    },
    result: 17888.59
  }
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    it(title, () => {
      const salaireRef = getSalaireRefConventionnel({
        ...data
      });
      const res = getIndemniteConventionnelle({
        ...data,
        salaireRef
      });
      expect(res.indemniteConventionnelle).toBe(result);
      expect(res.formula).toMatchSnapshot();
    });
  });

  it("should return an error for anciennete < 2", () => {
    const salaireRef = getSalaireRef({ ...initialData });
    const { indemnite } = getIndemnite({
      salaireRef,
      ...initialData
    });
    const salaireRefConventionnel = getSalaireRefConventionnel({
      ...initialData
    });

    const res = getIndemniteConventionnelle({
      salaireRef: salaireRefConventionnel,
      indemnite,
      ...initialData
    });

    expect(res.error).toMatchInlineSnapshot(
      `"La convention collective prévoit une indemnité conventionnelle de licenciement à partir d’un an d’ancienneté"`
    );
  });
  it("should return an error for motif disciplinaire", () => {
    const salaireRef = getSalaireRef({ ...initialData });
    const { indemnite } = getIndemnite({
      salaireRef,
      ...initialData
    });
    const salaireRefConventionnel = getSalaireRefConventionnel({
      ...initialData
    });

    const res = getIndemniteConventionnelle({
      salaireRef: salaireRefConventionnel,
      indemnite,
      ...initialData,
      dateEntree: "2009-01-01",
      dateSortie: "2019-09-01",
      anciennete: 10.667,
      motif: DISCIPLINAIRE
    });

    expect(res.error).toMatchInlineSnapshot(
      `"La convention collective prévoit le droit à l’indemnité légale en cas de licenciement pour motif disciplinaire, sauf pour faute grave ou lourde"`
    );
  });
});
