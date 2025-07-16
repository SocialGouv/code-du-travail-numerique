import { IndemnitePrecaritePublicodes } from "../../../../publicodes/IndemnitePrecarite";

const engine = new IndemnitePrecaritePublicodes(modelsIndemnitePrecarite);

describe("Test de la fonctionnalité inéligibilité du 'calculate'", () => {
  const defaultSituation = {
    "contrat salarié . contractType": "'CDD'",
    "contrat salarié . type de cdd": "'Autres'",
    "contrat salarié . finContratPeriodeDessai": "non",
    "contrat salarié . propositionCDIFindeContrat": "non",
    "contrat salarié . refusCDIFindeContrat": "non",
    "contrat salarié . interruptionFauteGrave": "non",
    "contrat salarié . refusRenouvellementAuto": "non",
    "contrat salarié . cttFormation": "non",
    "contrat salarié . ruptureContratFauteGrave": "non",
    "contrat salarié . propositionCDIFinContrat": "non",
    "contrat salarié . refusSouplesse": "non",
  };
  test.each([
    {
      situation: {
        "contrat salarié . finContratPeriodeDessai": "oui",
      },
      expectedIneligibility:
        "Lorsque le CDD a été rompu pendant la période d’essai, le salarié en CDD n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . propositionCDIFindeContrat": "oui",
      },
      expectedIneligibility:
        "Le salarié en CDD qui est immédiatement embauché dans l’entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . refusCDIFindeContrat": "oui",
      },
      expectedIneligibility:
        "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente, n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . interruptionFauteGrave": "oui",
      },
      expectedIneligibility:
        "Lorsque le CDD est rompu de manière anticipée à l’initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . refusRenouvellementAuto": "oui",
      },
      expectedIneligibility:
        "Le salarié en CDD qui refuse le renouvellement de son CDD alors que son contrat prévoyait dès l’origine son renouvellement et ses modalités de renouvellement n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . contractType": "'CTT'",
        "contrat salarié . cttFormation": "oui",
      },
      expectedIneligibility:
        "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . contractType": "'CTT'",
        "contrat salarié . ruptureContratFauteGrave": "oui",
      },
      expectedIneligibility:
        "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l’initiative du salarié, pour faute grave du salarié ou en cas de force majeure, le salarié n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . contractType": "'CTT'",
        "contrat salarié . propositionCDIFinContrat": "oui",
      },
      expectedIneligibility:
        "Le salarié en contrat de travail temporaire (contrat d’intérim) qui est immédiatement embauché en CDI au sein de l’entreprise dans laquelle il effectuait sa mission n’a pas le droit à une prime de précarité.",
    },
    {
      situation: {
        "contrat salarié . contractType": "'CTT'",
        "contrat salarié . refusSouplesse": "oui",
      },
      expectedIneligibility:
        "Le salarié en contrat d’intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n’a pas le droit à une prime de précarité.",
    },
  ])(
    "Vérifier l'inéligibilité pour: $situation",
    ({ situation, expectedIneligibility }) => {
      const result = engine.calculate({ ...defaultSituation, ...situation });
      expect(result).toIneligibilityBeEqual(expectedIneligibility);
    }
  );
});
