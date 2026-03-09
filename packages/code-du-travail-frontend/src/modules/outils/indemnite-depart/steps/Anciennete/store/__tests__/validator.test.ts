import { validateStep } from "../validator";

describe("Ancienneté store", () => {
  it("date de notification invalide", () => {
    const result = validateStep({
      dateEntree: "01/01/2020",
      dateSortie: "01/03/2024",
      dateNotification: "01/01/72024",
    });
    expect(result.isValid).toBe(false);
    expect(result.errorState.errorDateNotification).toEqual(
      "La date de notification est invalide"
    );
  });
});
