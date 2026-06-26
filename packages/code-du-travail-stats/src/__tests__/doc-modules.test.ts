import { moduleOf } from "../doc-modules";

describe("moduleOf", () => {
  it("déduit le module depuis le segment après src/modules/", () => {
    expect(
      moduleOf(
        "packages/code-du-travail-frontend/src/modules/enterprise/EnterpriseAgreementSearch/accords/tracking.ts"
      )
    ).toBe("enterprise");
  });

  it("gère un fichier directement à la racine de src/modules/", () => {
    expect(
      moduleOf(
        "packages/code-du-travail-frontend/src/modules/recherche/tracking.ts"
      )
    ).toBe("recherche");
  });

  it("retire l'extension quand l'event vit dans un fichier à plat sous modules/", () => {
    expect(
      moduleOf("packages/code-du-travail-frontend/src/modules/glossary.tsx")
    ).toBe("glossary");
  });

  it("retombe sur 'divers' hors de src/modules/", () => {
    expect(
      moduleOf("packages/code-du-travail-frontend/src/api/something.ts")
    ).toBe("divers");
  });
});
