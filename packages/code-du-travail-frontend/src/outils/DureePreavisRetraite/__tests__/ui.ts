import { byTestId, byText } from "testing-library-selector";
import { ui as uiCommon } from "../../__tests__/ui";

export const ui = {
  ...uiCommon,
  origin: {
    mise: byTestId("mise-a-la-retraite"),
    depart: byTestId("depart-a-la-retraite"),
  },
  information: {
    handicap: {
      label: byText(
        /Le salarié concerné est-il reconnu en tant que travailleur handicapé/
      ),
      oui: byTestId("infos.contrat salarié - travailleur handicapé-oui"),
      non: byTestId("infos.contrat salarié - travailleur handicapé-non"),
    },
    agreement1517: {
      categoryPro: byText(/Quelle est la catégorie professionnelle du salarié/),
      categoryProInput: byTestId(
        "infos.contrat salarié - convention collective - commerces de detail non alimentaires - catégorie professionnelle"
      ),
    },
    agreement1351: {
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
    agreement16: {
      categoryPro: byText(/Quelle est la catégorie professionnelle du salarié/),
      categoryProInput: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - catégorie professionnelle"
      ),
    },
  },
  seniority: {
    moreThanXYear: {
      oui: byTestId("seniority.moreThanXYear-oui"),
      non: byTestId("seniority.moreThanXYear-non"),
    },
    input: byTestId("seniority.value"),
  },
};
