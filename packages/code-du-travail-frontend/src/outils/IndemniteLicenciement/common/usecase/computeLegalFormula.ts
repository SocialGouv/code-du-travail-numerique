export default function computeLegalFormula(
  seniority: number,
  isForInaptitude: boolean
) {
  let formula = "";
  const isSmallSeniority = seniority <= 10;
  if (seniority >= 8 / 12) {
    if (isSmallSeniority) {
      formula = `1 / 4 * Sref * A`;
    } else {
      formula = `(1 / 4 * Sref * 10) + (1 / 3 * Sref * A2)`;
    }
    if (isForInaptitude) {
      formula += " * 2";
    }
  }
  return formula;
}
