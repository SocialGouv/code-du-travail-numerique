import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecaritePublicodes";
import {
  getIndemnitePrecariteIneligibilityReferences,
  INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE,
  INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE,
} from "../../ineligibility-indemnite-precarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

const situationCdd = {
  "contrat salarié . type de contrat": "'CDD'",
  "contrat salarié . type de cdd": "'Autres'",
  "contrat salarié . salaire de référence": "3000",
};

const situationCtt = {
  ...situationCdd,
  "contrat salarié . type de contrat": "'CTT'",
};

const REFERENCE_CDD = {
  article: "Article L1243-10 du code du travail",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901221",
};

const REFERENCE_CTT = {
  article: "Article L1251-33 du code du travail",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019869550",
};

describe("Inéligibilité à l'indemnité de précarité (CDD)", () => {
  test.each([
    // Type de contrat exclu (étape 3, option « Autres »)
    {
      cas: "type de contrat exclu",
      situation: { "contrat salarié . type de contrat": "'Exclu'" },
    },
    // Contrat allé à son terme
    {
      cas: "embauche en CDI à l'issue du contrat",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'embauche cdi'",
      },
    },
    {
      cas: "refus d'un CDI équivalent",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'refus cdi équivalent'",
      },
    },
    {
      cas: "refus de la souplesse prévue au contrat de mission",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'refus souplesse'",
      },
    },
    // Rupture anticipée
    {
      cas: "rupture pendant la période d'essai",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'période d'essai'",
      },
    },
    {
      cas: "rupture pour force majeure",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'force majeure'",
      },
    },
    {
      cas: "rupture pour faute grave",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'faute grave'",
      },
    },
    {
      cas: "rupture en cas d'embauche en CDI dans une autre entreprise",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'embauche cdi autre entreprise'",
      },
    },
  ])("Pas d'indemnité : $cas", ({ situation }) => {
    const result = engine.calculate({ ...situationCdd, ...situation });
    expect(result).toIneligibilityBeEqual(
      INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE
    );
  });

  test("Indemnité due : contrat allé à son terme avec une autre issue", () => {
    const result = engine.calculate({
      ...situationCdd,
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test.each([
    {
      cas: "rupture pour inaptitude prononcée par le médecin du travail",
      issue: "'inaptitude'",
    },
    {
      cas: "rupture d'un commun accord entre l'employeur et le salarié",
      issue: "'commun accord'",
    },
  ])("Indemnité due malgré la rupture anticipée : $cas", ({ issue }) => {
    const result = engine.calculate({
      ...situationCdd,
      "contrat salarié . fin à la date prévue": "'non'",
      "contrat salarié . issue du contrat": issue,
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Seuls quatre cadres de rupture anticipée disqualifient", () => {
    const cadresDisqualifiants = [
      "'période d'essai'",
      "'force majeure'",
      "'faute grave'",
      "'embauche cdi autre entreprise'",
    ];

    cadresDisqualifiants.forEach((issue) => {
      const result = engine.calculate({
        ...situationCdd,
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": issue,
      });
      expect(result).toIneligibilityBeEqual(
        INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE
      );
    });
  });
});

describe("Inéligibilité à l'indemnité de fin de mission (CTT)", () => {
  test.each([
    {
      cas: "embauche en CDI par l'entreprise utilisatrice",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'embauche cdi'",
      },
    },
    {
      cas: "refus de la souplesse prévue au contrat de mission",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'refus souplesse'",
      },
    },
    {
      cas: "rupture pendant la période d'essai",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'période d'essai'",
      },
    },
  ])("Pas d'indemnité de fin de mission : $cas", ({ situation }) => {
    const result = engine.calculate({ ...situationCtt, ...situation });
    expect(result).toIneligibilityBeEqual(
      INDEMNITE_FIN_MISSION_INELIGIBILITY_MESSAGE
    );
  });

  test("Un contrat allé à son terme avec une autre issue ouvre droit à l'indemnité de fin de mission", () => {
    const result = engine.calculate({
      ...situationCtt,
      "contrat salarié . fin à la date prévue": "'oui'",
      "contrat salarié . issue du contrat": "'autre'",
    });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Une rupture pour inaptitude ouvre droit à l'indemnité de fin de mission", () => {
    const result = engine.calculate({
      ...situationCtt,
      "contrat salarié . fin à la date prévue": "'non'",
      "contrat salarié . issue du contrat": "'inaptitude'",
    });
    expect(result).toResultBeEqual(300, "€");
  });
});

describe("Références juridiques de l'écran sans indemnité", () => {
  test("Le CDD renvoie vers l'article L1243-10", () => {
    expect(getIndemnitePrecariteIneligibilityReferences(situationCdd)).toEqual([
      REFERENCE_CDD,
    ]);
  });

  test("Le CTT renvoie uniquement vers l'article L1251-33", () => {
    expect(getIndemnitePrecariteIneligibilityReferences(situationCtt)).toEqual([
      REFERENCE_CTT,
    ]);
  });

  test("Un contrat exclu suit le régime du CDD", () => {
    expect(
      getIndemnitePrecariteIneligibilityReferences({
        "contrat salarié . type de contrat": "'Exclu'",
      })
    ).toEqual([REFERENCE_CDD]);
  });
});
