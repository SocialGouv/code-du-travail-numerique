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
});
