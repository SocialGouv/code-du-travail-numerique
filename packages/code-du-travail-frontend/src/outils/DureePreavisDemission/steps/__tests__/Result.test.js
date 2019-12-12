import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      ccn: { convention: { num: "292", title: "Plasturgie" } },
      criteria: {
        "catégorie socio-professionnelle": "42| Collaborateurs",
        coefficient: "27| 910 à 940"
      }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with no cc", () => {
    const { container } = renderForm(StepResult, {
      ccn: { convention: { num: "292" } }
    });
    expect(container).toMatchSnapshot();
  });
});
