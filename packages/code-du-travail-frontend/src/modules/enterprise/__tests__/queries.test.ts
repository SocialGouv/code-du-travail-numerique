/** @jest-environment node */

import { searchEnterprises } from "../queries";

describe("Test messages erreur api entreprise", () => {
  it("Vérifier l'affichage du message d'erreur siren/siret", async () => {
    try {
      await searchEnterprises({ query: "123" });
    } catch (e) {
      expect(e).toEqual(
        "Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide"
      );
    }
  });

  it("Vérifier l'affichage du message d'erreur 14 chiffres obligatoire", async () => {
    try {
      await searchEnterprises({ query: "123436663636" });
    } catch (e) {
      expect(e).toEqual(
        "Veuillez indiquer un numéro Siret (14 chiffres obligatoire)"
      );
    }
  });

  it("Vérifier l'affichage du message d'erreur pas de lettre", async () => {
    try {
      await searchEnterprises({ query: "A23436663636366" });
    } catch (e) {
      expect(e).toEqual(
        "Veuillez indiquer un numéro Siret (14 chiffres uniquement)"
      );
    }
  });
});
