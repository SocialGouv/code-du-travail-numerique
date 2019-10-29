import { StepInformations } from "../Informations";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render groupe", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: "0044" }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: "0044" },
      criteria: { groupe: "4| II" }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: "0044" },
      criteria: { groupe: "4| II", coefficient: "1| inférieur à 160" }
    });
    expect(container).toMatchSnapshot();
  });
});
