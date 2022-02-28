import { renderForm } from "../../../../../test/renderForm";
import { StepInformations } from "../Informations";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie professionelle", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { selected: { num: 44 } },
      typeRupture: "1| Démission",
    });
    expect(container).toMatchSnapshot();
  });
  it("should render groupe", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { selected: { num: 44 } },
      criteria: { "catégorie professionnelle": "28| Techniciens" },
      typeRupture: "1| démission",
    });
    expect(container).toMatchSnapshot();
  });
});
