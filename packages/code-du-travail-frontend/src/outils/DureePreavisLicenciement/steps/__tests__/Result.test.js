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

const ccn3239 = {
  selected: {
    id: "KALICONT000005635624",
    num: 3239,
    shortTitle: "Assistant maternel",
    slug: "3239-assistant-maternel",
    title: "Convention collective nationale des assistants maternels",
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

  describe("Convention collective 3239 -> Assistant maternel", () => {
    it("doit remonter la durée de la convention collective", () => {
      const { getByText, queryByText } = renderForm(StepResult, {
        ccn: ccn3239,
        cdt: {
          ancienneté: "15| moins de 6 mois",
        },
        criteria: {
          ancienneté: "105| Enfant accueilli depuis moins de 3 mois",
          "catégorie professionnelle":
            "101| Assistants maternels du particulier employeur",
        },
        disabledWorker: false,
        seriousMisconduct: false,
      });
      expect(getByText(/8 jours/)).toBeInTheDocument();
      expect(
        queryByText(
          /Il s’agit de la durée la plus longue entre la durée légale prévue par le Code du travail et la durée conventionnelle prévue par la convention collective/
        )
      ).not.toBeInTheDocument();
    });
  });
});
