import React from "react";
import { render } from "react-testing-library";
import { ResultDetail } from "../ResultDetail";

describe("<ResultDetail />", () => {
  it("should render", () => {
    const props = {
      indemnite: 500,
      moyenneSalaires: 1500,
      moyenne3DerniersMois: 2000,
      isSmallAnciennete: false,
      isR12342: false,
      formula: "1/4 * 1200 * 10 / 12",
      salaires: { isPartiel: false }
    };
    const { container } = render(<ResultDetail {...props} />);
    expect(container).toMatchSnapshot();
  });
  it("should render when rupture contrat is before sept 27 sept 2017", () => {
    const props = {
      indemnite: 500,
      moyenneSalaires: 1500,
      moyenne3DerniersMois: 2000,
      isSmallAnciennete: false,
      isR12342: true,
      formula: "1/4 * 1200 * 10 / 12",
      salaires: { isPartiel: false }
    };
    const { container } = render(<ResultDetail {...props} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with temps partiel", () => {
    const props = {
      indemnite: 500,
      moyenneSalaires: 1500,
      moyenne3DerniersMois: 2000,
      isSmallAnciennete: false,
      isR12342: false,
      formula: "1/4 * 1200 * 10 / 12",
      salaires: { isPartiel: true }
    };
    const { container } = render(<ResultDetail {...props} />);
    expect(container).toMatchSnapshot();
  });
});
