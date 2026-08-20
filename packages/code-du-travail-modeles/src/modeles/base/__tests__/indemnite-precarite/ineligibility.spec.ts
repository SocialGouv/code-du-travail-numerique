import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecaritePublicodes";
import { INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE } from "../../ineligibility-indemnite-precarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

const situationDeBase = {
  "contrat salarié . type de contrat": "'CDD'",
  "contrat salarié . type de cdd": "'Autres'",
  "contrat salarié . salaire de référence": "3000",
};

describe("Inéligibilité à l'indemnité de précarité", () => {
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
      cas: "rupture anticipée pour force majeure",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'force majeure'",
      },
    },
    {
      cas: "rupture anticipée pour faute grave",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'faute grave'",
      },
    },
    {
      cas: "rupture anticipée à l'initiative du salarié",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'initiative salarié'",
      },
    },
  ])("Pas d'indemnité : $cas", ({ situation }) => {
    const result = engine.calculate({ ...situationDeBase, ...situation });
    expect(result).toIneligibilityBeEqual(
      INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE
    );
  });

  test.each([
    {
      cas: "contrat allé à son terme avec une autre issue",
      situation: {
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'autre'",
      },
    },
    {
      cas: "rupture anticipée avec une autre issue",
      situation: {
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'autre'",
      },
    },
  ])("Indemnité due : $cas", ({ situation }) => {
    const result = engine.calculate({ ...situationDeBase, ...situation });
    expect(result).toResultBeEqual(300, "€");
  });

  test("Les issues d'un contrat allé à son terme ne disqualifient pas une rupture anticipée", () => {
    const result = engine.calculate({
      ...situationDeBase,
      "contrat salarié . fin à la date prévue": "'non'",
      "contrat salarié . issue du contrat": "'embauche cdi'",
    });
    expect(result).toResultBeEqual(300, "€");
  });
});
