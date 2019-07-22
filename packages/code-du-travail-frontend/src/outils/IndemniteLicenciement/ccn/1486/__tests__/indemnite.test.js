import { ERROR_LABEL, getIndemniteConventionnelle } from "../indemnite";

const initialValues = {
  contrat: "cdi",
  fauteGrave: false,
  inaptitude: false,
  dateEntree: "2006-06-15",
  anciennete: 13.083333333333334,
  dateNotification: "2019-07-18",
  dateSortie: "2019-07-29",
  hasAbsenceProlonge: false,
  hasTempsPartiel: false,
  hasSameSalaire: true,
  salaires: [],
  salaire: "4500",
  branche: "1486"
};
const tests = [
  {
    title: "ETAM avec contrats précédents",
    data: {
      ...initialValues,
      brancheCategorie: "ETAM",
      hasBrancheContrat: true,
      brancheContrat: {
        indemnite: "200",
        duration: "12",
        considered: true
      }
    },
    result: 15643.75
  },
  {
    title: "ETAM avec contrats précédents et ajustement salaire",
    data: {
      ...initialValues,
      brancheCategorie: "ETAM",
      hasBrancheContrat: true,
      brancheContrat: {
        indemnite: "200",
        duration: "12",
        considered: true
      },
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: true,
      brancheNewRegularSalaire: "3000"
    },
    result: 10362.5
  },
  {
    title: "IC sans contrats précédents",
    data: {
      ...initialValues,
      brancheCategorie: "IC",
      hasBrancheContrat: false
    },
    result: 19625
  },
  {
    title: "CEI",
    data: {
      ...initialValues,
      brancheCategorie: "CEI",
      hasBrancheContrat: false,
      brancheAncienneteEnqueteur: "3",
      brancheAncienneteCE: "75"
    },
    result: 8325
  },
  {
    title: "CENI avec ajustement salaire",
    data: {
      ...initialValues,
      brancheCategorie: "CENI",
      brancheAncienneteEnqueteur: "4",
      brancheAncienneteCE: "75",
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: false,
      brancheNewIrregularSalaire: [
        {
          label: "juillet 2019",
          salary: 2300
        },
        {
          label: "juin 2019",
          salary: 2300
        },
        {
          label: "mai 2019",
          salary: 2300
        },
        {
          label: "avril 2019",
          salary: 2300
        },
        {
          label: "mars 2019",
          salary: 2300
        },
        {
          label: "février 2019",
          salary: 4000
        },
        {
          label: "janvier 2019",
          salary: 2300
        },
        {
          label: "décembre 2018",
          salary: 2300
        },
        {
          label: "novembre 2018",
          salary: 2300
        },
        {
          label: "octobre 2018",
          salary: 2300
        },
        {
          label: "septembre 2018",
          salary: 2300
        },
        {
          label: "août 2018",
          salary: 2300
        }
      ]
    },
    result: 6256.77
  }
];
describe("getIndemnite", () => {
  tests.forEach(({ title, data, result }) => {
    it(title, () => {
      const {
        indemniteConventionnelle,
        infoCalculConventionnel
      } = getIndemniteConventionnelle(data);
      expect(indemniteConventionnelle).toBe(result);
      expect(infoCalculConventionnel).toMatchSnapshot();
    });
  });
  it("should return an error for anciennete < 2", () => {
    const { error } = getIndemniteConventionnelle({
      ...initialValues,
      anciennete: 0.5,
      brancheCategorie: "ETAM",
      hasBrancheContrat: false
    });

    expect(error).toBe(ERROR_LABEL);
  });
});
