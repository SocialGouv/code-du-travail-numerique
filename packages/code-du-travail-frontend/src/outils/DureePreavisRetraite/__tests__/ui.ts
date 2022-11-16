import { byTestId, byText } from "testing-library-selector";
import { ui as uiCommon } from "../../__tests__/ui";

export const ui = {
  ...uiCommon,
  origin: {
    departRetraiteOui: byTestId("origin.isRetirementMandatory-depart"),
    departRetraiteNon: byTestId("origin.isRetirementMandatory-mise"),
  },
  agreement1351: {
    searchResult: byText(/Entreprises de prévention et de sécurité/),
    categoryProInput: byTestId(
      "infos.contrat salarié - convention collective - prevention sécurité entreprise - catégorie professionnelle"
    ),
    disableWorkerYesInput: byTestId(
      "infos.contrat salarié - travailleur handicapé-oui"
    ),
    disableWorkerNoInput: byTestId(
      "infos.contrat salarié - travailleur handicapé-non"
    ),
  },
};
