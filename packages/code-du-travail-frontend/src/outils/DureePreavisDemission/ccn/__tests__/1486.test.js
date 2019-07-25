import {
  Step1486,
  Result1486,
  computePreavis,
  ETAM,
  MANAGER,
  INTERMITENT_INVESTIGATOR,
  BETWEEN_200_355,
  BETWEEN_400_500,
  LESS_THAN_24_MONTH,
  MORE_THAN_24_MONTH
} from "../1486";
import { renderForm } from "../../../../../test/renderForm";

describe("<Step1486 />", () => {
  it("should render", () => {
    const { container } = renderForm(Step1486);
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(Step1486, { category: ETAM });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient and seniority", () => {
    const { container } = renderForm(Step1486, {
      category: ETAM,
      coefficient: BETWEEN_200_355
    });
    expect(container).toMatchSnapshot();
  });
});

describe("<Result1486 />", () => {
  it("should render", () => {
    const { container } = renderForm(Result1486, {
      branche: "1486",
      category: MANAGER
    });
    expect(container).toMatchSnapshot();
  });
});

describe("computePreavis", () => {
  const cases = [
    [MANAGER, undefined, undefined, "3 mois"],
    [INTERMITENT_INVESTIGATOR, undefined, undefined, "1 mois"],
    [ETAM, LESS_THAN_24_MONTH, BETWEEN_200_355, "1 mois"],
    [ETAM, LESS_THAN_24_MONTH, BETWEEN_400_500, "2 mois"],
    [ETAM, MORE_THAN_24_MONTH, BETWEEN_200_355, "2 mois"],
    [ETAM, MORE_THAN_24_MONTH, BETWEEN_400_500, "2 mois"]
  ];
  test.each(cases)(
    "compute preavis for %s",
    (category, seniority, coefficient, expected) => {
      expect(computePreavis({ category, coefficient, seniority })).toBe(
        expected
      );
    }
  );
});
