import { renderForm } from "../../../../../test/renderForm";
import { StepResult } from "../Result";

const ccn16 = {
  selected: {
    id: "KALICONT000005635624",
    num: 16,
    shortTitle: "Transports routiers et activités auxiliaires du transport",
    slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
    title:
      "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
  },
};

describe("<StepResult />", () => {
  it("should render with O duration", () => {
    const { container } = renderForm(StepResult, {
      ccn: ccn16,
      cdt: {
        ancienneté: "15| moins de 6 mois",
      },
      criteria: {
        ancienneté: "3| moins de 1 mois",
        "catégorie professionnelle": "16| Employés",
      },
      disabledWorker: false,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with only CC duration", () => {
    const { container } = renderForm(StepResult, {
      ccn: ccn16,
      cdt: {
        ancienneté: "15| moins de 6 mois",
      },
      criteria: {
        ancienneté: "30| 1 mois à moins de 2 ans",
        "catégorie professionnelle": "16| Employés",
        "catégorie socio-professionnelle": "16| Employés",
      },
      disabledWorker: false,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with both CC duration and CDT duration", () => {
    const { container } = renderForm(StepResult, {
      ccn: ccn16,
      cdt: {
        ancienneté: "33| 6 mois à moins de 2 ans",
      },
      criteria: {
        ancienneté: "30| 1 mois à moins de 2 ans",
        "catégorie professionnelle": "16| Employés",
        "catégorie socio-professionnelle": "16| Employés",
      },
      disabledWorker: false,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with when no CC", () => {
    const { container } = renderForm(StepResult, {
      cdt: {
        ancienneté: "43| plus de 2 ans",
      },
      disabledWorker: false,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with when unhandled CC", () => {
    const { container } = renderForm(StepResult, {
      ccn: {
        selected: {
          id: "KALICONT000005635662",
          num: 1561,
          shortTitle: "Cordonnerie multiservice",
          slug: "1561-cordonnerie-multiservice",
          title:
            "Convention collective nationale de la cordonnerie multiservice du 7 août 1989. Elargie au secteur des cordonniers industriels ",
        },
      },
      cdt: {
        ancienneté: "43| plus de 2 ans",
      },
      disabledWorker: false,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
});
