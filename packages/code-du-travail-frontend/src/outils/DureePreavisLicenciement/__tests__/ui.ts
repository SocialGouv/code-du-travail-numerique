import { byTestId, byText } from "testing-library-selector";
import { ui as uiCommon } from "../../__tests__/ui";

export const ui = {
  ...uiCommon,
  situation: {
    fauteGraveOui: byTestId("seriousMisconduct-oui"),
    fauteGraveNon: byTestId("seriousMisconduct-non"),
    handicapOui: byTestId("disabledWorker-oui"),
    handicapNon: byTestId("disabledWorker-non"),
    seniority: byTestId("cdt.ancienneté"),
  },
  agreement1351: {
    searchResult: byText(/Entreprises de prévention et de sécurité/),
    categoryProInput: byTestId("criteria.catégorie professionnelle"),
    levelInput: byTestId("criteria.niveau"),
    seniorityInput: byTestId("criteria.ancienneté"),
  },
};
