import {
  Step0044,
  Result0044,
  computePreavis,
  LESS_THAN_160,
  BETWEEN_160_190,
  BETWEEN_190_275,
  GREATER_THAN_275
} from "../0044";
import { renderForm } from "../../../../../test/renderForm";

describe("<Step0044 />", () => {
  it("should render", () => {
    const { container } = renderForm(Step0044);
    expect(container).toMatchSnapshot();
  });
});

describe("<Result0044 />", () => {
  it("should render", () => {
    const { container } = renderForm(Result0044, {
      branche: "0044",
      coefficient: LESS_THAN_160
    });
    expect(container).toMatchSnapshot();
  });
});

describe("computePreavis", () => {
  const cases = [
    [LESS_THAN_160, "15 jours"],
    [BETWEEN_160_190, "1 mois"],
    [BETWEEN_190_275, "2 mois"],
    [GREATER_THAN_275, "3 mois"]
  ];
  test.each(cases)("compute preavis for %s", (coefficient, expected) => {
    expect(computePreavis({ coefficient })).toBe(expected);
  });
});
