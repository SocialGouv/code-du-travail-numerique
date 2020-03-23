import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

const ccn16 = {
  id: "KALICONT000005635624",
  slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
  title:
    "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
  shortTitle: "Transports routiers et activités auxiliaires du transport",
  num: 16,
};

describe("<StepResult />", () => {
  it("should render with O duration", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "15| moins de 6 mois",
      },
      criteria: {
        "catégorie socio-professionnelle": "16| Employés",
        ancienneté: "3| moins de 1 mois",
      },
      ccn: ccn16,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with only CC duration", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "15| moins de 6 mois",
      },
      criteria: {
        "catégorie socio-professionnelle": "16| Employés",
        ancienneté: "30| 1 mois à moins de 2 ans",
      },
      ccn: ccn16,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with both CC duration and CDT duration", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "33| 6 mois à moins de 2 ans",
      },
      criteria: {
        "catégorie socio-professionnelle": "16| Employés",
        ancienneté: "30| 1 mois à moins de 2 ans",
      },
      ccn: ccn16,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with when no CC", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "43| plus de 2 ans",
      },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with when unhandled CC", () => {
    const { container } = renderForm(StepResult, {
      seriousMisconduct: false,
      disabledWorker: false,
      cdt: {
        ancienneté: "43| plus de 2 ans",
      },
      ccn: {
        id: "KALICONT000005635662",
        slug: "1561-cordonnerie-multiservice",
        title:
          "Convention collective nationale de la cordonnerie multiservice du 7 août 1989. Elargie au secteur des cordonniers industriels ",
        shortTitle: "Cordonnerie multiservice",
        num: 1561,
      },
    });
    expect(container).toMatchSnapshot();
  });
});
