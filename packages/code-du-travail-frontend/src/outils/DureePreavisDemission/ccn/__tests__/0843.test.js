import React from "react";
import { render } from "react-testing-library";
import { Form } from "react-final-form";

import {
  Step0843,
  Result0843,
  computePreavis,
  WORKER,
  ETAM,
  MANAGER,
  LESS_THAN_6_MONTH,
  BETWEEN_6_AND_24_MONTH,
  MORE_THAN_24_MONTH
} from "../0843";
import { renderForm } from "../../../../../test/renderForm";

describe("<Step0843 />", () => {
  it("should render", () => {
    const { container } = renderForm(Step0843);
    expect(container).toMatchSnapshot();
  });
  it("should render seniority", () => {
    const { container } = renderForm(Step0843, { category: ETAM });
    expect(container).toMatchSnapshot();
  });
});

describe("<Result0843 />", () => {
  it("should render", () => {
    const { container } = renderForm(Result0843, {
      branche: "0843",
      category: MANAGER
    });

    expect(container).toMatchSnapshot();
  });
});

describe("computePreavis", () => {
  const cases = [
    [MANAGER, undefined, "2 mois"],
    [ETAM, LESS_THAN_6_MONTH, "1 semaine"],
    [WORKER, LESS_THAN_6_MONTH, "1 semaine"],
    [WORKER, MORE_THAN_24_MONTH, "2 semaines"],
    [ETAM, MORE_THAN_24_MONTH, "2 semaines"],
    [WORKER, BETWEEN_6_AND_24_MONTH, "2 semaines"],
    [ETAM, BETWEEN_6_AND_24_MONTH, "2 semaines"]
  ];
  test.each(cases)(
    "compute preavis for %s",
    (category, seniority, expected) => {
      expect(computePreavis({ category, seniority })).toBe(expected);
    }
  );
});
