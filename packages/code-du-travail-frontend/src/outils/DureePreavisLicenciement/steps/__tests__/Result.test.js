import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

const ccn1527 = {
  convention: {
    id: "KALICONT000005635413",
    slug:
      "1527-convention-collective-nationale-de-limmobilier-administrateurs-de-biens",
    title:
      "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 ",
    num: 1527
  },
  label: "IDCC 1517"
};

describe("<StepResult />", () => {
  it("should render show result with company agreement disclaimer", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "41| plus de 2 ans"
      },
      ccn: ccn1527,
      criteria: {
        "catégorie socio-professionnelle": "6| Ouvriers, Employés",
        ancienneté: "40| 2 ans ou plus"
      }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render show result with collective or compagny agreement disclaimer", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "13| moins de 6 mois"
      },
      ccn: ccn1527,
      criteria: {
        "catégorie socio-professionnelle": "6| Ouvriers, Employés",
        ancienneté: "36| moins de 2 ans"
      }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with CDT no CC", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "41| plus de 2 ans"
      },
      ccn: {
        convention: {
          id: "KALICONT000005635413",
          slug:
            "1527-convention-collective-nationale-de-limmobilier-administrateurs-de-biens",
          title:
            "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 ",
          num: 1527
        },
        label: "IDCC 1517"
      }
    });
    expect(container).toMatchSnapshot();
  });
});
