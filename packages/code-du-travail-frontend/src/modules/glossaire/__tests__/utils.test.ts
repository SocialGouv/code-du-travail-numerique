import { getGlossaryLetters } from "../utils";
import { GlossaryItem } from "../types";

describe("getGlossaryLetters", () => {
  it("should group terms by their first letter", () => {
    const mockGlossary: GlossaryItem[] = [
      {
        term: "Arrêt",
        slug: "arret",
        definition: "Definition",
      } as GlossaryItem,
      {
        term: "Accord",
        slug: "accord",
        definition: "Definition",
      } as GlossaryItem,
      {
        term: "Bénéfice",
        slug: "benefice",
        definition: "Definition",
      } as GlossaryItem,
    ];

    const result = getGlossaryLetters(mockGlossary);

    // 26 lettres dans l'alphabet
    expect(result).toHaveLength(26);

    // Vérifier les termes sous la lettre A
    const aTerms = result.find((item) => item.letter === "A")?.terms;
    expect(aTerms).toHaveLength(2);
    expect(aTerms?.[0].term).toBe("Accord"); // Triés par ordre alphabétique
    expect(aTerms?.[1].term).toBe("Arrêt");

    // Vérifier les termes sous la lettre B
    const bTerms = result.find((item) => item.letter === "B")?.terms;
    expect(bTerms).toHaveLength(1);
    expect(bTerms?.[0].term).toBe("Bénéfice");

    // Vérifier qu'il n'y a pas de termes sous les autres lettres
    const cTerms = result.find((item) => item.letter === "C")?.terms;
    expect(cTerms).toHaveLength(0);
  });

  it("should return all letters even when glossary is empty", () => {
    const result = getGlossaryLetters([]);
    expect(result).toHaveLength(26);
    result.forEach((item) => {
      expect(item.terms).toHaveLength(0);
    });
  });
});
