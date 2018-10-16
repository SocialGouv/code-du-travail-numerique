import { filterDocs, getDocsByTag, getNextQuestion } from "./decision";

import docs from "./data/faq.json";

describe("tags wizard", () => {
  describe("filterDocs", () => {
    it("empty filter should not filter docs", () => {
      const filtered = filterDocs(docs);
      expect(filtered.length).toEqual(docs.length);
    });
    it("simple filter should filter docs", () => {
      const filtered = filterDocs(docs, {
        branche: "boulangerie"
      });
      expect(filtered.length).toEqual(7);
    });
    it("complex filter should filter docs", () => {
      const filtered = filterDocs(docs, {
        branche: "boulangerie",
        theme: "periode d'essai"
      });
      expect(filtered.length).toEqual(1);
    });
  });

  describe("getDocsByTag", () => {
    it("should produce", () => {
      const expected = [
        {
          count: 10,
          documents: 37,
          score: 12.417233560090706,
          tag: "branche",
          values: {
            "assistance maternelle": 4,
            batiment: 5,
            boulangerie: 7,
            "commerce alimentaire": 3,
            garages: 5,
            "hotellerie - restauration": 1,
            "hotellerie restauration": 1,
            metallurgie: 4,
            nettoyage: 5,
            "transports routiers": 2
          },
          variance: 3.4099999999999993
        },
        {
          count: 12,
          documents: 51,
          score: 5.329690501600854,
          tag: "theme",
          values: {
            commercial: 1,
            congés: 3,
            "contrat et embauche": 9,
            "durée du travail": 11,
            "heures supplémentaires": 1,
            "indémnités de déplacement": 1,
            maladie: 4,
            "periode d'essai": 2,
            primes: 2,
            salaire: 14,
            "temps de travail": 1,
            "travail de nuit": 2
          },
          variance: 18.520833333333332
        },
        {
          count: 1,
          documents: 1,
          score: 1,
          tag: "CCNobligatoire",
          values: { true: 1 },
          variance: 0
        },
        {
          count: 3,
          documents: 41,
          score: 0.9940863394441157,
          tag: "usager",
          values: { employeur: 4, employé: 33, "particulier employeur": 4 },
          variance: 186.8888888888889
        },
        {
          count: 2,
          documents: 4,
          score: 2,
          tag: "contrat",
          values: { cdd: 1, cdi: 3 },
          variance: 1
        }
      ];

      expect(getDocsByTag(docs)).toEqual(expected);
    });
  });
  describe("getNextQuestion", () => {
    const tests = [
      {
        filters: {},
        expected: "branche"
      },
      {
        filters: { usager: "employé" },
        expected: "branche"
      },
      {
        filters: { branche: "metallurgie" },
        expected: "theme"
      },
      {
        filters: { branche: "metallurgie", theme: "contrat" },
        expected: "contrat"
      },
      {
        filters: { usager: "employé", theme: "contrat" },
        expected: "branche"
      },
      {
        filters: { branche: "metallurgie", theme: "contrat" },
        expected: "contrat"
      },
      {
        filters: {
          branche: "metallurgie",
          theme: "contrat",
          usager: "employé"
        },
        expected: "contrat"
      }
    ];
    tests.forEach(test => {
      it(`should ask ${test.expected} for filter=${JSON.stringify(
        test.filters
      )}`, () => {
        const question = getNextQuestion(docs, test.filters);
        expect(question.tag).toEqual(test.expected);
      });
    });
  });

  describe("tree", () => {
    it("should work", () => {
      let question;
      let schema = ``;
      let counter = 1;
      //const entities = ``;
      //const tree = { title: "root", children: [] };
      const filter = {};
      while ((question = getNextQuestion(docs, filter))) {
        console.log(filter, question);
        let q = ``;
        Object.keys(question.values).forEach(reponse => {
          q += `${question.tag}-|${reponse}|->\n`;
          filter[question.tag] = reponse;
        });
        schema += q;
      }
      console.log(schema);

      //const question = getNextQuestion(docs, {});
      //console.log(question);
    });
  });
});
