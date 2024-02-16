import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro3239 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3239"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier l'ineligibilite Anciennete legal inférieur 9 mois", () => {
    const { result, missingArgs, ineligibility } = engine.calculate({
      "contrat salarié . convention collective": "'IDCC3239'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
        "2000",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/05/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . licenciement pour faute grave":
        "non",
      "contrat salarié . indemnité de licenciement . type du contrat de travail":
        "'cdi'",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(0);
    expect(ineligibility).toEqual(
      "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 9 mois."
    );
  });
  test("Vérifier l'ineligibilite Anciennete legal inférieur 9 mois bis", () => {
    const { result, missingArgs, ineligibility } = engine.calculate({
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
        "'Assistant maternel'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement":
        "'Non'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
        "3000",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/06/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/06/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . licenciement pour faute grave":
        "non",
      "contrat salarié . indemnité de licenciement . type du contrat de travail":
        "'cdi'",
    });
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(0);
    expect(ineligibility).toEqual(
      "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 9 mois."
    );
  });
});
