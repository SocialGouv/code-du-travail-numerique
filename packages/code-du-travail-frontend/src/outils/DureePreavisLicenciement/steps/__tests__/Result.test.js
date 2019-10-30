import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      ccn: { num: "0044" },
      criteria: { catégorie: "16| Ingénieurs, Cadres" }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with no cc", () => {
    const { container } = renderForm(StepResult, {
      ccn: { num: "0044" }
    });
    expect(container).toMatchSnapshot();
  });
});
