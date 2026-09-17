import { SMIC_PROXIMITY_MARGIN } from "../constants";
import { selectContextualMessage } from "../contextualMessage";

/** SMIC net avant impôt mesuré sur l'API URSSAF. */
const SMIC_NET = 1455.99;
const THRESHOLD = SMIC_NET * (1 + SMIC_PROXIMITY_MARGIN);

describe("selectContextualMessage", () => {
  it("propose le salaire minimum sous le seuil", () => {
    expect(
      selectContextualMessage({
        salaireNetMensuel: 1200,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("salaire-minimum");
  });

  it("propose le salaire minimum exactement au seuil", () => {
    expect(
      selectContextualMessage({
        salaireNetMensuel: THRESHOLD,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("salaire-minimum");
  });

  it("bascule sur les primes conventionnelles juste au-dessus du seuil", () => {
    expect(
      selectContextualMessage({
        salaireNetMensuel: THRESHOLD + 0.01,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("primes-conventionnelles");
  });

  it("propose les primes conventionnelles pour un salaire confortable", () => {
    expect(
      selectContextualMessage({
        salaireNetMensuel: 2253.9,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("primes-conventionnelles");
  });

  it("compare bien net à net, et non net à brut", () => {
    // Le SMIC brut vaut 1 867,02 € : comparé à lui, un net de 1 700 € passerait
    // pour un salaire proche du minimum alors qu'il en est très au-dessus.
    expect(
      selectContextualMessage({
        salaireNetMensuel: 1700,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("primes-conventionnelles");
  });

  it.each([
    [null, SMIC_NET],
    [undefined, SMIC_NET],
    [2253.9, null],
    [2253.9, undefined],
    [null, null],
  ])(
    "ne dit rien tant qu'un des deux nets manque (%p, %p)",
    (salaireNetMensuel, smicNetMensuel) => {
      expect(
        selectContextualMessage({ salaireNetMensuel, smicNetMensuel })
      ).toBeNull();
    }
  );

  it("n'a jamais deux réponses à la fois", () => {
    // Le `return` unique rend l'exclusivité structurelle : on le vérifie sur un
    // balayage large plutôt que sur deux conditions à garder cohérentes.
    for (let net = 0; net <= 5000; net += 25) {
      const message = selectContextualMessage({
        salaireNetMensuel: net,
        smicNetMensuel: SMIC_NET,
      });
      expect(["salaire-minimum", "primes-conventionnelles"]).toContain(message);
    }
  });

  it("garde le même seuil quelle que soit la période affichée", () => {
    // L'appelant passe toujours le net mensuel canonique : un net annuel de
    // 27 046 € ne doit pas être comparé au SMIC net mensuel.
    const monthly = 2253.9;
    expect(
      selectContextualMessage({
        salaireNetMensuel: monthly,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("primes-conventionnelles");
    expect(
      selectContextualMessage({
        salaireNetMensuel: monthly * 12,
        smicNetMensuel: SMIC_NET,
      })
    ).toBe("primes-conventionnelles");
  });

  it("accepte une marge sur mesure", () => {
    expect(
      selectContextualMessage({
        salaireNetMensuel: 2000,
        smicNetMensuel: SMIC_NET,
        margin: 0.5,
      })
    ).toBe("salaire-minimum");
  });
});
