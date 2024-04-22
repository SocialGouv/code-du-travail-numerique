import { mergePreavisRetraiteModels } from "../../internal/merger";
import PreavisRetraitePublicodes from "../PreavisRetraitePublicodes";

const partialSituation = [
  {
    name: "contrat salarié . convention collective",
    rawNode: {
      nom: "contrat salarié . convention collective",
      "par défaut": "''",
      question: "Quelle est votre convention collective ?",
      titre: "Convention collective",
    },
    value: "''",
  },
  {
    name: "contrat salarié . mise à la retraite",
    rawNode: {
      cdtn: {
        type: "liste",
        valeurs: {
          "Départ à la retraite": "non",
          "Mise à la retraite": "oui",
        },
      },
      nom: "contrat salarié . mise à la retraite",
      question:
        "L’employeur a-t-il décidé de lui-même de mettre à la retraite le salarié par une décision adressée à celui-ci ?",
      titre: "Origine du départ à la retraite",
    },
    value: "oui",
  },
  {
    name: "contrat salarié . travailleur handicapé",
    rawNode: {
      cdtn: { type: "oui-non" },
      nom: "contrat salarié . travailleur handicapé",
      question:
        "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?",
      titre: "Travailleur handicapé",
    },
    value: "non",
  },
];

const ancienneteSituation = {
  name: "contrat salarié . ancienneté",
  rawNode: {
    cdtn: {
      type: "entier",
    },
    nom: "contrat salarié . ancienneté",
    question: "Quel est votre ancienneté en mois ?",
    titre: "Ancienneté du salarié",
    unité: "mois",
  },
  value: "24",
};

describe("PreavisRetraitePublicodes::class", () => {
  const publicodes = new PreavisRetraitePublicodes(
    mergePreavisRetraiteModels()
  );

  it("doit mettre à jour la situation", () => {
    publicodes.setSituation({
      "contrat salarié . convention collective": "''",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    expect(publicodes.data.situation).toEqual(partialSituation);
  });

  it("doit retourner l'information manquante sur l'ancienneté", () => {
    expect(publicodes.data.missingArgs).toHaveLength(1);
    expect(publicodes.data.missingArgs[0].name).toBe(
      "contrat salarié - ancienneté"
    );
  });
  it("ne doit pas retourner de résultat", () => {
    expect(publicodes.data.result.value).toBe(undefined);
  });

  it("doit mettre à jour la situation avec l'ancienneté", () => {
    publicodes.setSituation({
      "contrat salarié . ancienneté": "24",
      "contrat salarié . convention collective": "''",
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    expect(publicodes.data.situation).toEqual(
      partialSituation.concat(ancienneteSituation)
    );
  });

  it("ne doit retourner aucunes informations manquantes", () => {
    expect(publicodes.data.missingArgs).toHaveLength(0);
  });

  it("doit retourner le résultat", () => {
    expect(publicodes.data.result).toEqual({
      unit: "mois",
      value: 2,
      valueInDays: 60.833333333333336,
    });
  });
});
