import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecaritePublicodes";
import { INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE } from "../../ineligibility-indemnite-precarite";

/**
 * Les conventions collectives ajoutent des types de CDD et des taux, mais
 * jamais de critère d'exclusion propre (issue #7436). Ce test garantit que
 * les exclusions légales s'appliquent identiquement aux CDD conventionnels.
 */
const CDD_CONVENTIONNELS: { idcc: string; typeCdd: string }[] = [
  { idcc: "1090", typeCdd: "usage convoyeurs" },
  { idcc: "1486", typeCdd: "usage enquêteurs vacataires" },
  { idcc: "1486", typeCdd: "usage intervention évènementiel" },
  { idcc: "1516", typeCdd: "usage formateurs" },
  { idcc: "2098", typeCdd: "usage intervention évènementiel" },
  { idcc: "2098", typeCdd: "optimisation linéaire" },
  { idcc: "2098", typeCdd: "animation commerciale" },
  { idcc: "2511", typeCdd: "usage intervention sport" },
  { idcc: "3127", typeCdd: "usage mission ponctuelle" },
];

describe("Exclusions conventionnelles de l'indemnité de précarité", () => {
  test.each(CDD_CONVENTIONNELS)(
    "IDCC $idcc / $typeCdd : pas d'indemnité en cas de rupture anticipée à l'initiative du salarié",
    ({ idcc, typeCdd }) => {
      const engine = new IndemnitePrecaritePublicodes(
        modelsIndemnitePrecarite,
        idcc
      );
      const result = engine.calculate({
        "contrat salarié . convention collective": `'IDCC${idcc.padStart(4, "0")}'`,
        "contrat salarié . salaire de référence": "3000",
        "contrat salarié . type de contrat": "'CDD'",
        "contrat salarié . type de cdd": `'${typeCdd}'`,
        "contrat salarié . fin à la date prévue": "'non'",
        "contrat salarié . issue du contrat": "'initiative salarié'",
      });
      expect(result).toIneligibilityBeEqual(
        INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE
      );
    }
  );

  test.each(CDD_CONVENTIONNELS)(
    "IDCC $idcc / $typeCdd : pas d'indemnité en cas d'embauche en CDI à l'issue du contrat",
    ({ idcc, typeCdd }) => {
      const engine = new IndemnitePrecaritePublicodes(
        modelsIndemnitePrecarite,
        idcc
      );
      const result = engine.calculate({
        "contrat salarié . convention collective": `'IDCC${idcc.padStart(4, "0")}'`,
        "contrat salarié . salaire de référence": "3000",
        "contrat salarié . type de contrat": "'CDD'",
        "contrat salarié . type de cdd": `'${typeCdd}'`,
        "contrat salarié . fin à la date prévue": "'oui'",
        "contrat salarié . issue du contrat": "'embauche cdi'",
      });
      expect(result).toIneligibilityBeEqual(
        INDEMNITE_PRECARITE_INELIGIBILITY_MESSAGE
      );
    }
  );
});
