import { renderForm } from "../../../../../test/renderForm";
import { StepResult } from "../Result";

const ccn86 = {
  selected: {
    id: "KALICONT000005635630",
    num: 86,
    shortTitle: "Entreprises de la publicité et assimilées",
    slug: "86-entreprises-de-la-publicite-et-assimilees",
    title:
      "Convention collective nationale de travail des cadres, techniciens et employés de la publicité française du 22 avril 1955. Étendue par arrêté du 29 juillet 1955 JORF 19 août 1955",
  },
};

describe("<StepResult />", () => {
  it("should render with duration", () => {
    const { container } = renderForm(StepResult, {
      ccn: ccn86,
      criteria: {
        "catégorie professionnelle": "16| Employés",
      },
      typeRupture: "1| Démission",
    });
    expect(container).toMatchSnapshot();
  });

  it("should render no results", () => {
    const { container } = renderForm(StepResult, {
      ccn: ccn86,
      criteria: {
        "catégorie professionnelle": "21| Agents de maîtrise et Techniciens",
        "initiative de la rupture de la période d'essai": "2| Le salarié",
      },
      typeRupture: "7| Rupture de la période d'essai",
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with when no CC", () => {
    const { container } = renderForm(StepResult, {});
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
    });
    expect(container).toMatchSnapshot();
  });
});
