import { byTestId, byText } from "testing-library-selector";
import { ui as uiCommon } from "../../__tests__/ui";

export const ui = {
  ...uiCommon,
  typeRupture: {
    input: byTestId("typeRupture"),
  },
  agreement3239: {
    searchResult: byText(/particuliers employeurs et emploi à domicile/i),
    categoryProInput: byTestId("criteria.catégorie professionnelle"),
    durationInput: byTestId("criteria.durée du travail"),
    seniorityInput: byTestId("criteria.ancienneté"),
  },
};
