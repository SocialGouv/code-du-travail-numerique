import { DismissalReasonDefault } from "../dismissal-reason";

describe("DismissalReasonDefault", () => {
  let dismissalReason = new DismissalReasonDefault();

  beforeEach(() => {
    dismissalReason = new DismissalReasonDefault();
  });

  describe("dismissalTypes", () => {
    test("should return an empty array", () => {
      const result = dismissalReason.dismissalTypes();
      expect(result).toEqual([]);
    });
  });

  describe("getDismissalRules", () => {
    test("should return an empty array", () => {
      const result = dismissalReason.getDismissalRules();
      expect(result).toEqual([]);
    });

    test("should return an array with one rule", () => {
      dismissalReason.dismissalTypes = jest.fn().mockReturnValue([
        {
          name: "autre licenciement",
          rules: [
            {
              rule: "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique",
              value: "'Non'",
            },
          ],
        },
      ]);
      const result = dismissalReason.getDismissalRules();
      expect(result).toEqual([
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique",
      ]);
    });

    test("should return an array with two rules which are the same", () => {
      dismissalReason.dismissalTypes = jest.fn().mockReturnValue([
        {
          name: "autre licenciement",
          rules: [
            {
              rule: "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question",
              value: "'Non'",
            },
          ],
        },
        {
          name: "licenciement éco",
          rules: [
            {
              rule: "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question",
              value: "'Oui'",
            },
          ],
        },
      ]);
      const result = dismissalReason.getDismissalRules();
      expect(result).toEqual([
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question",
      ]);
    });

    test("should return an array for a more complex example", () => {
      dismissalReason.dismissalTypes = jest.fn().mockReturnValue([
        {
          name: "Incapacité définitive à la conduite entraînant le retrait du permis de conduire pour inaptitude physique constatée par une commission médicale départementale",
          rules: [
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
              value: "'Oui'",
            },
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
              value: "'Oui'",
            },
          ],
        },
        {
          name: "Incapacité temporaire à la conduite",
          rules: [
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
              value: "'Oui'",
            },
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
              value: "'Non'",
            },
          ],
        },
        {
          name: "Autres licenciements",
          rules: [
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
              value: "'Non'",
            },
            {
              rule: "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
              value: "'Non'",
            },
          ],
        },
      ]);
      const result = dismissalReason.getDismissalRules();
      expect(result).toEqual([
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite",
        "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive",
      ]);
    });
  });
});
