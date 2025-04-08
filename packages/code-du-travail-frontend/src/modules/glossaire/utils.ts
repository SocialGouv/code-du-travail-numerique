import { GlossaryTerm } from "./types";

export function getGlossaryLetters(glossary: GlossaryTerm[]) {
  const A = "A".charCodeAt(0);
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(A + index)
  );
  return alphabet.map((letter) => ({
    letter,
    terms: glossary
      .filter(({ slug }) => slug.slice(0, 1).toUpperCase() === letter)
      .sort((a, b) => a.term.localeCompare(b.term)),
  }));
}
