import { renderForm } from "../../../../../test/renderForm";
import { StepResult } from "../Result";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      ccn: { selected: { num: 292, title: "Plasturgie" } },
      criteria: {
        "catégorie professionnelle": "42| Collaborateurs",
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
