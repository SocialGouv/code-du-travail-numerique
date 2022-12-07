import fs from "fs";
import path from "path";
import Engine from "publicodes";
import { parse } from "yaml";

import { getFormule } from "../formula";

const parseData = (filename: string): any =>
  parse(
    fs.readFileSync(path.resolve(__dirname, `./data/${filename}`)).toString()
  );

describe("Formula", () => {
  let engine: Engine = new Engine({});
  describe("une règle simple avec une formule", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_simple.yaml"));
    });

    test("doit afficher la formule attachée à la règle active", () => {
      const situation = engine.setSituation({});
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("Prix * Quantité");
      expect(formule.explanations).toEqual([
        "Prix (18 €)",
        "Quantité (12 litres)",
      ]);
    });
  });

  describe("plusieurs règles actives avec chacune sa formule", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_plusieurs_regles_actives.yaml"));
    });

    test("doit récupérer la dernière formule par ordre d'apparition dans le YAML", () => {
      const situation = engine.setSituation({
        participants: 5,
      });
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("Prix * Quantité * Participants");
      expect(formule.explanations).toEqual([
        "Participant (5 personnes)",
        "Prix (18 €)",
        "Quantité (12 litres)",
      ]);
    });
  });

  describe("plusieurs règles actives avec la dernière règle contenant le flag $formule", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_flag_$formule.yaml"));
    });

    test("doit remplacer $formule par la précédente règle active par ordre d'apparition dans le YAML", () => {
      const situation = engine.setSituation({
        tva: 20,
      });
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("Prix * Quantité * TVA");
      expect(formule.explanations).toEqual([
        "Prix (18 €)",
        "Quantité (12 litres)",
        "TVA (20 pourcents)",
      ]);
    });
  });

  describe("règle active contenant des explications mais avec l'unité manquante sur la valeur d'une explication", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_unite_manquante.yaml"));
    });

    test("doit remonter une erreur avec le nom de la règle où manque l'unité", () => {
      const situation = engine.setSituation({});
      expect(() => {
        getFormule(situation, null);
      }).toThrow(/L'unité est manquante pour la règle 'panier . quantité'/);
    });
  });

  describe("règle contenant des annotations", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_avec_annotations.yaml"));
    });

    test("doit remonter les annotations", () => {
      const situation = engine.setSituation({});
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("20% * Prix * Quantité");
      expect(formule.explanations).toEqual([
        "Prix (18 €)",
        "Quantité (12 litres)",
      ]);
      expect(formule.annotations).toEqual(["20% de majoration"]);
    });
  });

  describe("règle contenant un non applicable", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_avec_non_applicable.yaml"));
    });

    test("doit remonter les annotations par défaut", () => {
      const situation = engine.setSituation({
        dimanche: "non",
      });
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("20% * Prix * Quantité");
      expect(formule.explanations).toEqual([
        "Prix (18 €)",
        "Quantité (12 litres)",
      ]);
      expect(formule.annotations).toEqual(["20% de majoration"]);
    });

    test("doit remonter les annotations si non applicable", () => {
      const situation = engine.setSituation({
        dimanche: "oui",
      });
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("20% * Prix * Quantité");
      expect(formule.explanations).toEqual([
        "Majoration (30 €)",
        "Prix (18 €)",
        "Quantité (12 litres)",
      ]);
      expect(formule.annotations).toEqual([
        "20% de majoration",
        "On est le dimanche",
      ]);
    });
  });

  describe("règle contenant des 0 dans le résultat", () => {
    beforeEach(() => {
      engine = new Engine(parseData("formule_avec_zero.yaml"));
    });

<<<<<<< HEAD
    test("doit afficher toutes les parties de la formule si elles sont positives", () => {
      const situation = engine.setSituation({
        ["frais de livraison"]: "2",
      });
      const formule = getFormule(situation, null);

      expect(formule.formula).toEqual("A + 20% * A1 * A2 + A3 + A4");
      expect(formule.explanations).toEqual([
        "A1 : Prix (18 €)",
        "A2 : Quantité (12 litres)",
        "A3 : Frais bancaire (1 €)",
        "A4 : Frais de livraison (2 €)",
      ]);
    });
    test("doit cacher les parties de la formule qui valent 0", () => {
=======
    test("doit remonter les annotations par défaut", () => {
>>>>>>> feat/indemnite-licenciement
      const situation = engine.setSituation({
        ["frais de livraison"]: "0",
      });
      const formule = getFormule(situation, null);

<<<<<<< HEAD
      expect(formule.formula).toEqual("A + 20% * A1 * A2 + A3");
=======
      expect(formule.formula).toEqual("20% * A1 * A2 + A3");
>>>>>>> feat/indemnite-licenciement
      expect(formule.explanations).toEqual([
        "A1 : Prix (18 €)",
        "A2 : Quantité (12 litres)",
        "A3 : Frais bancaire (1 €)",
      ]);
<<<<<<< HEAD
=======
      expect(formule.annotations).toEqual(["20% de majoration"]);
>>>>>>> feat/indemnite-licenciement
    });
  });
});
