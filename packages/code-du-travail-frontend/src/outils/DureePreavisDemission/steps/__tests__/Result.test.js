import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      ccn: { num: 292, title: "Plasturgie" },
      criteria: {
        "catégorie socio-professionnelle": "42| Collaborateurs",
        coefficient: "28| 800 à 830 inclus",
      },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with no cc", () => {
    const { container } = renderForm(StepResult, {});
    expect(container).toMatchSnapshot();
  });
  it("should render with unhandled cc", () => {
    const { container } = renderForm(StepResult, {
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
