import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CDT and CC answer", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "12| plus de 2 ans"
      },
      ccn: {
        id: "KALICONT000005635413",
        slug:
          "1527-convention-collective-nationale-de-limmobilier-administrateurs-de-biens",
        title:
          "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 ",
        num: "1527"
      },
      criteria: {
        "catégorie socio-professionnelle": "6| Ouvriers, Employés",
        ancienneté: "13| 2 ans ou plus"
      }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with CDT no CC", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "12| plus de 2 ans"
      },
      ccn: {
        id: "KALICONT000005635413",
        slug:
          "1527-convention-collective-nationale-de-limmobilier-administrateurs-de-biens",
        title:
          "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 ",
        num: "1527"
      }
    });
    expect(container).toMatchSnapshot();
  });
});
