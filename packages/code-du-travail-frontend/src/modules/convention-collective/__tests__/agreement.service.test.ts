/** @jest-environment node */

import { searchAgreement } from "../agreement.service";
import { nafError } from "../error";

describe("Test messages erreur api cc", () => {
  it("Vérifier l'affichage du message d'erreur pour les mauvais code Naf", async () => {
    try {
      await searchAgreement("1234A");
    } catch (e) {
      expect(e).toEqual(nafError);
    }
  });

  it("Vérifier l'affichage du message d'erreur concernant du format du code", async () => {
    try {
      await searchAgreement("12345366");
    } catch (e) {
      expect(e).toEqual(
        "Numéro d’indentification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement."
      );
    }
  });
});
