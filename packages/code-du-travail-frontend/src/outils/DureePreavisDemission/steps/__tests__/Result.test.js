import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      ccn: { num: "0292", title: "Plasturgie" },
      criteria: {
        "catégorie socio-professionnelle": "38| Collaborateurs",
        coefficient: "19| 800 à 830 inclus"
      }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with no cc", () => {
    const { container } = renderForm(StepResult, {
      ccn: { num: "0292" }
    });
    expect(container).toMatchSnapshot();
  });
});
